import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const services = [
  { name: "Multimedia & Production", link: "#multimedia" },
  { name: "Music Entertainment & Education", link: "#music" },
  { name: "Event & Wedding Organizer", link: "/works#wedding" },
  { name: "UI/UX, Web & Mobile Development", link: "#development" },
  { name: "Branding & Digital Marketing", link: "#marketing" },
  { name: "Creative Workshop & Training", link: "/works#workshop" }
]

export default function Scope() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section
      id="scope"
      className="relative h-screen bg-black flex items-center justify-center"
    >
      <h1 className="text-4xl md:text-6xl font-light leading-[1.2] text-center max-w-5xl px-6">
        {services.map((item, i) => (
          <Word key={i} item={item} cursor={cursor} />
        ))}

        <div className="mt-10 text-xs tracking-[0.35em] uppercase text-white/40">
          And more
        </div>
      </h1>
    </section>
  )
}

/* ===================== */
/* WORD COMPONENT */
/* ===================== */

function Word({ item, cursor }) {
  const ref = useRef(null)
  const navigate = useNavigate()

  const [style, setStyle] = useState({
    opacity: 0.3,
    scale: 1,
    color: "#737373"
  })

  useEffect(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = cursor.x - centerX
    const dy = cursor.y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const influence = 120
    const strength = Math.max(0, 1 - distance / influence)

    setStyle({
      opacity: 0.3 + strength * 0.7,
      scale: 1 + strength * 0.08,
      color: strength > 0.5 ? "#ffffff" : "#737373"
    })
  }, [cursor])

  const handleClick = () => {
    if (item.link.startsWith("#")) {
      // scroll dalam halaman
      const target = document.querySelector(item.link)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // pindah halaman
      navigate(`/${item.link}`)
    }
  }

  return (
    <motion.span
      ref={ref}
      onClick={handleClick}
      animate={style}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-block mr-3 cursor-pointer"
    >
      {item.name},
    </motion.span>
  )
}