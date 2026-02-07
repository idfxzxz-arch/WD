import { useState, useRef } from "react"

export default function Navbar() {
  const menus = ["team", "About", "scope", "contact"]
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

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        ref={containerRef}
        onMouseLeave={() => setStyle(null)}
        className="relative backdrop-blur bg-white/80 shadow-xl border border-black/5 rounded-full px-4 py-2 flex gap-6 text-sm font-medium"
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
    onMouseEnter={handleHover}
    onClick={() => {
      document
        .getElementById(menu.toLowerCase())
        ?.scrollIntoView({ behavior: "smooth" })
    }}
    className="relative z-10 capitalize px-4 py-1"
  >
    {menu}
  </button>
))}


      </nav>
    </div>
  )
}
