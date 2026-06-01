import { useContext, useEffect, useState } from "react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

export default function Section() {
  const { lang } = useContext(LanguageContext)
  const [services, setServices] = useState({})
  const marqueeText = "WD GROUP COMPANY · CREATIVE MEDIA · EVENT ORGANIZER · PRODUCTION · DIGITAL SOLUTION · "

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
    <section className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <p className="text-xs sm:text-sm uppercase tracking-[0.22em] sm:tracking-widest mb-4 sm:mb-6">
          {lang.sectionLabel}
        </p>
        <h2 className="text-[2.35rem] min-[390px]:text-5xl md:text-6xl leading-[1.05] sm:leading-tight font-medium tracking-[-0.04em] sm:tracking-normal">
          {services.title || lang.sectionTitle}
        </h2>
      </div>

      <div className="mt-12 sm:mt-16 overflow-hidden border-y border-black/10 py-4 text-black/30">
        <div className="flex w-max animate-[wdMarquee_28s_linear_infinite] whitespace-nowrap text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm">
          <span>{marqueeText.repeat(3)}</span>
        </div>
      </div>
    </section>
  )
}
