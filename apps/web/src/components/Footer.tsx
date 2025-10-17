import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 py-12 mt-20">
      <div className="container-custom">
        {/* Copyright section */}
        <div className="text-sm text-center mb-8">
          <p>
            © {currentYear} III Conferência Internacional de Turismo Literário e Cinematográfico.{" "}
            {t("footer.rights")}
          </p>
        </div>

        {/* Collaboration section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-6">
              um <span className="text-white font-semibold">COLLAB</span> orgulhosamente
              desenvolvido por
            </p>

            {/* Company logos */}
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {/* Nandi Dev Logo */}
              <div className="flex-shrink-0">
                <img
                  src="/nandi-dev-logo.svg"
                  alt="Nandi Dev - Web & App Developer"
                  className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Interação Logo */}
              <div className="flex-shrink-0">
                <img
                  src="/interacao-logo.svg"
                  alt="Interação - marketing • cultura • turismo"
                  className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
