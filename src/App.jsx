import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Divisions from "./components/Divisions"
import Showcase from "./components/Showcase"
import Vision from "./components/Vision"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CTA from "./components/cta"

import { motion } from "framer-motion"

export default function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Divisions />

      {/* CINEMATIC DIVIDER */}
      <div className="relative h-40 bg-black overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20" />

        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 w-full h-[1px] bg-blue-500/40"
        />

        <div className="absolute inset-0 blur-3xl bg-blue-500/10" />

      </div>

      <Showcase />

      <CTA />

      <Vision />

      <Contact />

      <Footer />
    </>
  )
}
