import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { supabase } from "../lib/supabase"

const CATEGORY_ROUTES = {
  wedding:    "/wedding",
  music:      "/music",
  production: "/production",
  workshop:   "/workshop",
  event:      "/event",
  it:          "/it",
}

const FALLBACK_DIVISIONS = [
  {
    id: "fallback-wd-it",
    title: "WD IT",
    category: "it",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1400'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23020b1a'/%3E%3Cstop offset='52%25' stop-color='%230f2a44'/%3E%3Cstop offset='100%25' stop-color='%230ea5e9'/%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='12' result='blur'/%3E%3CfeMerge%3E%3CfeMergeNode in='blur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect width='1200' height='1400' fill='url(%23bg)'/%3E%3Cg opacity='.24' stroke='%23fff' stroke-width='2'%3E%3Cpath d='M120 260h960M120 420h960M120 580h960M120 740h960M120 900h960M120 1060h960M240 140v1120M420 140v1120M600 140v1120M780 140v1120M960 140v1120'/%3E%3C/g%3E%3Cg filter='url(%23glow)'%3E%3Crect x='250' y='390' width='700' height='420' rx='44' fill='%2307131f' stroke='%2367e8f9' stroke-width='6'/%3E%3Crect x='306' y='448' width='588' height='284' rx='22' fill='%230b1f33'/%3E%3Cpath d='M382 560l92-76M382 560l92 76M818 560l-92-76M818 560l-92 76' fill='none' stroke='%2367e8f9' stroke-width='24' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M558 660l84-210' fill='none' stroke='%2314b8a6' stroke-width='24' stroke-linecap='round'/%3E%3Ccircle cx='330' cy='950' r='18' fill='%2367e8f9'/%3E%3Ccircle cx='600' cy='950' r='18' fill='%2367e8f9'/%3E%3Ccircle cx='870' cy='950' r='18' fill='%2367e8f9'/%3E%3Cpath d='M330 950h540M600 810v140' fill='none' stroke='%2367e8f9' stroke-width='8' stroke-linecap='round'/%3E%3C/g%3E%3Ctext x='600' y='1110' text-anchor='middle' font-family='Arial, sans-serif' font-size='88' font-weight='800' fill='white' letter-spacing='6'%3EWD IT%3C/text%3E%3Ctext x='600' y='1188' text-anchor='middle' font-family='Arial, sans-serif' font-size='34' font-weight='700' fill='%23bae6fd' letter-spacing='10'%3EDIGITAL SOLUTION%3C/text%3E%3C/svg%3E",
    tags: "Website,Digital Solution,IT Support",
    link: "/it",
  },
]

const DIVISION_NAMES = {
  wedding: "WD Sky Wedding Organizer",
  production: "WD Production",
  event: "WD Event Organizer",
  workshop: "WD Jaya Workshop",
  music: "WD Music Entertaiment and Music Class",
  it: "WD IT",
}

const DIVISION_META = {
  wedding: {
    label: "Wedding",
    accent: "#b88446",
    desc: "Elegant planning and detail-focused celebration direction.",
  },
  production: {
    label: "Production",
    accent: "#f59e0b",
    desc: "Visual production, documentation, and creative execution.",
  },
  event: {
    label: "Event",
    accent: "#6366f1",
    desc: "Structured event planning with calm field coordination.",
  },
  workshop: {
    label: "Workshop",
    accent: "#22c55e",
    desc: "Practical learning programs built for real outcomes.",
  },
  music: {
    label: "Music",
    accent: "#a855f7",
    desc: "Entertainment, music class, and stage-ready talent support.",
  },
  it: {
    label: "IT",
    accent: "#0ea5e9",
    desc: "Website, digital solution, and IT support for business needs.",
  },
}

function getDivisionName(item) {
  const cat = (item.category || "").toLowerCase().trim()
  return DIVISION_NAMES[cat] || item.title
}

