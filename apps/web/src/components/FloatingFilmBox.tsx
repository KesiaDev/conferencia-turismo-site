import { useEffect } from "react";

export default function FloatingFilmBox() {
  useEffect(() => {
    // Remove eventuais duplicatas antigas
    document.querySelectorAll('[id="floter-online-card"]').forEach((el) => el.remove());

    // Remove elementos antigos por role/class que possam existir
    const oldSelectors = [
      '[role="presentation"][aria-label*="film camera"]',
      '[role="presentation"][aria-label*="Decorative"]',
      ".animate-float-center",
      ".animate-float",
    ];

    oldSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        // Só remove se não for o nosso novo card
        if (!el.id || el.id !== "floter-online-card") {
          el.remove();
        }
      });
    });
  }, []);

  return (
    <div
      id="floter-online-card"
      aria-label="online-card"
      role="presentation"
      className="fixed top-6 left-6 z-[1000] w-36 h-36 md:w-44 md:h-44 rounded-[20px] shadow-xl backdrop-blur-md overflow-hidden transform-gpu transition-all duration-400 will-change-transform"
    >
      <div className="w-full h-full bg-gradient-to-br from-black/80 to-[rgba(160,82,45,0.9)] p-4 flex flex-col justify-center items-start gap-1">
        <div className="flex items-center gap-2">
          {/* ícone minimalista de câmera */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="6" width="14" height="12" rx="2" stroke="#E8A37B" strokeWidth="1.5" />
            <circle cx="9" cy="12" r="2.5" stroke="#E8A37B" strokeWidth="1.5" />
            <path d="M18 8v8l4-4z" fill="#E8A37B" />
          </svg>
          <span className="text-2xl font-semibold tracking-tight text-white lowercase">online</span>
        </div>
        <div className="mt-1 text-xs md:text-sm text-[#E8A37B] leading-tight">
          nova modalidade de participação para pesquisadores estrangeiros
        </div>
        <svg className="mt-1 w-16 h-4" viewBox="0 0 100 20" fill="none" aria-hidden="true">
          <path
            d="M2 10 C20 2, 60 18, 98 10"
            stroke="#E8A37B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
