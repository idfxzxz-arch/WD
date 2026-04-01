import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"

export default function About() {
  const { lang } = useContext(LanguageContext)

  return (
    <section id="about" className="py-40">

      <div className="max-w-5xl mx-auto px-6">

        <p className="uppercase tracking-widest text-sm mb-10">
          {lang.aboutLabel}
        </p>

        <h2 className="text-[5vw] leading-[1.1] font-medium mb-10">
          {lang.aboutTitle}
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl">
          {lang.aboutDesc}
        </p>

      </div>

    </section>
  )
}