import { useEffect, useState, useRef, useCallback, Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Volume2, VolumeX, SkipForward, Play } from "lucide-react"
import { LanguageProvider } from "./context/LanguageContext"
import Cursor from "./components/Cursor"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Section from "./components/Section"
import About from "./components/About"
import Works from "./components/works"
import Cta from "./components/Cta"
import Scope from "./components/scope"
import Chatbot from "./components/Chatbot"
import { PageTransitionProvider } from "./components/PageTransition"
import { HelmetProvider } from "react-helmet-async"
import SEO from "./components/SEO"

const Wedding = lazy(() => import("./pages/wedding"))
const WeddingRegion = lazy(() => import("./pages/WeddingRegion"))
const Workshop = lazy(() => import("./pages/workshop"))
const Music = lazy(() => import("./pages/music"))
const Event = lazy(() => import("./pages/event"))
const Production = lazy(() => import("./pages/production"))
const ITPage = lazy(() => import("./pages/it"))
const AssistantPage = lazy(() => import("./pages/Assistant"))
const Login = lazy(() => import("./pages/login"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const MediaLibrary = lazy(() => import("./pages/MediaLibrary"))
const TeamMembers = lazy(() => import("./pages/TeamMembers"))
const AdminSettings = lazy(() => import("./pages/AdminSettings"))
const AdminPanel = lazy(() => import("./components/AdminPanel"))
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
            src="/wd-group-logo.webp"
            alt="WD Group Company"
            className="h-14 w-14 animate-pulse object-contain"
          />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-white/45">
          WD Group Company
        </p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
          Preparing Experience
        </h2>
        <p className="mt-3 text-xs leading-6 text-white/40">
          Kami sedang memuat halaman untuk Anda.
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
  const [showIntro, setShowIntro] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 640 || (window.matchMedia && window.matchMedia("(max-width: 639px)").matches)
  })
  const videoRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)")
    const handler = (e) => setIsMobile(e.matches)
    if (mql.addEventListener) {
      mql.addEventListener("change", handler)
      return () => mql.removeEventListener("change", handler)
    } else if (mql.addListener) {
      mql.addListener(handler)
      return () => mql.removeListener(handler)
    }
  }, [])

  const videoSrc = isMobile
    ? "/vid/wd_opening_mobile.mp4"
    : "/vid/gemini_generated_video_20b2f22c.mp4"
  const webmSrc = isMobile
    ? "/vid/wd_opening_mobile.webm"
    : "/vid/gemini_generated_video_20b2f22c.webm"
  const posterSrc = isMobile
    ? "/vid/opening_poster_mobile.webp"
    : "/vid/opening_poster_desktop.webp"

  const handleFinish = useCallback(() => {
    setIsFadingOut(true)
    setTimeout(() => {
      setShowIntro(false)
      onDone?.()
    }, 1000)
  }, [onDone])

  // Fallback timer starts only when video is actively playing
  useEffect(() => {
    if (!isPlaying) return
    const timer = setTimeout(() => {
      handleFinish()
    }, 11000)

    return () => clearTimeout(timer)
  }, [isPlaying, handleFinish])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true
    video.load()

    const onPlayEvent = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }
    const onPauseEvent = () => {
      if (!video.ended) {
        setIsPaused(true)
      }
    }

    video.addEventListener("playing", onPlayEvent)
    video.addEventListener("pause", onPauseEvent)

    const startPlay = () => {
      const p = video.play()
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true)
          setIsPaused(false)
        }).catch(() => {
          // Autoplay blocked by browser policy (e.g. Firefox default)
          setIsPaused(true)
        })
      }
    }

    startPlay()

    // Trigger play on first window interaction
    const onUserInteract = () => {
      if (video && video.paused) {
        startPlay()
      }
      window.removeEventListener("pointerdown", onUserInteract)
      window.removeEventListener("keydown", onUserInteract)
    }
    window.addEventListener("pointerdown", onUserInteract)
    window.addEventListener("keydown", onUserInteract)

    return () => {
      video.removeEventListener("playing", onPlayEvent)
      video.removeEventListener("pause", onPauseEvent)
      window.removeEventListener("pointerdown", onUserInteract)
      window.removeEventListener("keydown", onUserInteract)
    }
  }, [videoSrc])

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      if (videoRef.current) {
        videoRef.current.muted = next
      }
      return next
    })
  }

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        setIsPaused(false)
      }).catch(() => {})
    }
  }

  if (!showIntro) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#bcbcbc] transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={handleManualPlay}
    >
      <video
        ref={videoRef}
        key={isMobile ? "mobile-intro" : "desktop-intro"}
        poster={posterSrc}
        className="h-full w-full object-cover"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleFinish}
        onError={handleFinish}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Central Play button shown if autoplay was restricted by browser */}
      {isPaused && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleManualPlay()
          }}
          className="absolute z-30 flex items-center gap-3 rounded-full bg-black/80 hover:bg-black/95 text-white px-7 py-3.5 text-sm sm:text-base font-bold tracking-wide backdrop-blur-md shadow-2xl transition transform hover:scale-105 cursor-pointer border border-white/20 animate-pulse"
        >
          <Play className="h-5 w-5 fill-white text-white" />
          <span>Putar Animasi Video</span>
        </button>
      )}

      {/* Action buttons: Sound toggle & Skip */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/60 cursor-pointer"
          title={isMuted ? "Aktifkan Suara" : "Bisukan"}
          aria-label={isMuted ? "Aktifkan Suara" : "Bisukan"}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isMuted ? "Suara" : "Mute"}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleFinish()
          }}
          className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/60 cursor-pointer"
          aria-label="Lewati intro"
        >
          <span>Lewati</span>
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function Home() {
  const [introActive,setIntroActive] = useState(true)

  return (
    <>
      <SEO url="https://www.wdgroupcompany.biz.id/" />
      <Cursor />
      <HomeIntro onDone={()=>setIntroActive(false)} />
      {!introActive && <Navbar />}
      <Hero />
      <Section />
      <About />
      <Works />
      <Scope />
      <Cta />

    </>
  )
}

