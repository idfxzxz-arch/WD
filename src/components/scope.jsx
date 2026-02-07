import { motion } from "framer-motion"

export default function Scope() {

  const divisions = [
    "Branding",
    "Web Dev",
    "Mobile App",
    "UI / UX",
    "Graphic Design",
    "Digital Marketing",
    "Photography",
    "Videography",
    "IT Support",
  ]

  return (
    <section
      id="scope"
      className="min-h-screen bg-black flex items-center justify-center font-genz"
    >
      <div className="text-center max-w-5xl px-6">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: .8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6 }}
          className="text-5xl md:text-7xl font-bold mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Our Scope ✨
        </motion.h2>

        {/* Divisions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="flex flex-wrap justify-center gap-4 text-xl md:text-2xl"
        >
          {divisions.map((item, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.15 }}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur cursor-pointer text-gray-300 hover:text-white hover:border-pink-500 transition"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <p className="mt-10 text-gray-500 tracking-wide">
          and many more creative things 🚀
        </p>

      </div>
    </section>
  )
}
