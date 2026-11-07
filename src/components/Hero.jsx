import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Languages } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

const WA_NUMBER = "6285707909415"

const divisionCards = [
  {
    id: 1,
    title: "WD Sky Wedding",
    shortTitle: "Wedding",
    badge: "Wedding Organizer",
    desc: "Perencanaan & eksekusi pernikahan elegan",
    icon: "💍",
    image: "/resources/Wedding/wedding.webp",
    link: "/wedding",
    accent: "#b88446",
    rotate: -6,
    position: "top-12 left-[8%] sm:top-[18%] sm:left-[10%] lg:sm:left-[12%]",
  },
  {
    id: 2,
    title: "WD Event",
    shortTitle: "Event",
    badge: "Event Organizer",
    desc: "Konsep konser, festival & corporate gathering",
    icon: "🎪",
    image: "/resources/Event_Organizer/Event.webp",
    link: "/event",
    accent: "#6366f1",
    rotate: 5,
    position: "top-10 right-[8%] sm:top-[16%] sm:right-[10%] lg:sm:right-[12%]",
  },
  {
    id: 3,
    title: "WD Production",
    shortTitle: "Production",
    badge: "Creative Production",
    desc: "Sinematografi video, foto & commercial visual",
    icon: "🎥",
    image: "/resources/Production/Production.webp",
    link: "/production",
    accent: "#f59e0b",
    rotate: 4,
    position: "top-36 left-[7%] sm:top-[44%] sm:left-[6%] lg:sm:left-[8%]",
  },
  {
    id: 4,
    title: "WD Music",
    shortTitle: "Music",
    badge: "Music Entertainment",
    desc: "Live band pengiring, session & talent panggung",
    icon: "🎵",
    image: "/resources/Music_ENT/Music_ENT.webp",
    link: "/music",
    accent: "#a855f7",
    rotate: -4,
    position: "top-36 right-[7%] sm:top-[42%] sm:right-[6%] lg:sm:right-[8%]",
  },
  {
    id: 5,
    title: "WD Jaya Workshop",
    shortTitle: "Workshop",
    badge: "Workshop Program",
    desc: "Inovasi kompor oli bekas hemat bahan bakar 85%",
    icon: "⚙️",
    image: "/resources/Workshop/Workshop.webp",
    link: "/workshop",
    accent: "#22c55e",
    rotate: -3,
    position: "top-[20.5rem] left-[18%] sm:top-[66%] sm:left-[12%] lg:sm:left-[14%]",
  },
  {
    id: 6,
    title: "WD IT",
    shortTitle: "WD IT",
    badge: "Digital Solution",
    desc: "Jasa website, web app & toko online e-commerce",
    icon: "💻",
    image: "/resources/Store/Store.webp",
    link: "/it",
    accent: "#0ea5e9",
    rotate: 6,
    position: "top-[20.5rem] right-[18%] sm:top-[64%] sm:right-[12%] lg:sm:right-[14%]",
  },
]

