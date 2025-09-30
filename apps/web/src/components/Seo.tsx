import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SeoProps {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  url?: string;
}

export default function Seo({
  title,
  description,
  type = "website",
  image = "/hero.jpg",
  url,
}: SeoProps) {
  const { t } = useTranslation();

  const siteTitle = "III Conferência Internacional de Turismo Literário e Cinematográfico";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription =
    description ||
    t("meta.description") ||
    "Economia Criativa, Inovação e Desenvolvimento Territorial - 26-28 Mar 2026 em Caxias do Sul/RS";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Event Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: siteTitle,
          description: siteDescription,
          startDate: "2026-03-26",
          endDate: "2026-03-28",
          location: {
            "@type": "Place",
            name: "Universidade de Caxias do Sul",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Caxias do Sul",
              addressRegion: "RS",
              addressCountry: "BR",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "Universidade de Caxias do Sul",
          },
        })}
      </script>
    </Helmet>
  );
}

