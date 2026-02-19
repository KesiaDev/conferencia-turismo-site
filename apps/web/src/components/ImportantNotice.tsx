export default function ImportantNotice() {
  return (
    <div
      className="mb-5 w-full"
      style={{
        background: "#FFF3CD",
        border: "1px solid #FFDD99",
        padding: "16px",
        borderRadius: "6px",
        color: "#5A3E00",
        display: "block",
        visibility: "visible",
        opacity: 1,
      }}
    >
      <h3 className="font-bold mb-3 text-lg" style={{ color: "#5A3E00" }}>
        ATENÇÃO
      </h3>
      <p className="leading-relaxed" style={{ color: "#5A3E00" }}>
        O evento está se aproximando. Faça sua inscrição e lembre-se de realizar o pagamento para
        garantir sua participação.
      </p>
    </div>
  );
}
