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
    "III Conferência Internacional de Turismo Literário e Cinematográfico - Economia Criativa, Inovação e Desenvolvimento Territorial. 26-28 Março 2026 em Caxias do Sul/RS. Submissão de trabalhos, palestrantes internacionais, turismo literário, turismo cinematográfico, film commissions, economia criativa.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta
        name="keywords"
        content="conferência internacional, turismo literário, turismo cinematográfico, economia criativa, inovação, desenvolvimento territorial, Caxias do Sul, UCS, film commissions, palestrantes internacionais, submissão de trabalhos, 2026"
      />
      <meta name="author" content="Universidade de Caxias do Sul" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR-RS" />
      <meta name="geo.placename" content="Caxias do Sul" />
      <meta name="geo.position" content="-29.168;-51.179" />
      <meta name="ICBM" content="-29.168, -51.179" />

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
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Universidade de Caxias do Sul - Blocos H, E e F",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Francisco Getúlio Vargas, 1130",
              addressLocality: "Caxias do Sul",
              addressRegion: "RS",
              postalCode: "95070-560",
              addressCountry: "BR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -29.168,
              longitude: -51.179,
            },
          },
          organizer: {
            "@type": "Organization",
            name: "Universidade de Caxias do Sul",
            url: "https://www.ucs.br",
          },
          keywords:
            "conferência internacional, turismo literário, turismo cinematográfico, economia criativa, inovação, desenvolvimento territorial, film commissions",
          audience: {
            "@type": "Audience",
            audienceType: "pesquisadores, acadêmicos, profissionais de turismo, estudantes",
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            price: "60",
            priceCurrency: "BRL",
            validFrom: "2025-01-01",
          },
        })}
      </script>
    </Helmet>
  );
}