export default function Hero() {
  const [clickCount, setClickCount] = useState(0)
  const [openLang, setOpenLang] = useState(false)
  const [hero, setHero] = useState({})

  const { lang, changeLang } = useContext(LanguageContext)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".lang-menu")) setOpenLang(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // re-fetch kalau bahasa ganti
  useEffect(() => {
    fetchHero()
  }, [lang.code])

  const fetchHero = async () => {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("section", "hero")
      .eq("lang", lang.code)
    if (error) { console.log(error); return }
    const map = {}
    data?.forEach(row => { map[row.key] = row.value })
    setHero(map)
  }

  const handleWDClick = () => {
    const next = clickCount + 1
    if (next >= 7) {
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo WD Group, saya ingin konsultasi layanan.")}`,
        "_blank"
      )
      setClickCount(0)
    } else {
      setClickCount(next)
    }
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden flex flex-col items-center bg-white px-0 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-0 min-h-[100svh]"
    >
      {/* LANGUAGE */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-5 lg:top-6 lg:right-6 z-30 lang-menu">
        <button
          type="button"
          onClick={() => setOpenLang(!openLang)}
          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs rounded-full border border-black/10 bg-white/80 backdrop-blur shadow hover:bg-black/5 transition"
        >
          <Languages size={14} />
          <span className="uppercase font-semibold">{lang.code}</span>
        </button>

        <AnimatePresence>
          {openLang && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-9 w-44 rounded-xl border border-black/10 bg-white p-1.5 shadow-xl"
            >
              <button
                type="button"
                onClick={() => { changeLang("id"); setOpenLang(false) }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                  lang.code === "id" ? "bg-black font-semibold text-white" : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
              >
                <span>
                  <span className="block">Indonesia</span>
                  <span className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] ${lang.code === "id" ? "text-white/55" : "text-black/35"}`}>
                    ID · Bahasa
                  </span>
                </span>
                {lang.code === "id" && <Check size={15} aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => { changeLang("en"); setOpenLang(false) }}
                className={`mt-1 flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                  lang.code === "en" ? "bg-black font-semibold text-white" : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
              >
                <span>
                  <span className="block">English</span>
                  <span className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] ${lang.code === "en" ? "text-white/55" : "text-black/35"}`}>
                    EN · International
                  </span>
                </span>
                {lang.code === "en" && <Check size={15} aria-hidden="true" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOP LOGO */}
      <div className="absolute top-3.5 sm:top-4 lg:top-6 left-1/2 -translate-x-1/2 z-20 flex max-w-[calc(100vw-6.5rem)] items-center gap-2 sm:gap-2.5 lg:gap-3 backdrop-blur bg-white/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 lg:px-4 lg:py-2 rounded-full shadow">
        <img
          src="/wd-group-logo.webp"
          alt={lang.company}
          fetchPriority="high"
          className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 object-contain"
        />
        <span className="truncate text-xs sm:text-xs lg:text-sm font-semibold">{lang.company}</span>
      </div>

      {/* FLOATING DIVISION PORTFOLIO (1 to 6 CLICKS) */}
      <AnimatePresence>
        {divisionCards.slice(0, clickCount).map((card) => (
          <motion.div
            key={card.id}
            initial={{ scale: 0, opacity: 0, y: 30, rotate: card.rotate * 2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: card.rotate }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className={`absolute z-20 pointer-events-auto cursor-pointer ${card.position}`}
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = card.link
            }}
          >
            {/* MOBILE ONLY: BULAT (CIRCULAR BUBBLE) */}
            <div className="flex sm:hidden flex-col items-center transition-all duration-300 hover:scale-115 active:scale-95">
              <div
                className="relative h-16 w-16 rounded-full overflow-hidden border-[3px] border-white shadow-[0_12px_28px_rgba(0,0,0,0.25)] ring-2"
                style={{ ringColor: card.accent }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <span
                className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs shadow-md"
                style={{ backgroundColor: card.accent }}
              >
                {card.icon}
              </span>

              <span className="mt-1.5 whitespace-nowrap rounded-full bg-black/85 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold text-white shadow-md border border-white/10">
                {card.shortTitle}
              </span>
            </div>

            {/* DESKTOP ONLY: KOTAK (RECTANGULAR CARD) */}
            <div className="hidden sm:flex group w-64 lg:w-72 items-center gap-3 rounded-2xl border border-black/10 bg-white/95 p-2.5 lg:p-3 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-108 hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.32)] active:scale-95">
              <div className="relative h-14 w-14 lg:h-16 lg:w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100 border border-black/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 pr-1 text-left">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: card.accent }}
                >
                  {card.badge}
                </span>
                <p className="mt-0.5 truncate text-[13px] lg:text-sm font-bold text-neutral-900 leading-tight">
                  {card.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500 leading-tight">
                  {card.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[56rem] h-[50vw] max-h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,163,84,0.08),rgba(30,41,59,0.03),transparent_70%)] blur-2xl z-0" />

      {/* UPPER HERO CONTENT: TAGLINE + DIVISION PILLS + INTERACTIVE CTA */}
      <div className="absolute top-[12%] sm:top-[12vh] lg:top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-xl px-4 flex flex-col items-center text-center z-20 pointer-events-auto">
        {/* TAGLINE / KICKER */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-2 sm:mb-2.5"
        >
          <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-neutral-400" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
            {lang.code === "en" ? "Creative & Production Ecosystem" : "Ekosistem Kreatif & Produksi"}
          </span>
          <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-neutral-400" />
        </motion.div>

        {/* 6 DIVISION PILLS */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 max-w-sm sm:max-w-md"
        >
          {divisionCards.map((card, idx) => {
            const isActive = clickCount > idx
            return (
              <span
                key={card.id}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-sm scale-105"
                    : "bg-white/85 backdrop-blur-sm text-neutral-600 border border-black/5 hover:border-black/15 hover:bg-white"
                }`}
              >
                <span className="text-[10px]">{card.icon}</span>
                <span>{card.shortTitle}</span>
              </span>
            )
          })}
        </motion.div>

        {/* INTERACTIVE HINT BADGE */}
        <motion.button
          type="button"
          onClick={handleWDClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:bg-white hover:border-black/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase text-neutral-800 select-none">
            {clickCount === 0
              ? (lang.code === "en" ? "Click logo to explore 6 divisions" : "Klik logo untuk jelajahi 6 divisi")
              : clickCount < 6
              ? (lang.code === "en" ? `Divisions (${clickCount}/6) · Click again` : `Divisi (${clickCount}/6) · Klik lagi`)
              : (lang.code === "en" ? "6 Divisions revealed · Click for WhatsApp" : "6 Divisi terbuka · Klik untuk WhatsApp")}
          </span>
        </motion.button>
      </div>

      {/* WD HERO LOGO - ALIGNED TO OPENING VIDEO */}
      <div className="absolute left-1/2 top-[48%] sm:top-[53.5%] -translate-x-1/2 -translate-y-1/2 w-[68vw] max-w-[18rem] sm:w-[min(40vw,46vh)] lg:w-[min(43vw,50vh)] sm:max-w-[36rem] lg:max-w-[40rem] flex justify-center items-center select-none z-10 px-4">
        <motion.div
          onClick={handleWDClick}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="cursor-pointer w-full flex flex-col items-center"
        >
          <img
            src="/wd-hero-logo.webp"
            alt="WD Group Company"
            fetchPriority="high"
            className="w-full h-auto max-h-[26vh] sm:max-h-[32vh] lg:max-h-[36vh] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.06)]"
          />
          <h1 className="sr-only">
            WD Group Company – Creative Media, Event Organizer & Wedding Organizer Solo Raya
          </h1>
        </motion.div>
      </div>

      {/* SUBTITLE */}
      <div className="relative z-10 mt-auto mb-2 sm:mb-0 w-full px-5 sm:absolute sm:bottom-6 md:bottom-8 lg:bottom-10 sm:left-8 lg:left-12 sm:w-auto sm:px-0">
        <h2 className="max-w-[20rem] sm:max-w-none text-[1.25rem] min-[390px]:text-[1.4rem] sm:text-3xl lg:text-4xl font-normal leading-[1.2] sm:leading-snug">
          {hero.title || lang.subtitle1}
          <br />
          {hero.subtitle || lang.subtitle2}
        </h2>
      </div>

    </section>
  )
}
