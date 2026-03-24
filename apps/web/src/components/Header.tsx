import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function CountdownBlocks({
  timeLeft,
  compact,
}: {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  compact: boolean;
}) {
  const units = compact
    ? [
        { value: timeLeft.days, label: "DIAS" },
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
      ]
    : [
        { value: timeLeft.days, label: "DIAS" },
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEG" },
      ];

  return (
    <>
      {units.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col items-center shrink-0 ${
            compact ? "w-[34px] sm:w-[38px]" : "w-[40px] sm:w-[44px] lg:w-[46px]"
          }`}
        >
          <div
            className={`bg-[#e0a085] text-white font-bold rounded-md w-full text-center shadow-md ${
              compact
                ? "text-xs py-1"
                : "text-base sm:text-lg lg:text-xl py-1.5 sm:py-2 rounded-lg shadow-lg"
            }`}
          >
            {String(item.value).padStart(2, "0")}
          </div>
          <div
            className={`text-[#e0a085] font-semibold mt-0.5 sm:mt-1 whitespace-nowrap ${
              compact ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px] lg:text-[12px]"
            }`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    const targetDate = "2026-03-26T09:00:00";
    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diff = target.diff(now);

      if (diff > 0) {
        const d = dayjs.duration(diff);
        setTimeLeft({
          days: Math.floor(d.asDays()),
          hours: d.hours(),
          minutes: d.minutes(),
          seconds: d.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        className="relative w-full min-h-[inherit] flex flex-col lg:flex-row lg:items-center px-3 sm:px-4 md:px-6 lg:px-6 xl:px-10"
        aria-label="Main navigation"
      >
        {/* Linha principal: logo | (vazio em mobile) | contador + menu — evita sobreposição */}
        <div className="flex w-full items-center justify-between gap-2 min-h-[72px] sm:min-h-[80px] lg:min-h-[90px]">
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

          {/* Desktop: navegação central — min-w-0 permite encolher; links podem quebrar só em casos extremos */}
          <div className="hidden lg:flex flex-1 min-w-0 justify-center items-center px-2 xl:px-4">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 xl:gap-x-6 2xl:gap-x-10 max-w-[min(100%,56rem)]">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-1.5 text-sm xl:text-base 2xl:text-lg font-medium text-gray-300 hover:text-[#D2B48C] transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                  {item.href === "/program" && (
                    <span className="badge-novo text-[9px] xl:text-xs font-bold text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                      Novo
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Direita: contador (tablet/desktop estreito) + botão menu — nunca no mesmo absolute */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            {/* Tablet md–lg: contador compacto ao lado do menu (não sobrepõe links) */}
            <div
              className="hidden md:flex lg:hidden items-center gap-1.5 sm:gap-2"
              role="timer"
              aria-label="Contagem regressiva para a conferência"
            >
              <CountdownBlocks timeLeft={timeLeft} compact />
            </div>

            {/* Desktop lg+: contador completo */}
            <div
              className="hidden lg:flex items-center gap-2 xl:gap-3"
              role="timer"
              aria-label="Contagem regressiva para a conferência"
              aria-live="off"
            >
              <CountdownBlocks timeLeft={timeLeft} compact={false} />
            </div>

            <button
              className="lg:hidden p-2 text-white -mr-1 sm:-mr-0 z-10 shrink-0"
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

        {/* Mobile Menu */}
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

              <div
                className="pt-4 mt-4 pb-6 border-t border-gray-700 md:hidden"
                role="timer"
                aria-label="Contagem regressiva para a conferência"
              >
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {[
                    { value: timeLeft.days, label: "DIAS" },
                    { value: timeLeft.hours, label: "HRS" },
                    { value: timeLeft.minutes, label: "MIN" },
                    { value: timeLeft.seconds, label: "SEG" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center min-w-[52px] flex-1 max-w-[70px]"
                    >
                      <div className="bg-[#e0a085] text-white text-base sm:text-lg font-bold rounded-lg py-2 w-full text-center shadow-lg">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-[#e0a085] font-semibold mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
