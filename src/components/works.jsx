import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { supabase } from "../lib/supabase"

function ProjectCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isEven = index % 2 === 0
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  // tags bisa berupa string "A, B" atau array
  const tags = Array.isArray(item.tags)
    ? item.tags
    : (item.tags || "").split(",").map(t => t.trim()).filter(Boolean)

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
      <Link to={item.link} className="group block">
        {/* IMAGE */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-black/10">
            <motion.div
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
          <div className={`overflow-hidden ${isEven ? "aspect-[4/5]" : "aspect-[4/4]"}`}>
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, j) => (
                <span
                  key={j}
                  className="text-xs text-neutral-500 border border-neutral-200 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.h3
              className="text-base font-medium leading-snug"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.25 }}
            >
              {item.title}
            </motion.h3>
          </div>
          <motion.div
            className="shrink-0 mt-1 w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition duration-300"
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
      .then(({ data }) => setProjects(data || []))
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
          <span className="text-sm text-neutral-400 mb-1">{projects.length} projects</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
          <div className="flex flex-col gap-20">
            {projects.filter((_, i) => i % 2 === 0).map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i * 2} />
            ))}
          </div>
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