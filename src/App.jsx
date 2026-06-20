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
import Chatbot from "./components/Chatbot"
import ShaderAnimation from "./components/ui/ShaderAnimation"

import Wedding from "./pages/wedding" 

import Workshop from "./pages/workshop" 
import Music from "./pages/music"
import Event from "./pages/event"
import Production from "./pages/production"
import ITPage from "./pages/it"
import AssistantPage from "./pages/Assistant"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import MediaLibrary from "./pages/MediaLibrary"
import TeamMembers from "./pages/TeamMembers"
import AdminSettings from "./pages/AdminSettings"
import AdminPanel from "./components/AdminPanel"
import { supabase } from "./lib/supabase"
import { PRIVATE_BASE_PATH, privateLoginPath } from "./lib/privateRoutes"

const appStyles = `
@keyframes wdMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}

@keyframes wdPreparingBar {
  0% { transform: translateX(-110%); }
  55% { transform: translateX(-8%); }
  100% { transform: translateX(110%); }
}
`

function MaintenancePage() {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(88,166,255,0.16),transparent_26%),linear-gradient(180deg,#050505,#000)]" />
      <section className="relative z-10 flex w-full max-w-xs flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white shadow-[0_24px_70px_rgba(255,255,255,0.12)]">
          <img
            src="/wd-group-logo.jpeg"
            alt="WD Group Company"
            className="h-14 w-14 animate-pulse object-contain"
          />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-white/45">
          WD Group Company
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-white">
          Preparing Experience
        </h1>
        <p className="mt-3 text-xs leading-6 text-white/40">
          Kami sedang menyiapkan pengalaman terbaik untuk Anda.
        </p>
        <div className="mt-7 h-px w-full max-w-56 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 bg-white animate-[wdPreparingBar_1.35s_ease-in-out_infinite]" />
        </div>
      </section>
    </main>
  )
}

function PublicPage({ children, showChatbot = true, chatbotDelayMs = 0 }) {
  const [loading,setLoading] = useState(true)
  const [maintenance,setMaintenance] = useState(false)
  const [chatbotReady,setChatbotReady] = useState(chatbotDelayMs === 0)

  useEffect(()=>{
    const applySettings = (rows = []) => {
      const settings = {}
      rows.forEach((item) => {
        settings[item.key] = String(item.value ?? "").trim().toLowerCase()
      })

      setMaintenance(
        settings.maintenance_mode === "true" ||
        settings.show_public_website === "false"
      )
    }

    const fetchSettings = async()=>{
      const { data, error } = await supabase
        .from("site_settings")
        .select("key,value")
        .in("key", ["maintenance_mode", "show_public_website"])

      if (!error) applySettings(data)
      setLoading(false)
    }

    fetchSettings()

    const syncOnFocus = () => fetchSettings()
    const syncOnVisibility = () => {
      if (document.visibilityState === "visible") fetchSettings()
    }

    window.addEventListener("focus", syncOnFocus)
    document.addEventListener("visibilitychange", syncOnVisibility)

    const settingsChannel = supabase
      .channel("public-site-settings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        fetchSettings
      )
      .subscribe()

    return () => {
      window.removeEventListener("focus", syncOnFocus)
      document.removeEventListener("visibilitychange", syncOnVisibility)
      supabase.removeChannel(settingsChannel)
    }
  },[])

  useEffect(()=>{
    if(!showChatbot || chatbotDelayMs === 0) return

    const timer = setTimeout(()=>{
      setChatbotReady(true)
    }, chatbotDelayMs)

    return ()=>clearTimeout(timer)
  },[showChatbot, chatbotDelayMs])

  if(!loading && maintenance) return <MaintenancePage />

  return (
    <>
      {children}
      {!loading && showChatbot && chatbotReady && <Chatbot />}
    </>
  )
}

function HomeIntro({ onDone }) {
  const [showIntro,setShowIntro] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowIntro(false)
      onDone?.()
    },2600)

    return ()=>clearTimeout(timer)
  },[onDone])

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
  const [introActive,setIntroActive] = useState(true)

  return (
    <>
      <Cursor />
      <HomeIntro onDone={()=>setIntroActive(false)} />
      {!introActive && <Navbar />}
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
          <Route path="/" element={<PublicPage chatbotDelayMs={2700}><Home /></PublicPage>} />
          <Route path="/works" element={<PublicPage><Works /></PublicPage>} />
          
          <Route path="/wedding" element={<PublicPage><Wedding /></PublicPage>} />
          
          <Route path="/workshop" element={<PublicPage><Workshop /></PublicPage>} />
          <Route path="/music" element={<PublicPage><Music /></PublicPage>} />
          <Route path="/event" element={<PublicPage><Event /></PublicPage>} />
          <Route path="/production" element={<PublicPage><Production /></PublicPage>} />
          <Route path="/it" element={<PublicPage><ITPage /></PublicPage>} />
          <Route path="/assistant" element={<PublicPage showChatbot={false}><AssistantPage /></PublicPage>} />

          <Route path={privateLoginPath} element={<Login />} />
          <Route
            path={PRIVATE_BASE_PATH}
            element = {
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
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
