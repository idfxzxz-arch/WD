import { motion } from "framer-motion"

const images = [
  "/resources/Wedding/wedding.webp",
  "/resources/Wedding/wedding1.webp",
  "/resources/Wedding/wedding2.webp",
  "/resources/Wedding/wedding.webp",
  "/resources/Wedding/wedding1.webp",
  "/resources/Wedding/wedding2.webp",
]

export default function WeddingGallery() {
  return (
    <section className="bg-gradient-to-b from-neutral-100 to-white py-28 px-6">

      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-semibold tracking-tight">
          Wedding Organizer
        </h2>
        <p className="text-neutral-500 mt-4 max-w-md mx-auto">
          Creating unforgettable wedding moments with elegant and modern design.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-xl rounded-[40px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/30">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl group ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={img}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition" />

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  )
}