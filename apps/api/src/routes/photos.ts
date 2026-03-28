import { Router, type Request, type Response } from "express";
import multer from "multer";
import { Prisma } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas"));
    }
  },
});

function checkAdminPassword(req: Request, res: Response): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const sent = req.headers["x-admin-password"];
  if (!expected || String(sent) !== expected) {
    res.status(401).json({ success: false, error: "Não autorizado" });
    return false;
  }
  return true;
}

async function uploadToCloudinary(
  buffer: Buffer,
  mimetype: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const base64 = `data:${mimetype};base64,${buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      base64,
      {
        folder: "conferencia-fotos",
        transformation: [
          { width: 1920, height: 1920, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Erro no upload"));
        } else {
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      }
    );
  });
}

router.post("/upload", upload.array("photos", 10), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const { nome, descricao } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: "Nenhuma foto enviada" });
    }

    const uploadPromises = files.map(async (file) => {
      const { url, publicId } = await uploadToCloudinary(file.buffer, file.mimetype);
      return prisma.photo.create({
        data: {
          url,
          publicId,
          nome: nome?.trim() || null,
          descricao: descricao?.trim() || null,
          status: "PENDING",
        },
      });
    });

    const photos = await Promise.all(uploadPromises);

    return res.status(201).json({
      success: true,
      message: "Fotos enviadas com sucesso!",
      count: photos.length,
    });
  } catch (e) {
    console.error("photos POST upload:", e);
    return res.status(500).json({ success: false, error: "Erro ao enviar fotos." });
  }
});

router.get("/", async (req, res) => {
  try {
    const status = req.query.status as string | undefined;
    const where: Prisma.PhotoWhereInput = {};

    if (status === "pending") {
      where.status = "PENDING";
    } else if (status === "approved") {
      where.status = "APPROVED";
    } else if (status === "rejected") {
      where.status = "REJECTED";
    }

    const photos = await prisma.photo.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      items: photos.map((p) => ({
        id: p.id,
        url: p.url,
        nome: p.nome,
        descricao: p.descricao,
        status: p.status.toLowerCase(),
        createdAt: p.createdAt.toISOString(),
      })),
    });
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      console.error("photos GET: Prisma não conectou:", e.message);
      return res
        .status(503)
        .json({ success: false, error: "Serviço temporariamente indisponível." });
    }
    console.error("photos GET:", e);
    return res.status(500).json({ success: false, error: "Erro ao listar fotos." });
  }
});

router.patch("/admin/:id", async (req, res) => {
  try {
    if (!checkAdminPassword(req, res)) return;

    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, error: "Status inválido" });
    }

    const photo = await prisma.photo.update({
      where: { id },
      data: { status: status.toUpperCase() as "APPROVED" | "REJECTED" },
    });

    return res.json({
      success: true,
      item: {
        id: photo.id,
        url: photo.url,
        nome: photo.nome,
        descricao: photo.descricao,
        status: photo.status.toLowerCase(),
        createdAt: photo.createdAt.toISOString(),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return res.status(404).json({ success: false, error: "Foto não encontrada." });
    }
    console.error("photos PATCH admin:", e);
    return res.status(500).json({ success: false, error: "Erro ao atualizar foto." });
  }
});

router.delete("/admin/:id", async (req, res) => {
  try {
    if (!checkAdminPassword(req, res)) return;

    const { id } = req.params;

    const photo = await prisma.photo.findUnique({ where: { id } });
    if (!photo) {
      return res.status(404).json({ success: false, error: "Foto não encontrada." });
    }

    if (photo.publicId) {
      try {
        await cloudinary.uploader.destroy(photo.publicId);
      } catch (cloudinaryError) {
        console.error("Erro ao deletar do Cloudinary:", cloudinaryError);
      }
    }

    await prisma.photo.delete({ where: { id } });

    return res.json({ success: true });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
      return res.status(404).json({ success: false, error: "Foto não encontrada." });
    }
    console.error("photos DELETE admin:", e);
    return res.status(500).json({ success: false, error: "Erro ao excluir foto." });
  }
});

export default router;
