import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";

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

          <div className="space-y-6">
            <div className="flex gap-3 items-start">
              <span className="text-2xl" role="img" aria-hidden>
                📌
              </span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{t("anais.publicationTitle")}</h3>
                <p className="text-gray-700">{t("anais.publicationText")}</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-2xl" role="img" aria-hidden>
                📌
              </span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{t("anais.statusTitle")}</h3>
                <p className="text-gray-700">{t("anais.statusText")}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
