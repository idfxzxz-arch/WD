import { Helmet } from "react-helmet-async"
import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function SEO({
  title,
  description,
  url = "https://www.wdgroupcompany.biz.id/",
  image = "https://www.wdgroupcompany.biz.id/resources/Event_Organizer/Event.webp",
  imageAlt = "WD Group Company - Ekosistem Kreatif Solo Raya",
  siteName = "WD Group Company",
  type = "website",
  jsonLd,
}) {
  const { lang } = useContext(LanguageContext)
  const defaultTitle = `${lang?.company || "WD Group Company"} – Creative Media & Event Organizer`
  const defaultDescription = lang?.subtitle1
    ? `${lang.subtitle1} ${lang.subtitle2}`
    : "WD Group Company (WD Jaya Group) adalah penyedia jasa multimedia, event organizer, photo video production, dan solusi bisnis di Solo Raya."

  const finalTitle = title ? (title.includes("WD") ? title : `${title} | WD Group Company`) : defaultTitle
  const finalDescription = description || defaultDescription
  const finalImage = image.startsWith("http") ? image : `https://www.wdgroupcompany.biz.id${image.startsWith("/") ? "" : "/"}${image}`

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

