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
import Wedding from "./pages/wedding"
import Workshop from "./pages/workshop"
import Music from "./pages/music"
import Event from "./pages/event"
import Production from "./pages/production"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AdminPanel from "./components/AdminPanel"

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
        <Routes>
          {/* WEBSITE */}
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/music" element={<Music />} />
          <Route path="/event" element={<Event />} />
          <Route path="/production" element={<Production />} />

          {/* LOGIN */}
          <Route path="/admin/login" element={<Login />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* /admin → redirect ke /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<></>} />
            <Route path="content" element={<AdminPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}