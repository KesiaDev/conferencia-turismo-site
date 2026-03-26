import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "../components/Section";
import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";
import YoutubeEmbed from "../components/YoutubeEmbed";
import { getLiveStreams, type LiveStreamItem } from "../lib/liveStreams/api";
import { extractYouTubeVideoId } from "../utils/youtube";

const FALLBACK: LiveStreamItem[] = [
  {
    id: "fallback-opening",
    title:
      "III Conferência de Turismo Literário e Cinematográfico: Abertura Oficial e Palestra de Abertura",
    youtubeUrl: "https://www.youtube.com/live/8WFPFbNSg0o",
    videoId: "8WFPFbNSg0o",
    sortOrder: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-next-live",
    title:
      "Entre Palavras: O Impacto Regional do Turismo Literário e Cinematográfico no Território",
    youtubeUrl: "https://www.youtube.com/live/c9MsA315nmg",
    videoId: "c9MsA315nmg",
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
];

export default function AssistaOnline() {
  const { t } = useTranslation();
  const [items, setItems] = useState<LiveStreamItem[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await getLiveStreams();
      if (cancelled) return;
      if (res.success && res.items && res.items.length > 0) {
        const normalized = res.items.map((row) => ({
          ...row,
          videoId: row.videoId || extractYouTubeVideoId(row.youtubeUrl),
        }));
        setItems(normalized.filter((x) => x.videoId) as LiveStreamItem[]);
        setLoadError(false);
        return;
      }
      setLoadError(true);
      setItems(FALLBACK);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return FALLBACK;
    return items;
  }, [items]);

  return (
    <>
      <Seo title={t("watchOnline.title")} description={t("watchOnline.description")} />

      <div className="w-full aspect-[16/5]">
        <OptimizedImage
          src="/hero-novo.gif"
          alt="Banner da Conferência"
          className="w-full h-full object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="py-8 bg-[#e0a085]">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-white">
            {t("watchOnline.title")}
          </h1>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-8">{t("watchOnline.intro")}</p>

          {loadError && (
            <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {t("watchOnline.fallbackNotice")}
            </p>
          )}

          <div className="space-y-12">
            {displayItems.map((row) => {
              const vid = row.videoId || extractYouTubeVideoId(row.youtubeUrl);
              if (!vid) return null;
              return (
                <article key={row.id} className="space-y-4">
                  <h2 className="text-xl font-bold text-[#e0a085] leading-snug">{row.title}</h2>
                  <YoutubeEmbed videoId={vid} title={row.title} />
                  <p className="text-sm text-gray-600">
                    <a
                      href={row.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8b4513] underline hover:text-[#6b3410]"
                    >
                      {t("watchOnline.openOnYoutube")}
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