function getDivisionMeta(item) {
  const cat = (item.category || "").toLowerCase().trim()
  return DIVISION_META[cat] || {
    label: cat || "Work",
    accent: "#111111",
    desc: item.meta || "Selected work from WD Group Company.",
  }
}

function getLink(item) {
  const cat = (item.category || "").toLowerCase().trim()
  
  // 1. Prioritaskan rute internal aplikasi berdasarkan kategori
  if (CATEGORY_ROUTES[cat]) {
    return CATEGORY_ROUTES[cat]
  }

  // 2. Fallback ke custom link jika kategori tidak terdaftar
  const itemLink = item.link ? item.link.trim() : ""
  if (itemLink && itemLink !== "/" && itemLink !== "") {
    return itemLink
  }
  
  return "/"
}

function ProjectCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const tags = Array.isArray(item.tags)
    ? item.tags
    : (item.tags || "").split(",").map(t => t.trim()).filter(Boolean)

  const dest = getLink(item)
  const title = getDivisionName(item)
  const meta = getDivisionMeta(item)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rotate.x, rotateY: rotate.y, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setRotate({
          x: -(e.clientY - rect.top - rect.height / 2) / 25,
          y: (e.clientX - rect.left - rect.width / 2) / 25,
        })
      }}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      <Link to={dest} className="group block no-underline text-inherit z-30 relative">
        <div className="relative rounded-[1.75rem] overflow-hidden bg-neutral-100 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_34px_90px_-42px_rgba(0,0,0,0.62)]">
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg"
              style={{ backgroundColor: meta.accent }}
            >
              {meta.label}
            </span>
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10">
            <motion.div
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white">
            <p className="mb-2 max-w-[22rem] text-xs leading-relaxed text-white/72">
              {meta.desc}
            </p>
            <h3 className="max-w-[24rem] text-2xl font-semibold leading-tight tracking-[-0.03em]">
              {title}
            </h3>
          </div>
          <div className={`overflow-hidden ${isEven ? "aspect-[4/5]" : "aspect-[4/4]"}`}>
            <motion.img
              src={item.image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, j) => (
                <span
                  key={j}
                  className="text-xs text-neutral-500 border border-neutral-200 bg-white px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-neutral-500">
              Explore the division portfolio and service direction.
            </p>
          </div>
          <motion.div
            className="shrink-0 mt-1 w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition duration-300 shadow-sm"
            whileHover={{ rotate: -45, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    supabase
      .from("works")
      .select("*")
      .order("order_index")
      .then(({ data }) => {
        if (data) {
          // KITA KEMBALIKAN LOGIKA FILTER UNIKNYA DI SINI
          const uniqueDivisions = []
          const seenCategories = new Set()

          data.forEach((item) => {
            const category = (item.category || "").toLowerCase().trim()
            
            // Jika kategorinya belum ada di dalam Set, masukkan ke array uniqueDivisions
            if (!seenCategories.has(category)) {
              seenCategories.add(category)
              uniqueDivisions.push(item)
            }
          })

          FALLBACK_DIVISIONS.forEach((item) => {
            const category = item.category.toLowerCase().trim()
            if (!seenCategories.has(category)) {
              seenCategories.add(category)
              uniqueDivisions.push(item)
            }
          })

          setProjects(uniqueDivisions)
        }
      })
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const el = document.getElementById(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
    }
  }, [])

  return (
    <section id="works" className="pt-32 pb-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-16"
        >
          <h2 className="text-4xl font-light tracking-tight">Selected Works</h2>
          <span className="text-sm text-neutral-400 mb-1">{projects.length} divisions</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-20">
            {projects.filter((_, i) => i % 2 === 0).map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i * 2} />
            ))}
          </div>
          {/* Kolom Kanan (Masonry Offset Effect) */}
          <div className="flex flex-col gap-20 md:mt-32">
            {projects.filter((_, i) => i % 2 !== 0).map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i * 2 + 1} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black transition border-b border-neutral-200 hover:border-black pb-0.5"
          >
            View all works <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
