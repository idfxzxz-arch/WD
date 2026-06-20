import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Languages } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"
import { GooeyText } from "./ui/GooeyText"

const WA_NUMBER = "6285707909415"

const stickers = [
  {
    id: 1,
    content: "🎬",
    style: "text-6xl",
    position: "top-[20%] left-[10%]",
  },
  {
    id: 2,
    content: "🎤",
    style: "text-5xl",
    position: "top-[30%] right-[12%]",
  },
  {
    id: 3,
    content: (
      <div className="bg-lime-300 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-md">
        📸
      </div>
    ),
    position: "top-[45%] left-[18%]",
  },
  {
    id: 4,
    content: (
      <div className="bg-white border border-black/10 shadow-lg rounded-xl px-4 py-2 text-center">
        <span className="block text-[10px] font-bold text-red-500 uppercase tracking-widest">
          Danger!
        </span>
        <span className="block text-sm font-bold leading-tight mt-0.5">
          ONE MORE CLICK
          <br />
          TO CONTACT US!
        </span>
      </div>
    ),
    position: "top-[25%] right-[8%]",
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

  // ✅ re-fetch kalau bahasa ganti
  useEffect(() => {
    fetchHero()
  }, [lang.code])

  const fetchHero = async () => {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("section", "hero")
      .eq("lang", lang.code) // ✅ filter bahasa
    if (error) { console.log(error); return }
    const map = {}
    data?.forEach(row => { map[row.key] = row.value }) // ✅ ubah array jadi object
    setHero(map)
  }

  const handleWDClick = () => {
    const next = clickCount + 1
    if (next >= 4) {
      window.open(`https://wa.me/${WA_NUMBER}`, "_blank")
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
          aria-label="Pilih bahasa"
          aria-expanded={openLang}
          className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 text-xs font-bold text-black shadow-sm backdrop-blur-xl transition hover:border-black/20 hover:bg-white"
        >
          <Languages size={16} strokeWidth={1.8} />
          <span>{lang.code === "id" ? "ID" : "EN"}</span>
        </button>
        <AnimatePresence>
          {openLang && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-black/10 bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
            >
              <button
                type="button"
                onClick={() => { changeLang("id"); setOpenLang(false) }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                  lang.code === "id" ? "bg-black font-semibold text-white" : "text-black/60 hover:bg-black/5 hover:text-black"
                }`}
              >
                <span>
                  <span className="block">Bahasa Indonesia</span>
                  <span className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] ${lang.code === "id" ? "text-white/55" : "text-black/35"}`}>
                    ID · Bahasa utama
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
          src="/wd-group-logo.jpeg"
          alt={lang.company}
          className="w-6 h-6 object-contain"
        />
        <span className="truncate text-xs sm:text-sm font-semibold">{lang.company}</span>
      </div>

      {/* STICKERS */}
      <AnimatePresence>
        {stickers.slice(0, clickCount).map((sticker) => (
          <motion.div
            key={sticker.id}
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute z-20 pointer-events-none ${sticker.position} ${sticker.style || ""}`}
          >
            {sticker.content}
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
        </motion.h1>
      </div>

      {/* CLICK HINT */}
      <AnimatePresence>
        {clickCount > 0 && clickCount < 4 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-black/30 mt-2"
          >
            {4 - clickCount}
          </motion.p>
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
          {hero.subtitle || lang.subtitle2}  {/* ✅ ganti description → subtitle */}
        </h2>
      </div>

    </section>
  )
}
