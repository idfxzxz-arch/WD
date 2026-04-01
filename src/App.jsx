import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Section from "./components/Section"
import About from "./components/About"
import Works from "./components/works"
import Cta from "./components/Cta"
import TeamHero from "./components/TeamHero"
import Scope from "./components/scope"

import Wedding from "./pages/wedding"
import Workshop from "./pages/workshop"
import Music from "./pages/music"
import Event from "./pages/event"
import Production from "./pages/production"

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
    <LanguageProvider> {/* 🔥 INI KUNCI NYA */}
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/music" element={<Music />} />
          <Route path="/event" element={<Event />} />
          <Route path="/production" element={<Production />} />

        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}