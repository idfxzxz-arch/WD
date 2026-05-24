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
    <section id="about" className="py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="uppercase tracking-widest text-sm mb-10">
          {lang.aboutLabel}
        </p>
        <h2 className="text-[5vw] leading-[1.1] font-medium mb-10">
          {about.title || lang.aboutTitle}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl">
          {about.description || lang.aboutDesc}
        </p>
      </div>
    </section>
  )
}