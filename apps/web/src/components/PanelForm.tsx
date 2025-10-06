import { useState } from "react";
import { useTranslation } from "react-i18next";
import apiService from "../api/client";

interface PanelFormData {
  coordinatorName: string;
  coordinatorEmail: string;
  panelTitle: string;
  track: string;
  language: string;
  panelAbstract: string;
  references: string;
  summaries: Array<{
    title: string;
    authors: string;
    abstract: string;
    affiliation: string;
    degree: string;
  }>;
}

export default function PanelForm() {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const [formData, setFormData] = useState<PanelFormData>({
    coordinatorName: "",
    coordinatorEmail: "",
    panelTitle: "",
    track: "",
    language: "pt",
    panelAbstract: "",
    references: "",
    summaries: [
      { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
      { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
      { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
      { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
    ],
  });

  const handleSummaryChange = (index: number, field: string, value: string) => {
    const newSummaries = [...formData.summaries];
    newSummaries[index] = { ...newSummaries[index], [field]: value };
    setFormData({ ...formData, summaries: newSummaries });
  };

  const addSummary = () => {
    if (formData.summaries.length < 6) {
      setFormData({
        ...formData,
        summaries: [
          ...formData.summaries,
          { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
        ],
      });
    }
  };

  const removeSummary = (index: number) => {
    if (formData.summaries.length > 4) {
      const newSummaries = formData.summaries.filter((_, i) => i !== index);
      setFormData({ ...formData, summaries: newSummaries });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      console.log("🚀 Enviando dados do painel:", formData);
      const response = await apiService.submitPanel(formData);
      console.log("✅ Painel enviado com sucesso:", response);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        coordinatorName: "",
        coordinatorEmail: "",
        panelTitle: "",
        track: "",
        language: "pt",
        panelAbstract: "",
        references: "",
        summaries: [
          { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
          { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
          { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
          { title: "", authors: "", abstract: "", affiliation: "", degree: "" },
        ],
      });
    } catch (error) {
      console.error("❌ Erro no envio do painel:", error);
      setSubmitStatus("error");
    }
  };

  const tracks = [
    "1. Envolvimento da comunidade local no turismo literário e cinematográfico",
    "2. O papel das Film Commissions",
    "3. Turismo Literário/Cinematográfico e Economia Criativa",
    "4. A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento",
    "5. O turismo literário e cinematográfico como instrumento de desenvolvimento territorial sustentável",
    "6. Património cultural e turismo literário e cinematográfico",
    "7. Tecnologias digitais e turismo literário e cinematográfico",
    "8. Marketing e comunicação do turismo literário e cinematográfico",
    "9. Experiências de turismo literário e cinematográfico",
    "10. Políticas públicas para o turismo literário e cinematográfico",
    "11. Formação e capacitação no turismo literário e cinematográfico",
    "12. Turismo literário e cinematográfico e sustentabilidade",
    "13. Turismo literário e cinematográfico e inclusão social",
    "14. Turismo literário e cinematográfico e inovação",
    "15. Turismo literário e cinematográfico e cooperação internacional",
    "16. Turismo literário e cinematográfico e qualidade de vida",
    "17. Inovação, tendências e propostas",
  ];

  return (
    <div className="bg-white border-2 border-[#e0a085] rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">Formulário de Proposta de Painel</h2>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <strong className="text-green-800">Proposta de Painel enviada com sucesso!</strong>
          <p className="text-green-700">
            Sua proposta foi recebida. Você receberá uma cópia por e-mail com os documentos
            formatados e confirmação de recebimento.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <strong className="text-red-800">Erro no envio</strong>
          <p className="text-red-700">Ocorreu um erro ao enviar sua proposta. Tente novamente.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Coordenador */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="coordinatorName" className="block font-semibold mb-2">
              Nome completo do coordenador *
            </label>
            <input
              type="text"
              id="coordinatorName"
              required
              value={formData.coordinatorName}
              onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label htmlFor="coordinatorEmail" className="block font-semibold mb-2">
              E-mail do coordenador *
            </label>
            <input
              type="email"
              id="coordinatorEmail"
              required
              value={formData.coordinatorEmail}
              onChange={(e) => setFormData({ ...formData, coordinatorEmail: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
        </div>

        {/* Título do Painel */}
        <div>
          <label htmlFor="panelTitle" className="block font-semibold mb-2">
            Título do painel *
          </label>
          <input
            type="text"
            id="panelTitle"
            required
            value={formData.panelTitle}
            onChange={(e) => setFormData({ ...formData, panelTitle: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Linha Temática e Idioma */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="track" className="block font-semibold mb-2">
              Linha temática *
            </label>
            <select
              id="track"
              required
              value={formData.track}
              onChange={(e) => setFormData({ ...formData, track: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Selecione uma linha temática</option>
              {tracks.map((track, index) => (
                <option key={index} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block font-semibold mb-2">
              Idioma *
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
        </div>

        {/* Resumo do Painel */}
        <div>
          <label htmlFor="panelAbstract" className="block font-semibold mb-2">
            Resumo do painel (até 300 palavras) *
          </label>
          <textarea
            id="panelAbstract"
            required
            rows={6}
            value={formData.panelAbstract}
            onChange={(e) => {
              const text = e.target.value;
              if (text.length <= 2000) {
                setFormData({ ...formData, panelAbstract: text });
              }
            }}
            className="w-full border border-gray-300 rounded-lg p-3"
            placeholder="Resumo geral do painel (máximo 2000 caracteres)"
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.panelAbstract.length}/2000 caracteres
          </div>
        </div>

        {/* Referências */}
        <div>
          <label htmlFor="references" className="block font-semibold mb-2">
            Referências bibliográficas (5 a 10 referências) *
          </label>
          <textarea
            id="references"
            required
            rows={5}
            value={formData.references}
            onChange={(e) => setFormData({ ...formData, references: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Resumos Individuais */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#e0a085]">
              Resumos das comunicações ({formData.summaries.length}/6)
            </h3>
          </div>

          {formData.summaries.map((summary, index) => (
            <div key={index}>
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-semibold text-gray-700">Comunicação {index + 1}</h4>
                  {formData.summaries.length > 4 && (
                    <button
                      type="button"
                      onClick={() => removeSummary(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Título da comunicação *</label>
                    <input
                      type="text"
                      required
                      value={summary.title}
                      onChange={(e) => handleSummaryChange(index, "title", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Autores *</label>
                      <textarea
                        required
                        rows={2}
                        value={summary.authors}
                        onChange={(e) => handleSummaryChange(index, "authors", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        placeholder="Liste todos os autores (apenas nomes completos)"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Afiliação *</label>
                      <input
                        type="text"
                        required
                        value={summary.affiliation}
                        onChange={(e) => handleSummaryChange(index, "affiliation", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Titulação *</label>
                    <input
                      type="text"
                      required
                      value={summary.degree}
                      onChange={(e) => handleSummaryChange(index, "degree", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Resumo (até 300 palavras) *</label>
                    <textarea
                      required
                      rows={4}
                      value={summary.abstract}
                      onChange={(e) => {
                        const text = e.target.value;
                        if (text.length <= 2000) {
                          handleSummaryChange(index, "abstract", text);
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg p-3"
                      placeholder="Resumo da comunicação (máximo 2000 caracteres)"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {summary.abstract.length}/2000 caracteres
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão para adicionar mais resumos após cada comunicação */}
              {index === formData.summaries.length - 1 && formData.summaries.length < 6 && (
                <div className="text-center mb-6">
                  <button
                    type="button"
                    onClick={addSummary}
                    className="bg-[#e0a085] text-white px-6 py-3 rounded-lg hover:bg-[#e0a085]/90 transition-colors font-medium"
                  >
                    + Adicionar Mais Resumo
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Mínimo 4, máximo 6 comunicações por painel
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="w-full bg-[#e0a085] hover:bg-[#d49070] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md disabled:opacity-50"
        >
          {submitStatus === "loading" ? "Enviando..." : "Enviar Proposta de Painel"}
        </button>
      </form>
    </div>
  );
}
