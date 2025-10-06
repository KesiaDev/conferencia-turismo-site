import { Router } from "express";
import { contactSchema } from "../schemas/contact.js";
import { emailService } from "../services/email.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const validated = contactSchema.parse(req.body);

    // Envia email para a organização (async, não espera)
    emailService.sendContactNotification(validated).catch((err) => {
      console.error("Erro ao enviar email de contato:", err);
    });

    res.status(200).json({
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validação falhou",
        details: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      error: "Erro ao enviar mensagem",
    });
  }
});

export default router;
