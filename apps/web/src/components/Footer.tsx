import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 py-12 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.about")}</h3>
            <p className="text-sm leading-relaxed">{t("footer.aboutText")}</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/keynotes" className="hover:text-white transition-colors">
                  {t("nav.keynotes")}
                </Link>
              </li>
              <li>
                <Link to="/program" className="hover:text-white transition-colors">
                  {t("nav.program")}
                </Link>
              </li>
              <li>
                <Link to="/call" className="hover:text-white transition-colors">
                  {t("nav.call")}
                </Link>
              </li>
              <li>
                <Link to="/fees" className="hover:text-white transition-colors">
                  {t("nav.fees")}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors">
                  ♿ Acessibilidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t("footer.contact")}</h3>
            <p className="text-sm leading-relaxed">
              Universidade de Caxias do Sul
              <br />
              Caxias do Sul/RS, Brasil
              <br />
              <a
                href="mailto:litfilmtourismconferenceucs@gmail.com"
                className="hover:text-white transition-colors"
                rel="noopener noreferrer"
              >
                litfilmtourismconferenceucs@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Logo do rodapé - Fora do container para poder ter 1000px */}
      <div className="border-t border-gray-800 mt-8 pt-8">
        <div className="flex justify-center mb-8 py-6 px-4">
          <img
            src="/footer-logo.svg"
            alt="Logo da Conferência"
            className="footer-logo"
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              console.log("[Footer] Logo carregada:", {
                src: img.src,
                width: img.naturalWidth,
                height: img.naturalHeight,
                computedWidth: window.getComputedStyle(img).width,
                computedHeight: window.getComputedStyle(img).height,
              });
            }}
            onError={(e) => {
              console.error("[Footer] Erro ao carregar logo:", {
                src: (e.target as HTMLImageElement).src,
              });
            }}
          />
        </div>

        {/* Copyright */}
        <div className="container-custom">
          <div className="text-sm text-center">
            <p>
              © {currentYear} III Conferência Internacional de Turismo Literário e Cinematográfico.{" "}
              {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
