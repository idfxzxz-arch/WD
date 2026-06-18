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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if(!session){
    return <Navigate to={privateLoginPath} replace />
  }

  return children
}
