import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X } from "lucide-react"

export default function Showcase() {
  const [active, setActive] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [selectedDivisi, setSelectedDivisi] = useState("All")
  const [showMorePhotos, setShowMorePhotos] = useState(false)

  // Semua item dengan divisi
  const items = [
    // Foto
    { type: "image", src: "/resources/wedding/photo1.webp", title: "Wedding Organizer", divisi: "Wedding" },
    { type: "image", src: "/resources/wedding/photo2.webp", title: "Wedding Organizer", divisi: "Wedding" },
    { type: "image", src: "/resources/wedding/photo3.webp", title: "Wedding Organizer", divisi: "Wedding" },
    { type: "image", src: "/resources/workshop/workshop1.webp", title: "Workshop", divisi: "Workshop" },
    { type: "image", src: "/resources/workshop/workshop2.webp", title: "Workshop", divisi: "Workshop" },
    { type: "image", src: "/resources/workshop/workshop3.webp", title: "Workshop", divisi: "Workshop" },
    { type: "image", src: "/resources/production/proc1.webp", title: "Production", divisi: "Production" },
    { type: "image", src: "/resources/production/proc2.webp", title: "Production", divisi: "Production" },
    { type: "image", src: "/resources/production/proc3.webp", title: "Production", divisi: "Production" },
    { type: "image", src: "/resources/event/event1.webp", title: "Event", divisi: "Event Organizer" },
    { type: "image", src: "/resources/event/event2.webp", title: "Event", divisi: "Event Organizer" },
    { type: "image", src: "/resources/event/event3.webp", title: "Event", divisi: "Event Organizer" },
    { type: "image", src: "/resources/music/music1.webp", title: "Music Ent", divisi: "Music Ent" },
    { type: "image", src: "/resources/music/music2.webp", title: "Music Ent", divisi: "Music Ent" },
    { type: "image", src: "/resources/music/music3.webp", title: "Music Ent", divisi: "Music Ent" },
    { type: "image", src: "/resources/photo.webp", title: "Music Futsal", divisi: "Futsal" },
    { type: "image", src: "/resources/photo.webp", title: "Food & Beverage", divisi: "F&B" },

    // Video
    { type: "video", src: "/vid/video1.mp4", thumb: "/resources/thumbnail.webp", title: "Wedding Video", divisi: "Wedding" },
    { type: "video", src: "/vid/workshopvid.mp4", thumb: "/resources/thumbnail.webp", title: "Workshop Video", divisi: "Workshop" },
    { type: "video", src: "/vid/workshopvid.mp4", thumb: "/resources/thumbnail.webp", title: "Workshop Video", divisi: "Workshop" }
  ]

  // Daftar divisi unik
  const divisiList = ["All", ...new Set(items.map((i) => i.divisi))]

  // Filter item berdasarkan divisi
  const filteredItems = selectedDivisi === "All" ? items : items.filter((i) => i.divisi === selectedDivisi)

  // Bagikan foto utama dan foto tambahan per divisi
  const mainPhotos = filteredItems.filter(i => i.type === "image").slice(0, 9)
  const extraPhotos = filteredItems.filter(i => i.type === "image").slice(9)
  const videos = filteredItems.filter(i => i.type === "video")

  return (
    <>
      <section id="showcase" className="py-24 bg-gray-950 text-white scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Photo & Video Showcase
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Filter by divisi to see related photos and videos.
            </p>
          </motion.div>

          {/* FILTER DIVISI */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {divisiList.map((d, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDivisi(d); setShowMorePhotos(false) }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedDivisi === d ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* GRID FOTO UTAMA */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mainPhotos.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full aspect-[3/4] object-cover rounded-2xl transition duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-10 text-sm font-medium text-white">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* GRID VIDEO */}
          {videos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {videos.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveVideo(item.src)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl"
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full aspect-[3/4] object-cover rounded-2xl transition duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 p-4 rounded-full">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 text-sm font-medium">
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* LOAD MORE FOTO TAMBAHAN */}
          {extraPhotos.length > 0 && !showMorePhotos && (
            <div className="text-center">
              <button
                onClick={() => setShowMorePhotos(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
              >
                Load More Photos
              </button>
            </div>
          )}

          {/* FOTO TAMBAHAN */}
          {showMorePhotos && extraPhotos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {extraPhotos.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full aspect-[3/4] object-cover rounded-2xl transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-10 text-sm font-medium text-white">
                    {item.title}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setActiveVideo(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-10 text-white hover:scale-110 transition"
                >
                  <X size={28} />
                </button>
                <video
                  src={activeVideo}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
