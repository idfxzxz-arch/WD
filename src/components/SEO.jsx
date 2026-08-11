import { Helmet } from "react-helmet-async"
import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function SEO({ title, description, url = "https://wd-beryl-alpha.vercel.app/" }) {
  const { lang } = useContext(LanguageContext)
  const defaultTitle = `${lang.company} – Creative Media & Event Organizer`
  const defaultDescription = lang.subtitle1 ? `${lang.subtitle1} ${lang.subtitle2}` : "WD Jaya Group adalah creative media company yang menyediakan jasa multimedia, event organizer, photo video production, dan solusi bisnis profesional."
  
  const finalTitle = title ? `${title} | ${lang.company}` : defaultTitle
  const finalDescription = description || defaultDescription

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  )
}
