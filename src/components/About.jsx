import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

export default function About() {
  const { lang } = useContext(LanguageContext)
  const [about, setAbout] = useState({})

  useEffect(() => {
    supabase
      .from("content")
      .select("*")
      .eq("section", "about")
      .eq("lang", lang.code)
      .then(({ data }) => {
        const map = {}
        data?.forEach(row => { map[row.key] = row.value })
        setAbout(map)
      })
  }, [lang.code])

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <p className="uppercase tracking-[0.22em] sm:tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">
          {lang.aboutLabel}
        </p>
        <h2 className="text-[2.35rem] min-[390px]:text-5xl sm:text-[5vw] leading-[1.05] sm:leading-[1.1] font-medium tracking-[-0.04em] sm:tracking-normal mb-4 sm:mb-6">
          {about.title || lang.aboutTitle}
        </h2>
        <p className="text-base sm:text-xl leading-relaxed text-gray-600 max-w-3xl">
          {about.description || lang.aboutDesc}
        </p>
      </div>
    </section>
  )
}
