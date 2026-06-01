import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { CalendarHeart, Code2, GraduationCap, Mic2, Sparkles, Video, ArrowRight } from "lucide-react"
import { supabase } from "../lib/supabase"

const SERVICE_META = {
  wedding: {
    title: "Wedding Organizer",
    brand: "WD Sky Wedding",
    desc: "Perencanaan, vendor coordination, dan eksekusi detail untuk momen pernikahan.",
    link: "/wedding",
    icon: CalendarHeart,
    accent: "#c89f67",
  },
  event: {
    title: "Event Organizer",
    brand: "WD Event",
    desc: "Konsep acara, rundown, koordinasi vendor, dan kontrol lapangan.",
    link: "/event",
    icon: Sparkles,
    accent: "#6366f1",
  },
  production: {
    title: "Creative Production",
    brand: "WD Production",
    desc: "Foto, video, dokumentasi, dan visual komersial untuk brand maupun acara.",
    link: "/production",
    icon: Video,
    accent: "#f59e0b",
  },
  music: {
    title: "Music Entertainment",
    brand: "WD Music",
    desc: "Performance, kelas musik, recording, dan dukungan talent panggung.",
    link: "/music",
    icon: Mic2,
    accent: "#a855f7",
  },
  workshop: {
    title: "Workshop Program",
    brand: "WD Jaya Workshop",
    desc: "Program praktik, kelas, dan pelatihan dengan output yang bisa digunakan.",
    link: "/workshop",
    icon: GraduationCap,
    accent: "#22c55e",
  },
  it: {
    title: "Digital Solution",
    brand: "WD IT",
    desc: "Website, aplikasi, sistem internal, dan dukungan teknis untuk bisnis.",
    link: "/it",
    icon: Code2,
    accent: "#0ea5e9",
  },
}

const ORDER = ["wedding", "event", "production", "music", "workshop", "it"]

function getCategory(item) {
  const source = `${item.name || ""} ${item.link || ""}`.toLowerCase()
  if (source.includes("wedding")) return "wedding"
  if (source.includes("event")) return "event"
  if (source.includes("production")) return "production"
  if (source.includes("music")) return "music"
  if (source.includes("workshop")) return "workshop"
  if (source.includes("it") || source.includes("digital") || source.includes("website") || source.includes("store")) return "it"
  return null
}

export default function Scope() {
  const [scopeItems, setScopeItems] = useState([])
  const [activeId, setActiveId] = useState("wedding")

  useEffect(() => {
    supabase
      .from("scope_services")
      .select("*")
      .order("order_index")
      .then(({ data }) => setScopeItems(data || []))
  }, [])

  const services = useMemo(() => {
    const existing = new Set(scopeItems.map(getCategory).filter(Boolean))
    const keys = ORDER.filter((key) => existing.size === 0 || existing.has(key))
    return keys.map((key) => ({ id: key, ...SERVICE_META[key] }))
  }, [scopeItems])

  const active = services.find((item) => item.id === activeId) || services[0] || SERVICE_META.wedding

  const goTo = (link) => {
    window.location.href = link
  }

  return (
    <section id="scope" className="relative overflow-hidden bg-black px-5 py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.13),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(200,159,103,0.14),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[length:72px_72px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            Scope Of Work
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Six divisions, one creative ecosystem.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
            WD Group menghubungkan event, wedding, produksi visual, musik, workshop, dan solusi digital dalam satu sistem kerja yang rapi.
          </p>

          <button
            type="button"
            onClick={() => goTo(active.link)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/86"
          >
            View {active.brand}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="relative hidden min-h-[700px] items-start justify-center pt-10 lg:flex">
          <div className="absolute z-0 h-[430px] w-[430px] rounded-full border border-white/10" />
          <div className="absolute z-0 h-[300px] w-[300px] rounded-full border border-white/10" />
          <div className="absolute z-0 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-black/75 text-center text-[11px] font-black uppercase leading-tight tracking-[-0.04em] text-white shadow-2xl backdrop-blur">
            WD<br />Group
          </div>

          {services.map((item, index) => {
            const angle = (index / services.length) * Math.PI * 2 - Math.PI / 2
            const x = Math.cos(angle) * 245
            const y = Math.sin(angle) * 205
            const Icon = item.icon
            const isActive = active.id === item.id

            return (
              <div
                key={item.id}
                className="absolute z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(43% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className="flex min-w-[245px] items-center gap-3 rounded-full border px-4 py-3 text-left backdrop-blur transition"
                  style={{
                    borderColor: isActive ? item.accent : "rgba(255,255,255,0.16)",
                    background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                    boxShadow: isActive ? `0 0 38px ${item.accent}45` : "none",
                  }}
                  whileHover={{ scale: 1.04 }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: item.accent, color: "#050505" }}>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">{item.title}</span>
                    <span className="block truncate text-[11px] uppercase tracking-[0.16em] text-white/45">{item.brand}</span>
                  </span>
                </motion.button>
              </div>
            )
          })}

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-1/2 z-20 w-[420px] -translate-x-1/2 rounded-2xl border border-white/12 bg-black/70 p-5 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: active.accent }}>
              {active.brand}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{active.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{active.desc}</p>
          </motion.div>
        </div>

        <div className="grid gap-3 lg:hidden">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => goTo(item.link)}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: item.accent, color: "#050505" }}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-white">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-white/48">{item.desc}</span>
                </span>
                <ArrowRight size={17} className="text-white/45" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
