import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { supabase } from "../lib/supabase"

const MotionDiv = motion.div
const MotionImg = motion.img

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

function getCategoryFromScope(item) {
  const source = `${item.name || ""} ${item.link || ""}`.toLowerCase()

  if (source.includes("wedding")) return "wedding"
  if (source.includes("production")) return "production"
  if (source.includes("event")) return "event"
  if (source.includes("workshop")) return "workshop"
  if (source.includes("music")) return "music"
  if (
    source.includes("it") ||
    source.includes("digital") ||
    source.includes("website") ||
    source.includes("store")
  ) {
    return "it"
  }

  return ""
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
  const isWide = index % 4 === 0 || index % 4 === 3

  const dest = getLink(item)
  const title = getDivisionName(item)
  const meta = getDivisionMeta(item)

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={isWide ? "md:col-span-7" : "md:col-span-5"}
    >
      <Link to={dest} className="group relative block overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#141414] no-underline text-inherit transition duration-500 hover:border-white/20">
        <div className={`relative overflow-hidden ${isWide ? "aspect-[1.25/1] sm:aspect-[1.45/1]" : "aspect-[1.05/1] sm:aspect-[0.92/1]"}`}>
          <MotionImg
            src={item.image}
            alt={title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply [background-image:radial-gradient(circle,#000_1px,transparent_1px)] [background-size:4px_4px]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
              {meta.label}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
            <p className="mb-3 max-w-[22rem] text-xs leading-relaxed text-white/58">
              {meta.desc}
            </p>
            <h3 className="max-w-[28rem] text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              {title}
            </h3>
          </div>

          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#050505]/70 opacity-0 backdrop-blur-lg transition duration-500 group-hover:opacity-100">
            <span className="relative rounded-full p-[2px] [background:linear-gradient(90deg,#89AACC_0%,#4E85BF_100%)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
                View <span className="font-serif italic font-normal">{title}</span>
                <ArrowUpRight size={15} />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  )
}

export default function Works() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const [{ data: worksData }, { data: scopeData }] = await Promise.all([
        supabase.from("works").select("*").order("order_index"),
        supabase.from("scope_services").select("*").order("order_index"),
      ])

      const byCategory = new Map()
      const orderedProjects = []
      const seenCategories = new Set()

      ;(worksData || []).forEach((item) => {
        const category = (item.category || "").toLowerCase().trim()

        if (category && !byCategory.has(category)) {
          byCategory.set(category, item)
        }
      })

      FALLBACK_DIVISIONS.forEach((item) => {
        const category = item.category.toLowerCase().trim()

        if (!byCategory.has(category)) {
          byCategory.set(category, item)
        }
      })

      ;(scopeData || []).forEach((item) => {
        const category = getCategoryFromScope(item)
        const project = byCategory.get(category)

        if (project && !seenCategories.has(category)) {
          orderedProjects.push(project)
          seenCategories.add(category)
        }
      })

      byCategory.forEach((project, category) => {
        if (!seenCategories.has(category)) {
          orderedProjects.push(project)
        }
      })

      setProjects(orderedProjects)
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const el = document.getElementById(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
    }
  }, [])

  return (
    <section id="works" className="bg-[#0a0a0a] py-12 text-white md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/14" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
                Selected Work
              </p>
            </div>

            <h2 className="text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
              Featured <span className="font-serif italic text-white/90">divisions</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/48 md:text-base">
              A selection of WD Group portfolios, from concept to launch across events, production, music, wedding, workshop, and digital work.
            </p>
          </div>

          <Link
            to="/works"
            className="relative hidden rounded-full p-[2px] transition hover:scale-105 md:inline-flex md:shrink-0 [background:linear-gradient(90deg,transparent,transparent)] hover:[background:linear-gradient(90deg,#89AACC_0%,#4E85BF_100%)]"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-5 py-3 text-sm font-semibold text-white">
              View all work <ArrowUpRight size={15} />
            </span>
          </Link>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center md:hidden"
        >
          <Link
            to="/works"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25"
          >
            View all work <ArrowUpRight size={14} />
          </Link>
        </MotionDiv>
      </div>
    </section>
  )
}