function MouseDragScroll() {
  useEffect(() => {
    let dragging = false
    let lastY = 0

    const isInteractive = (target) => target.closest(
      "input, textarea, select, button, a, [role='button'], [contenteditable='true']"
    )

    const onPointerDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || isInteractive(event.target)) return
      dragging = true
      lastY = event.clientY
    }

    const onPointerMove = (event) => {
      if (!dragging) return
      event.preventDefault()
      window.scrollBy({ top: lastY - event.clientY, behavior: "auto" })
      lastY = event.clientY
    }

    const stopDragging = () => {
      dragging = false
    }

    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove, { passive: false })
    window.addEventListener("pointerup", stopDragging)
    window.addEventListener("pointercancel", stopDragging)

    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", stopDragging)
      window.removeEventListener("pointercancel", stopDragging)
    }
  }, [])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "")
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        }
      }, 100)
      return () => clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const dpRoot = document.querySelector(".dp-root")
    if (dpRoot) {
      dpRoot.scrollTop = 0
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  return (
    <HelmetProvider>
      <LanguageProvider>
        <MouseDragScroll />
        <style>{appStyles}</style>
        <BrowserRouter>
          <ScrollToTop />
          <PageTransitionProvider>
            <Suspense fallback={<div className="flex min-h-[100dvh] items-center justify-center bg-black"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" /></div>}>
              <Routes>
                <Route path="/" element={<PublicPage showChatbot={false}><Home /></PublicPage>} />
                <Route path="/works" element={<PublicPage><SEO title="Portfolio & Showcase Karya" description="Portofolio lengkap karya dan layanan dari WD Group Company: Wedding Organizer, Event, Visual Production, Musik, Workshop, dan Solusi Digital." url="https://www.wdgroupcompany.biz.id/works" /><Works /></PublicPage>} />
                
                <Route path="/wedding" element={<PublicPage showChatbot={false}><Wedding /></PublicPage>} />
                <Route path="/wedding/:regionSlug" element={<PublicPage showChatbot={false}><WeddingRegion /></PublicPage>} />
                
                <Route path="/workshop" element={<PublicPage showChatbot={false}><Workshop /></PublicPage>} />
                <Route path="/music" element={<PublicPage showChatbot={false}><Music /></PublicPage>} />
                <Route path="/event" element={<PublicPage showChatbot={false}><Event /></PublicPage>} />
                <Route path="/production" element={<PublicPage showChatbot={false}><Production /></PublicPage>} />
                <Route path="/it" element={<PublicPage showChatbot={false}><ITPage /></PublicPage>} />
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
            </Suspense>
          </PageTransitionProvider>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  )
}
