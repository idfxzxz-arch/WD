import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  FileText,
  Image,
  LayoutDashboard,
  Loader2,
  LogOut,
  Save,
  Settings,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Users,
} from "lucide-react"
import { supabase } from "../lib/supabase"
import { privateLoginPath, privatePath } from "../lib/privateRoutes"

const cards = [
  {
    title: "Website Content",
    desc: "Atur teks halaman, scope, dan works dari admin panel.",
    href: privatePath("content"),
    icon: FileText,
  },
  {
    title: "Media Library",
    desc: "Kelola file dan aset foto yang dipakai website.",
    href: privatePath("media"),
    icon: Image,
  },
  {
    title: "Team Members",
    desc: "Lihat admin terdaftar dan atur role akses.",
    href: privatePath("team"),
    icon: Users,
  },
  {
    title: "Dashboard",
    desc: "Kembali ke ringkasan aktivitas dan statistik.",
    href: privatePath("dashboard"),
    icon: LayoutDashboard,
  },
]

const defaultSettings = {
  site_name: "WD Group",
  default_language: "id",
  contact_email: "",
  whatsapp_url: "https://wa.me/6285707909415",
  instagram_url: "",
  admin_panel_name: "WD Admin",
  maintenance_mode: "false",
  show_public_website: "true",
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [adminEmail, setAdminEmail] = useState("System")
  const [role, setRole] = useState("admin")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState("")
  const isSuperAdmin = role === "superadmin"

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(""), 2500)
  }

  const updateField = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const fetchSettings = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.email) setAdminEmail(user.email)

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id)
      .maybeSingle()

    setRole(profile?.role || "admin")

    const { data, error } = await supabase.from("site_settings").select("key,value")

    if (!error && data) {
      const mapped = data.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value ?? "" }),
        defaultSettings
      )
      setSettings(mapped)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const saveSettings = async (event) => {
    event.preventDefault()

    if (!isSuperAdmin) {
      alert("Hanya superadmin yang bisa mengubah settings.")
      return
    }

    setSaving(true)

    try {
      const rows = Object.entries(settings).map(([key, value]) => ({
        key,
        value: String(value ?? ""),
        updated_at: new Date().toISOString(),
      }))

      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" })

      if (error) throw error

      await supabase.from("activities").insert([
        {
          admin_email: adminEmail,
          action_name: "Updated Settings",
          target_name: "Website dan Admin Panel",
        },
      ])

      showToast("Settings berhasil disimpan.")
    } catch (error) {
      alert("Gagal menyimpan settings: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = privateLoginPath
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
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Settings
            </h1>
            <p className="text-xs md:text-sm text-zinc-500">
              Pengaturan cepat untuk website dan admin panel.
            </p>
          </div>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Mode lihat saja. Settings hanya bisa disimpan oleh superadmin.
        </div>
      )}

      <form
        onSubmit={saveSettings}
        className="mb-6 rounded-xl border border-white/5 bg-[#111111] p-4 md:p-5"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Website & Admin</h2>
              <p className="text-xs text-zinc-500">
                Konfigurasi dasar yang tersimpan di database.
              </p>
            </div>
          </div>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Nama Website
            </label>
            <input
              value={settings.site_name}
              onChange={(event) => updateField("site_name", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Nama Admin Panel
            </label>
            <input
              value={settings.admin_panel_name}
              onChange={(event) => updateField("admin_panel_name", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Bahasa Default
            </label>
            <select
              value={settings.default_language}
              onChange={(event) => updateField("default_language", event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Email Kontak
            </label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(event) => updateField("contact_email", event.target.value)}
              placeholder="hello@wdgroup.id"
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Link WhatsApp
            </label>
            <input
              value={settings.whatsapp_url}
              onChange={(event) => updateField("whatsapp_url", event.target.value)}
              placeholder="https://wa.me/..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Link Instagram
            </label>
            <input
              value={settings.instagram_url}
              onChange={(event) => updateField("instagram_url", event.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              updateField(
                "maintenance_mode",
                settings.maintenance_mode === "true" ? "false" : "true"
              )
            }
            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
              settings.maintenance_mode === "true"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                : "border-white/10 bg-zinc-900 text-zinc-300"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">Maintenance Mode</span>
              <span className="text-xs opacity-70">Tandai website sedang maintenance.</span>
            </span>
            {settings.maintenance_mode === "true" ? (
              <ToggleRight className="h-5 w-5" />
            ) : (
              <ToggleLeft className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              updateField(
                "show_public_website",
                settings.show_public_website === "true" ? "false" : "true"
              )
            }
            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
              settings.show_public_website === "true"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                : "border-white/10 bg-zinc-900 text-zinc-300"
            }`}
          >
            <span>
              <span className="block text-sm font-semibold">Public Website</span>
              <span className="text-xs opacity-70">Status tampil untuk website utama.</span>
            </span>
            {settings.show_public_website === "true" ? (
              <ToggleRight className="h-5 w-5" />
            ) : (
              <ToggleLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={!isSuperAdmin || saving || loading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Menyimpan..." : "Simpan Settings"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              to={card.href}
              className="rounded-xl border border-white/5 bg-[#111111] p-5 hover:border-indigo-500/40 hover:bg-white/[0.04] transition"
            >
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 w-fit mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold text-white">{card.title}</h2>
              <p className="mt-1 text-sm text-zinc-500 leading-relaxed">{card.desc}</p>
            </Link>
          )
        })}
      </div>

      <div className="rounded-xl border border-white/5 bg-[#111111] p-5">
        <h2 className="text-base font-semibold text-white mb-1">Account</h2>
        <p className="text-sm text-zinc-500 mb-4">
          Gunakan ini jika ingin keluar dari admin panel di perangkat ini.
        </p>
        <button
          onClick={signOut}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
