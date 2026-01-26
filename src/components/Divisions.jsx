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
  X
} from "lucide-react"

export default function divisions() {
  const [active, setActive] = useState(null)

  const divisions = [
    {
      title: "WD Jaya Workshop",
      icon: Wrench,
      desc: "Workshop profesional untuk produksi dan perawatan alat serta kebutuhan teknis."
    },
    {
      title: "WD Music Entertainment",
      icon: Music,
      desc: "Layanan hiburan musik profesional untuk berbagai acara dan kebutuhan komersial."
    },
    {
      title: "WD Production",
      icon: Video,
      desc: "Produksi konten audio visual berkualitas tinggi untuk brand dan event."
    },
    {
      title: "WD Record",
      icon: Disc,
      desc: "Recording studio profesional untuk musisi dan konten kreatif."
    },
    {
      title: "WD Event Organizer",
      icon: Calendar,
      desc: "Perencanaan dan pelaksanaan event profesional dari konsep hingga eksekusi."
    },
    {
      title: "WD Wedding Organizer",
      icon: Heart,
      desc: "Layanan pernikahan elegan, terstruktur, dan berkesan."
    },
    {
      title: "WD Music Class",
      icon: Mic,
      desc: "Kelas musik profesional dengan mentor berpengalaman."
    },
    {
      title: "WD Futsal",
      icon: Trophy,
      desc: "Manajemen dan pengelolaan fasilitas futsal modern."
    },
    {
      title: "WD Food & Beverage",
      icon: Utensils,
      desc: "Layanan kuliner profesional untuk event dan kebutuhan bisnis."
    }
  ]

  return (
    <section
      id="divisions"
      className="py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our Services
        </h2>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {divisions.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setActive(service)}
                className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl shadow
                           hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl
                                bg-blue-100 dark:bg-blue-900/40
                                text-blue-600 dark:text-blue-400">
                  <Icon size={28} />
                </div>

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {service.title}
                </h3>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed z-50 top-1/2 left-1/2
                         -translate-x-1/2 -translate-y-1/2
                         w-[90%] max-w-md
                         bg-white dark:bg-gray-900
                         rounded-2xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {active.title}
                </h3>
                <button onClick={() => setActive(null)}>
                  <X className="text-gray-500 hover:text-red-500" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {active.desc}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
