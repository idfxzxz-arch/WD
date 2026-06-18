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
import { supabase } from "./lib/supabase"

const appStyles = `
@keyframes wdMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}
`

function MaintenancePage() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#080604] px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,159,103,0.24),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.14),transparent_30%),linear-gradient(135deg,#080604,#17100d_48%,#050505)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,transparent_0_42%,rgba(255,255,255,.55)_42%_43%,transparent_43%_100%)] bg-[length:34px_34px]" />

      <section className="relative z-10 max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl font-bold shadow-2xl">
          WD
        </div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-amber-200/80">
          Maintenance Mode
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Website sedang dalam perawatan.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-base">
          Kami sedang merapikan beberapa bagian website agar pengalaman Anda
          lebih baik. Silakan kembali beberapa saat lagi.
        </p>
        <a
          href="https://wa.me/6285707909415"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-100"
        >
          Hubungi Admin
        </a>
      </section>
    </main>
  )
}

function PublicPage({ children }) {
  const [loading,setLoading] = useState(true)
  const [maintenance,setMaintenance] = useState(false)

  useEffect(()=>{
    const fetchSettings = async()=>{
      const { data } = await supabase
        .from("site_settings")
        .select("key,value")
        .in("key", ["maintenance_mode", "show_public_website"])

      const settings = {}
      data?.forEach((item)=>{
        settings[item.key] = item.value
      })

      setMaintenance(
        settings.maintenance_mode === "true" ||
        settings.show_public_website === "false"
      )
      setLoading(false)
    }

    fetchSettings()
  },[])

  if(loading){
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black text-sm text-white/50">
        Loading...
      </div>
    )
  }

  if(maintenance) return <MaintenancePage />

  return children
}

function HomeIntro() {
  const [showIntro,setShowIntro] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowIntro(false)
    },2600)

    return ()=>clearTimeout(timer)
  },[])

  if(!showIntro) return null

  return (
    <div className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black animate-[loginIntroOut_2.6s_ease_forwards]">
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
      <HomeIntro />
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
      <style>{appStyles}</style>
      <BrowserRouter>
        <Routes>
          {/* WEBSITE */}
          <Route path="/" element={<PublicPage><Home /></PublicPage>} />
          <Route path="/works" element={<PublicPage><Works /></PublicPage>} />
          
          {/* 👇 2. GANTI ELEMENTNYA DENGAN KOMPONEN WEDDING IPAD */}
          <Route path="/wedding" element={<PublicPage><Wedding /></PublicPage>} />
          
          <Route path="/workshop" element={<PublicPage><Workshop /></PublicPage>} />
          <Route path="/music" element={<PublicPage><Music /></PublicPage>} />
          <Route path="/event" element={<PublicPage><Event /></PublicPage>} />
          <Route path="/production" element={<PublicPage><Production /></PublicPage>} />
          <Route path="/it" element={<PublicPage><ITPage /></PublicPage>} />

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
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
