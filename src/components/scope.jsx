import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const services = [
  "Creative Workshop",
  "Production",
  "Music Entertainment",
  "Records",
  "Event & Wedding Organizer",
  "Music Education",
  "Sports & Lifestyle",
  "Food & Beverage",
]

export default function Scope() {
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const [cursorX, setCursorX] = useState(null)

  useEffect(() => {
    const handleMove = e => {
      setCursorX(e.clientX)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section
      id="scope"
      ref={containerRef}
      className="relative h-screen bg-black flex items-center justify-center"
    >
      <h1 className="text-4xl md:text-6xl font-light leading-[1.15] text-center max-w-5xl px-6">
        {services.map((text, i) => (
          <Word
            key={i}
            text={text}
            cursorX={cursorX}
            ref={el => (wordRefs.current[i] = el)}
          />
        ))}

        <div className="mt-10 text-xs tracking-[0.35em] uppercase text-white/40">
          Move your cursor
        </div>
      </h1>
    </section>
  )
}

/* ===================== */
/* WORD COMPONENT */
/* ===================== */

const Word = ({ text, cursorX }, ref) => {
  const localRef = useRef(null)

  const [style, setStyle] = useState({
    opacity: 0.3,
    scale: 1,
  })

  useEffect(() => {
    if (!cursorX || !localRef.current) return

    const rect = localRef.current.getBoundingClientRect()
    const wordCenter = rect.left + rect.width / 2
    const distance = Math.abs(cursorX - wordCenter)

    const influence = 220
    const strength = Math.max(0, 1 - distance / influence)

    setStyle({
      opacity: 0.25 + strength * 0.75,
      scale: 1 + strength * 0.06,
    })
  }, [cursorX])

  return (
    <motion.span
      ref={localRef}
      animate={style}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-block mr-3 text-white"
    >
      {text},
    </motion.span>
  )
}
