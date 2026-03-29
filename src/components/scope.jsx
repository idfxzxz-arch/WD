import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
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
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center">
      <h1 className="flex flex-wrap justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light leading-snug text-center max-w-4xl mx-auto px-4 gap-x-4 gap-y-3">
        
        {services.map((item, i) => (
          <Word key={i} item={item} mouseX={mouseX} mouseY={mouseY} />
        ))}

        <div className="w-full text-center mt-6 text-xs tracking-[0.3em] uppercase text-white/40">
          And more
        </div>
      </h1>
    </section>
  )
}

function Word({ item, mouseX, mouseY }) {
  const ref = useRef(null)
  const navigate = useNavigate()

  const [style, setStyle] = useState({
    opacity: 0.3,
    scale: 1,
    color: "#737373"
  })

  useMotionValueEvent(mouseX, "change", () => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const dx = mouseX.get() - centerX
    const dy = mouseY.get() - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const strength = Math.max(0, 1 - distance / 140)

    setStyle({
      opacity: 0.3 + strength * 0.7,
      scale: 1 + strength * 0.1,
      color: strength > 0.5 ? "#ffffff" : "#737373"
    })
  })

  const handleClick = () => {
  if (item.link.startsWith("#")) {
    const el = document.querySelector(item.link)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  } else {
    // 🔥 PAKSA FULL NAVIGASI + HASH
    window.location.href = item.link
  }
}

  return (
    <motion.span
      ref={ref}
      onClick={handleClick}
      animate={style}
      transition={{ duration: 0.2 }}
      className="cursor-pointer whitespace-nowrap px-2 py-1"
    >
      {item.name}
    </motion.span>
  )
}