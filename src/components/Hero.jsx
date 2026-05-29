import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

const WA_NUMBER = "62XXXXXXXXXX"

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
      className="min-h-[100svh] sm:min-h-screen bg-white relative overflow-hidden flex flex-col items-center"
    >
      {/* LANGUAGE */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 lang-menu">
        <button
          onClick={() => setOpenLang(!openLang)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 backdrop-blur hover:bg-black/10 transition text-xl"
        >
          ⋯
        </button>
        <AnimatePresence>
          {openLang && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => { changeLang("id"); setOpenLang(false) }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-black/5 ${
                  lang.code === "id" ? "font-semibold" : "text-black/60"
                }`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => { changeLang("en"); setOpenLang(false) }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-black/5 ${
                  lang.code === "en" ? "font-semibold" : "text-black/60"
                }`}
              >
                🇬🇧 English
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOP LOGO */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex max-w-[calc(100vw-5.5rem)] items-center gap-2 sm:gap-3 backdrop-blur bg-white/70 px-3 sm:px-4 py-2 rounded-full shadow">
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
      <div className="relative mt-24 sm:mt-32 flex justify-center select-none">
        <motion.h1
          onClick={handleWDClick}
          whileTap={{ scale: 0.95 }}
          className="text-[24vw] sm:text-[18vw] font-serif leading-none cursor-pointer"
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

      {/* SUBTITLE */}
      <div className="relative z-10 mt-12 w-full px-6 sm:absolute sm:bottom-24 sm:left-12 sm:mt-0 sm:w-auto sm:px-0">
        <h2 className="text-2xl sm:text-4xl font-normal leading-snug">
          {hero.title || lang.subtitle1}
          <br />
          {hero.subtitle || lang.subtitle2}  {/* ✅ ganti description → subtitle */}
        </h2>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-24 right-6 sm:bottom-10 sm:right-10">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border rounded-full flex items-center justify-center text-lg sm:text-xl cursor-pointer hover:bg-black hover:text-white transition">
          ↓
        </div>
      </div>
    </section>
  )
}
