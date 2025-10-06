import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import SpeakerCard from "../components/SpeakerCard";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { Speaker } from "../types";

export default function Home() {
  const { t } = useTranslation();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    apiService.getSpeakers().then((data) => setSpeakers(data.slice(0, 9)));
  }, []);

  return (
    <>
      <Seo />

      <div className="w-full aspect-[16/5]">
        <img
          src="/hero.png"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="py-8 md:py-12">
        <div className="container-custom text-center">
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            <Link to="/call" className="btn-primary flex-1 sm:flex-initial min-w-[200px]">
              {t("home.submitWork")}
            </Link>
            <Link
              to="/fees"
              className="group relative inline-flex items-center justify-center gap-2 bg-white hover:bg-[#e0a085] text-[#e0a085] hover:text-white font-bold py-4 px-8 rounded-xl min-h-[56px] transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-[#e0a085] flex-1 sm:flex-initial min-w-[220px] transform hover:scale-105"
            >
              <span className="text-base md:text-lg">{t("home.register")}</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Section title={t("home.aboutTitle")}>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-justify text-gray-700 leading-relaxed">{t("home.aboutText")}</p>
        </div>
      </Section>

      <Section title={t("home.featuredSpeakers")} background="gray">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </Section>

      <Section title={t("home.importantDates")}>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.submissionDeadline")}</span>
            <span className="text-accent font-bold">03 Dez 2025</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.earlyBird")}</span>
            <span className="text-accent font-bold">05 Jan 2026</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.conference")}</span>
            <span className="text-accent font-bold">26-28 Mar 2026</span>
          </div>
        </div>
      </Section>
    </>
  );
}
