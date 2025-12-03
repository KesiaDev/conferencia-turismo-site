import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { CallInfo } from "../types";

export default function Call() {
  const { t } = useTranslation();
  const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    track: "",
    authors: "",
    abstract: "",
    references: "",
    keywords: "",
    affiliation: "",
    degree: "",
    support: "",
    language: "pt",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    apiService.getCallInfo().then(setCallInfo);
  }, []);

  // Funções para controlar o modal
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevenir scroll do body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ""; // Restaurar scroll do body
  };

  // Função para contar palavras
  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Função para processar palavras-chave aceitando vírgula ou ponto e vírgula
  const parseKeywords = (keywords: string): string[] => {
    return keywords
      .split(/[;,]/) // Aceita tanto vírgula quanto ponto e vírgula
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
  };

  // Função para validar todos os campos
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validação de nome
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "O nome deve ter pelo menos 2 caracteres";
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Por favor, insira um e-mail válido";
    }

    // Validação de título
    if (!formData.title.trim() || formData.title.trim().length < 5) {
      errors.title = "O título deve ter pelo menos 5 caracteres";
    }

    // Validação de linha temática
    if (!formData.track.trim()) {
      errors.track = "Por favor, selecione uma linha temática";
    }

    // Validação de autores
    if (!formData.authors.trim() || formData.authors.trim().length < 3) {
      errors.authors = "Informe pelo menos um autor (mínimo 3 caracteres)";
    }

    // Validação de afiliação
    if (!formData.affiliation.trim() || formData.affiliation.trim().length < 2) {
      errors.affiliation = "A afiliação deve ter pelo menos 2 caracteres";
    }

    // Validação de titulação
    if (!formData.degree.trim() || formData.degree.trim().length < 2) {
      errors.degree = "A titulação deve ter pelo menos 2 caracteres";
    }

    // Validação de resumo
    if (!formData.abstract.trim()) {
      errors.abstract = "O resumo é obrigatório";
    } else {
      if (formData.abstract.length > 2000) {
        errors.abstract = `O resumo deve ter no máximo 2000 caracteres. Atualmente: ${formData.abstract.length} caracteres.`;
      }
      const wordCount = countWords(formData.abstract);
      if (wordCount > 300) {
        errors.abstract = `O resumo deve ter no máximo 300 palavras. Atualmente: ${wordCount} palavras.`;
      }
    }

    // Validação de referências
    if (!formData.references.trim() || formData.references.trim().length < 20) {
      errors.references = "As referências devem ter pelo menos 20 caracteres";
    }

    // Validação de palavras-chave
    const keywordsArray = parseKeywords(formData.keywords);
    if (!formData.keywords.trim() || keywordsArray.length < 3) {
      errors.keywords = "Informe pelo menos 3 palavras-chave";
    } else if (keywordsArray.length > 5) {
      errors.keywords = "Informe no máximo 5 palavras-chave";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos os campos antes de enviar
    if (!validateForm()) {
      setSubmitStatus("error");
      // Scroll para o primeiro erro
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        element?.focus();
      }
      return;
    }

    setSubmitStatus("loading");
    setFieldErrors({});

    try {
      await apiService.submitAbstract(formData);
      setSubmitStatus("success");
      // Abrir modal de confirmação
      openModal();
      setFormData({
        name: "",
        email: "",
        title: "",
        track: "",
        authors: "",
        abstract: "",
        references: "",
        keywords: "",
        affiliation: "",
        degree: "",
        support: "",
        language: "pt",
      });
    } catch (error: any) {
      console.error("Erro ao enviar submissão:", error);
      setSubmitStatus("error");

      // Processar erros de validação da API
      const apiErrors: Record<string, string> = {};
      if (error?.response?.data?.details) {
        const validationErrors = error.response.data.details;
        validationErrors.forEach((err: any) => {
          const fieldName = err.path?.[0] || "campo";
          // Mapear nomes de campos da API para nomes do formulário
          const fieldMap: Record<string, string> = {
            name: "name",
            email: "email",
            title: "title",
            track: "track",
            authors: "authors",
            abstract: "abstract",
            references: "references",
            keywords: "keywords",
            affiliation: "affiliation",
            degree: "degree",
          };
          const formField = fieldMap[fieldName] || fieldName;
          apiErrors[formField] = err.message || "Campo inválido";
        });
        setFieldErrors(apiErrors);

        // Scroll para o primeiro erro
        const firstErrorField = Object.keys(apiErrors)[0];
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField);
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
          element?.focus();
        }
      } else if (error?.response?.data?.error) {
        setFieldErrors({ _general: error.response.data.error });
      } else if (error?.message) {
        setFieldErrors({ _general: `Erro ao enviar: ${error.message}` });
      } else {
        setFieldErrors({
          _general: "Ocorreu um erro ao enviar sua submissão. Por favor, tente novamente.",
        });
      }
    }
  };

  return (
    <>
      <Seo title={t("nav.call")} description={t("call.description")} />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("call.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Alert type="warning">
            <strong>{t("call.deadline")}:</strong>{" "}
            {callInfo?.deadlineISO &&
              new Date(callInfo.deadlineISO + "T00:00:00").toLocaleDateString("pt-BR")}
          </Alert>

          <div className="mt-12 max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t("call.guidelines")}</h2>
            <p className="text-base text-gray-700 leading-relaxed text-justify mb-8">
              {t("call.guidelinesText")}
            </p>

            <h3 className="text-xl font-bold text-[#e0a085] mt-10 mb-6">{t("call.formats")}</h3>

            {/* Apresentação Individual */}
            <div className="bg-white p-8 rounded-lg mb-8 border border-gray-200 shadow-sm">
              <h4 className="text-xl font-semibold mb-6 text-[#e0a085] text-center">
                {t("call.individualTitle")}
              </h4>
              <div className="text-base text-gray-600 leading-relaxed space-y-4">
                <p className="font-medium text-gray-700 text-base">Prezado(a) candidato(a),</p>
                <p className="text-base">
                  Para submeter seu trabalho, siga as instruções abaixo com atenção:
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700 text-base">
                      1. Número da linha temática:
                    </p>
                    <p className="ml-4 text-base">
                      Selecione a linha temática que melhor se enquadra na sua proposta. Este número
                      deve corresponder à temática do seu trabalho.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-base">2. Título do trabalho:</p>
                    <p className="ml-4 text-base">Informe o título completo do seu trabalho.</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-base">
                      3. Resumo (até 300 palavras):
                    </p>
                    <p className="ml-4 text-base">
                      No campo &ldquo;resumo&rdquo;, redija o texto em um único parágrafo,
                      observando as partes que devem compor o resumo:
                    </p>
                    <ul className="ml-8 mt-2 space-y-1.5 text-sm">
                      <li>• Objetivos da pesquisa</li>
                      <li>• Referencial (opcional)</li>
                      <li>• Metodologia utilizada</li>
                      <li>• Resultados obtidos</li>
                      <li>• Conclusões</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-base">4. Autores e afiliações:</p>
                    <p className="ml-4 text-base">
                      Informe os nomes completos de todos os autores, incluindo suas afiliações
                      institucionais (universidade, empresa ou instituição).
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-base">5. Referências:</p>
                    <p className="ml-4 text-base">
                      Liste de 3 a 5 referências bibliográficas utilizadas na elaboração do
                      trabalho.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-base">6. Palavras-chave:</p>
                    <p className="ml-4 text-base">
                      Escolha de 3 a 5 palavras-chave que representem o conteúdo do seu trabalho,
                      separadas por ponto e vírgula.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-base">
                  Após preencher o formulário e enviar, você receberá automaticamente uma cópia
                  contendo todas as informações que foram submetidas.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
                  <p className="font-medium text-yellow-800 text-base">
                    Importante: Antes de enviar, revise todos os campos para garantir que todas as
                    informações estão corretas e completas. Trabalhos incompletos ou fora do padrão
                    poderão ser desconsiderados.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-8 bg-gradient-to-r from-[#e0a085]/10 to-white rounded-lg border-l-4 border-[#e0a085]">
              <h3 className="text-xl font-bold text-[#e0a085] mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Linhas Temáticas
              </h3>
              <p className="text-base text-gray-700 mb-5">
                Para consultar todas as linhas temáticas disponíveis para submissão de trabalhos,
                visite nossa página dedicada:
              </p>
              <Link
                to="/thematic-lines"
                className="inline-flex items-center gap-2 bg-[#e0a085] text-white px-4 py-2 rounded-lg hover:bg-[#e0a085]/90 transition-colors duration-200 font-medium"
              >
                <span>Ver Linhas Temáticas</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Formulário de Submissão */}
          <div className="mt-12 bg-white border-2 border-[#e0a085] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("call.submitForm")}</h2>

            {submitStatus === "success" && (
              <Alert type="success">
                <strong>{t("call.successTitle")}</strong>
                <p>{t("call.successMessage")}</p>
              </Alert>
            )}

            {/* Modal de Confirmação */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={closeModal}
              >
                <div
                  className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <div className="mb-4">
                      <svg
                        className="mx-auto h-12 w-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Sua submissão foi enviada com sucesso!
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Se você não receber a cópia da sua submissão por e-mail até o final do dia,
                      entre em contato conosco.
                    </p>
                    <button
                      onClick={closeModal}
                      className="w-full bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Entendi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <Alert type="error">
                <strong>{t("call.errorTitle")}</strong>
                {fieldErrors._general ? (
                  <p>{fieldErrors._general}</p>
                ) : (
                  <p>{t("call.errorMessage")}</p>
                )}
                {Object.keys(fieldErrors).filter((k) => k !== "_general").length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold mb-2">Por favor, corrija os seguintes campos:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(fieldErrors)
                        .filter(([key]) => key !== "_general")
                        .map(([key, message]) => (
                          <li key={key} className="text-sm">
                            <strong>
                              {key === "name"
                                ? "Nome"
                                : key === "email"
                                  ? "E-mail"
                                  : key === "title"
                                    ? "Título"
                                    : key === "track"
                                      ? "Linha temática"
                                      : key === "authors"
                                        ? "Autores"
                                        : key === "abstract"
                                          ? "Resumo"
                                          : key === "references"
                                            ? "Referências"
                                            : key === "keywords"
                                              ? "Palavras-chave"
                                              : key === "affiliation"
                                                ? "Afiliação"
                                                : key === "degree"
                                                  ? "Titulação"
                                                  : key}
                              :
                            </strong>{" "}
                            {message}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">
                  {t("call.name")} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) {
                      setFieldErrors({ ...fieldErrors, name: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-2">
                  {t("call.email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) {
                      setFieldErrors({ ...fieldErrors, email: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="title" className="block font-semibold mb-2">
                  {t("call.workTitle")} *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (fieldErrors.title) {
                      setFieldErrors({ ...fieldErrors, title: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.title ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.title && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="track" className="block font-semibold mb-2">
                  {t("call.thematicTrack")} *
                </label>
                <select
                  id="track"
                  required
                  value={formData.track}
                  onChange={(e) => {
                    setFormData({ ...formData, track: e.target.value });
                    if (fieldErrors.track) {
                      setFieldErrors({ ...fieldErrors, track: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.track ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">{t("call.selectTrack")}</option>
                  <option value="1. Envolvimento da comunidade local no turismo literário e cinematográfico">
                    1. Envolvimento da comunidade local no turismo literário e cinematográfico
                  </option>
                  <option value="2. O papel das Film Commissions">
                    2. O papel das Film Commissions
                  </option>
                  <option value="3. Turismo Literário/ Cinematográfico e Economia Criativa">
                    3. Turismo Literário/ Cinematográfico e Economia Criativa
                  </option>
                  <option value="4. A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento (por exemplo, criação de emprego, oportunidades educativas)">
                    4. A contribuição do turismo literário e cinematográfico para o bem-estar da
                    comunidade de acolhimento (por exemplo, criação de emprego, oportunidades
                    educativas)
                  </option>
                  <option value="5. Estudos de casos de modelos bem sucedidos ou pouco explorados de desenvolvimento territorial orientado para o turismo literário/cinematográfico">
                    5. Estudos de casos de modelos bem sucedidos ou pouco explorados de
                    desenvolvimento territorial orientado para o turismo literário/cinematográfico
                  </option>
                  <option value="6. Estratégias para promover a sustentabilidade e o desenvolvimento regional por meio do patrimônio literário e das produções cinematográficas">
                    6. Estratégias para promover a sustentabilidade e o desenvolvimento regional por
                    meio do patrimônio literário e das produções cinematográficas
                  </option>
                  <option value="7. Narração de histórias e comunidades locais no turismo literário e cinematográfico">
                    7. Narração de histórias e comunidades locais no turismo literário e
                    cinematográfico
                  </option>
                  <option value="8. Governança e planeamento estratégico: colaboração das partes interessadas, mecanismos de financiamento, quadros regulamentares, governos locais, instituições culturais e conselhos de turismo">
                    8. Governança e planeamento estratégico: colaboração das partes interessadas,
                    mecanismos de financiamento, quadros regulamentares, governos locais,
                    instituições culturais e conselhos de turismo
                  </option>
                  <option value="9. Preservação do patrimônio literário e cultural e da autenticidade">
                    9. Preservação do patrimônio literário e cultural e da autenticidade
                  </option>
                  <option value="10. Desenvolvimento de projetos em zonas rurais">
                    10. Desenvolvimento de projetos em zonas rurais
                  </option>
                  <option value="11. Percepções das comunidades locais sobre o turismo literário e cinematográfico">
                    11. Percepções das comunidades locais sobre o turismo literário e
                    cinematográfico
                  </option>
                  <option value="12. Interfaces turístico-pedagógicas">
                    12. Interfaces turístico-pedagógicas
                  </option>
                  <option value="13. Representação cinematográfica/literária das comunidades locais">
                    13. Representação cinematográfica/literária das comunidades locais
                  </option>
                  <option value="14. Paisagens literárias e representações fílmicas como catalisadores de identificação regional">
                    14. Paisagens literárias e representações fílmicas como catalisadores de
                    identificação regional
                  </option>
                  <option value="15. O papel dos autores literários, dos cineastas e das comunidades locais na formação das experiências turísticas">
                    15. O papel dos autores literários, dos cineastas e das comunidades locais na
                    formação das experiências turísticas
                  </option>
                  <option value="16. Roteiros e rotas/passeios literários e cinematográficos">
                    16. Roteiros e rotas/passeios literários e cinematográficos
                  </option>
                  <option value="17. Inovação, tendências e propostas">
                    17. Inovação, tendências e propostas
                  </option>
                </select>
                {fieldErrors.track && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.track}</p>
                )}
              </div>

              <div>
                <label htmlFor="language" className="block font-semibold mb-2">
                  {t("call.language")} *
                </label>
                <select
                  id="language"
                  required
                  value="pt"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100"
                  disabled
                >
                  <option value="pt">Português</option>
                </select>
              </div>

              <div>
                <label htmlFor="authors" className="block font-semibold mb-2">
                  Autores *
                </label>
                <textarea
                  id="authors"
                  required
                  rows={3}
                  value={formData.authors}
                  onChange={(e) => {
                    setFormData({ ...formData, authors: e.target.value });
                    if (fieldErrors.authors) {
                      setFieldErrors({ ...fieldErrors, authors: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.authors ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Liste todos os autores do trabalho (apenas nomes completos)"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Exemplo: João Silva, Maria Santos, Pedro Oliveira
                </div>
                {fieldErrors.authors && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.authors}</p>
                )}
              </div>

              <div>
                <label htmlFor="affiliation" className="block font-semibold mb-2">
                  {t("call.affiliation")} *
                </label>
                <input
                  type="text"
                  id="affiliation"
                  required
                  value={formData.affiliation}
                  onChange={(e) => {
                    setFormData({ ...formData, affiliation: e.target.value });
                    if (fieldErrors.affiliation) {
                      setFieldErrors({ ...fieldErrors, affiliation: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.affiliation ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.affiliation && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.affiliation}</p>
                )}
              </div>

              <div>
                <label htmlFor="degree" className="block font-semibold mb-2">
                  {t("call.degree")} *
                </label>
                <input
                  type="text"
                  id="degree"
                  required
                  value={formData.degree}
                  onChange={(e) => {
                    setFormData({ ...formData, degree: e.target.value });
                    if (fieldErrors.degree) {
                      setFieldErrors({ ...fieldErrors, degree: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.degree ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.degree && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.degree}</p>
                )}
              </div>

              <div>
                <label htmlFor="abstract" className="block font-semibold mb-2">
                  {t("call.abstract")} * (máximo 300 palavras ou 2000 caracteres)
                </label>
                <textarea
                  id="abstract"
                  required
                  rows={6}
                  maxLength={2000}
                  value={formData.abstract}
                  onChange={(e) => {
                    setFormData({ ...formData, abstract: e.target.value });
                    if (fieldErrors.abstract) {
                      setFieldErrors({ ...fieldErrors, abstract: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.abstract ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Resumo geral do trabalho (objetivos, metodologia, resultados e conclusões)"
                />
                <div className="text-sm mt-1 flex justify-between">
                  <span
                    className={
                      countWords(formData.abstract) > 300
                        ? "text-red-600 font-semibold"
                        : "text-gray-500"
                    }
                  >
                    {countWords(formData.abstract)}/300 palavras
                  </span>
                  <span
                    className={
                      formData.abstract.length > 2000
                        ? "text-red-600 font-semibold"
                        : formData.abstract.length > 1800
                          ? "text-yellow-600"
                          : "text-gray-400"
                    }
                  >
                    {formData.abstract.length}/2000 caracteres
                  </span>
                </div>
                {countWords(formData.abstract) > 300 && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ O resumo excede o limite de 300 palavras
                  </p>
                )}
                {formData.abstract.length > 2000 && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ O resumo excede o limite de 2000 caracteres
                  </p>
                )}
                {fieldErrors.abstract && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.abstract}</p>
                )}
              </div>

              <div>
                <label htmlFor="references" className="block font-semibold mb-2">
                  {t("call.references")} *
                </label>
                <textarea
                  id="references"
                  required
                  rows={4}
                  placeholder={t("call.referencesPlaceholder")}
                  value={formData.references}
                  onChange={(e) => {
                    setFormData({ ...formData, references: e.target.value });
                    if (fieldErrors.references) {
                      setFieldErrors({ ...fieldErrors, references: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.references ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                {fieldErrors.references && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.references}</p>
                )}
              </div>

              <div>
                <label htmlFor="keywords" className="block font-semibold mb-2">
                  {t("call.keywords")} * (3 a 5 palavras-chave)
                </label>
                <input
                  type="text"
                  id="keywords"
                  required
                  placeholder={t("call.keywordsPlaceholder")}
                  value={formData.keywords}
                  onChange={(e) => {
                    setFormData({ ...formData, keywords: e.target.value });
                    if (fieldErrors.keywords) {
                      setFieldErrors({ ...fieldErrors, keywords: "" });
                    }
                  }}
                  className={`w-full border rounded-lg p-3 ${
                    fieldErrors.keywords ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {parseKeywords(formData.keywords).length} palavras-chave informadas (mínimo 3,
                  máximo 5)
                </div>
                {fieldErrors.keywords && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.keywords}</p>
                )}
              </div>

              <div>
                <label htmlFor="support" className="block font-semibold mb-2">
                  {t("call.support")}
                </label>
                <input
                  type="text"
                  id="support"
                  placeholder={t("call.supportPlaceholder")}
                  value={formData.support}
                  onChange={(e) => setFormData({ ...formData, support: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md disabled:opacity-50"
              >
                {submitStatus === "loading" ? t("call.submitting") : t("call.submit")}
              </button>

              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-base text-yellow-900 font-medium">
                  Atenção: Assim que o envio for concluído, você receberá uma cópia da sua submissão
                  no e-mail informado. Fique atento à sua caixa de entrada e à pasta de spam. Caso
                  não receba o e-mail, entre em contato com nossa equipe.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
