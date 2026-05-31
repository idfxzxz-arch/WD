import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import Cursor from "./components/Cursor"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Section from "./components/Section"
import About from "./components/About"
import Works from "./components/works"
import Cta from "./components/Cta"
import TeamHero from "./components/TeamHero"
import Scope from "./components/scope"
import ShaderAnimation from "./components/ui/ShaderAnimation"

// 👇 1. PASTIKAN IMPORT INI MENGARAH KE FILE KODE IPAD SHOWCASE ANDA
// Jika kode iPad tadi Anda simpan di folder pages dengan nama WeddingTestimonialsIpad.jsx:
import Wedding from "./pages/wedding" 

import Workshop from "./pages/workshop"
import Music from "./pages/music"
import Event from "./pages/event"
import Production from "./pages/production"
import ITPage from "./pages/it"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import MediaLibrary from "./pages/MediaLibrary"
import TeamMembers from "./pages/TeamMembers"
import AdminSettings from "./pages/AdminSettings"
import AdminPanel from "./components/AdminPanel"

function AppIntro() {
  const [showIntro,setShowIntro] = useState(()=>{
    return sessionStorage.getItem("wd-app-intro-seen") !== "true"
  })

  useEffect(()=>{

    if(showIntro){
      sessionStorage.setItem("wd-app-intro-seen","true")

      const timer = setTimeout(()=>{
        setShowIntro(false)
      },2600)

      return ()=>clearTimeout(timer)
    }

  },[showIntro])

  if(!showIntro) return null

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen w-screen items-center justify-center overflow-hidden bg-black animate-[loginIntroOut_2.6s_ease_forwards]">
      <ShaderAnimation />

      <div className="relative z-10 text-center px-6 animate-[loginIntroText_2.6s_ease_forwards]">
        <p className="text-blue-300 tracking-[0.55em] uppercase text-xs sm:text-sm mb-5">
          Welcome To
        </p>

        <h2 className="text-white text-5xl sm:text-7xl font-bold tracking-tight">
          WD GROUP
        </h2>

        <div className="mx-auto mt-7 h-px w-48 overflow-hidden bg-white/10">
          <div className="h-full w-full bg-blue-400 animate-[loginIntroLine_1.7s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <Cursor />
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
    <LanguageProvider>
      <BrowserRouter>
        <AppIntro />

        <Routes>
          {/* WEBSITE */}
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          
          {/* 👇 2. GANTI ELEMENTNYA DENGAN KOMPONEN WEDDING IPAD */}
          <Route path="/wedding" element={<Wedding />} />
          
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/music" element={<Music />} />
          <Route path="/event" element={<Event />} />
          <Route path="/production" element={<Production />} />
          <Route path="/it" element={<ITPage />} />

          {/* LOGIN */}
          <Route path="/admin/login" element={<Login />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element = {
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* /admin → redirect ke /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<></>} />
            <Route path="content" element={<AdminPanel />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="team" element={<TeamMembers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
