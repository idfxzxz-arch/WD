import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const menus = ["Home", "About", "Scope", "Contact"]

  const [visible, setVisible] = useState(true)
  const [active, setActive] = useState("Home")

  const lastScrollY = useRef(0)

  /* ===========================
     AUTO HIDE
  ============================ */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY

      if (current > lastScrollY.current && current > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll)
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
          const name = id.charAt(0).toUpperCase() + id.slice(1)
          setActive(name)
        })
      },
      { threshold: 0.3 }
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
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:w-auto"
        >
          <nav
            className="
              relative backdrop-blur bg-white/80 shadow-xl border border-black/5
              rounded-full px-3 sm:px-5 py-2 flex gap-2 sm:gap-6
              text-sm font-medium
            "
          >
            {menus.map(menu => {
              const id = menu.toLowerCase()
              const isActive = active === menu

              return (
                <a
                  key={menu}
                  href={`#${id}`}
                  onClick={() => setActive(menu)}
                  className="relative px-4 py-2 rounded-full"
                >
                  {/* 💧 LIQUID HIGHLIGHT */}
                  {isActive && (
                    <motion.span
                      layoutId="liquid"
                      className="absolute inset-0 rounded-full bg-black/10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      style={{
                        filter: "blur(6px)",
                      }}
                    />
                  )}

                  {/* isi */}
                  <span
                    className={`relative z-10 transition ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-black/60"
                    }`}
                  >
                    {menu}
                  </span>
                </a>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}