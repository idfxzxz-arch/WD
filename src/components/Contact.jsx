import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="opacity-90">
            Ready to grow your business? Let’s talk.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Mail />
          <span>info@wdcompany.com</span>
        </div>

        <div className="flex items-center gap-4">
          <Phone />
          <span>+62 812-3456-7890</span>
        </div>

        <div className="flex items-center gap-4">
          <MapPin />
          <span>Jakarta, Indonesia</span>
        </div>

      </div>
    </section>
  )
}
