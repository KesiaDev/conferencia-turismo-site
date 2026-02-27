import { Link } from "react-router-dom";

export default function ImportantNotice() {
  return (
    <div
      className="mb-5 w-full text-center py-5 px-6 rounded-xl shadow-lg border-2 max-w-2xl mx-auto"
      style={{
        background: "linear-gradient(135deg, #FFF3CD 0%, #FFE4A0 100%)",
        borderColor: "#e0a085",
        color: "#5A3E00",
      }}
    >
      <h3 className="font-bold mb-2 text-xl sm:text-2xl tracking-wide" style={{ color: "#5A3E00" }}>
        ⚠️ ATENÇÃO
      </h3>
      <p className="leading-relaxed text-base sm:text-lg mb-4" style={{ color: "#5A3E00" }}>
        O evento está se aproximando. Faça sua inscrição para garantir sua participação.
        <br />
        <strong>Importante:</strong> todos os autores devem realizar o pagamento da inscrição até 23
        de março.
      </p>
      <Link
        to="/fees"
        className="inline-block bg-[#c8632d] hover:bg-[#b55525] text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md"
      >
        Pagar inscrição
      </Link>
    </div>
  );
}
