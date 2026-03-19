import { motion } from "framer-motion"
import { useState } from "react"

const images = [
  "/resources/Wedding/WO/WO1.webp",
  "/resources/Wedding/WO/WO2.webp",
  "/resources/Wedding/WO/WO3.webp",
  "/resources/Wedding/WO/WO4.webp",
  "/resources/Wedding/WO/WO5.webp",
  "/resources/Wedding/WO/WO1.webp",
  "/resources/Wedding/WO/WO2.webp",
  "/resources/Wedding/WO/WO3.webp",
  "/resources/Wedding/WO/WO4.webp",
  "/resources/Wedding/WO/WO5.webp",
]

export default function Wedding() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold"
        >
          Wedding Editorial
        </motion.h1>

        <p className="mt-4 text-neutral-500">
          A curated visual story
        </p>
      </section>

      {/* MAGAZINE GRID */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {images.map((img, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(img)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`
                relative cursor-pointer overflow-hidden rounded-3xl group
                ${i % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              <img
                src={img}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

              {/* text */}
              <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition">
                <p className="text-sm">Editorial Shot</p>
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            className="max-h-[90%] rounded-xl"
          />
        </div>
      )}

      {/* CTA */}
      <section className="py-24 text-center px-6 bg-neutral-100">
        <h2 className="text-4xl font-semibold">
          Tell Your Story
        </h2>

        <p className="mt-4 text-neutral-500">
          Every frame crafted like a magazine cover.
        </p>

        <button className="mt-8 px-10 py-3 bg-black text-white rounded-full hover:scale-105 transition">
          Get Started
        </button>
      </section>

    </div>
  )
}