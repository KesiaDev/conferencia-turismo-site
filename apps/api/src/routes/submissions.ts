import { Router } from "express";
import { submissionSchema } from "../schemas/submission.js";
import { submissions } from "../db/data.js";
import { emailService } from "../services/email.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log("📥 Dados recebidos:", req.body);
    const validated = submissionSchema.parse(req.body);
    console.log("✅ Dados validados com sucesso:", validated);

    // Add to in-memory storage
    const submission = {
      ...validated,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    submissions.push(submission);

    // Envia email para a organização (não bloqueia a resposta)
    emailService.sendSubmissionNotification(validated).catch((err) => {
      console.error("Erro ao enviar email de submissão:", err);
      console.error("Stack trace:", err instanceof Error ? err.stack : "No stack trace");
    });

    res.status(201).json({
      success: true,
      message: "Submission received successfully",
      id: submission.id,
    });
  } catch (error: any) {
    console.error("❌ Erro na validação:", error);
    if (error.name === "ZodError") {
      console.error("🔍 Detalhes da validação:", error.errors);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
