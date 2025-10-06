import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import PanelForm from "../components/PanelForm";
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

  useEffect(() => {
    apiService.getCallInfo().then(setCallInfo);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      console.log("🚀 Enviando dados:", formData);
      const result = await apiService.submitAbstract(formData);
      console.log("✅ Resposta recebida:", result);
      setSubmitStatus("success");
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
    } catch (error) {
      console.error("❌ Erro no envio:", error);
      setSubmitStatus("error");
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
                      No campo "resumo", redija o texto em um único parágrafo, observando as partes
                      que devem compor o resumo:
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
                      separadas por vírgula.
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

            {submitStatus === "error" && (
              <Alert type="error">
                <strong>{t("call.errorTitle")}</strong>
                <p>{t("call.errorMessage")}</p>
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
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
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="track" className="block font-semibold mb-2">
                  {t("call.thematicTrack")} *
                </label>
                <select
                  id="track"
                  required
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
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
              </div>

              <div>
                <label htmlFor="language" className="block font-semibold mb-2">
                  {t("call.language")} *
                </label>
                <select
                  id="language"
                  required
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="pt">Português</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
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
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Liste todos os autores do trabalho (apenas nomes completos)"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Exemplo: João Silva, Maria Santos, Pedro Oliveira
                </div>
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
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
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
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="abstract" className="block font-semibold mb-2">
                  {t("call.abstract")} * (300 palavras)
                </label>
                <textarea
                  id="abstract"
                  required
                  rows={6}
                  value={formData.abstract}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 2000) {
                      setFormData({ ...formData, abstract: text });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Resumo geral do trabalho (máximo 2000 caracteres)"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.abstract.length}/2000 caracteres
                </div>
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
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="keywords" className="block font-semibold mb-2">
                  {t("call.keywords")} *
                </label>
                <input
                  type="text"
                  id="keywords"
                  required
                  placeholder={t("call.keywordsPlaceholder")}
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
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
            </form>
          </div>

          {/* Regras dos Painéis */}
          <div className="mt-12 bg-gradient-to-r from-[#e0a085]/10 to-white p-8 rounded-lg mb-8 border-l-4 border-[#e0a085] shadow-sm">
            <h4 className="text-xl font-bold mb-5 text-[#e0a085] flex items-center gap-2">
              <span className="text-2xl">👥</span>
              {t("call.panelTitle")}
            </h4>
            <div className="bg-white p-6 rounded-lg border border-[#e0a085]/20">
              <p className="text-base text-gray-700 leading-relaxed text-justify mb-4">
                {t("call.panelDescription")}
              </p>
              <div className="mt-4 pt-4 border-t border-[#e0a085]/20">
                <p className="text-sm font-semibold text-[#e0a085] mb-3">
                  📋 Informações necessárias:
                </p>
                <ul className="list-none space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Mínimo de 4 e máximo de 6 comunicações</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Duração máxima: 2 horas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Título do painel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Resumo de 300 palavras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Lista de 5 a 10 referências bibliográficas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#e0a085] font-bold">•</span>
                    <span>Lista dos autores e afiliações dos membros do painel</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Importante:</strong> Cada membro do painel deve fazer sua própria
                    inscrição.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Painéis */}
          <div className="mt-8">
            <PanelForm />
          </div>
        </div>
      </Section>
    </>
  );
}
