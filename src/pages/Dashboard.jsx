import {
  useNavigate,
  Link,
  Outlet,
  useLocation
} from "react-router-dom"

import { supabase } from "../lib/supabase"

export default function Dashboard() {

  const navigate = useNavigate()
  const location = useLocation()

  const logout = async()=>{

    await supabase.auth.signOut()
    navigate("/admin/login")

  }

  return (

    <div className="min-h-screen flex bg-zinc-950 text-white">

      {/* SIDEBAR */}

      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold mb-10">
          WD ADMIN
        </h1>

        <nav className="space-y-3">

          <Link
            to="/admin/dashboard"
            className="block px-4 py-3 rounded-xl hover:bg-zinc-800 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/content"
            className="block px-4 py-3 rounded-xl hover:bg-zinc-800 transition"
          >
            Manage Content
          </Link>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Upload Media
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Users
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
            Settings
          </button>

        </nav>

        <button
          onClick={logout}
          className="mt-12 w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
        >
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-10">

        {location.pathname === "/admin/dashboard" && (

          <>

            <div className="flex justify-between items-center mb-10">

              <div>

                <h1 className="text-5xl font-bold">
                  Dashboard
                </h1>

                <p className="text-zinc-400 mt-2">
                  Manage your website content & media.
                </p>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl">

                <p className="text-sm text-zinc-400">
                  Website Status
                </p>

                <p className="text-green-400 font-bold">
                  ● Online
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <p className="text-zinc-400">
                  Total Projects
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  12
                </h2>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <p className="text-zinc-400">
                  Uploaded Media
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  84
                </h2>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

                <p className="text-zinc-400">
                  Admin Users
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  5
                </h2>

              </div>

            </div>

          </>

        )}

        <Outlet />

      </main>

    </div>

  )

}