import { useEffect, useState } from "react";

export default function FloatingFilmBox() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Função AGressiva para remover QUALQUER card antigo
    const removeOldCards = () => {
      // Remove todos os cards com film-camera.svg
      document.querySelectorAll('img[src="/film-camera.svg"]').forEach((img) => {
        const container =
          img.closest('[role="presentation"]') ||
          img.closest('[class*="absolute"]') ||
          img.closest('[class*="fixed"]') ||
          img.parentElement;
        if (container) {
          container.remove();
        }
      });

      // Remove cards com aria-label antigo
      document
        .querySelectorAll('[aria-label*="Decorative film camera"], [aria-label*="film camera"]')
        .forEach((card) => {
          if (!card.id?.includes("floter-online-card")) {
            card.remove();
          }
        });

      // Remove cards com classes antigas
      document
        .querySelectorAll(
          '[class*="top-1/2"][class*="left-4"], [class*="hero-overlay"], [class*="animate-float-center"]'
        )
        .forEach((card) => {
          if (!card.id?.includes("floter-online-card")) {
            card.remove();
          }
        });

      // Remove qualquer elemento com z-index que pareça ser um card antigo
      document.querySelectorAll('[role="presentation"]').forEach((card) => {
        const hasOldIcon = card.querySelector('img[src*="film-camera"]');
        const hasOldClasses =
          card.className.includes("top-1/2") || card.className.includes("hero-overlay");
        if ((hasOldIcon || hasOldClasses) && !card.id?.includes("floter-online-card")) {
          card.remove();
        }
      });
    };

    // Remove imediatamente
    removeOldCards();

    // Remove após um delay para garantir
    const t1 = setTimeout(removeOldCards, 100);
    const t2 = setTimeout(removeOldCards, 500);
    const t3 = setTimeout(removeOldCards, 1000);

    // Mostra o novo card
    const tVisible = setTimeout(() => setVisible(true), 50);

    // Remove cartões duplicados do novo card
    const id = "floter-online-card";
    const removeDuplicates = () => {
      const nodes = document.querySelectorAll(`#${id}`);
      if (nodes.length > 1) {
        nodes.forEach((n, i) => {
          if (i < nodes.length - 1) n.remove();
        });
      }
    };

    const tDuplicates = setTimeout(removeDuplicates, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tVisible);
      clearTimeout(tDuplicates);
    };
  }, []);

  return (
    <div
      id="floter-online-card"
      role="presentation"
      aria-label="online-card"
      style={{ zIndex: 1000 }}
      className={`fixed top-6 left-6 w-36 h-36 md:w-44 md:h-44 rounded-[20px] shadow-xl backdrop-blur-md overflow-hidden bg-gradient-to-br from-black/80 to-[rgba(160,82,45,0.9)] p-4 flex flex-col justify-center items-start gap-1 transform-gpu transition-all duration-400 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}`}
    >
      <div className="flex flex-col gap-2">
        <span className="text-white text-[28px] md:text-[32px] font-bold animate-pulse-online">
          Online
        </span>

        <div className="text-[12px] md:text-[14px] text-[#E8A37B] leading-tight">
          Nova modalidade de participação para pesquisadores estrangeiros
        </div>
      </div>
    </div>
  );
}
