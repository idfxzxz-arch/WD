import { Helmet } from "react-helmet-async"
import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function SEO({ title, description, url = "https://www.wdgroupcompany.biz.id/" }) {
  const { lang } = useContext(LanguageContext)
  const defaultTitle = `${lang.company} – WD Group Company | Creative Media & Event Organizer`
  const defaultDescription = lang.subtitle1 ? `${lang.subtitle1} ${lang.subtitle2}` : "WD Group Company (WD Jaya Group) adalah penyedia jasa multimedia, event organizer, photo video production, dan solusi bisnis."
  
  const finalTitle = title ? `${title} | WD Group Company` : defaultTitle
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
