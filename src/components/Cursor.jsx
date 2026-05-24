import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] w-3 h-3 bg-white rounded-full pointer-events-none"
      style={{ mixBlendMode: "difference" }}
      animate={{
        x: pos.x - 6,
        y: pos.y - 6,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.08, ease: "easeOut" }}
    />
  )
}