import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { motion as Motion } from "framer-motion"
import { Home, BriefcaseBusiness, Layers3, UserRound, MessageSquare } from "lucide-react"
import { scrollTo } from "../hook/useScrollTo"
import { LanguageContext } from "../context/LanguageContext"

export default function Navbar() {
  const { lang } = useContext(LanguageContext)

  const menus = useMemo(() => [
    { label: "Home", value: "Home", id: "home", icon: Home },
    { label: lang.navAbout || "About", value: "About", id: "about", icon: UserRound },
    { label: lang.navWorks || "Works", value: "Works", id: "works", icon: BriefcaseBusiness },
    { label: lang.navScope || "Scope", value: "Scope", id: "scope", icon: Layers3 },
    { label: lang.navContact || "Contact", value: "Contact", id: "contact", icon: MessageSquare },
  ], [lang])

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
      { threshold: 0.25 }
    )
    sections.forEach(sec => sec && observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  const handleSelect = useCallback((item) => {
    setActive(item.value)
    scrollTo(item.id)
  }, [])

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[9999] flex w-full justify-center px-3 sm:bottom-3.5 lg:bottom-6 pointer-events-none"
    >
      <nav
        aria-label="Navigasi Utama"
        className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 rounded-full border border-white/15 bg-[#101014]/92 p-1 sm:p-1.5 lg:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(255,255,255,0.06)] backdrop-blur-2xl ring-1 ring-white/5"
      >
        {/* LOGO BADGE (DI KIRI) */}
        <button
          type="button"
          onClick={() => {
            setActive("Home")
            scrollTo("home")
          }}
          aria-label="WD Group Home"
          className="group relative flex h-8 w-8 sm:h-9 sm:w-9 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full bg-white p-1 sm:p-1.5 shadow-md shadow-white/10 ring-2 ring-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <img
            src="/wd-group-logo.webp"
            alt="WD Group"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/logo.webp"
            }}
          />
        </button>

        {/* DIVIDER */}
        <div className="h-4 sm:h-5 lg:h-6 w-px bg-white/15 mx-0.5 shrink-0" />

        {/* NAV ITEMS */}
        <div className="flex items-center gap-0.5 sm:gap-0.5 lg:gap-1">
          {menus.map((item) => {
            const Icon = item.icon
            const isActive = active === item.value

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex min-w-[40px] sm:min-w-[46px] lg:min-w-[54px] flex-col items-center justify-center px-1.5 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/85"
                }`}
              >
                {/* ACTIVE PILL HIGHLIGHT */}
                {isActive && (
                  <Motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.12)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}

                {/* ICON & DOT */}
                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-[17px] lg:w-[17px] transition-transform duration-300 ${
                      isActive ? "scale-105 lg:scale-110 text-white" : "text-white/60"
                    }`}
                  />
                  {/* ACTIVE GLOWING DOT INDICATOR */}
                  {isActive ? (
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                  ) : (
                    <span className="mt-0.5 h-1 w-1 opacity-0" />
                  )}
                </div>

                {/* LABEL */}
                <span
                  className={`relative z-10 text-[8px] sm:text-[9px] lg:text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                    isActive ? "font-bold text-white" : "font-medium text-white/45"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </Motion.div>
  )
}
