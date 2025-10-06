import { Router } from "express";
import { panelSubmissionSchema, PanelSubmission } from "../schemas/submission.js";
import { emailService } from "../services/email.js";

const router = Router();

// In-memory storage for panel submissions
const panelSubmissions: (PanelSubmission & { id: string; createdAt: string })[] = [];

router.post("/", async (req, res) => {
  try {
    console.log("📥 Dados do painel recebidos:", req.body);
    const validated = panelSubmissionSchema.parse(req.body);
    console.log("✅ Dados do painel validados com sucesso:", validated);

    // Add to in-memory storage
    const panelSubmission = {
      ...validated,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    panelSubmissions.push(panelSubmission);

    // Enviar email com documentos anexos
    emailService.sendPanelSubmissionNotification(panelSubmission).catch((err) => {
      console.error("Erro ao enviar email de submissão de painel:", err);
    });

    res.status(201).json({
      success: true,
      message: "Panel submission received successfully",
      id: panelSubmission.id,
    });
  } catch (error: unknown) {
    console.error("❌ Erro na validação do painel:", error);
    if (error && typeof error === 'object' && 'name' in error && error.name === "ZodError") {
      console.error("🔍 Detalhes da validação do painel:", (error as any).errors);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: (error as any).errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
