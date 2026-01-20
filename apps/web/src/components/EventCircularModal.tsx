import { useEffect, useState } from "react";

const STORAGE_KEY = "event_circular_acknowledged";

export default function EventCircularModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      // Pequeno delay para garantir que o DOM está pronto
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Bloquear scroll do body
        document.body.style.overflow = "hidden";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    // Salvar no localStorage
    localStorage.setItem(STORAGE_KEY, "true");
    // Fechar modal
    setIsOpen(false);
    // Restaurar scroll do body
    document.body.style.overflow = "";
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="circular-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-8 md:p-10"
        style={{
          backgroundColor: "#F5F0E8",
          border: "1px solid #D2B48C",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="circular-title"
          className="text-2xl md:text-3xl font-bold mb-6 text-center"
          style={{ color: "#654321" }}
        >
          Circular do Evento
        </h2>

        <h3
          className="text-xl md:text-2xl font-semibold mb-6 text-center"
          style={{ color: "#8B4513" }}
        >
          III Conferência Internacional de Turismo Literário e Cinematográfico
        </h3>

        <div
          className="text-base md:text-lg leading-relaxed space-y-4 mb-8"
          style={{ color: "#5A3E00" }}
        >
          <p>
            Finalizado o período de submissão de resumos e procedida a avaliação, seguem algumas
            orientações para a participação no Evento:
          </p>

          <p>
            Todos os autores do resumo proposto e aceito devem realizar a sua inscrição, respeitando
            a sua categoria. Para tal, acessar o site:
          </p>

          <p className="text-center">
            <a
              href="https://turismocinematografico.com.br/fees"
              className="font-semibold hover:underline"
              style={{ color: "#8B4513" }}
            >
              https://turismocinematografico.com.br/fees
            </a>
          </p>

          <p>
            Pelo menos um dos autores deverá estar presente para a apresentação do trabalho
            submetido — presencialmente para o público brasileiro, com possibilidade de participação
            on-line para autores estrangeiros.
          </p>

          <p>
            Para a inserção do resumo nos Anais, é obrigatória a apresentação do resumo no evento,
            observado o cronograma de apresentações que será disponibilizado mais próximo à data de
            realização.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAcknowledge}
            className="px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: "#8B4513",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#654321";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8B4513";
            }}
          >
            OK, estou ciente
          </button>
        </div>
      </div>
    </div>
  );
}
