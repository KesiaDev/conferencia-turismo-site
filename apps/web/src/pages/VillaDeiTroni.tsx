import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";

// Parâmetro ?date= pode pré-selecionar o dia 28/03 (se o sistema suportar)
const TICKET_URL = "https://ingresso.villadeitroni.com/produto/vitrine/ingressos?date=2026-03-28";
const VILLA_URL = "https://www.villadeitroni.com/";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/J1YzaC7tEIQEKlDFHKg5s1";

export default function VillaDeiTroni() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("villaDeiTroni.title")} description={t("villaDeiTroni.description")} />

      <div className="w-full aspect-[16/5]">
        <OptimizedImage
          src="/banner-villa-dei-troni.gif"
          alt="Banner Villa Dei Troni - Tour de encerramento da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="py-8 bg-[#e0a085] border-t-0 shadow-none">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("villaDeiTroni.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Tá sabedo? - Tour no encerramento */}
          <div className="bg-primary/5 border-l-4 border-[#e0a085] p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <span className="text-3xl" role="img" aria-hidden>
                🎬
              </span>
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">
                  {t("villaDeiTroni.didYouKnow")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{t("villaDeiTroni.closingTour")}</p>
              </div>
            </div>
          </div>

          {/* Logo e nome */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="/logos/villa-dei-troni.png"
              alt="Villa Dei Troni"
              className="h-24 md:h-32 object-contain mb-4"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <h2 className="text-2xl md:text-3xl font-serif text-primary font-semibold">
              VILLA DEI TRONI
            </h2>
          </div>

          {/* Imagem do parque - adicione em public/logos/villa-dei-troni-parque.jpg */}
          <div className="rounded-lg overflow-hidden shadow-xl mb-8 villa-parque-img">
            <img
              src="/logos/villa-dei-troni-parque.jpg"
              alt="Vista do Parque Villa Dei Troni"
              className="w-full h-auto object-cover max-h-[400px]"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement?.classList.add("hidden");
              }}
            />
          </div>

          {/* Descrição do parque */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">{t("villaDeiTroni.parkDescription")}</p>
            <p className="text-gray-700 leading-relaxed">{t("villaDeiTroni.parkDescription2")}</p>
          </div>

          {/* Vagas limitadas + CTA */}
          <div className="bg-gray-50 p-8 rounded-xl text-center mb-10">
            <div className="inline-block bg-[#e0a085]/20 text-primary font-bold px-4 py-2 rounded-lg mb-4">
              {t("villaDeiTroni.tourDate")}
            </div>
            <p className="text-lg font-semibold text-primary mb-2">
              {t("villaDeiTroni.limitedSpots")}
            </p>
            <p className="text-gray-700 mb-6">{t("villaDeiTroni.ctaText")}</p>
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#e0a085] hover:bg-[#d09075] text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              {t("villaDeiTroni.buyTickets")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* Grupo WhatsApp */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-700 mb-4">{t("villaDeiTroni.whatsappGroupText")}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("villaDeiTroni.joinWhatsAppGroup")}
                </a>
                <img
                  src="/qr-villa-dei-troni-whatsapp.jpeg"
                  alt="QR Code para entrar no grupo do WhatsApp - Tour guiado Villa Dei Troni"
                  className="w-28 h-28 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <p className="text-gray-500 text-sm mt-3">{t("villaDeiTroni.qrCodeHint")}</p>
            </div>
          </div>

          {/* Informações práticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary mb-3">
                {t("villaDeiTroni.hours")}
              </h3>
              <p className="text-gray-700">
                <strong>{t("villaDeiTroni.tourHoursTitle")}:</strong>{" "}
                {t("villaDeiTroni.tourHoursText")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary mb-3">
                {t("villaDeiTroni.address")}
              </h3>
              <p className="text-gray-700">
                R. José Fabro, 1661 - Ana Rech, Caxias do Sul - RS, 95062-200
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=-29.105226,-51.0950669"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e0a085] hover:underline font-medium mt-2 inline-block"
              >
                {t("villaDeiTroni.openInMaps")}
              </a>
            </div>
          </div>

          {/* Links externos */}
          <div className="text-center text-sm text-gray-600">
            <a
              href={VILLA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e0a085] hover:underline"
            >
              www.villadeitroni.com
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
