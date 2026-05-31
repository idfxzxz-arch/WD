import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Login() {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

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

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

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
