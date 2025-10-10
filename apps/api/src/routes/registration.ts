import express from "express";
import { registrationSchema, type RegistrationWithId } from "../schemas/registration.js";
import { storeRegistration, getRegistrations } from "../db/data.js";
import { sendRegistrationConfirmation } from "../services/email.js";

const router = express.Router();

// Preços baseados nas datas fornecidas
const pricing = {
  "Estudante de Graduação": { until_05_01: 60, until_31_01: 70, until_23_03: 100 },
  "Pós-graduandos": { until_05_01: 150, until_31_01: 180, until_23_03: 214 },
  "Professores, Pesquisadores ou Profissionais": {
    until_05_01: 220,
    until_31_01: 250,
    until_23_03: 325,
  },
};

// Função para determinar o preço atual baseado na data
const getCurrentPrice = (category: string) => {
  const now = new Date();
  const jan05 = new Date("2026-01-05");
  const jan31 = new Date("2026-01-31");
  const mar23 = new Date("2026-03-23");

  let price = 0;
  let period = "";

  if (now <= jan05) {
    price = pricing[category as keyof typeof pricing]?.until_05_01 || 0;
    period = "até 05/01/2026";
  } else if (now <= jan31) {
    price = pricing[category as keyof typeof pricing]?.until_31_01 || 0;
    period = "06-31/01/2026";
  } else if (now <= mar23) {
    price = pricing[category as keyof typeof pricing]?.until_23_03 || 0;
    period = "01/02-23/03/2026";
  } else {
    price = pricing[category as keyof typeof pricing]?.until_23_03 || 0;
    period = "Após 23/03/2026";
  }

  return {
    category,
    currentPrice: price,
    period,
  };
};

// POST /api/registration - Criar nova inscrição
router.post("/", async (req, res) => {
  try {
    console.log("📝 Recebendo nova inscrição...");
    console.log("📋 Headers:", req.headers);
    console.log("📋 Content-Type:", req.get("Content-Type"));
    console.log("📋 Body recebido:", JSON.stringify(req.body, null, 2));

    // Validar dados
    const validationResult = registrationSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.log("❌ Dados inválidos:", validationResult.error.issues);
      return res.status(400).json({
        success: false,
        error: "Dados inválidos",
        details: validationResult.error.issues,
      });
    }

    const data = validationResult.data;
    console.log("✅ Dados validados com sucesso");

    // Calcular preço atual
    const priceInfo = getCurrentPrice(data.category);
    console.log("💰 Preço calculado:", priceInfo);

    // Criar objeto de inscrição
    const registration: RegistrationWithId = {
      ...data,
      id: `reg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      priceInfo,
    };

    // Armazenar inscrição
    await storeRegistration(registration);
    console.log("💾 Inscrição armazenada com sucesso:", registration.id);

    // Enviar email de confirmação
    try {
      await sendRegistrationConfirmation(registration);
      console.log("📧 Email de confirmação enviado para:", data.email);
    } catch (emailError) {
      console.error("❌ Erro ao enviar email:", emailError);
      // Não falhar a inscrição por causa do email
    }

    res.status(201).json({
      success: true,
      message: "Inscrição realizada com sucesso",
      registrationId: registration.id,
      priceInfo,
    });
  } catch (error) {
    console.error("❌ Erro interno ao processar inscrição:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
      message: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
    });
  }
});

// GET /api/registration - Listar inscrições (para administração)
router.get("/", async (req, res) => {
  try {
    const registrations = await getRegistrations();
    res.json({
      success: true,
      data: registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar inscrições:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
});

// GET /api/registration/:id - Buscar inscrição específica
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const registrations = await getRegistrations();
    const registration = registrations.find((reg) => reg.id === id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: "Inscrição não encontrada",
      });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar inscrição:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
});

export default router;
