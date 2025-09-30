import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { Committees as CommitteesType } from "../types";

export default function Committees() {
  const { t } = useTranslation();
  const [committees, setCommittees] = useState<CommitteesType | null>(null);

  useEffect(() => {
    apiService.getCommittees().then(setCommittees);
  }, []);

  return (
    <>
      <Seo title={t("nav.committees")} description={t("committees.description")} />

      <Hero title={t("committees.title")} height="medium" />

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {t("committees.organizing")}
            </h2>
            <ul className="space-y-3">
              {committees?.organizing.map((member, i) => (
                <li key={i} className="text-lg bg-gray-50 p-4 rounded-lg">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {t("committees.executive")}
            </h2>
            <ul className="space-y-3">
              {committees?.executive.map((member, i) => (
                <li key={i} className="text-lg bg-gray-50 p-4 rounded-lg">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {t("committees.scientific")}
            </h2>
            <ul className="space-y-3">
              {committees?.scientific.map((member, i) => (
                <li key={i} className="text-lg bg-gray-50 p-4 rounded-lg">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

