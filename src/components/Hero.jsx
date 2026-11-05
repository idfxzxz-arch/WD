import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Languages } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"
import { GooeyText } from "./ui/GooeyText"

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
      className="relative overflow-hidden flex flex-col items-center bg-white px-0 pb-32 sm:pb-0 sm:min-h-[100svh]"
    >
      {/* LANGUAGE */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 lang-menu">
        <button
          type="button"
          onClick={() => setOpenLang(!openLang)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-black/10 bg-white/80 backdrop-blur shadow hover:bg-black/5 transition"
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
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex max-w-[calc(100vw-6.5rem)] items-center gap-2 sm:gap-3 backdrop-blur bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow">
        <img
          src="/wd-group-logo.webp"
          alt={lang.company}
          fetchPriority="high"
          className="w-6 h-6 object-contain"
        />
        <span className="truncate text-xs sm:text-sm font-semibold">{lang.company}</span>
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

      {/* WD */}
      <div className="relative mt-[clamp(5.5rem,14svh,8rem)] sm:mt-32 flex justify-center select-none">
        <motion.h1
          onClick={handleWDClick}
          whileTap={{ scale: 0.95 }}
          className="text-[31vw] sm:text-[18vw] font-serif leading-none cursor-pointer tracking-[-0.08em] sm:tracking-normal"
        >
          WD
          <span className="sr-only"> Group Company – Creative Media, Event Organizer & Wedding Organizer Solo Raya</span>
        </motion.h1>
      </div>

      <div className="pointer-events-none relative z-0 mt-[clamp(1.5rem,5svh,3rem)] hidden h-14 w-full px-4 sm:absolute sm:left-1/2 sm:top-[57%] sm:mt-0 sm:flex sm:h-24 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-6">
        <GooeyText
          texts={["GROUP", "COMPANY"]}
          morphTime={1.1}
          cooldownTime={0.35}
          className="flex h-full w-full items-center justify-center"
          textClassName="whitespace-nowrap text-[clamp(1.65rem,7vw,4.5rem)] font-black uppercase leading-none tracking-[-0.06em]"
        />
      </div>

      {/* SUBTITLE */}
      <div className="relative z-10 mt-8 min-[390px]:mt-10 sm:mt-0 w-full px-5 sm:absolute sm:bottom-24 sm:left-12 sm:w-auto sm:px-0">
        <h2 className="max-w-[22rem] text-[1.7rem] min-[390px]:text-3xl sm:max-w-none sm:text-4xl font-normal leading-[1.12] sm:leading-snug">
          {hero.title || lang.subtitle1}
          <br />
          {hero.subtitle || lang.subtitle2}
        </h2>
      </div>

    </section>
  )
}
