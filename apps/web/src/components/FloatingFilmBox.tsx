import { useEffect, useState } from "react";

// Build timestamp: 2025-01-15 - Force rebuild for card position update
export default function FloatingFilmBox() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Função ULTRA AGRESSIVA para remover QUALQUER card antigo
    const removeOldCards = () => {
      // Remove TODOS os elementos que possam ser o card antigo
      const selectors = [
        'img[src="/film-camera.svg"]',
        'img[src*="film-camera"]',
        '[aria-label*="Decorative film camera"]',
        '[aria-label*="film camera"]',
        '[class*="top-1/2"][class*="left-4"]',
        '[class*="hero-overlay"]',
        '[class*="animate-float-center"]',
        '[role="presentation"][class*="absolute"][class*="top-1/2"]',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          // Se não é o novo card, remove
          if (!element.id?.includes("floter-online-card")) {
            // Remove o elemento e seu container
            const container =
              element.closest('[role="presentation"]') ||
              element.closest('[class*="absolute"]') ||
              element.closest('[class*="fixed"]') ||
              element.parentElement;

            if (container && !container.id?.includes("floter-online-card")) {
              container.remove();
            } else if (!element.id?.includes("floter-online-card")) {
              element.remove();
            }
          }
        });
      });

      // Remove qualquer div com as classes características do card antigo
      document.querySelectorAll('div[class*="absolute"]').forEach((div) => {
        const classes = div.className || "";
        const hasOldClasses =
          (classes.includes("top-1/2") && classes.includes("left-4")) ||
          classes.includes("hero-overlay") ||
          classes.includes("animate-float-center");

        const hasOldIcon = div.querySelector('img[src*="film-camera"]');
        const hasOldAriaLabel =
          div.getAttribute("aria-label")?.includes("film camera") ||
          div.getAttribute("aria-label")?.includes("Decorative");

        if (
          (hasOldClasses || hasOldIcon || hasOldAriaLabel) &&
          !div.id?.includes("floter-online-card")
        ) {
          div.remove();
        }
      });
    };

    // Remove ANTES de qualquer coisa
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", removeOldCards);
    } else {
      removeOldCards();
    }

    // Remove imediatamente
    removeOldCards();

    // Remove em múltiplos momentos
    const intervals = [10, 50, 100, 200, 500, 1000, 2000, 3000];
    const timers = intervals.map((delay) => setTimeout(removeOldCards, delay));

    // MutationObserver para remover cards antigos que aparecerem depois
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as Element;
            const hasOldIcon = element.querySelector?.('img[src*="film-camera"]');
            const classes = element.className || "";
            const hasOldClasses = classes.includes("top-1/2") && classes.includes("left-4");

            if ((hasOldIcon || hasOldClasses) && !element.id?.includes("floter-online-card")) {
              element.remove();
            }
          }
        });
      });
      removeOldCards();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Mostra o novo card
    const tVisible = setTimeout(() => setVisible(true), 100);

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

    const tDuplicates = setTimeout(removeDuplicates, 300);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(tVisible);
      clearTimeout(tDuplicates);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="floter-online-card"
      role="presentation"
      aria-label="online-card"
      style={{ zIndex: 1000 }}
      className={`fixed top-48 md:top-56 left-6 w-36 h-36 md:w-44 md:h-44 rounded-[20px] shadow-xl backdrop-blur-md overflow-hidden bg-gradient-to-br from-black/80 to-[rgba(160,82,45,0.9)] p-4 flex flex-col justify-center items-start gap-1 transform-gpu transition-all duration-400 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}`}
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
