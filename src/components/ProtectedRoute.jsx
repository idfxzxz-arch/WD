import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { privateLoginPath } from "../lib/privateRoutes"


export default function ProtectedRoute({ children }) {

  const [session,setSession] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const checkSession = async()=>{

      const { data } =
        await supabase.auth.getSession()

      setSession(data.session)
      setLoading(false)

    }

    checkSession()

  },[])

  if(loading){
    return (
      <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(180deg,#090909,#000)]" />
        <section className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white shadow-[0_24px_70px_rgba(255,255,255,0.12)]">
            <div className="absolute -inset-2 animate-spin rounded-full border border-transparent border-t-white/55" />
            <img
              src="/wd-group-logo.jpeg"
              alt="WD Group Company"
              className="h-14 w-14 animate-pulse object-contain"
            />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/40">
            Secure Workspace
          </p>
          <h1 className="mt-3 text-lg font-semibold text-white">
            Memverifikasi sesi admin
          </h1>
        </section>
      </main>
    )
  }

  if(!session){
    return <Navigate to={privateLoginPath} replace />
  }

  return children
}
