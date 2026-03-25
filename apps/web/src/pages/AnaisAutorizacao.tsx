import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import AuthorizationForm from "../components/authorization/AuthorizationForm";

export default function AnaisAutorizacao() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t("anais.authorizationSeoTitle")}
        description={t("anais.authorizationSeoDescription")}
      />

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
            {t("anais.authorizationBannerTitle")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-center mb-8">
            {t("anais.authorizationIntro")}
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-[#e0a085]">
            <AuthorizationForm />
          </div>
        </div>
      </Section>
    </>
  );
}
