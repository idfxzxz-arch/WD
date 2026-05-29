import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

export default function Section() {
  const { lang } = useContext(LanguageContext)
  const [services, setServices] = useState({})

  useEffect(() => {
    supabase
      .from("content")
      .select("*")
      .eq("section", "services")
      .eq("lang", lang.code)
      .then(({ data }) => {
        const map = {}
        data?.forEach(row => { map[row.key] = row.value })
        setServices(map)
      })
  }, [lang.code])

  return (
    <section className="min-h-[68vh] sm:min-h-[80vh] flex items-center bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.22em] sm:tracking-widest mb-6 sm:mb-8">
          {lang.sectionLabel}
        </p>
        <h2 className="text-[2.35rem] min-[390px]:text-5xl md:text-6xl leading-[1.05] sm:leading-tight font-medium tracking-[-0.04em] sm:tracking-normal">
          {services.title || lang.sectionTitle}
        </h2>
      </div>
    </section>
  )
}
