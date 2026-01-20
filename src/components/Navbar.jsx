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

  const menu = ["about", "services", "divisions", "vision", "contact"]

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
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="hover:text-blue-400 transition relative
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                >
                  {item.toUpperCase()}
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* PANEL */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 w-72 h-full bg-gray-950 z-50 p-6"
            >
              <div className="flex items-center justify-between mb-10 text-white">
                <span className="font-bold text-lg">WD Company</span>
                <button onClick={() => setOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <ul className="space-y-6 text-lg text-white">
                {menu.map(item => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setOpen(false)}
                      className="block hover:text-blue-400 transition"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
