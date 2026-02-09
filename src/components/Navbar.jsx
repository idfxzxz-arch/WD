import { useState, useRef } from "react"

export default function Navbar() {
  const menus = ["Home", "About", "Scope", "Contact"]
  const [style, setStyle] = useState(null)
  const containerRef = useRef()

  const handleHover = e => {
    const rect = e.target.getBoundingClientRect()
    const parent = containerRef.current.getBoundingClientRect()

    setStyle({
      width: rect.width,
      left: rect.left - parent.left,
    })
  }

  const handleClick = menu => {
    document
      .getElementById(menu.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" })

    // mobile active
    const el = document.querySelector(`[data-menu="${menu}"]`)
    handleHover({ target: el })
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:w-auto">

      <nav
        ref={containerRef}
        onMouseLeave={() => setStyle(null)}
        className="
        relative backdrop-blur bg-white/80 shadow-xl border border-black/5
        rounded-full px-3 sm:px-5 py-2
        flex justify-between sm:justify-center
        gap-1 sm:gap-6
        text-xs sm:text-sm font-medium
        overflow-hidden
        "
      >

        {/* Hover pill */}
        {style && (
          <span
            className="absolute top-1 bottom-1 bg-black/10 rounded-full transition-all duration-200 ease-out"
            style={{
              width: style.width,
              left: style.left,
            }}
          />
        )}

        {menus.map(menu => (
          <button
            key={menu}
            data-menu={menu}
            onMouseEnter={handleHover}
            onClick={() => handleClick(menu)}
            className="relative z-10 capitalize px-3 sm:px-4 py-1 whitespace-nowrap"
          >
            {menu}
          </button>
        ))}

      </nav>
    </div>
  )
}
