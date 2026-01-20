import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all
          ${scrolled
            ? "bg-black/70 backdrop-blur-md shadow-lg"
            : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
          <h1 className="font-bold text-xl tracking-wide">WD Company</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {["about", "services", "vision", "contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="hover:text-blue-400 transition relative
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                  after:w-0 after:bg-blue-400 hover:after:w-full after:transition-all"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          {/* ✅ MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden hover:scale-110 transition"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Slide Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 w-72 h-full bg-gray-950 z-50 p-6"
            >
              <div className="flex justify-between mb-10 text-white">
                <span className="font-bold">WD Company</span>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <ul className="space-y-6 text-lg text-white">
                {["about", "services", "vision", "contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setOpen(false)}
                      className="hover:text-blue-400 transition"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
