import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
            {t("committees.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-[#e0a085]">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("committees.organizing")}</h2>
            <ul className="space-y-2">
              {committees?.organizing.map((member, i) => (
                <li key={i} className="text-base text-gray-700 py-2">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-[#e0a085]">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("committees.executive")}</h2>

            {/* Membros Principais */}
            <ul className="space-y-2 mb-6">
              {committees?.executive.map((member, i) => (
                <li key={i} className="text-base text-gray-700 py-2">
                  {member}
                </li>
              ))}
            </ul>

            {/* Subtítulo para Doutorandos */}
            <h3 className="text-xl font-bold mb-4 text-[#e0a085]">{t("committees.doctoral")}</h3>
            <ul className="space-y-2">
              {committees?.doctoral.map((member, i) => (
                <li key={i} className="text-base text-gray-700 py-2">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-[#e0a085]">
            <h2 className="text-2xl font-bold mb-6 text-[#e0a085]">{t("committees.scientific")}</h2>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2">
              {committees?.scientific.map((member, i) => (
                <li key={i} className="text-base text-gray-700 py-2">
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
