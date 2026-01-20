import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/resources/hero.webp')" }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* Glow Accent */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-0" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="relative z-10 text-center px-6"
      >
        {/* Tagline */}
        <motion.p
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="uppercase tracking-widest text-sm text-blue-300 mb-4"
        >
          Business Consulting & Professional Services
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={{ hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          <span className="text-white">WD </span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Company
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
        >
          Professional and Trusted Business Partner for Your Growth
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#services"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Our Services
          </a>

          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-white/60 hover:bg-white hover:text-blue-800 transition"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </div>

    </section>
  )
}
