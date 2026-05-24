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
    <section className="min-h-[80vh] flex items-center bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest mb-8">
          {lang.sectionLabel}
        </p>
        <h2 className="text-4xl md:text-6xl leading-tight font-medium">
          {services.title || lang.sectionTitle}
        </h2>
      </div>
    </section>
  )
}