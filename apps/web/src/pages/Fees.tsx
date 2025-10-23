import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import FeeTable from "../components/FeeTable";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { FeeCategory } from "../types";

export default function Fees() {
  const { t } = useTranslation();
  const [fees, setFees] = useState<FeeCategory[]>([]);

  useEffect(() => {
    apiService
      .getFees()
      .then(setFees)
      .catch(() => {
        // Fallback com dados estáticos se a API falhar
        const staticFees: FeeCategory[] = [
          {
            category: "Estudante de Graduação",
            windows: [
              { label: "Early Bird", value: 150.0 },
              { label: "Regular", value: 200.0 },
              { label: "Late", value: 250.0 },
            ],
          },
          {
            category: "Estudante de Pós-Graduação",
            windows: [
              { label: "Early Bird", value: 200.0 },
              { label: "Regular", value: 250.0 },
              { label: "Late", value: 300.0 },
            ],
          },
          {
            category: "Profissional",
            windows: [
              { label: "Early Bird", value: 300.0 },
              { label: "Regular", value: 400.0 },
              { label: "Late", value: 500.0 },
            ],
          },
          {
            category: "Professor/Pesquisador",
            windows: [
              { label: "Early Bird", value: 250.0 },
              { label: "Regular", value: 300.0 },
              { label: "Late", value: 350.0 },
            ],
          },
        ];
        setFees(staticFees);
      });
  }, []);

  return (
    <>
      <Seo title={t("nav.fees")} description={t("fees.description")} />

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
            {t("fees.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <Alert type="info">
            <p className="font-semibold">{t("fees.notice")}</p>
          </Alert>
        </div>

        {/* Destaque: Formas de Pagamento */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-[#e0a085] via-[#e8a98f] to-[#f4c490] rounded-2xl shadow-2xl overflow-hidden">
            {/* Efeito de brilho no canto */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/10 rounded-full blur-3xl -mr-16 sm:-mr-24 md:-mr-32 -mt-16 sm:-mt-24 md:-mt-32"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-white/10 rounded-full blur-3xl -ml-12 sm:-ml-18 md:-ml-24 -mb-12 sm:-mb-18 md:-mb-24"></div>
          </div>
        </div>

        <FeeTable fees={fees} />

        {/* PAYMENT SECTION COMPLETELY REMOVED - UCS LINKS WORKING */}

        <div className="mt-12 max-w-4xl mx-auto prose prose-lg">
          <h3>{t("fees.included")}</h3>
          <ul>
            <li>{t("fees.includedItem1")}</li>
            <li>{t("fees.includedItem2")}</li>
            <li>{t("fees.includedItem3")}</li>
            <li>{t("fees.includedItem4")}</li>
            <li>{t("fees.includedItem5")}</li>
          </ul>

          <h3>{t("fees.notIncluded")}</h3>
          <ul>
            <li>{t("fees.notIncludedItem1")}</li>
            <li>{t("fees.notIncludedItem2")}</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
