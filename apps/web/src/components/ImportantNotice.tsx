import { Link } from "react-router-dom";

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
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className="text-3xl md:text-4xl animate-bounce"
            style={{ animationDelay: "0s" }}
            aria-hidden
          >
            📸
          </span>
          <h3 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-[#5A3E00]">
            Faça parte dessa história!
          </h3>
          <span
            className="text-3xl md:text-4xl animate-bounce"
            style={{ animationDelay: "0.3s" }}
            aria-hidden
          >
            🎬
          </span>
        </div>

        <div className="relative">
          {/* Emojis flutuantes decorativos */}
          <div
            className="absolute -top-2 right-4 md:right-10 text-2xl animate-bounce hidden sm:block"
            style={{ animationDelay: "0.5s" }}
          >
            ✨
          </div>
          <div
            className="absolute -top-1 left-4 md:left-10 text-xl animate-bounce hidden sm:block"
            style={{ animationDelay: "0.8s" }}
          >
            🌟
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[#5A3E00] mb-4 max-w-xl mx-auto leading-relaxed">
            <strong className="text-[#8b4513]">Compartilhe seu olhar</strong> sobre esses dias
            incríveis!
          </p>

          <p className="text-sm sm:text-base text-[#7a5c2e] mb-6 max-w-lg mx-auto">
            Cada foto carrega uma história —{" "}
            <strong className="text-[#c8632d]">queremos ver a sua</strong>. Suas memórias ajudam a
            construir a história desse evento especial.
          </p>

          <Link
            to="/enviar-fotos"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-[#8b4513] to-[#a0522d] text-white font-bold text-base md:text-lg rounded-full hover:from-[#6b3410] hover:to-[#8b4513] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">📤</span>
            <span>Enviar minhas fotos</span>
            <span className="text-xl">🎉</span>
          </Link>

          <p className="mt-4 text-sm text-[#8b4513]/70 flex items-center justify-center gap-2">
            <span>💫</span>
            <span>Após aprovação, sua foto aparecerá na galeria do evento!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
