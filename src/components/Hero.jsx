import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showFloating, setShowFloating] = useState(false)

  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center">

      {/* TOP LOGO (TIDAK DIKLIK LAGI) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2
        flex items-center gap-3
        backdrop-blur bg-white/70
        px-4 py-2
        rounded-full shadow">
        
        <img src="/logo.webp" className="w-6 h-6" />
        <span className="text-sm font-semibold">WD Group Company</span>
      </div>

      {/* WRAPPER WD (BIAR POSISI RELATIVE KE SINI) */}
      <div className="relative mt-32 flex justify-center">

        {/* FLOATING ELEMENT */}
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

        {/* WD TEXT (INI YANG DIKLIK) */}
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
          A Passionate <br /> Creative Agency
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