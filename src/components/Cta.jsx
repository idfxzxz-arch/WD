import { useContext, useEffect, useMemo, useState } from "react"
import { motion as Motion } from "framer-motion"
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"
import AnimatedWords from "./ui/AnimatedWords"

export default function Cta() {
  const { lang } = useContext(LanguageContext)
  const [contact, setContact] = useState({})

  useEffect(() => {
    supabase
      .from("content")
      .select("*")
      .eq("section", "contact")
      .eq("lang", lang.code)
      .then(({ data }) => {
        const map = {}
        data?.forEach((row) => { map[row.key] = row.value })
        setContact(map)
      })
  }, [lang.code])

  const isIndonesia = lang.code === "id"
  const words = useMemo(
    () => isIndonesia
      ? ["punya arah", "terasa hidup", "layak diingat", "membawa hasil"]
      : ["with direction", "that feels alive", "worth remembering", "that delivers"],
    [isIndonesia]
  )

  const normalizeWhatsapp = (value) => {
    if (!value) return "https://wa.me/6285707909415"
    if (/^https?:\/\//i.test(value)) return value
    return `https://wa.me/${value.replace(/\D/g, "")}`
  }

  const normalizeEmail = (value) => {
    if (!value) return "mailto:wdgroupcompany@gmail.com"
    return value.startsWith("mailto:") ? value : `mailto:${value}`
  }

  const whatsapp = normalizeWhatsapp(contact.whatsapp)
  const links = [
    {
      label: "Instagram",
      href: contact.instagram || "https://instagram.com/wdgroupcompany",
      icon: Instagram,
    },
    {
      label: "Email",
      href: normalizeEmail(contact.email),
      icon: Mail,
    },
    {
      label: "Maps",
      href: "https://maps.app.goo.gl/GbrdfnM6pe2K9GvC6",
      icon: MapPin,
    },
  ]

  return (
    <section
      id="contact"
      className="relative flex min-h-[92svh] items-center overflow-hidden border-t border-white/10 bg-black px-5 py-24 text-white sm:min-h-screen sm:px-8 sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 sm:mb-10 sm:text-xs sm:tracking-[0.28em]">
            <span>06</span>
            <span className="h-px w-8 bg-white/25" />
            {isIndonesia ? "Hubungi WD Group" : "Contact WD Group"}
          </div>

          <h2 className="max-w-6xl text-[clamp(2.1rem,7vw,6.1rem)] font-semibold leading-[1.03] tracking-tight sm:hidden">
            <span className="block">{isIndonesia ? "Mari ciptakan" : "Let’s create"}</span>
            <span className="mt-1 block">{isIndonesia ? "karya yang" : "work that feels"}</span>
            <span className="mt-3 block">
              <AnimatedWords words={words} appearance="editorial" />
            </span>
          </h2>

          <h2 className="hidden max-w-6xl text-[clamp(2.1rem,7vw,6.1rem)] font-semibold leading-[1.03] tracking-tight sm:block">
            <span className="block">
              {isIndonesia ? "Mari ciptakan karya" : "Let’s create work"}
            </span>
            <span className="mt-2 flex min-h-[1.25em] flex-wrap items-center gap-x-[0.2em] gap-y-3 sm:mt-3 sm:flex-nowrap">
              <span>{isIndonesia ? "yang" : "that feels"}</span>
              <AnimatedWords words={words} appearance="editorial" className="sm:text-[0.88em]" />
            </span>
          </h2>

          <div className="mt-9 flex flex-col gap-7 border-t border-white/12 pt-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pt-10">
            <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              {contact.description || (isIndonesia
                ? "Dari panggung, layar, hingga ruang digital, WD Group menyatukan ide dan eksekusi dalam satu tim. Ceritakan proyek Anda, lalu kita mulai dari percakapan yang sederhana."
                : "From stages and screens to digital spaces, WD Group brings ideas and execution together in one team. Tell us about your project, and we’ll start with a simple conversation.")}
            </p>

            <Motion.a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {isIndonesia ? "Mulai Percakapan" : "Start a Conversation"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Motion.a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45 sm:mt-14 sm:gap-x-7 sm:text-xs sm:tracking-[0.14em]">
            {links.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Icon size={15} aria-hidden="true" />
                  {item.label}
                  <ArrowUpRight size={13} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  )
}
