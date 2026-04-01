import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageContext } from "../context/LanguageContext"

export default function Home() {
  const [showFloating, setShowFloating] = useState(false)
  const [openLang, setOpenLang] = useState(false)
  const { lang, changeLang } = useContext(LanguageContext)

  // 🔥 auto close kalau klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".lang-menu")) {
        setOpenLang(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center">

      {/* 🌐 LANGUAGE (ELLIPSIS) */}
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
                onClick={() => {
                  changeLang("id")
                  setOpenLang(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-black/5 ${
                  lang.code === "id" ? "font-semibold" : "text-black/60"
                }`}
              >
                🇮🇩 Indonesia
              </button>

              <button
                onClick={() => {
                  changeLang("en")
                  setOpenLang(false)
                }}
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
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20
  flex items-center gap-3
  backdrop-blur bg-white/70
  px-4 py-2
  rounded-full shadow">
        
        <img src="/logo.webp" className="w-6 h-6" />
        <span className="text-sm font-semibold">
          {lang.company}
        </span>
      </div>

      {/* WRAPPER WD */}
      <div className="relative mt-32 flex justify-center">

        <AnimatePresence>
          {showFloating && (
            <motion.div
              initial={{ scale: 0, y: -100 }}
              animate={{ scale: 1, y: "-10%" }}
              exit={{ scale: 0, y: -100 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2
              w-24 h-24 bg-orange-500 rounded-full
              flex items-center justify-center shadow-2xl z-10"
            >
              <img src="/logo.webp" className="w-12 h-12" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          onClick={() => setShowFloating(!showFloating)}
          whileTap={{ scale: 0.95 }}
          className="text-[18vw] font-serif leading-none select-none cursor-pointer"
        >
          WD
        </motion.h1>

      </div>

      {/* Subtitle */}
      <div className="max-w-5xl mx-auto px-6 mt-10 text-center">
        <h2 className="text-4xl font-semibold">
          {lang.subtitle1} <br /> {lang.subtitle2}
        </h2>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 right-10">
        <div className="w-16 h-16 border rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-black hover:text-white transition">
          ↓
        </div>
      </div>

    </section>
  )
}