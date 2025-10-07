import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import SpeakerCard from "../components/SpeakerCard";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { Speaker } from "../types";

export default function Keynotes() {
  const { t } = useTranslation();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    apiService.getSpeakers().then(setSpeakers);
  }, []);

  return (
    <>
      <Seo title={t("nav.keynotes")} description={t("keynotes.description")} />

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
            {t("keynotes.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-base text-gray-600 text-center leading-relaxed">
            {t("keynotes.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Section>
    </>
  );
}
