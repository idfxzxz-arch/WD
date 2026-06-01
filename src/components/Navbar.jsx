import { useState, useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { scrollTo } from "../hook/useScrollTo"
import { LanguageContext } from "../context/LanguageContext"

export default function Navbar() {
  const { lang } = useContext(LanguageContext)

  const menus = [
    {
      label: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: "Home",
      id: "home",
    },
    { label: lang.navAbout || "About", value: "About", id: "about" },
    { label: lang.navWorks || "Works", value: "Works", id: "works" },
    { label: lang.navScope || "Scope", value: "Scope", id: "scope" },
    { label: lang.navContact || "Contact", value: "Contact", id: "contact" },
  ]

  const [active, setActive] = useState("Home")

  useEffect(() => {
    const sections = ["home", "about", "works", "scope", "contact"].map(id =>
      document.getElementById(id)
    )
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          setActive(id.charAt(0).toUpperCase() + id.slice(1))
        })
      },
      { threshold: 0.2 }
    )
    sections.forEach(sec => sec && observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id, value) => {
    setActive(value)
    scrollTo(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-3 sm:bottom-6 z-[9999] w-full px-3 flex justify-center"
    >
      <nav className="flex w-full max-w-[23rem] sm:w-auto sm:max-w-fit items-center justify-between sm:justify-center gap-0.5 sm:gap-1 bg-white/95 backdrop-blur border border-black/8 shadow-lg rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2">
        {menus.map(({ label, value, id }) => {
          const isActive = active === value
          return (
            <button
              key={value}
              onClick={() => handleClick(id, value)}
              className="relative min-w-0 flex-1 sm:flex-none px-2 sm:px-4 py-2 rounded-full text-[10px] min-[390px]:text-[11px] sm:text-sm font-medium overflow-hidden"
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-black"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {typeof label === "string" ? (
                <motion.span
                  className={`relative z-10 block truncate ${isActive ? "text-white" : "text-black/40"}`}
                  whileHover={{ rotateX: 360 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {label}
                </motion.span>
              ) : (
                <span className={`relative z-10 flex items-center justify-center ${isActive ? "text-white" : "text-black/40"}`}>
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </motion.div>
  )
}
