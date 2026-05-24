import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

export default function Cta() {
  const { lang } = useContext(LanguageContext)
  const [contact, setContact] = useState({})

  useEffect(() => {
    supabase
      .from("content")
      .select("*")
      .eq("section", "contact")
      .eq("lang", lang.code)
      .then(({ data }) => {
        const map = {}
        data?.forEach(row => { map[row.key] = row.value })
        setContact(map)
      })
  }, [lang.code])

  const links = [
    { label: "Instagram", href: contact.instagram || "https://instagram.com/wdgroupcompany" },
    { label: "WhatsApp", href: contact.whatsapp || "https://wa.me/628817134774" },
    { label: "Email", href: contact.email || "mailto:wdgroupcompany@gmail.com" },
  ]

  return (
    <section id="contact" className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <motion.div
        initial={{ opacity: 0, scale: .96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative text-center px-6"
      >
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: .2 }}
            className="block"
          >
            {contact.title_line1 || "We're looking for"}
          </motion.span>
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: .4 }}
            className="block"
          >
            {contact.title_line2 || "new challenge"}
          </motion.span>
        </h1>

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-xs tracking-widest uppercase text-white/50">
          {links.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-white relative group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-white transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}