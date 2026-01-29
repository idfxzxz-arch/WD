import { motion } from "framer-motion"

export default function Divisions() {
  const divisions = [
    {
      title: "WD Wedding Organizer",
      desc: "Professional wedding service dengan konsep elegan dan eksekusi presisi."
    },
    {
      title: "WD Production",
      desc: "Produksi audio visual berkualitas tinggi untuk brand & event."
    },
    {
      title: "WD Food & Beverage",
      desc: "Layanan kuliner profesional untuk kebutuhan bisnis dan acara."
    },
    {
      title: "WD Music Entertainment",
      desc: "Hiburan musik profesional untuk berbagai event."
    },
    {
      title: "WD Record",
      desc: "Studio recording profesional untuk musisi dan konten kreatif."
    },
    {
      title: "WD Event Organizer",
      desc: "Perencanaan dan pelaksanaan event dari konsep hingga eksekusi."
    },
    {
      title: "WD Music Class",
      desc: "Kelas musik dengan mentor berpengalaman."
    },
    {
      title: "WD Workshop",
      desc: "Workshop teknis untuk produksi dan maintenance."
    },
    {
      title: "WD Futsal",
      desc: "Manajemen fasilitas futsal modern."
    }
  ]

  return (
    <section
      id="divisions"
      className="py-32 bg-gradient-to-b from-black via-gray-950 to-black text-white scroll-mt-32"
    >
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Our Divisions
        </h2>

        <div className="relative border-l border-white/10 pl-10 space-y-14">

          {divisions.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .05 }}
              className="group relative"
            >

              {/* NUMBER BADGE */}
              <div className="absolute -left-[53px] top-1 w-10 h-10 rounded-full
                              bg-blue-500/20 backdrop-blur border border-blue-500/40
                              flex items-center justify-center text-sm font-semibold text-blue-400">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* CARD */}
              <div className="p-6 rounded-xl border border-white/10
                              bg-white/5 hover:bg-white/10
                              transition-all duration-300
                              hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">

                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                  {d.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {d.desc}
                </p>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}
