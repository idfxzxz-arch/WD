import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // MENU FIX (label ≠ id)
  const menu = [
    { label: "About", id: "about" },
    { label: "Divisions", id: "divisions" },
    { label: "Vision", id: "vision" },
    { label: "Contact", id: "contact" }
  ]

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all
          ${scrolled
            ? "bg-black/70 backdrop-blur-md shadow-lg"
            : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
          <h1 className="font-bold text-xl tracking-wide">WD Company</h1>

          {/* DESKTOP */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {menu.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-blue-400 transition relative
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                >
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU – ULTRA PREMIUM */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            />

            {/* FULLSCREEN PANEL */}
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                fixed inset-0 z-50
                bg-gradient-to-b from-black via-gray-950 to-black
                flex flex-col
              "
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  WD Company
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X size={28} className="text-white" />
                </button>
              </div>

              {/* GLOW */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2
                              w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />

              {/* MENU */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <ul className="space-y-8 text-center">
                  {menu.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className="
                          text-2xl font-semibold
                          tracking-widest
                          text-white
                          hover:text-blue-400
                          transition
                        "
                      >
                        {item.label.toUpperCase()}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-16 text-sm text-gray-400 text-center px-10">
                  Creative • Media • Events • Business Solutions
                </p>
              </div>

              {/* CTA */}
              <div className="px-6 pb-10">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="
                    block w-full text-center
                    bg-blue-600 hover:bg-blue-500
                    text-white py-4 rounded-2xl
                    font-semibold tracking-wide
                    transition
                  "
                >
                  Contact WD Company
                </a>

                <p className="text-center text-xs text-gray-500 mt-4">
                  © {new Date().getFullYear()} WD Jaya Group
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
