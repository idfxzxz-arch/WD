import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const services = [
  { name: "Multimedia Production", link: "/works#production" },
  { name: "Music Entertainment", link: "/works#music" },
  { name: "Wedding Organizer", link: "/works#wedding" },
  { name: "WD Store", link: "/works#store" },
  { name: "Construction", link: "/works#workshop" },
  { name: "UI/UX Web", link: "/works#web" }
]

const imageSrcs = [
  "/resources/Wedding/WO/WO1.webp",
  "/resources/Wedding/WO/WO2.webp",
  "/resources/Wedding/WO/WO3.webp",
  "/resources/Wedding/WO/WO4.webp",
  "/resources/Wedding/WO/WO5.webp",
  "/resources/Wedding/WO/WO6.webp"
]

export default function Scope() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const particles = useRef([])
  const rafRef = useRef(null)
  const lastMove = useRef(0)
  const imgIndexRef = useRef(0)

  useEffect(() => {
    // Preload semua gambar
    imageSrcs.forEach((src, i) => {
      const img = new Image()
      img.src = src
      imagesRef.current[i] = img
    })

    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Loop animasi
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.opacity > 0.01)

      particles.current.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotate * Math.PI) / 180)

        // Rounded rect clip
        const w = p.size
        const h = p.size * 1.2
        const r = 10
        ctx.beginPath()
        ctx.moveTo(-w / 2 + r, -h / 2)
        ctx.lineTo(w / 2 - r, -h / 2)
        ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
        ctx.lineTo(w / 2, h / 2 - r)
        ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
        ctx.lineTo(-w / 2 + r, h / 2)
        ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
        ctx.lineTo(-w / 2, -h / 2 + r)
        ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
        ctx.closePath()
        ctx.clip()

        if (p.img.complete) {
          ctx.drawImage(p.img, -w / 2, -h / 2, w, h)
        }

        ctx.restore()

        // Fade out
        p.opacity -= 0.008
        p.y -= 0.3
      })

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastMove.current < 80) return
      lastMove.current = now

      const rect = section.getBoundingClientRect()
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const img = imagesRef.current[imgIndexRef.current % imageSrcs.length]
      imgIndexRef.current++

      particles.current.push({
        x: x + (Math.random() - 0.5) * 60,
        y: y + (Math.random() - 0.5) * 40,
        img,
        size: 80 + Math.random() * 60,
        rotate: Math.random() * 40 - 20,
        opacity: 0.85,
      })

      // Batasi jumlah partikel
      if (particles.current.length > 20) {
        particles.current = particles.current.slice(-20)
      }
    }

    window.addEventListener("mousemove", handleMove)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleClick = (link) => {
    if (link.startsWith("#")) {
      const el = document.querySelector(link)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = link
    }
  }

  return (
    <section
      id="scope"
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Canvas — semua gambar digambar di sini */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* TEXT */}
      <div className="relative z-20 flex flex-col items-center text-center gap-5 text-white px-4">
        {services.map((item, i) => (
          <motion.span
            key={i}
            onClick={() => handleClick(item.link)}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light cursor-pointer opacity-40 hover:opacity-100 transition-all duration-300"
          >
            {item.name}
          </motion.span>
        ))}
        <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/30">
          And more
        </div>
      </div>
    </section>
  )
}