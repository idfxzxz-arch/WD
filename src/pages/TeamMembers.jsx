import { useEffect, useState } from "react"
import {
  Eye,
  EyeOff,
  Loader2,
  Plus,
  ShieldCheck,
  UserRoundCog,
  UsersRound,
} from "lucide-react"
import { supabase } from "../lib/supabase"

const initialForm = {
  email: "",
  password: "",
  role: "admin",
}

const withTimeout = (promise, message = "Request terlalu lama. Coba refresh lalu ulangi.") => {
  let timeoutId

  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), 15000)
  })

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId))
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function TeamMembers() {
  const [members, setMembers] = useState([])
  const [currentRole, setCurrentRole] = useState("admin")
  const [currentEmail, setCurrentEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [creating, setCreating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [toast, setToast] = useState("")
  const isSuperAdmin = currentRole === "superadmin"

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(""), 2500)
  }

  const fetchMembers = async () => {
    setLoading(true)

    try {
      const { data: { user } } = await withTimeout(supabase.auth.getUser())
      if (user?.email) setCurrentEmail(user.email)

      const { data: profile } = await withTimeout(
        supabase
          .from("profiles")
          .select("id,email,role")
          .eq("id", user?.id)
          .maybeSingle()
      )

      setCurrentRole(profile?.role || "admin")

      const { data, error } = await withTimeout(
        supabase
          .from("profiles")
          .select("id,email,role,created_at")
          .order("created_at", { ascending: false })
      )

      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      alert("Gagal memuat team members: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const updateRole = async (member, role) => {
    if (!isSuperAdmin) {
      alert("Hanya superadmin yang bisa mengubah role.")
      return
    }

    setSavingId(member.id)
    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", member.id)

    if (error) {
      alert("Gagal mengubah role: " + error.message)
    } else {
      await supabase.from("activities").insert([{
        admin_email: currentEmail || "System",
        action_name: "Updated Role",
        target_name: `${member.email} menjadi ${role}`,
      }])
      await fetchMembers()
    }

    setSavingId(null)
  }

  const addMember = async (event) => {
    event.preventDefault()

    if (!isSuperAdmin) {
      alert("Hanya superadmin yang bisa menambah user.")
      return
    }

    const email = form.email.trim().toLowerCase()
    const password = form.password.trim()

    if (!email || !password) {
      alert("Email dan password wajib diisi.")
      return
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter.")
      return
    }

    setCreating(true)

    const {
      data: { session: adminSession },
    } = await supabase.auth.getSession()

    try {
      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email,
          password,
        }),
        "Signup terlalu lama. Pastikan Email signups aktif di Supabase, lalu coba lagi."
      )

      if (error) throw error

      if (data.user?.identities && data.user.identities.length === 0) {
        throw new Error("Email ini sudah terdaftar di Supabase Auth.")
      }

      if (adminSession?.access_token && adminSession?.refresh_token) {
        await withTimeout(
          supabase.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token,
          })
        )
      }

      const newUserId = data.user?.id
      if (!newUserId) {
        throw new Error("User berhasil diminta dibuat, tetapi ID user tidak tersedia.")
      }

      const { error: profileError } = await withTimeout(
        supabase
          .from("profiles")
          .upsert(
            {
              id: newUserId,
              email,
              role: form.role,
            },
            { onConflict: "id" }
          ),
        "User Auth berhasil dibuat, tetapi profile role terlalu lama disimpan. Cek policy profiles di Supabase."
      )

      if (profileError) {
        await wait(1200)

        const { data: existingProfile, error: checkError } = await withTimeout(
          supabase
            .from("profiles")
            .select("id")
            .eq("id", newUserId)
            .maybeSingle(),
          "User Auth berhasil dibuat, tetapi profile belum terbaca. Jalankan ulang SQL trigger profiles di Supabase."
        )

        if (checkError || !existingProfile) {
          throw profileError
        }
      }

      await withTimeout(
        supabase.from("activities").insert([
          {
            admin_email: currentEmail || "System",
            action_name: "Added Team Member",
            target_name: `${email} sebagai ${form.role}`,
          },
        ])
      )

      setForm(initialForm)
      await fetchMembers()
      showToast("User admin berhasil ditambahkan.")
    } catch (error) {
      alert("Gagal menambah user: " + error.message)
    } finally {
      if (adminSession?.access_token && adminSession?.refresh_token) {
        await supabase.auth.setSession({
          access_token: adminSession.access_token,
          refresh_token: adminSession.refresh_token,
        })
      }
      setCreating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {toast && (
        <div className="fixed left-4 right-4 top-4 z-50 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-lg sm:left-auto sm:right-6">
          {toast}
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <UsersRound className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Team Members
            </h1>
            <p className="text-xs md:text-sm text-zinc-500">
              Kelola akun admin dan role akses dashboard.
            </p>
          </div>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Mode lihat saja. Perubahan role hanya bisa dilakukan oleh superadmin.
        </div>
      )}

      {isSuperAdmin && (
        <form
          onSubmit={addMember}
          className="mb-6 rounded-xl border border-white/5 bg-[#111111] p-4 md:p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Tambah User Admin</h2>
              <p className="text-xs text-zinc-500">
                Buat akun login baru dan tentukan role aksesnya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_160px_auto] md:items-end">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="admin@email.com"
                className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Role
              </label>
              <select
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({ ...current, role: event.target.value }))
                }
                className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Tambah
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-xl border border-white/5 bg-[#111111] p-6 text-sm text-zinc-500">
            Loading team members...
          </div>
        ) : members.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-white/5 bg-[#111111] p-4 md:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold uppercase text-white shrink-0">
                  {(member.email || "AD").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {member.email}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    {member.role === "superadmin" ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <UserRoundCog className="w-3.5 h-3.5 text-zinc-500" />
                    )}
                    <span className="capitalize">{member.role || "admin"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:w-64">
                {["admin", "superadmin"].map((roleOption) => (
                  <button
                    key={roleOption}
                    onClick={() => updateRole(member, roleOption)}
                    disabled={!isSuperAdmin || savingId === member.id || member.role === roleOption}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      member.role === roleOption
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {savingId === member.id ? "..." : roleOption}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/5 bg-[#111111] p-6 text-sm text-zinc-500">
            Belum ada member terdaftar di tabel profiles.
          </div>
        )}
      </div>
    </div>
  )
}
