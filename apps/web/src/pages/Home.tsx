import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Countdown from "../components/Countdown";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { Meta, Speaker } from "../types";

export default function Home() {
  const { t } = useTranslation();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    apiService.getMeta().then(setMeta);
    apiService.getSpeakers().then((data) => setSpeakers(data.slice(0, 3)));
  }, []);

  return (
    <>
      <Seo />

      <Hero
        title={meta?.title || "III Conferência Internacional de Turismo Literário e Cinematográfico"}
        subtitle={t("home.subtitle")}
      >
        <div className="mt-8">
          <Countdown targetDate="2026-03-26T09:00:00" />
        </div>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link to="/call" className="btn-primary">
            {t("home.submitWork")}
          </Link>
          <Link to="/fees" className="btn-outline">
            {t("home.register")}
          </Link>
        </div>
      </Hero>

      <Section title={t("home.aboutTitle")}>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-center text-gray-700 leading-relaxed">
            {t("home.aboutText")}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12 not-prose">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">26-28</div>
              <div className="text-lg">{t("home.marchDate")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-lg">{t("home.languages")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-lg">{t("home.opportunities")}</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t("home.featuredSpeakers")} background="gray">
        <div className="grid md:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Speaker";
                }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                <p className="text-sm text-gray-600">{speaker.affiliation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/keynotes" className="btn-primary">
            {t("home.viewAllSpeakers")}
          </Link>
        </div>
      </Section>

      <Section title={t("home.importantDates")}>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.submissionDeadline")}</span>
            <span className="text-primary font-bold">03 Dez 2025</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.earlyBird")}</span>
            <span className="text-primary font-bold">05 Jan 2026</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">{t("home.conference")}</span>
            <span className="text-primary font-bold">26-28 Mar 2026</span>
          </div>
        </div>
      </Section>
    </>
  );
}

