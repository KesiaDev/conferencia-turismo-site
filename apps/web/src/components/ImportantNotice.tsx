import { Link } from "react-router-dom";

const PRESENTATION_EMAIL = "litfilmtourismconferenceucs@gmail.com";

const LISTENER_REGISTRATION_URL =
  "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-comunidade-em-geral-ext038806";

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
          Informações importantes para você aproveitar o evento com tranquilidade.
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
                  nessa modalidade, <strong>na hora</strong> — é só chegar! Também é possível{" "}
                  <a
                    href={LISTENER_REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#c8632d] underline underline-offset-2 break-all hover:text-[#a34f24]"
                  >
                    fazer a inscrição pelo formulário online da UCS
                  </a>
                  .
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
                  você ajuda na <strong>otimização do tempo</strong> e na{" "}
                  <strong>melhor organização</strong> do evento — contamos com a sua colaboração!
                </p>
              </div>
            </div>
          </section>

          {/* Seção de compartilhar fotos */}
          <section
            className="rounded-xl border-2 p-5 md:p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
            style={{
              borderColor: "#8b4513",
              background: "linear-gradient(135deg, #fff9f5 0%, #ffe8d6 50%, #ffd4b8 100%)",
            }}
          >
            {/* Emojis flutuantes decorativos */}
            <div
              className="absolute top-2 right-3 text-2xl animate-bounce"
              style={{ animationDelay: "0s" }}
            >
              📸
            </div>
            <div
              className="absolute top-3 right-14 text-lg animate-bounce"
              style={{ animationDelay: "0.3s" }}
            >
              ✨
            </div>
            <div
              className="absolute bottom-2 right-6 text-xl animate-bounce"
              style={{ animationDelay: "0.6s" }}
            >
              🎬
            </div>

            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl bg-[#8b4513]/20"
                aria-hidden
              >
                💫
              </span>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-[#8b4513] mb-2">
                  Venha fazer parte dessa história!
                </h4>
                <p className="text-[#5A3E00] leading-relaxed text-base md:text-lg mb-3">
                  <strong className="text-[#8b4513]">Compartilhe seu olhar</strong> sobre esses dias
                  incríveis! Cada foto carrega uma história —{" "}
                  <strong className="text-[#c8632d]">queremos ver a sua</strong>. Suas memórias
                  ajudam a construir a história desse evento especial.
                </p>
                <Link
                  to="/enviar-fotos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white font-semibold rounded-full hover:from-[#6b3410] hover:to-[#8b4513] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>📤</span>
                  <span>Enviar minhas fotos</span>
                  <span>🎉</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
