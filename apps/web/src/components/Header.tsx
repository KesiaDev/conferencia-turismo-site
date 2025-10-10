import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

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
    { name: t("nav.call"), href: "/call" },
    { name: t("nav.fees"), href: "/fees" },
    { name: t("nav.committees"), href: "/committees" },
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
        isMenuOpen ? "h-auto" : "h-[90px]"
      } flex items-center ${isScrolled ? "shadow-2xl bg-black/95 backdrop-blur-md" : "shadow-lg"}`}
    >
      <nav className="relative w-full h-full flex items-center" aria-label="Main navigation">
        {/* Logo clicável - responsivo */}
        <div className="absolute left-4 md:left-8 lg:left-20 z-10">
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
              className="h-10 sm:h-12 md:h-14 w-auto logo-filter"
            />
          </Link>
        </div>

        {/* Desktop Navigation - perfeitamente centralizado */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 transform -translate-x-1/2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-lg xl:text-xl font-medium text-gray-300 hover:text-[#D2B48C] transition-colors duration-200 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Contador regressivo - responsivo */}
        <div
          className="hidden md:flex lg:hidden items-center gap-2 absolute right-4"
          role="timer"
          aria-label="Contagem regressiva para a conferência"
        >
          {[
            { value: timeLeft.days, label: "DIAS" },
            { value: timeLeft.hours, label: "HRS" },
            { value: timeLeft.minutes, label: "MIN" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center w-[40px]">
              <div className="bg-[#e0a085] text-white text-sm font-bold rounded-md py-1 w-full text-center shadow-md">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-[#e0a085] font-semibold mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Desktop Contador regressivo - posicionado à direita */}
        <div
          className="hidden lg:flex items-center gap-3 absolute right-20"
          role="timer"
          aria-label="Contagem regressiva para a conferência"
          aria-live="off"
        >
          {[
            { value: timeLeft.days, label: "DIAS" },
            { value: timeLeft.hours, label: "HRS" },
            { value: timeLeft.minutes, label: "MIN" },
            { value: timeLeft.seconds, label: "SEG" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center w-[46px]">
              <div className="bg-[#e0a085] text-white text-xl font-bold rounded-lg py-2 w-full text-center shadow-lg">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[12px] text-[#e0a085] font-semibold mt-1.5 whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden absolute right-4 p-2 text-white z-10"
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
            {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Mobile Menu - melhorado */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800"
            role="navigation"
            aria-label="Menu de navegação mobile"
          >
            <div className="px-4 py-6 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-3 text-lg text-gray-300 font-medium hover:text-[#e0a085] transition-colors border-b border-gray-800 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Countdown */}
              <div
                className="pt-4 mt-4 border-t border-gray-700"
                role="timer"
                aria-label="Contagem regressiva para a conferência"
              >
                <div className="flex justify-center gap-3">
                  {[
                    { value: timeLeft.days, label: "DIAS" },
                    { value: timeLeft.hours, label: "HRS" },
                    { value: timeLeft.minutes, label: "MIN" },
                    { value: timeLeft.seconds, label: "SEG" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center w-[55px]">
                      <div className="bg-[#e0a085] text-white text-lg font-bold rounded-lg py-2 w-full text-center shadow-lg">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[11px] text-[#e0a085] font-semibold mt-1">
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
