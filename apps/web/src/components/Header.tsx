import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.keynotes"), href: "/keynotes" },
    { name: t("nav.program"), href: "/program" },
    { name: t("nav.thematicLines"), href: "/thematic-lines" },
    { name: t("nav.fees"), href: "/fees" },
    { name: t("nav.committees"), href: "/committees" },
    { name: t("nav.villaDeiTroni"), href: "/villa-dei-troni" },
    { name: t("nav.anais"), href: "/anais" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full bg-black ${
        isMenuOpen ? "h-auto" : "min-h-[72px] sm:min-h-[80px] lg:h-[90px]"
      } flex items-center ${isScrolled ? "shadow-2xl bg-black/95 backdrop-blur-md" : "shadow-lg"}`}
    >
      <nav
        className="relative w-full min-h-[inherit] flex flex-col lg:flex-row lg:items-center px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8"
        aria-label="Main navigation"
      >
        <div className="flex w-full items-center justify-between gap-3 min-h-[72px] sm:min-h-[80px] lg:min-h-[90px]">
          <div className="flex min-w-0 shrink items-center z-10">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              <img
                src="/logo.svg"
                alt="LITFILM 2026"
                className="h-9 sm:h-10 md:h-11 lg:h-14 w-auto max-w-[min(100%,180px)] logo-filter"
              />
            </Link>
          </div>

          {/* Desktop: uma linha — sem contador; scroll suave se viewport muito estreita */}
          <div className="hidden lg:flex flex-1 min-w-0 justify-center items-center px-1 xl:px-2 overflow-x-auto overflow-y-hidden">
            <div className="flex flex-nowrap justify-center items-center gap-x-2 xl:gap-x-4 2xl:gap-x-6 min-w-min">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-1 shrink-0 text-sm xl:text-[15px] 2xl:text-base font-medium text-gray-300 hover:text-[#D2B48C] transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                  {item.href === "/program" && (
                    <span className="badge-novo text-[9px] xl:text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                      Novo
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end shrink-0">
            <button
              className="lg:hidden p-2 text-white -mr-1 sm:-mr-0 z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              {...(isMenuOpen && { "aria-expanded": true })}
              aria-controls="mobile-menu"
              type="button"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden w-full border-t border-gray-800 bg-black/95 backdrop-blur-md max-h-[calc(100vh-72px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto"
            role="navigation"
            aria-label="Menu de navegação mobile"
          >
            <div className="px-4 py-5 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2 py-3 px-2 text-base text-gray-300 font-medium hover:text-[#e0a085] transition-colors border-b border-gray-800 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {item.href === "/program" && (
                    <span className="badge-novo text-xs font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Novo
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
