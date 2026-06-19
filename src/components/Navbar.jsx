import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { motion as Motion } from "framer-motion"
import { ArrowUp, BriefcaseBusiness, Contact, Layers3, UserRound } from "lucide-react"
import { scrollTo } from "../hook/useScrollTo"
import { LanguageContext } from "../context/LanguageContext"
import ExpandableTabs from "./ui/ExpandableTabs"

export default function Navbar() {
  const { lang } = useContext(LanguageContext)

  const menus = useMemo(() => [
    {
      label: "Home",
      value: "Home",
      id: "home",
      icon: ArrowUp,
    },
    { label: lang.navAbout || "About", value: "About", id: "about", icon: UserRound },
    { label: lang.navWorks || "Works", value: "Works", id: "works", icon: BriefcaseBusiness },
    { label: lang.navScope || "Scope", value: "Scope", id: "scope", icon: Layers3 },
    { label: lang.navContact || "Contact", value: "Contact", id: "contact", icon: Contact },
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
      { threshold: 0.2 }
    )
    sections.forEach(sec => sec && observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  const handleChange = useCallback((index) => {
    if (index === null) return
    const menu = menus[index]
    setActive(menu.value)
    scrollTo(menu.id)
  }, [menus])

  const activeIndex = menus.findIndex((menu) => menu.value === active)

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[9999] flex w-full justify-center px-3 sm:bottom-6"
    >
      <ExpandableTabs
        tabs={menus}
        activeIndex={activeIndex}
        onChange={handleChange}
      />
    </Motion.div>
  )
}
