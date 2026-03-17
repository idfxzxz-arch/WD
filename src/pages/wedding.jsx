import { motion } from "framer-motion"

const images = [
  "/resources/Wedding/wedding.webp",
  "/resources/Wedding/wedding1.webp",
  "/resources/Wedding/wedding2.webp",
  "/resources/Wedding/wedding3.webp",
  "/resources/Wedding/wedding4.webp",
  "/resources/Wedding/wedding5.webp",
]

export default function WeddingGallery() {
  return (
    <section className="bg-neutral-100 py-24 px-6">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold tracking-wide">
          Wedding Organizer
        </h2>
        <p className="text-neutral-500 mt-3">
          Creating unforgettable wedding moments with elegant design.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-black rounded-3xl p-6 shadow-2xl">
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={img}
                className="w-full h-full object-cover transition duration-500 hover:scale-110"
              />
            </motion.div>
          ))}

        </div>

      </div>

    </section>
  )
}