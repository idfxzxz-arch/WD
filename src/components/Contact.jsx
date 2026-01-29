import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-32 py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Ready to grow your business? Let’s talk and build something amazing together.
          </p>
        </div>

        {/* EMAIL */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/10">
            <Mail />
          </div>
          <span className="text-sm md:text-base">
            wdgroupcompany21@gmail.com
          </span>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/10">
            <Phone />
          </div>
          <span className="text-sm md:text-base">
            +62 8817134774
          </span>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-4 md:col-span-3">
          <div className="p-3 rounded-xl bg-white/10">
            <MapPin />
          </div>
          <span className="text-sm md:text-base">
            Perumahan Tamanasri RT 01/RW04 JL Mangga Manalagi Blok E1 No 11
          </span>
        </div>

      </div>
    </section>
  )
}
