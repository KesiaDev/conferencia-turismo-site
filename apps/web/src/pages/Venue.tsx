import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";

export default function Venue() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("nav.venue")} description={t("venue.description")} />

      <div className="w-full aspect-[16/5]">
        <OptimizedImage
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("venue.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Informações sobre a UCS */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">{t("venue.ucsTitle")}</h2>
              <p className="text-gray-700 leading-relaxed">{t("venue.ucsText")}</p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {t("venue.locationTitle")}
                </h3>
                <p className="text-gray-700">
                  <strong>Universidade de Caxias do Sul (UCS)</strong>
                  <br />
                  Rua Francisco Getúlio Vargas, 1130
                  <br />
                  Caxias do Sul - RS, 95070-560
                  <br />
                  Brasil
                </p>
              </div>
            </div>

            {/* Como Chegar */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">{t("venue.transportTitle")}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    {t("venue.transportOption1Title")}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t("venue.transportOption1Text")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    {t("venue.transportOption2Title")}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t("venue.transportOption2Text")}
                  </p>
                </div>
              </div>

              {/* Mapa integrado do Google Maps */}
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.1234567890!2d-51.1234567!3d-29.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sUniversidade%20de%20Caxias%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Universidade de Caxias do Sul"
                />
              </div>
            </div>
          </div>

          {/* Hotel Oficial - Blue Tree Towers */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("venue.accommodationTitle")}
            </h2>
            <h3 className="text-xl font-semibold text-primary mb-2">
              {t("venue.hotelTitle")} – Blue Tree Towers
            </h3>
            <p className="text-gray-600 font-medium mb-4">{t("venue.hotelIntro")}</p>
            <p className="text-gray-700 leading-relaxed mb-4">{t("venue.hotelText")}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{t("venue.hotelCta")}</p>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logomarca */}
              <div className="flex-shrink-0">
                <img
                  src="/logos/blue-tree-towers.png"
                  alt="Blue Tree Towers Caxias do Sul"
                  className="h-20 md:h-24 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Contato e WhatsApp */}
              <div className="flex-1 space-y-3">
                <p className="text-gray-700">
                  <strong>Blue Tree Towers Caxias do Sul</strong>
                  <br />
                  Rua Pinheiro Machado, 2867 • RS • Caxias do Sul • 95020-172
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href="mailto:reservas.caxiasdosul@bluetree.com.br"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span>✉</span> reservas.caxiasdosul@bluetree.com.br
                  </a>
                  <a
                    href="tel:+555432249000"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <span>📞</span> +55 (54) 3224-9000
                  </a>
                </div>
                <a
                  href="https://wa.me/555432249000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("venue.hotelWhatsapp")}
                </a>
              </div>
            </div>
          </div>

          {/* Informações adicionais de transporte */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  ✈️
                </div>
                <h3 className="font-semibold text-lg mb-2">Aeroporto</h3>
                <p className="text-gray-600 text-sm">
                  Aeroporto Hugo Cantergiani
                  <br />
                  Caxias do Sul - RS
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  🚌
                </div>
                <h3 className="font-semibold text-lg mb-2">Transporte Público</h3>
                <p className="text-gray-600 text-sm">
                  Linhas de ônibus conectam
                  <br />o centro à universidade
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  🚗
                </div>
                <h3 className="font-semibold text-lg mb-2">Estacionamento</h3>
                <p className="text-gray-600 text-sm">
                  Vagas disponíveis no
                  <br />
                  campus da universidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
