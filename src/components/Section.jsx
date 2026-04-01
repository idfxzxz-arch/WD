import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function Section() {
  const { lang } = useContext(LanguageContext)

  return (
    <section className="min-h-[80vh] flex items-center">

      <div className="max-w-5xl mx-auto px-6">

        <p className="text-sm uppercase tracking-widest mb-8">
          {lang.sectionLabel}
        </p>

        <h2 className="text-4xl md:text-6xl leading-tight font-medium">
          {lang.sectionTitle}
        </h2>

      </div>

    </section>
  )
}