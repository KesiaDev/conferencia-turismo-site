/**
 * API pública e admin de autorizações (equivalente a Next.js App Router:
 * POST /api/authorization em um monólito Next).
 */
import { Router, type Request } from "express";
import rateLimit from "express-rate-limit";
import { Prisma } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma.js";
import { authorizationBodySchema } from "../schemas/authorization.js";

const router = Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Muitas tentativas. Tente novamente em alguns minutos." },
});

const ipCooldownMs = 45_000;
const lastSubmitByIp = new Map<string, number>();

function getClientIp(req: Request): string {
  const xf = req.headers["x-forwarded-for"];
  const raw = typeof xf === "string" ? xf.split(",")[0]?.trim() : "";
  return raw || req.socket.remoteAddress || "unknown";
}

router.post("/", submitLimiter, async (req, res) => {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const last = lastSubmitByIp.get(ip) ?? 0;
    if (now - last < ipCooldownMs) {
      return res.status(429).json({
        success: false,
        error: "Aguarde alguns segundos antes de enviar novamente.",
      });
    }

    const parsed = authorizationBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details: parsed.error.flatten(),
      });
    }

    const { name, document, email, summary, accepted } = parsed.data;

    await prisma.authorization.create({
      data: {
        name,
        document,
        email,
        summary,
        accepted,
        ip,
      },
    });

    lastSubmitByIp.set(ip, now);

    return res.status(201).json({
      success: true,
      message: "Sua autorização foi registrada com sucesso.",
    });
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({
          success: false,
          error: "Já existe uma autorização para este e-mail e este título de resumo.",
        });
      }
      if (e.code === "P2021") {
        console.error(
          "authorization POST: tabela ou schema ausente — rode prisma migrate deploy e DATABASE_URL:",
          e
        );
        return res.status(503).json({
          success: false,
          error: "Serviço em atualização. Tente novamente em alguns minutos.",
        });
      }
    }
    if (e instanceof PrismaClientInitializationError) {
      console.error("authorization POST: Prisma não conectou (DATABASE_URL?):", e.message);
      return res.status(503).json({
        success: false,
        error: "Serviço temporariamente indisponível. Tente mais tarde.",
      });
    }
    console.error("authorization POST:", e);
    return res.status(500).json({ success: false, error: "Erro ao registrar. Tente mais tarde." });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const expected = process.env.ADMIN_PASSWORD;
    const sent = req.headers["x-admin-password"];
    if (!expected || String(sent) !== expected) {
      return res.status(401).json({ success: false, error: "Não autorizado" });
    }

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const where =
      q.length > 0
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { document: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : undefined;

    const items = await prisma.authorization.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json({ success: true, items });
  } catch (e) {
    console.error("authorization GET admin:", e);
    return res.status(500).json({ success: false, error: "Erro ao listar." });
  }
});

export default router;
