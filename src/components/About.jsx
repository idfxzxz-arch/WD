import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-black to-gray-950 text-white scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-400 tracking-widest text-sm">
            ABOUT US
          </span>

          <h2 className="text-4xl font-bold mt-4 mb-6 leading-tight">
            Trusted Partner for <br /> Sustainable Business Growth
          </h2>

          {/* TEXT BARU */}
          <p className="text-gray-300 mb-4 leading-relaxed">
            WD Jaya Group Company adalah perusahaan media kreatif yang menghadirkan
            solusi inovatif berbasis kreativitas dan teknologi.
          </p>

          <p className="text-gray-400 mb-4 leading-relaxed">
            Kami menyediakan layanan terpadu mulai dari konten multimedia,
            desain grafis, produksi video, hingga pemasaran digital untuk
            membantu klien membangun brand yang kuat dan berkelanjutan.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Dengan pendekatan profesional dan eksekusi yang terukur,
            WD Company berkomitmen menjadi mitra strategis dalam mendukung
            pertumbuhan bisnis jangka panjang.
          </p>

          {/* VALUE LIST */}
          <ul className="mt-8 space-y-4">
            {[
              "Professional & experienced team",
              "Multi-division integrated services",
              "Creative-driven & technology-oriented",
              "Client-focused execution"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-200">
                <CheckCircle className="text-blue-400 w-5 h-5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-cyan-500
                     rounded-3xl p-10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">
            Why WD Company?
          </h3>

          <p className="text-white/90 leading-relaxed mb-6">
            We don’t just deliver services — we build partnerships.
            Our focus is on quality, innovation, and long-term business impact.
          </p>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-lg">9+</h4>
              <span className="text-white/80">Business Divisions</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">100%</h4>
              <span className="text-white/80">Client Commitment</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Creative</h4>
              <span className="text-white/80">Driven Culture</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Trusted</h4>
              <span className="text-white/80">Professional Partner</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
