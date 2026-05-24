import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Plus, Trash2, Save, Globe, ChevronDown } from "lucide-react"

// ─── CONFIG FIELDS PER SECTION ───────────────────────────────────────────────
const CONTENT_SECTIONS = {
  hero: [
    { key: "title", label: "Judul (baris 1)", type: "text" },
    { key: "subtitle", label: "Subtitle (baris 2)", type: "text" },
  ],
  about: [
    { key: "title", label: "Judul About", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
  ],
  services: [
    { key: "title", label: "Judul Section Services", type: "text" },
  ],
  contact: [
    { key: "title_line1", label: "Judul baris 1", type: "text" },
    { key: "title_line2", label: "Judul baris 2", type: "text" },
    { key: "instagram", label: "Link Instagram", type: "text" },
    { key: "whatsapp", label: "Link WhatsApp", type: "text" },
    { key: "email", label: "Link Email (mailto:...)", type: "text" },
  ],
}

const LANGS = [
  { code: "id", label: "🇮🇩 Indonesia" },
  { code: "en", label: "🇬🇧 English" },
]

const TABS = ["hero", "about", "services", "contact", "scope", "works"]

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero")
  const [lang, setLang] = useState("id")
  const [content, setContent] = useState({})       // { section: { key: value } }
  const [scopeItems, setScopeItems] = useState([]) // scope_services rows
  const [works, setWorks] = useState([])           // works rows
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState("")
  const [adminEmail, setAdminEmail] = useState("System")

  // ── fetch all content on mount & lang change
  useEffect(() => { fetchContent() }, [lang])
  useEffect(() => { fetchScope() }, [])
  useEffect(() => { fetchWorks() }, [])
  
  // Ambil email user yang sedang aktif
  useEffect(() => {
    const getAdminProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) setAdminEmail(user.email)
    }
    getAdminProfile()
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(""), 2500)
  }

  // ─── FETCH ────────────────────────────────────────────────────────────────
  const fetchContent = async () => {
    const { data } = await supabase
      .from("content")
      .select("*")
      .eq("lang", lang)
    const map = {}
    data?.forEach(row => {
      if (!map[row.section]) map[row.section] = {}
      map[row.section][row.key] = row.value
    })
    setContent(map)
  }

  const fetchScope = async () => {
    const { data } = await supabase
      .from("scope_services")
      .select("*")
      .order("order_index")
    setScopeItems(data || [])
  }

  const fetchWorks = async () => {
    const { data } = await supabase
      .from("works")
      .select("*")
      .order("order_index")
    setWorks(data || [])
  }

  // ─── CONTENT (hero/about/services/contact) ───────────────────────────────
  const handleChange = (section, key, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }

  const saveContent = async (section) => {
    setSaving(true)
    const fields = content[section] || {}
    const updates = Object.entries(fields).map(([key, value]) => ({
      section, key, value, lang,
      updated_at: new Date().toISOString()
    }))
    
    const { error } = await supabase.from("content").upsert(updates, { onConflict: "section,key,lang" })
    
    if (!error) {
      // LOG TETAP BAHASA INGGRIS
      await supabase.from("activities").insert([
        {
          admin_email: adminEmail,
          action_name: "Updated Content",
          target_name: `Section ${section.toUpperCase()} (${lang.toUpperCase()})`
        }
      ])
    }

    setSaving(false)
    showToast("✓ Perubahan disimpan!")
  }

  const val = (section, key) => content[section]?.[key] ?? ""

  // ─── SCOPE ────────────────────────────────────────────────────────────────
  const updateScope = (id, field, value) => {
    setScopeItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const addScope = () => {
    setScopeItems(prev => [...prev, {
      id: `new_${Date.now()}`,
      name: "",
      link: "#",
      order_index: prev.length,
      _new: true
    }])
  }

  const deleteScope = async (item) => {
    if (!item._new) {
      const { error } = await supabase.from("scope_services").delete().eq("id", item.id)
      if (!error) {
        // LOG TETAP BAHASA INGGRIS
        await supabase.from("activities").insert([
          {
            admin_email: adminEmail,
            action_name: "Deleted Scope Item",
            target_name: item.name || "Unnamed Scope Item"
          }
        ])
      }
    }
    setScopeItems(prev => prev.filter(s => s.id !== item.id))
  }

  const saveScope = async () => {
    setSaving(true)
    let hasChanges = false

    for (const item of scopeItems) {
      const { id, _new, ...rest } = item
      if (_new) {
        await supabase.from("scope_services").insert(rest)
        hasChanges = true
      } else {
        await supabase.from("scope_services").update(rest).eq("id", id)
        hasChanges = true
      }
    }

    if (hasChanges) {
      // LOG TETAP BAHASA INGGRIS
      await supabase.from("activities").insert([
        {
          admin_email: adminEmail,
          action_name: "Saved Scope List",
          target_name: "Scope Services Manager"
        }
      ])
    }

    await fetchScope()
    setSaving(false)
    showToast("✓ Scope disimpan!")
  }

  // ─── WORKS ────────────────────────────────────────────────────────────────
  const updateWork = (id, field, value) => {
    setWorks(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w))
  }

  const addWork = () => {
    setWorks(prev => [...prev, {
      id: `new_${Date.now()}`,
      title: "",
      tags: "",
      image: "",
      link: "/",
      order_index: prev.length,
      _new: true
    }])
  }

  const deleteWork = async (item) => {
    if (!item._new) {
      const { error } = await supabase.from("works").delete().eq("id", item.id)
      if (!error) {
        // LOG TETAP BAHASA INGGRIS
        await supabase.from("activities").insert([
          {
            admin_email: adminEmail,
            action_name: "Deleted Work Item",
            target_name: item.title || "Unnamed Project"
          }
        ])
      }
    }
    setWorks(prev => prev.filter(w => w.id !== item.id))
  }

  const saveWorks = async () => {
    setSaving(true)
    let hasChanges = false

    for (const item of works) {
      const { id, _new, ...rest } = item
      if (_new) {
        await supabase.from("works").insert(rest)
        hasChanges = true
      } else {
        await supabase.from("works").update(rest).eq("id", id)
        hasChanges = true
      }
    }

    if (hasChanges) {
      // LOG TETAP BAHASA INGGRIS
      await supabase.from("activities").insert([
        {
          admin_email: adminEmail,
          action_name: "Saved Portfolio List",
          target_name: "Works Showcase Manager"
        }
      ])
    }

    await fetchWorks()
    setSaving(false)
    showToast("✓ Works disimpan!")
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* Toast tetap menggunakan notifikasi lokal yang user-friendly */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white text-sm px-5 py-3 rounded-2xl shadow-lg">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
            <p className="text-zinc-500 text-sm mt-1">Edit konten website WD Group</p>
          </div>

          {/* Lang switcher */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-1 py-1">
            <Globe size={14} className="text-zinc-500 ml-2" />
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  lang === l.code
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 flex-wrap mb-8">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── CONTENT SECTIONS (hero/about/services/contact) ── */}
        {CONTENT_SECTIONS[activeTab] && (
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Globe size={12} />
              Mengedit konten bahasa: <span className="text-white font-medium">{lang === "id" ? "Indonesia" : "English"}</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6 capitalize">{activeTab}</h2>
              <div className="flex flex-col gap-5">
                {CONTENT_SECTIONS[activeTab].map(f => (
                  <div key={f.key}>
                    <label className="text-zinc-400 text-sm mb-1.5 block">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        className="w-full bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm resize-y min-h-[80px] border border-zinc-700 focus:outline-none focus:border-blue-500 transition"
                        value={val(activeTab, f.key)}
                        onChange={e => handleChange(activeTab, f.key, e.target.value)}
                      />
                    ) : (
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500 transition"
                        value={val(activeTab, f.key)}
                        onChange={e => handleChange(activeTab, f.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent(activeTab)}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? "Menyimpan..." : "Simpan perubahan"}
            </button>
          </div>
        )}

        {/* ── SCOPE ── */}
        {activeTab === "scope" && (
          <div>
            <p className="text-zinc-500 text-sm mb-6">Edit daftar layanan di section Scope (tidak berpengaruh ke bahasa).</p>
            <div className="flex flex-col gap-4 mb-6">
              {scopeItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Urutan</label>
                      <input
                        type="number"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.order_index}
                        onChange={e => updateScope(item.id, "order_index", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Nama Layanan</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.name}
                        onChange={e => updateScope(item.id, "name", e.target.value)}
                        placeholder="cth: Wedding Organizer"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Link</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.link}
                        onChange={e => updateScope(item.id, "link", e.target.value)}
                        placeholder="cth: /wedding atau #contact"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteScope(item)}
                    className="mt-6 p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={addScope}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-5 py-2.5 rounded-xl text-sm border border-zinc-700"
              >
                <Plus size={14} /> Tambah Layanan
              </button>
              <button
                onClick={saveScope}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Menyimpan..." : "Simpan Scope"}
              </button>
            </div>
          </div>
        )}

        {/* ── WORKS ── */}
        {activeTab === "works" && (
          <div>
            <p className="text-zinc-500 text-sm mb-6">Edit daftar portfolio/works (tidak berpengaruh ke bahasa). Tags dipisah koma, cth: <span className="text-zinc-300">E-Commerce, Brand</span></p>
            <div className="flex flex-col gap-4 mb-6">
              {works.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Judul</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.title}
                        onChange={e => updateWork(item.id, "title", e.target.value)}
                        placeholder="cth: WD SKY Wedding Organizer"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Tags (pisah koma)</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.tags}
                        onChange={e => updateWork(item.id, "tags", e.target.value)}
                        placeholder="cth: E-Commerce, Brand"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">URL Gambar</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.image}
                        onChange={e => updateWork(item.id, "image", e.target.value)}
                        placeholder="cth: /resources/Wedding/wedding.webp"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Link halaman</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.link}
                        onChange={e => updateWork(item.id, "link", e.target.value)}
                        placeholder="cth: /wedding"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Urutan</label>
                      <input
                        type="number"
                        className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
                        value={item.order_index}
                        onChange={e => updateWork(item.id, "order_index", Number(e.target.value))}
                      />
                    </div>
                  </div>
                  {item.image && (
                    <img src={item.image} className="rounded-xl max-h-36 object-cover border border-zinc-700 mb-3" />
                  )}
                  <button
                    onClick={() => deleteWork(item)}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={addWork}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-5 py-2.5 rounded-xl text-sm border border-zinc-700"
              >
                <Plus size={14} /> Tambah Project
              </button>
              <button
                onClick={saveWorks}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? "Menyimpan..." : "Simpan Works"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}