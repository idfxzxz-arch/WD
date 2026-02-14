import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const menus = ["Home", "About", "Scope", "Contact"]
  const [style, setStyle] = useState(null)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef(null)
  const lastScrollY = useRef(0)

  const handleHover = e => {
    if (!e?.target || !containerRef.current) return

    const rect = e.target.getBoundingClientRect()
    const parent = containerRef.current.getBoundingClientRect()

    setStyle({
      width: rect.width,
      left: rect.left - parent.left,
    })
  }

  /* ===========================
     AUTO HIDE ON SCROLL
  ============================ */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY

      if (current > lastScrollY.current && current > 80) {
        setVisible(false) // scroll down
      } else {
        setVisible(true) // scroll up
      }

      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ===========================
     SCROLLSPY
  ============================ */
  useEffect(() => {
    const sections = menus.map(m =>
      document.getElementById(m.toLowerCase())
    )

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const id = entry.target.id
          const btn = document.querySelector(
            `[data-menu="${id.charAt(0).toUpperCase() + id.slice(1)}"]`
          )

          if (btn) handleHover({ target: btn })
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach(sec => sec && observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:w-auto"
        >
          <nav
            ref={containerRef}
            className="
              relative backdrop-blur bg-white/80 shadow-xl border border-black/5
              rounded-full px-3 sm:px-5 py-2
              flex justify-between sm:justify-center
              gap-1 sm:gap-6
              text-xs sm:text-sm font-medium
              overflow-hidden
            "
          >
            {style && (
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute top-1 bottom-1 bg-black/10 rounded-full"
                style={{
                  width: style.width,
                  left: style.left,
                }}
              />
            )}

            {menus.map(menu => {
              const id = menu.toLowerCase()

              return (
                <a
                  key={menu}
                  href={`#${id}`}
                  data-menu={menu}
                  onMouseEnter={handleHover}
                  className="relative z-10 capitalize px-3 sm:px-4 py-1 whitespace-nowrap"
                >
                  {menu}
                </a>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
