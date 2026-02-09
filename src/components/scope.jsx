import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function Scope() {

  const divisions = [
    "/icon/Workshop.webp",
    "/icon/Prodcution.webp",
    "/icon/Music_Entertaint.webp",
    "/icon/Records.webp",
    "/icon/Event_Organizer.webp",
    "/icon/Wedding_Organizer.webp",
    "/icon/Music_Class.webp",
    "/icon/FUTSAL.webp",
    "/icon/FNB.webp",
  ]

  const [trail, setTrail] = useState([])

  useEffect(() => {
    const handleMove = e => {
      setTrail(prev => {
        const next = [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            logo: divisions[prev.length % divisions.length],
            id: crypto.randomUUID()
          }
        ]
        return next.slice(-6)
      })
    }

    // ✅ TAMBAH EVENT
    window.addEventListener("pointermove", handleMove)

    // ✅ CLEANUP BENAR
    return () => window.removeEventListener("pointermove", handleMove)
  }, [])

  return (
    <section className="relative h-screen bg-black text-white overflow-hidden flex items-center justify-center">

      {/* TEXT */}
      <div className="text-center z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-light">
          Branding, <span className="text-white/40">Animation</span>,
          <br />
          Illustration, Research,
          <br />
          UI/UX, Web, 3D
        </h1>

        <p className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase">
          And More
        </p>
      </div>

      {/* LOGO TRAIL */}
      {createPortal(
        <AnimatePresence>
          {trail.map((item, i) => (
            <motion.img
              key={item.id}
              src={item.logo}
              className="fixed w-16 pointer-events-none z-[9999]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: item.x - 32,
                y: item.y - 32
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </AnimatePresence>,
        document.body
      )}

    </section>
  )
}
