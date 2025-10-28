import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import FeeTable from "../components/FeeTable";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import apiService from "../api/client";
import type { FeeCategory } from "../types";

export default function Fees() {
  const { t } = useTranslation();
  const [fees, setFees] = useState<FeeCategory[]>([]);

  // PAYMENT CARD REMOVED - NO MORE PIX OR OTHER METHODS - RAILWAY FORCE REBUILD - CLEAN BUILD

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
        <OptimizedImage
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
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

        <FeeTable fees={fees} />

        {/* PAYMENT CARD COMPLETELY REMOVED - NO MORE PIX OR OTHER PAYMENT METHODS */}

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
