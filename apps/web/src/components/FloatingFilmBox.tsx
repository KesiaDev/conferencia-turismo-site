import React, { useEffect, useState } from "react";

const STROKE = "#E8A37B";

export default function FloatingFilmBox(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);

    // Remove cartões duplicados automaticamente
    const id = "floter-online-card";
    const nodes = document.querySelectorAll(`#${id}`);
    if (nodes.length > 1) {
      nodes.forEach((n, i) => {
        if (i < nodes.length - 1) n.remove();
      });
    }

    return () => clearTimeout(t);
  }, []);

  return (
    <div
      id="floter-online-card"
      role="presentation"
      aria-label="online-card"
      style={{ zIndex: 1000 }}
      className={`fixed top-6 left-6 w-36 h-36 md:w-44 md:h-44 rounded-[20px] shadow-xl backdrop-blur-md 
         overflow-hidden transform-gpu transition-all duration-400 will-change-transform
         ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}`}
    >
      <div
        className="w-full h-full p-4 flex flex-col justify-center items-start gap-1
                      rounded-[20px] bg-gradient-to-br from-black/80 to-[rgba(160,82,45,0.9)]"
      >
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="w-6 h-6"
          >
            <rect x="2" y="6" width="14" height="12" rx="2" stroke={STROKE} strokeWidth="1.5" />
            <circle cx="9" cy="12" r="2.5" stroke={STROKE} strokeWidth="1.5" />
            <path d="M18 8v8l4-4z" fill={STROKE} />
          </svg>

          <span className="text-white text-[24px] font-semibold lowercase leading-none">
            online
          </span>
        </div>

        <div className="mt-1 text-[12px] md:text-[14px] text-[#E8A37B] leading-tight">
          nova modalidade de participação para pesquisadores estrangeiros
        </div>

        <svg className="mt-1 w-16 h-4" viewBox="0 0 100 20" fill="none" aria-hidden="true">
          <path
            d="M2 10 C20 2, 60 18, 98 10"
            stroke={STROKE}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
