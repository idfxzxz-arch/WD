import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { CalendarHeart, Code2, GraduationCap, Mic2, Sparkles, Video, ArrowRight, Link, Zap } from "lucide-react"
import { supabase } from "../lib/supabase"
import { getDivisionStaticWorks } from "./DivisionLayout"

const MotionDiv = motion.div

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
    desc: "Inovasi kompor oli bekas hemat bahan bakar hingga 85%, blower super, dan custom unit usaha.",
    link: "/workshop",
    icon: GraduationCap,
    accent: "#22c55e",
  },
  it: {
    title: "Digital Solution",
    brand: "WD IT",
    desc: "Jasa pembuatan website Solo, web developer Solo Raya, toko online e-commerce, web app, dan undangan digital.",
    link: "/it",
    icon: Code2,
    accent: "#0ea5e9",
  },
}

const ORDER = ["wedding", "event", "production", "music", "workshop", "it"]
const RELATED = {
  wedding: ["event", "production"],
  event: ["wedding", "music", "production"],
  production: ["event", "music", "it"],
  music: ["event", "production", "workshop"],
  workshop: ["music", "it"],
  it: ["production", "workshop"],
}
const STATUS = {
  wedding: "complete",
  event: "complete",
  production: "complete",
  music: "complete",
  workshop: "complete",
  it: "complete",
}
const ENERGY = {
  wedding: 100,
  event: 100,
  production: 100,
  music: 100,
  workshop: 100,
  it: 100,
}

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
  const [worksData, setWorksData] = useState([])
  const [activeId, setActiveId] = useState("wedding")
  const [expandedId, setExpandedId] = useState(null)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    let mounted = true

    Promise.all([
      supabase.from("scope_services").select("*").order("order_index"),
      supabase.from("works").select("*").order("order_index"),
    ])
      .then(([{ data: scope }, { data: works }]) => {
        if (!mounted) return
        setScopeItems(scope || [])
        setWorksData(works || [])
      })
      .catch((err) => {
        console.error("Error loading scope services or works:", err)
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!autoRotate) return undefined
    const timer = setInterval(() => {
      setRotationAngle((current) => Number(((current + 0.28) % 360).toFixed(3)))
    }, 50)

    return () => clearInterval(timer)
  }, [autoRotate])

  const services = useMemo(() => {
    const categoryOrder = scopeItems.map(getCategory).filter(Boolean)
    const scopedKeys = [...new Set(categoryOrder)].filter((key) => ORDER.includes(key))
    const keys = [...scopedKeys, ...ORDER.filter((key) => !scopedKeys.includes(key))]

    return keys.map((key) => {
      const dbCategoryWorks = (worksData || []).filter(
        (w) => (w.category || "").toLowerCase().trim() === key
      )
      const staticWorks = getDivisionStaticWorks(key) || []
      const existingTitles = new Set(dbCategoryWorks.map((d) => d.title))
      const uniqueStatic = staticWorks.filter((sw) => !existingTitles.has(sw.title))
      const allCategoryWorks = [...dbCategoryWorks, ...uniqueStatic]

      const isComplete = allCategoryWorks.length > 0 || STATUS[key] === "complete"
      const status = isComplete ? "complete" : (STATUS[key] || "progress")
      const primaryWork = allCategoryWorks[0] || null
      const recentWorks = allCategoryWorks.slice(0, 3)

      return {
        id: key,
        ...SERVICE_META[key],
        relatedIds: RELATED[key] || [],
        status,
        energy: ENERGY[key] || 100,
        worksCount: allCategoryWorks.length,
        primaryWork,
        recentWorks,
      }
    })
  }, [scopeItems, worksData])

  const active = services.find((item) => item.id === activeId) || services[0] || SERVICE_META.wedding

  const toggleItem = (id) => {
    const nextExpanded = expandedId === id ? null : id
    setExpandedId(nextExpanded)
    setActiveId(id)
    setAutoRotate(!nextExpanded)
    if (nextExpanded) {
      const index = services.findIndex((item) => item.id === id)
      setRotationAngle(270 - (index / services.length) * 360)
    }
  }

  const isRelatedToActive = (id) => {
    if (!expandedId) return false
    const current = services.find((item) => item.id === expandedId)
    return current?.relatedIds?.includes(id)
  }

  const getPosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 205
    const radian = (angle * Math.PI) / 180
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))),
    }
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

          <a
            href={active.link}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/86"
          >
            View {active.brand} {active.worksCount > 0 && `(${active.worksCount} Karya)`}
            <ArrowRight size={16} />
          </a>
        </div>

        <div
          className="relative hidden min-h-[620px] items-center justify-center lg:flex"
          onClick={() => {
            setExpandedId(null)
            setAutoRotate(true)
          }}
        >
          <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c89f67] via-white to-[#0ea5e9] shadow-[0_0_60px_rgba(255,255,255,0.25)]">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-white/20 opacity-60" />
            <div className="absolute h-24 w-24 animate-ping rounded-full border border-white/10 opacity-40 [animation-delay:0.45s]" />
            <div className="h-8 w-8 rounded-full bg-white/85 backdrop-blur" />
          </div>
          <div className="absolute h-96 w-96 rounded-full border border-white/10" />

          {services.map((item, index) => {
            const position = getPosition(index, services.length)
            const Icon = item.icon
            const isExpanded = expandedId === item.id
            const isRelated = isRelatedToActive(item.id)

            return (
              <div
                key={item.id}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  toggleItem(item.id)
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isRelated ? "animate-pulse" : ""}`}
                  style={{
                    width: `${item.energy * 0.5 + 42}px`,
                    height: `${item.energy * 0.5 + 42}px`,
                    left: `-${(item.energy * 0.5 + 2) / 2}px`,
                    top: `-${(item.energy * 0.5 + 2) / 2}px`,
                    background: `radial-gradient(circle, ${item.accent}3d 0%, rgba(255,255,255,0) 70%)`,
                  }}
                />

                <MotionDiv
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isExpanded
                      ? "border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                        ? "animate-pulse border-white bg-white/55 text-black"
                        : "border-white/40 bg-black text-white"
                  }`}
                  animate={{ scale: isExpanded ? 1.5 : 1 }}
                  whileHover={{ scale: isExpanded ? 1.55 : 1.12 }}
                >
                  <Icon size={18} />
                </MotionDiv>

                <div className={`absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${isExpanded ? "scale-125 text-white" : "text-white/70"}`}>
                  {item.brand}
                </div>

                {isExpanded && (
                  <MotionDiv
                    initial={{ opacity: 0, y: 14, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute left-1/2 top-20 w-80 -translate-x-1/2 overflow-visible rounded-2xl border border-white/30 bg-black/95 p-5 text-left shadow-2xl shadow-black/80 backdrop-blur-xl"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    
                    {/* STATUS & WORK COUNT */}
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                        item.status === "complete"
                          ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-300"
                          : "border-white/50 bg-black/40 text-white"
                      }`}>
                        {item.status === "complete" ? "Portofolio Aktif" : "In Progress"}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-white/50">
                        {item.worksCount > 0 ? `${item.worksCount} Karya Web` : item.title}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-[-0.03em] text-white flex items-center justify-between">
                      <span>{item.brand}</span>
                      <span className="text-xs font-normal text-white/45">{item.title}</span>
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-white/75">{item.desc}</p>

                    {/* PREVIEW PORTOFOLIO DARI WEB */}
                    {item.primaryWork?.image && (
                      <div className="relative mt-3.5 h-28 w-full overflow-hidden rounded-xl border border-white/15 bg-white/5">
                        <img
                          src={item.primaryWork.image}
                          alt={item.primaryWork.title}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-medium text-white">
                          <span className="truncate max-w-[70%]">{item.primaryWork.title}</span>
                          <span className="shrink-0 rounded bg-white/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/90 backdrop-blur-sm">
                            {item.primaryWork.subcategory || "Portofolio"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* LIST PORTOFOLIO NYATA WEB */}
                    {item.recentWorks && item.recentWorks.length > 0 && (
                      <div className="mt-3.5 border-t border-white/10 pt-3">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                          <span>Portofolio Unggulan</span>
                          <span className="font-mono text-white/40">{item.worksCount} Total</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {item.recentWorks.map((w, idx) => (
                            <a
                              key={w.id || idx}
                              href={item.link}
                              className="group flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                            >
                              <span className="truncate text-[11px] font-medium group-hover:underline">{w.title}</span>
                              <ArrowRight size={10} className="shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-3.5 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Zap size={11} />
                          Division Energy
                        </span>
                        <span className="font-mono">{item.energy}%</span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.energy}%`,
                            background: `linear-gradient(90deg, ${item.accent}, #ffffff)`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-3.5 border-t border-white/10 pt-3">
                      <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                        <Link size={11} />
                        Connected Divisions
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = services.find((service) => service.id === relatedId)
                          if (!relatedItem) return null
                          return (
                            <button
                              key={relatedId}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                toggleItem(relatedId)
                              }}
                              className="inline-flex h-6 items-center gap-1 rounded-full border border-white/20 px-2 text-[10px] text-white/75 transition hover:bg-white/10 hover:text-white"
                            >
                              {relatedItem.title}
                              <ArrowRight size={8} />
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-3.5 border-t border-white/10 pt-3">
                      <a
                        href={item.link}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-black"
                      >
                        Buka Halaman {item.brand} <ArrowRight size={12} />
                      </a>
                    </div>
                  </MotionDiv>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid gap-3 lg:hidden">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={item.link}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-left transition hover:bg-white/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: item.accent, color: "#050505" }}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="block text-base font-semibold text-white">{item.title}</span>
                    {item.worksCount > 0 && (
                      <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/80">
                        {item.worksCount} Karya
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/48">{item.desc}</span>
                </span>
                <ArrowRight size={17} className="text-white/45" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
