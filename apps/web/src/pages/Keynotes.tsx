import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
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

      <Hero title={t("keynotes.title")} height="medium" />

      <Section>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            {t("keynotes.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Section>
    </>
  );
}

