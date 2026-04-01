import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const services = [
  { name: "Multimedia", link: "#multimedia" },
  { name: "Music Entertainment & Education", link: "#music" },
  { name: "Wedding Organizer", link: "/wedding" },
  { name: "UI/UX Web", link: "#development" },
  { name: "Branding & Digital Store", link: "#marketing" }
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

  useEffect(() => {
    let index = 0

    const handleMove = (e) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const newItem = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          img: images[index % images.length],
          rotate: Math.random() * 20 - 10
        }

        index++
        setItems((prev) => [...prev, newItem])

        setTimeout(() => {
          setItems((prev) => prev.slice(1))
        }, 800)
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
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.img}
            className="absolute w-24 h-24 object-cover rounded-xl opacity-80"
            style={{
              top: item.y,
              left: item.x,
              transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* 🔥 TEXT VERTICAL */}
      <div className="relative z-20 flex flex-col items-center text-center gap-4 text-white px-4">

        {services.map((item, i) => (
          <span
            key={i}
            onClick={() => handleClick(item.link)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition"
          >
            {item.name}
          </span>
        ))}

        <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/40">
          And more
        </div>

      </div>
    </section>
  )
}