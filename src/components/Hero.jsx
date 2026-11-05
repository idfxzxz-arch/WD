import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Languages, MessageCircle } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"
import { GooeyText } from "./ui/GooeyText"

const WA_NUMBER = "6285707909415"

const divisionCards = [
  {
    id: 1,
    title: "WD Sky Wedding",
    badge: "Wedding Organizer",
    desc: "Perencanaan & eksekusi pernikahan elegan",
    image: "/resources/Wedding/wedding.webp",
    link: "/wedding",
    accent: "#b88446",
    rotate: -6,
    position: "top-[16%] left-[4%] sm:top-[18%] sm:left-[12%]",
  },
  {
    id: 2,
    title: "WD Event",
    badge: "Event Organizer",
    desc: "Konsep konser, festival & corporate gathering",
    image: "/resources/Event_Organizer/Event.webp",
    link: "/event",
    accent: "#6366f1",
    rotate: 5,
    position: "top-[14%] right-[4%] sm:top-[16%] sm:right-[12%]",
  },
  {
    id: 3,
    title: "WD Production",
    badge: "Creative Production",
    desc: "Sinematografi video, foto & commercial visual",
    image: "/resources/Production/Production.webp",
    link: "/production",
    accent: "#f59e0b",
    rotate: 4,
    position: "top-[44%] left-[2%] sm:top-[44%] sm:left-[8%]",
  },
  {
    id: 4,
    title: "WD Music",
    badge: "Music Entertainment",
    desc: "Live band pengiring, session & talent panggung",
    image: "/resources/Music_ENT/Music_ENT.webp",
    link: "/music",
    accent: "#a855f7",
    rotate: -4,
    position: "top-[42%] right-[2%] sm:top-[42%] sm:right-[9%]",
  },
  {
    id: 5,
    title: "WD Jaya Workshop",
    badge: "Workshop Program",
    desc: "Inovasi kompor oli bekas hemat bahan bakar 85%",
    image: "/resources/Workshop/Workshop.webp",
    link: "/workshop",
    accent: "#22c55e",
    rotate: -3,
    position: "top-[68%] left-[6%] sm:top-[66%] sm:left-[14%]",
  },
  {
    id: 6,
    title: "WD IT",
    badge: "Digital Solution",
    desc: "Jasa website, web app & toko online e-commerce",
    image: "/resources/Store/Store.webp",
    link: "/it",
    accent: "#0ea5e9",
    rotate: 6,
    position: "top-[66%] right-[6%] sm:top-[64%] sm:right-[14%]",
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
      className="min-h-[100svh] bg-white relative overflow-hidden grid grid-rows-[auto_auto_auto_1fr_auto] justify-items-center px-0 pb-24 sm:flex sm:flex-col sm:items-center sm:pb-0"
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
      <div className="absolute top-4 sm:top-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-20 flex max-w-[calc(100vw-5rem)] items-center gap-2 sm:gap-3 backdrop-blur bg-white/80 px-3 sm:px-4 py-2 rounded-full shadow">
        <img
          src="/wd-group-logo.webp"
          alt={lang.company}
          fetchPriority="high"
          className="w-6 h-6 object-contain"
        />
        <span className="truncate text-xs sm:text-sm font-semibold">{lang.company}</span>
      </div>

      {/* FLOATING DIVISION PORTFOLIO CARDS (1 to 6 CLICKS) */}
      <AnimatePresence>
        {divisionCards.slice(0, clickCount).map((card) => (
          <motion.div
            key={card.id}
            initial={{ scale: 0, opacity: 0, y: 30, rotate: card.rotate * 2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: card.rotate }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className={`absolute z-20 pointer-events-auto cursor-pointer ${card.position}`}
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = card.link
            }}
          >
            <div className="group flex max-w-[15rem] sm:max-w-[17rem] items-center gap-2.5 rounded-2xl border border-black/10 bg-white/95 p-2 sm:p-2.5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:scale-108 hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.32)] active:scale-95">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100 border border-black/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 pr-1 text-left">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: card.accent }}
                >
                  {card.badge}
                </span>
                <p className="mt-0.5 truncate text-xs sm:text-[13px] font-bold text-neutral-900 leading-tight">
                  {card.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-neutral-500 leading-tight">
                  {card.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 7th CLICK TEASER / BANNER ON CLICK 6 */}
      <AnimatePresence>
        {clickCount === 6 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-[28%] sm:top-[26%] z-30 pointer-events-none"
          >
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-600 px-4 py-2.5 text-center text-white shadow-[0_16px_40px_rgba(5,150,105,0.4)] animate-bounce">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-100">
                Semua 6 Divisi Terbuka!
              </span>
              <span className="block text-xs sm:text-sm font-extrabold mt-0.5 flex items-center justify-center gap-1.5">
                <MessageCircle size={15} /> 1 KLIK LAGI KE WHATSAPP KAMI!
              </span>
            </div>
          </motion.div>
        )}
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

      {/* CLICK HINT */}
      <AnimatePresence>
        {clickCount > 0 && clickCount < 7 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs text-black/50 mt-2 font-medium"
          >
            <span className="font-mono text-black font-bold">{clickCount}/6</span>
            <span>divisi terbuka</span>
            <span className="text-[10px] text-black/35 font-mono">
              ({7 - clickCount}x klik ke WhatsApp)
            </span>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="relative z-10 mt-[clamp(2.5rem,9svh,5rem)] w-full self-end px-5 sm:absolute sm:bottom-24 sm:left-12 sm:mt-0 sm:w-auto sm:px-0">
        <h2 className="max-w-[22rem] text-[1.7rem] min-[390px]:text-3xl sm:max-w-none sm:text-4xl font-normal leading-[1.12] sm:leading-snug">
          {hero.title || lang.subtitle1}
          <br />
          {hero.subtitle || lang.subtitle2}
        </h2>
      </div>

    </section>
  )
}
