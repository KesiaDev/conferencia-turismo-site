import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import ProgramTable from "../components/ProgramTable";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { ProgramDay } from "../types";

export default function Program() {
  const { t } = useTranslation();
  const [program, setProgram] = useState<ProgramDay[]>([]);

  useEffect(() => {
    apiService.getProgram().then(setProgram);
  }, []);

  return (
    <>
      <Seo title={t("nav.program")} description={t("program.description")} />

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
            {t("program.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 text-center leading-relaxed">{t("program.intro")}</p>
        </div>

        {program.length > 0 && <ProgramTable program={program} />}
      </Section>
    </>
  );
}
