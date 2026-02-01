import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Section from "./components/Section"
import About from "./components/About"
import Works from "./components/works"
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

      <Section />

      <About />

      <Works />

      <CTA />

      <Vision />

      <Contact />

      <Footer />
    </>
  )
}
