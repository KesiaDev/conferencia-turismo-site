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
        AVISO IMPORTANTE
      </h3>
      <div className="leading-relaxed" style={{ color: "#5A3E00" }}>
        <p className="mb-2">
          <strong>Atenção</strong>
        </p>
        <p className="mb-2">
          Devido à instabilidade enfrentada em nosso sistema, algumas submissões não foram
          recebidas.
        </p>
        <p>
          Se você submeteu um trabalho e não recebeu o e-mail de confirmação, por favor, entre em
          contato conosco pelo e-mail oficial do evento.
        </p>
      </div>
    </div>
  );
}
