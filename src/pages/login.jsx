import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import ShaderAnimation from "../components/ui/ShaderAnimation"

export default function Login() {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [showIntro,setShowIntro] = useState(()=>{
    return sessionStorage.getItem("wd-admin-login-intro-seen") !== "true"
  })

  useEffect(()=>{

    const introKey = "wd-admin-login-intro-seen"

    if(showIntro){
      sessionStorage.setItem(introKey,"true")

      const timer = setTimeout(()=>{
        setShowIntro(false)
      },2600)

      return ()=>clearTimeout(timer)
    }

  },[showIntro])

  const login = async(e)=>{

    e.preventDefault()
    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      })

    setLoading(false)

    if(error){
      alert(error.message)
      return
    }

    navigate("/admin/dashboard")
  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center px-6">

      <ShaderAnimation className="opacity-40" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.48),rgba(9,9,11,0.95))]" />

      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-[loginIntroOut_2.6s_ease_forwards]">
          <ShaderAnimation />

          <div className="relative z-10 text-center px-6 animate-[loginIntroText_2.6s_ease_forwards]">
            <p className="text-blue-300 tracking-[0.55em] uppercase text-xs sm:text-sm mb-5">
              Welcome To
            </p>

            <h2 className="text-white text-5xl sm:text-7xl font-bold tracking-tight">
              WD ADMIN
            </h2>

            <div className="mx-auto mt-7 h-px w-48 overflow-hidden bg-white/10">
              <div className="h-full w-full bg-blue-400 animate-[loginIntroLine_1.7s_ease-in-out_forwards]" />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md animate-[loginCardIn_0.8s_ease_forwards]">

        {/* LOGO / TITLE */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            WD ADMIN
          </h1>

          <p className="text-zinc-400 mt-2">
            Welcome back, administrator.
          </p>

        </div>

        {/* CARD */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <form
            onSubmit={login}
            className="space-y-5"
          >

            <div>

              <label className="text-zinc-300 text-sm">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="text-zinc-300 text-sm">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-xl font-semibold"
            >

              {loading
                ? "Signing in..."
                : "Login Admin"}

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}
