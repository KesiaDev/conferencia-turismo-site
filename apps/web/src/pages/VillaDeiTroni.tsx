import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";

// Parâmetro ?date= pode pré-selecionar o dia 28/03 (se o sistema suportar)
const TICKET_URL = "https://ingresso.villadeitroni.com/produto/vitrine/ingressos?date=2026-03-28";
const VILLA_URL = "https://www.villadeitroni.com/";

export default function VillaDeiTroni() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("villaDeiTroni.title")} description={t("villaDeiTroni.description")} />

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
          </div>

          {/* Informações práticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-primary mb-3">
                {t("villaDeiTroni.hours")}
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>{t("villaDeiTroni.tourHoursTitle")}:</strong>{" "}
                {t("villaDeiTroni.tourHoursText")}
              </p>
              <p className="text-gray-600 text-sm">{t("villaDeiTroni.hoursText")}</p>
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
