import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Alert from "../components/Alert";
import Seo from "../components/Seo";
import apiService from "../api/client";
import type { CallInfo } from "../types";

export default function Call() {
  const { t } = useTranslation();
  const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    track: "",
    abstract: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    apiService.getCallInfo().then(setCallInfo);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      await apiService.submitAbstract(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", title: "", track: "", abstract: "" });
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Seo title={t("nav.call")} description={t("call.description")} />

      <Hero title={t("call.title")} height="medium" />

      <Section>
        <div className="max-w-4xl mx-auto">
          <Alert type="warning">
            <strong>{t("call.deadline")}:</strong> {callInfo?.deadlineISO && new Date(callInfo.deadlineISO).toLocaleDateString()}
          </Alert>

          <div className="mt-12 prose prose-lg max-w-none">
            <h2>{t("call.guidelines")}</h2>
            <p>{t("call.guidelinesText")}</p>

            <h3>{t("call.formats")}</h3>
            {callInfo?.formats.map((format, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="text-lg font-bold mb-2">{format.type}</h4>
                <p className="mb-2">
                  <strong>{t("call.wordCount")}:</strong> {format.words} {t("call.words")}
                </p>
                <p className="mb-2">
                  <strong>{t("call.mustInclude")}:</strong>
                </p>
                <ul className="list-disc pl-6">
                  {format.mustInclude.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>{t("call.tracks")}</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {callInfo?.tracks.map((track, i) => (
                <li key={i} className="text-sm">
                  {track}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 bg-white border-2 border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">{t("call.submitForm")}</h2>

            {submitStatus === "success" && (
              <Alert type="success">
                <strong>{t("call.successTitle")}</strong>
                <p>{t("call.successMessage")}</p>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert type="error">
                <strong>{t("call.errorTitle")}</strong>
                <p>{t("call.errorMessage")}</p>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">
                  {t("call.name")} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-2">
                  {t("call.email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="title" className="block font-semibold mb-2">
                  {t("call.workTitle")} *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <div>
                <label htmlFor="track" className="block font-semibold mb-2">
                  {t("call.thematicTrack")} *
                </label>
                <select
                  id="track"
                  required
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="">{t("call.selectTrack")}</option>
                  {callInfo?.tracks.map((track, i) => (
                    <option key={i} value={track}>
                      {track}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="abstract" className="block font-semibold mb-2">
                  {t("call.abstract")} * ({t("call.minimum")} 100 {t("call.characters")})
                </label>
                <textarea
                  id="abstract"
                  required
                  minLength={100}
                  rows={8}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="btn-primary w-full"
              >
                {submitStatus === "loading" ? t("call.submitting") : t("call.submit")}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}

