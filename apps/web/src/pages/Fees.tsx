import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
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
    apiService.getFees().then(setFees);
  }, []);

  return (
    <>
      <Seo title={t("nav.fees")} description={t("fees.description")} />

      <Hero title={t("fees.title")} height="medium" />

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <Alert type="info">
            <p className="font-semibold">{t("fees.notice")}</p>
          </Alert>
        </div>

        <FeeTable fees={fees} />

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

          <h3>{t("fees.payment")}</h3>
          <p>{t("fees.paymentInfo")}</p>
        </div>
      </Section>
    </>
  );
}

