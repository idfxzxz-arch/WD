import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wrench,
  Music,
  Video,
  Disc,
  Calendar,
  Heart,
  Mic,
  Trophy,
  Utensils,
  X,
  Play
} from "lucide-react"

export default function Divisions() {
  const [active, setActive] = useState(null)

  const divisions = [
  {
    title: "WD Wedding Organizer",
    icon: Heart,
    desc: "Layanan pernikahan profesional dengan konsep elegan dan eksekusi sempurna.",
    images: [
      "/resources/wedding/photo1.webp",
      "/resources/wedding/photo2.webp",
      "/resources/wedding/photo3.webp"
    ],
    video: "/vid/video1.mp4"
  },

  {
    title: "WD Production",
    icon: Video,
    desc: "Produksi konten audio visual berkualitas tinggi untuk brand dan event.",
    images: [
      "/resources/production/1.webp",
      "/resources/production/2.webp",
      "/resources/production/3.webp"
    ],
    video: "/vid/production.mp4"
  },

  {
    title: "WD Music Entertainment",
    icon: Music,
    desc: "Hiburan musik profesional untuk berbagai acara.",
    images: [
      "/resources/music/1.webp",
      "/resources/music/2.webp",
      "/resources/music/3.webp"
    ],
    video: "/vid/music.mp4"
  },

  {
    title: "WD Record",
    icon: Disc,
    desc: "Studio recording profesional untuk musisi & kreator.",
    images: [
      "/resources/record/1.webp",
      "/resources/record/2.webp",
      "/resources/record/3.webp"
    ],
    video: "/vid/record.mp4"
  },

  {
    title: "WD Event Organizer",
    icon: Calendar,
    desc: "Manajemen event dari konsep hingga pelaksanaan.",
    images: [
      "/resources/event/1.webp",
      "/resources/event/2.webp",
      "/resources/event/3.webp"
    ],
    video: "/vid/event.mp4"
  },

  {
    title: "WD Music Class",
    icon: Mic,
    desc: "Kelas musik dengan mentor profesional.",
    images: [
      "/resources/class/1.webp",
      "/resources/class/2.webp",
      "/resources/class/3.webp"
    ],
    video: "/vid/class.mp4"
  },

  {
    title: "WD Futsal",
    icon: Trophy,
    desc: "Manajemen lapangan futsal modern.",
    images: [
      "/resources/futsal/1.webp",
      "/resources/futsal/2.webp",
      "/resources/futsal/3.webp"
    ],
    video: "/vid/futsal.mp4"
  },

  {
    title: "WD Food & Beverage",
    icon: Utensils,
    desc: "Catering dan kuliner profesional.",
    images: [
      "/resources/fnb/1.webp",
      "/resources/fnb/2.webp",
      "/resources/fnb/3.webp"
    ],
    video: "/vid/fnb.mp4"
  },

  {
    title: "WD Jaya Workshop",
    icon: Wrench,
    desc: "Workshop teknikal dan produksi alat profesional.",
    images: [
      "/resources/workshop/1.webp",
      "/resources/workshop/2.webp",
      "/resources/workshop/3.webp"
    ],
    video: "/vid/workshop.mp4"
  }
]


  return (
    <>
      <section id="divisions" className="py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Our Divisions
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {divisions.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  onClick={() => setActive(d)}
                  className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    <Icon size={28} />
                  </div>

                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {d.title}
                  </h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

{/* MODAL */}
<AnimatePresence>
  {active && (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-40"
      />

      {/* MODAL */}
      <motion.div
        initial={{ scale: .9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: .9, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="bg-gray-950 max-w-4xl w-full max-h-[90vh]
                     overflow-y-auto rounded-2xl p-8 relative text-white"
        >

          {/* CLOSE */}
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 z-50"
          >
            <X />
          </button>

          <h3 className="text-2xl font-bold mb-3">
            {active.title}
          </h3>

          <p className="text-gray-400 mb-6">
            {active.desc}
          </p>

          {/* GALERI */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {active.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-xl aspect-[3/4] object-cover"
              />
            ))}
          </div>

          {/* VIDEO */}
          <video
            controls
            className="rounded-xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <source src={active.video} type="video/mp4" />
          </video>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

    </>
  )
}
