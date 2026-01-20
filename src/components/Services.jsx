import { Briefcase, BarChart, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function Services() {
  const services = [
    {
      title: "Business Consulting",
      icon: Briefcase,
      desc: "Solusi strategis untuk pertumbuhan, efisiensi, dan keberlanjutan bisnis."
    },
    {
      title: "Project Management",
      icon: BarChart,
      desc: "Manajemen proyek yang terstruktur, tepat waktu, dan terukur."
    },
    {
      title: "Professional Services",
      icon: Users,
      desc: "Layanan profesional yang disesuaikan dengan kebutuhan klien dan industri."
    }
  ]

  return (
    <section
      id="services"
      className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-widest text-sm text-blue-600 dark:text-blue-400 mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Our Services
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl
                           shadow-md hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Gradient Hover Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10
                                opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 flex items-center justify-center
                                rounded-xl bg-blue-100 dark:bg-blue-900/40 mb-6">
                  <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-xl font-semibold text-gray-800 dark:text-white">
                  {s.title}
                </h3>
                <p className="relative z-10 text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
