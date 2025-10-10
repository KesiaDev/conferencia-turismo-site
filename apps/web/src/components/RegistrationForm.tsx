import { useState, useEffect, useCallback } from "react";
import Alert from "./Alert";
import apiService from "../api/client";

interface RegistrationData {
  fullName: string;
  birthDate: string;
  documentNumber: string;
  documentType: string;
  email: string;
  phone: string;
  category: string;
  affiliation: string;
  paymentMethod: string;
}

interface PriceInfo {
  category: string;
  currentPrice: number;
  period: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    birthDate: "",
    documentNumber: "",
    documentType: "CPF",
    email: "",
    phone: "",
    category: "",
    affiliation: "",
    paymentMethod: "PIX",
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
  const getCurrentPrice = useCallback((category: string): PriceInfo => {
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
  }, []);

  // Atualizar preço quando categoria mudar
  useEffect(() => {
    if (formData.category) {
      const price = getCurrentPrice(formData.category);
      setPriceInfo(price);
    }
  }, [formData.category, getCurrentPrice]);

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    }

    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = "Número do documento é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    if (!formData.affiliation.trim()) {
      newErrors.affiliation = "Afiliação/Instituição é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com mudanças nos campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("loading");

    try {
      console.log("📝 Enviando inscrição...");
      console.log("📋 Dados:", formData);
      console.log("💰 Preço:", priceInfo);

      // Enviar para a API
      const response = await apiService.submitRegistration(formData);

      console.log("✅ Resposta da API:", response);

      setSubmitStatus("success");

      // TODO: Aqui você pode redirecionar para o link de pagamento quando estiver disponível
      // window.location.href = "SEU_LINK_DE_PAGAMENTO_AQUI";
    } catch (error) {
      console.error("❌ Erro ao enviar inscrição:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#e0a085] mb-6 text-center">
          Formulário de Inscrição
        </h2>

        {submitStatus === "success" && (
          <Alert type="success">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">✅ Inscrição realizada com sucesso!</h3>
              <p className="mb-4">
                Sua inscrição foi registrada. As instruções de pagamento serão enviadas para seu
                e-mail em breve.
              </p>
              {priceInfo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    Valor a pagar:{" "}
                    <span className="text-xl">R$ {priceInfo.currentPrice.toFixed(2)}</span>
                  </p>
                  <p className="text-green-700 text-sm">Período: {priceInfo.period}</p>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-4">
                📧 Verifique sua caixa de entrada e spam para as instruções de pagamento.
              </p>
            </div>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert type="error">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">❌ Erro ao processar inscrição</h3>
              <p>
                Ocorreu um erro ao processar sua inscrição. Tente novamente ou entre em contato
                conosco.
              </p>
            </div>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#e0a085] mb-4 flex items-center gap-2">
              <span>👤</span>
              Informações Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Digite seu nome completo"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.birthDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="documentType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tipo de Documento *
                </label>
                <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085]"
                >
                  <option value="CPF">CPF</option>
                  <option value="RG">RG</option>
                  <option value="Passaporte">Passaporte</option>
                  <option value="CNH">CNH</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="documentNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número do Documento *
                </label>
                <input
                  type="text"
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.documentNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Digite o número do documento"
                />
                {errors.documentNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="(51) 99999-9999"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Informações Acadêmicas */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#e0a085] mb-4 flex items-center gap-2">
              <span>🎓</span>
              Informações Acadêmicas
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecione sua categoria</option>
                  <option value="Estudante de Graduação">Estudante de Graduação</option>
                  <option value="Pós-graduandos">Pós-graduandos</option>
                  <option value="Professores, Pesquisadores ou Profissionais">
                    Professores, Pesquisadores ou Profissionais
                  </option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label
                  htmlFor="affiliation"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Afiliação/Instituição *
                </label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085] ${
                    errors.affiliation ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: Universidade de Caxias do Sul, Empresa XYZ, etc."
                />
                {errors.affiliation && (
                  <p className="text-red-500 text-sm mt-1">{errors.affiliation}</p>
                )}
              </div>
            </div>
          </div>

          {/* Informações de Preço */}
          {priceInfo && (
            <div className="bg-gradient-to-r from-[#e0a085] to-[#f4c490] rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>💰</span>
                Informações de Pagamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-90">Categoria:</p>
                  <p className="font-semibold">{priceInfo.category}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Período:</p>
                  <p className="font-semibold">{priceInfo.period}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm opacity-90">Valor da Inscrição:</p>
                  <p className="text-3xl font-bold">R$ {priceInfo.currentPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Método de Pagamento */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#e0a085] mb-4 flex items-center gap-2">
              <span>💳</span>
              Método de Pagamento
            </h3>
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Forma de Pagamento Preferida
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e0a085]"
              >
                <option value="PIX">PIX</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Boleto Bancário">Boleto Bancário</option>
                <option value="Transferência Bancária">Transferência Bancária</option>
              </select>
            </div>
          </div>

          {/* Informação sobre pagamento */}
          <Alert type="info">
            <div className="text-center">
              <h4 className="font-semibold mb-2">📢 Informação Importante</h4>
              <p>
                Após o envio deste formulário, você receberá por e-mail as instruções detalhadas
                para realizar o pagamento da sua inscrição.
              </p>
            </div>
          </Alert>

          {/* Botão de Envio */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitStatus === "loading"}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                submitStatus === "loading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#e0a085] hover:bg-[#d09773] focus:ring-2 focus:ring-[#e0a085] focus:ring-offset-2"
              }`}
            >
              {submitStatus === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processando...
                </span>
              ) : (
                "Realizar Inscrição"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
