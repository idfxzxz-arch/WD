import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("about")

  const menu = [
    { label: "About", id: "about" },
    { label: "Divisions", id: "divisions" },
    { label: "Showcase", id: "showcase" },
    { label: "Vision", id: "vision" },
    { label: "Contact", id: "contact" }
  ]

  /* NAVBAR SHRINK */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* PERFECT SCROLL SPY */
  useEffect(() => {
    const handler = () => {
      const middle = window.scrollY + window.innerHeight / 2

      menu.forEach(item => {
        const el = document.getElementById(item.id)
        if (!el) return

        const top = el.offsetTop
        const bottom = top + el.offsetHeight

        if (middle >= top && middle <= bottom) {
          setActive(item.id)
        }
      })
    }

    window.addEventListener("scroll", handler)
    handler()

    return () => window.removeEventListener("scroll", handler)
  }, [])

  /* SMOOTH SCROLL */
  const scrollTo = id => {
    const el = document.getElementById(id)
    if (!el) return

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      90

    window.scrollTo({
      top: y,
      behavior: "smooth"
    })

    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-black/80 backdrop-blur shadow-xl h-14"
          : "bg-transparent h-20"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center text-white">

          <h1 className="font-bold text-xl">WD Company</h1>

          {/* DESKTOP */}
          <ul className="hidden md:flex gap-10 text-sm font-medium">

            {menu.map(item => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`transition ${
                    active === item.id
                      ? "text-blue-400"
                      : "hover:text-blue-400"
                  }`}
                >
                  {item.label.toUpperCase()}
                </button>

                {active === item.id && (
                  <>
                    <motion.span
                      layoutId="dot"
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2
                      w-2 h-2 rounded-full bg-blue-400"
                    />

                    <motion.span
                      layoutId="line"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-blue-400"
                    />
                  </>
                )}
              </li>
            ))}

          </ul>

          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>

        </div>
      </motion.nav>

      {/* MOBILE */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed inset-0 z-50 bg-black flex flex-col"
            >
              <div className="flex justify-between p-6 text-white">
                WD Company
                <X onClick={() => setOpen(false)} />
              </div>

              <ul className="flex-1 flex flex-col justify-center items-center gap-10">
                {menu.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-2xl tracking-widest ${
                      active === item.id ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </button>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
