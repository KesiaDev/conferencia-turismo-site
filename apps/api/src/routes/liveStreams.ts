import { Router, type Request, type Response } from "express";
import { Prisma } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma.js";
import { liveStreamBodySchema } from "../schemas/liveStream.js";
import { extractYouTubeVideoId } from "../utils/youtube.js";

const router = Router();

function checkAdminPassword(req: Request, res: Response): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const sent = req.headers["x-admin-password"];
  if (!expected || String(sent) !== expected) {
    res.status(401).json({ success: false, error: "Não autorizado" });
    return false;
  }
  return true;
}

router.get("/", async (_req, res) => {
  try {
    const rows = await prisma.liveStream.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    const items = rows.map((r) => ({
      id: r.id,
      title: r.title,
      youtubeUrl: r.youtubeUrl,
      videoId: extractYouTubeVideoId(r.youtubeUrl),
      sortOrder: r.sortOrder,
      createdAt: r.createdAt.toISOString(),
    }));
    return res.json({ success: true, items });
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      console.error("liveStreams GET: Prisma não conectou:", e.message);
      return res
        .status(503)
        .json({ success: false, error: "Serviço temporariamente indisponível." });
    }
    console.error("liveStreams GET:", e);
    return res.status(500).json({ success: false, error: "Erro ao listar transmissões." });
  }
});

router.post("/admin", async (req, res) => {
  try {
    if (!checkAdminPassword(req, res)) return;

    const parsed = liveStreamBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details: parsed.error.flatten(),
      });
    }

    const { title, youtubeUrl } = parsed.data;
    const videoId = extractYouTubeVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({
        success: false,
        error:
          "Não foi possível reconhecer o link do YouTube. Cole o link completo do vídeo ou transmissão.",
      });
    }

    const maxSort = await prisma.liveStream.aggregate({ _max: { sortOrder: true } });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const created = await prisma.liveStream.create({
      data: {
        title,
        youtubeUrl: youtubeUrl.trim(),
        sortOrder: nextOrder,
      },
    });

    return res.status(201).json({
      success: true,
      item: {
        id: created.id,
        title: created.title,
        youtubeUrl: created.youtubeUrl,
        videoId,
        sortOrder: created.sortOrder,
        createdAt: created.createdAt.toISOString(),
      },
    });
  } catch (e) {
    console.error("liveStreams POST admin:", e);
    return res.status(500).json({ success: false, error: "Erro ao salvar." });
  }
});

router.delete("/admin/:id", async (req, res) => {
  try {
    if (!checkAdminPassword(req, res)) return;

    const id = req.params.id?.trim();
    if (!id) {
      return res.status(400).json({ success: false, error: "ID inválido." });
    }

    await prisma.liveStream.delete({ where: { id } });
    return res.json({ success: true });
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return res.status(404).json({ success: false, error: "Registro não encontrado." });
    }
    console.error("liveStreams DELETE admin:", e);
    return res.status(500).json({ success: false, error: "Erro ao excluir." });
  }
});

export default router;
