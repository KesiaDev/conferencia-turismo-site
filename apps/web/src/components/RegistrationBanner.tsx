import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "registration-banner-dismissed";

export default function RegistrationBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  if (!isVisible) return null;

  return (
    <div
      className="relative z-30 flex items-center justify-between gap-4 px-4 py-2.5 text-white"
      style={{ backgroundColor: "#c8632d" }}
    >
      <div className="container-custom flex flex-1 flex-wrap items-center justify-center gap-2 sm:justify-between sm:gap-4">
        <p className="text-center text-sm font-medium sm:text-left">
          Garanta sua vaga — inscrições até 23 de março
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/fees"
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#c8632d] transition hover:bg-gray-100"
          >
            Pagar inscrição
          </Link>
          <button
            onClick={handleClose}
            className="rounded p-1 text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Fechar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
