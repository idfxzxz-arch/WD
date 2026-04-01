import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const services = [
  { name: "Multimedia Production", link: "/works#production" },
  { name: "Music Entertainment", link: "/works#music" },
  { name: "Wedding Organizer", link: "/works#wedding" },
  { name: "WD Store", link: "/works#store" },
  { name: "Construction", link: "/works#workshop" },
  { name: "UI/UX Web", link: "/works#web" }
]

const images = [
  "/resources/Wedding/WO/WO1.webp",
  "/resources/Wedding/WO/WO2.webp",
  "/resources/Wedding/WO/WO3.webp",
  "/resources/Wedding/WO/WO4.webp",
  "/resources/Wedding/WO/WO5.webp",
  "/resources/Wedding/WO/WO6.webp"
]

export default function Scope() {
  const sectionRef = useRef(null)
  const [items, setItems] = useState([])
  const indexRef = useRef(0)
  const lastMove = useRef(0)

  useEffect(() => {
    const handleMove = (e) => {
      const now = Date.now()

      // 🚀 throttle biar gak brutal
      if (now - lastMove.current < 80) return
      lastMove.current = now

      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const newItem = {
          id: now,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          img: images[indexRef.current % images.length],
          rotate: Math.random() * 30 - 15,
          scale: 0.8 + Math.random() * 0.4
        }

        indexRef.current++

        setItems((prev) => {
          const updated = [...prev, newItem]
          return updated.slice(-12) // 🔥 limit max item
        })
      }
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  const handleClick = (link) => {
    if (link.startsWith("#")) {
      const el = document.querySelector(link)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = link
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 🔥 FLOATING IMAGES */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence>
          {items.map((item) => (
            <motion.img
              key={item.id}
              src={item.img}
              className="absolute w-24 h-24 object-cover rounded-xl"
              style={{
                top: item.y,
                left: item.x,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ opacity: 0, scale: 0.6, rotate: item.rotate }}
              animate={{ opacity: 0.9, scale: item.scale, rotate: item.rotate }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 🔥 TEXT */}
      <div className="relative z-20 flex flex-col items-center text-center gap-5 text-white px-4">

        {services.map((item, i) => (
          <motion.span
            key={i}
            onClick={() => handleClick(item.link)}
            whileHover={{ scale: 1.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light cursor-pointer opacity-70 hover:opacity-100 transition"
          >
            {item.name}
          </motion.span>
        ))}

        <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/40">
          And more
        </div>

      </div>
    </section>
  )
}