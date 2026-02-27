import { Link } from "react-router-dom";

export default function ImportantNotice() {
  return (
    <div
      className="mb-8 w-full text-center py-8 px-6 md:px-10 rounded-2xl shadow-xl border-2 max-w-2xl mx-auto"
      style={{
        background: "linear-gradient(135deg, #FFF8E7 0%, #FFE9B8 100%)",
        borderColor: "#e0a085",
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-3xl">⚠️</span>
        <h3 className="font-bold text-xl sm:text-2xl tracking-wide text-[#5A3E00]">ATENÇÃO</h3>
      </div>

      <p className="leading-relaxed text-base sm:text-lg text-[#5A3E00] mb-3">
        O evento está se aproximando.
        <br />
        Faça sua inscrição para garantir sua participação.
      </p>

      <p className="text-base sm:text-lg text-[#5A3E00] mb-6 font-semibold bg-white/50 py-2 px-4 rounded-lg inline-block">
        Importante: todos os autores devem realizar o pagamento da inscrição até{" "}
        <strong>23 de março</strong>.
      </p>

      <div>
        <Link
          to="/fees"
          className="inline-block bg-[#c8632d] hover:bg-[#b55525] text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          Fazer inscrição
        </Link>
      </div>
    </div>
  );
}
