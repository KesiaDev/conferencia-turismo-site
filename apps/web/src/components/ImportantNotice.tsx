const PRESENTATION_EMAIL = "litfilmtourismconferenceucs@gmail.com";

export default function ImportantNotice() {
  return (
    <div
      className="mb-8 w-full max-w-3xl mx-auto rounded-2xl shadow-xl border-2 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FFF8E7 0%, #F5E6D3 45%, #FFE9C8 100%)",
        borderColor: "#e0a085",
      }}
    >
      <div className="px-6 md:px-10 py-8 md:py-10 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="text-3xl md:text-4xl" aria-hidden>
            ✨
          </span>
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-[#5A3E00]">
            Estamos quase lá!
          </h3>
          <span className="text-3xl md:text-4xl" aria-hidden>
            🎬
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#7a5c2e] mb-8 max-w-xl mx-auto">
          Duas informações rápidas para você aproveitar o evento com tranquilidade.
        </p>

        <div className="space-y-6 text-left">
          <section
            className="rounded-xl border-2 p-5 md:p-6 shadow-md transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg"
            style={{
              borderColor: "#c8632d",
              background: "linear-gradient(180deg, #fffdfb 0%, #fff5eb 100%)",
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl bg-[#e0a085]/30"
                aria-hidden
              >
                👂
              </span>
              <div>
                <h4 className="font-bold text-lg text-[#8B4513] mb-1">Quer vir como ouvinte?</h4>
                <p className="text-[#5A3E00] leading-relaxed text-base md:text-lg">
                  Se você ainda está interessado em participar do nosso evento como{" "}
                  <strong>ouvinte</strong>, venha para a conferência no dia{" "}
                  <strong className="text-[#c8632d]">26 de março</strong>. Serão aceitas inscrições,
                  nessa modalidade, <strong>na hora</strong> — é só chegar!
                </p>
              </div>
            </div>
          </section>

          <section
            className="rounded-xl border-2 p-5 md:p-6 shadow-md transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg"
            style={{
              borderColor: "#8B6914",
              background: "linear-gradient(180deg, #fffefb 0%, #f8f4e8 100%)",
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl bg-[#d4a574]/35"
                aria-hidden
              >
                📎
              </span>
              <div>
                <h4 className="font-bold text-lg text-[#5A3E00] mb-1">
                  Você vai apresentar trabalho?
                </h4>
                <p className="text-[#5A3E00] leading-relaxed text-base md:text-lg mb-3">
                  Encaminhe para o e-mail{" "}
                  <a
                    href={`mailto:${PRESENTATION_EMAIL}`}
                    className="font-semibold text-[#c8632d] underline underline-offset-2 break-all hover:text-[#a34f24]"
                  >
                    {PRESENTATION_EMAIL}
                  </a>{" "}
                  a sua apresentação em <strong>PDF</strong> e <strong>PowerPoint</strong>. Assim,
                  você ajuda na <strong>otimização do tempo</strong> em uma{" "}
                  <strong>organização ainda melhor</strong> do evento — contamos com a sua
                  colaboração!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
