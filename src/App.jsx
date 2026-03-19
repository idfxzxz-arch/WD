import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Section from "./components/Section"
import About from "./components/About"
import Works from "./components/works"
import Cta from "./components/Cta"
import TeamHero from "./components/TeamHero"
import Scope from "./components/scope"

import Wedding from "./pages/wedding"

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Section />
      <About />
      <Works />
      <Scope />
      <Cta />
      <TeamHero />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/wedding" element={<Wedding />} />

      </Routes>
    </BrowserRouter>
   )
}