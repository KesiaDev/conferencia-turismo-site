import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import PdfViewer from "../components/PdfViewer";

const ANAIS_PDF_URL = "/anais/anais-iii-conferencia-2026.pdf";

export default function Anais() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("anais.title")} description={t("anais.description")} />

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
            {t("anais.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-8">{t("anais.intro")}</p>

          <div className="bg-gradient-to-br from-[#fdf6f3] to-white rounded-2xl shadow-xl p-6 md:p-10 border-2 border-[#e0a085] mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#c47862] mb-3">
              {t("anais.downloadTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              {t("anais.downloadText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ANAIS_PDF_URL}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c47862] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#b56a52] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b4513] active:bg-[#a65d47] sm:text-lg"
              >
                <span aria-hidden className="text-lg leading-none">
                  ⬇
                </span>
                {t("anais.downloadCta")}
              </a>
              <a
                href="#anais-visualizacao"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#c47862] bg-white px-6 py-3.5 text-base font-semibold text-[#c47862] shadow-md transition hover:bg-[#fdf6f3] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b4513] sm:text-lg"
              >
                {t("anais.viewCta")}
                <span aria-hidden className="text-lg leading-none">
                  ↓
                </span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-[#e0a085] mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#e0a085]">{t("anais.criteriaTitle")}</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#e0a085] font-bold">1.</span>
                {t("anais.criteria1")}
              </li>
              <li className="flex gap-2">
                <span className="text-[#e0a085] font-bold">2.</span>
                {t("anais.criteria2")}
              </li>
              <li className="flex gap-2">
                <span className="text-[#e0a085] font-bold">3.</span>
                {t("anais.criteria3")}
              </li>
            </ul>
            <p className="mt-4 text-gray-700 font-semibold">{t("anais.importantNote")}</p>
          </div>

          <div id="anais-visualizacao" className="mt-12 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#e0a085] text-center">
              {t("anais.viewerTitle")}
            </h2>
            <PdfViewer src={ANAIS_PDF_URL} title={t("anais.title")} />
            <div className="mt-4 text-center">
              <a
                href={ANAIS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c47862] font-semibold underline hover:text-[#a65d47]"
              >
                {t("anais.viewerOpenNewTab")}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
