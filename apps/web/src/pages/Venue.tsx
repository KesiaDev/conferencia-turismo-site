import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";

export default function Venue() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("nav.venue")} description={t("venue.description")} />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
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

            {/* Mapa do Google Maps */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">{t("venue.transportTitle")}</h2>

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

              <p className="text-gray-700 text-sm">{t("venue.transportText")}</p>
            </div>
          </div>

          {/* Informações de Hospedagem */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("venue.accommodationTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed">{t("venue.accommodationText")}</p>
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
