import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Plus, Trash2, Save, Globe, HardDriveUpload, Loader2, ImageIcon } from "lucide-react"

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
  wedding: [
    { key: "title", label: "Nama Brand / Judul", type: "text" },
    { key: "description", label: "Deskripsi (muncul di section About)", type: "textarea" },
    { key: "hero_label", label: "Label Hero (cth: Est. Jakarta · 2018)", type: "text" },
    { key: "hero_tagline", label: "Tagline Hero (cth: Your moment, perfectly crafted.)", type: "text" },
    { key: "hero_sub", label: "Sub-tagline Hero", type: "text" },
    { key: "stat_weddings", label: "Stat: Jumlah Wedding (cth: 200+)", type: "text" },
    { key: "stat_years", label: "Stat: Tahun Pengalaman (cth: 7)", type: "text" },
    { key: "stat_happy", label: "Stat: Happy Couples % (cth: 98%)", type: "text" },
    { key: "contact_link", label: "Link WhatsApp / Contact Person", type: "text" },
  ],
  music: [
    { key: "title", label: "Nama Brand / Judul (cth: Music Production)", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "stat_shows", label: "Stat: Jumlah Shows (cth: 150+)", type: "text" },
    { key: "stat_artists", label: "Stat: Jumlah Artists (cth: 40+)", type: "text" },
    { key: "stat_years", label: "Stat: Tahun Pengalaman (cth: 7)", type: "text" },
    { key: "contact_link", label: "Link WhatsApp / Contact", type: "text" },
  ],
  production: [
    { key: "title", label: "Nama Brand / Judul", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "contact_link", label: "Link WhatsApp / Contact", type: "text" },
  ],
  workshop: [
    { key: "title", label: "Nama Brand / Judul", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "contact_link", label: "Link WhatsApp / Contact", type: "text" },
  ],
  event: [
    { key: "title", label: "Nama Brand / Judul", type: "text" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "contact_link", label: "Link WhatsApp / Contact", type: "text" },
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

const CATEGORY_ROUTES = {
  wedding: "/wedding",
  music: "/music",
  production: "/production",
  workshop: "/workshop",
  event: "/event",
}

const SUBCATEGORIES = {
  wedding:    ["ceremony", "reception", "decor", "portrait"],
  music:      ["performance", "recording", "concert", "behind the scene"],
  production: ["film", "photo", "video", "commercial"],
  workshop:   ["class", "seminar", "training", "bootcamp"],
  event:      ["corporate", "concert", "exhibition", "private"],
}

const SECTION_COLORS = {
  wedding:    { tab: "border-amber-800/40 text-amber-400",   banner: "bg-amber-950/30 border-amber-800/30 text-amber-300",  icon: "💍" },
  music:      { tab: "border-violet-800/40 text-violet-400", banner: "bg-violet-950/30 border-violet-800/30 text-violet-300", icon: "🎵" },
  production: { tab: "border-blue-800/40 text-blue-400",     banner: "bg-blue-950/30 border-blue-800/30 text-blue-300",      icon: "🎬" },
  workshop:   { tab: "border-green-800/40 text-green-400",   banner: "bg-green-950/30 border-green-800/30 text-green-300",   icon: "🛠️" },
  event:      { tab: "border-rose-800/40 text-rose-400",     banner: "bg-rose-950/30 border-rose-800/30 text-rose-300",      icon: "🎪" },
}

const LANGS = [
  { code: "id", label: "🇮🇩 Indonesia" },
  { code: "en", label: "🇬🇧 English" },
]

const CONTENT_TABS = ["hero", "about", "wedding", "music", "production", "workshop", "event", "services", "contact"]
const ALL_TABS = [...CONTENT_TABS, "scope", "works"]

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero")
  const [lang, setLang] = useState("id")
  const [content, setContent] = useState({})
  const [scopeItems, setScopeItems] = useState([])
  const [works, setWorks] = useState([])
  const [filterCategory, setFilterCategory] = useState("all")
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(null)
  const [toast, setToast] = useState("")
  const [adminEmail, setAdminEmail] = useState("System")

  useEffect(() => { fetchContent() }, [lang])
  useEffect(() => { fetchScope() }, [])
  useEffect(() => { fetchWorks() }, [])
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
    const { data } = await supabase.from("content").select("*").eq("lang", lang)
    const map = {}
    data?.forEach(row => {
      if (!map[row.section]) map[row.section] = {}
      map[row.section][row.key] = row.value
    })
    setContent(map)
  }

  const fetchScope = async () => {
    const { data } = await supabase.from("scope_services").select("*").order("order_index")
    setScopeItems(data || [])
  }

  const fetchWorks = async () => {
    const { data } = await supabase.from("works").select("*").order("order_index")
    setWorks(data || [])
  }

  // ─── FILE UPLOAD ──────────────────────────────────────────────────────────
  const handleFileUpload = async (event, workId) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return
      setUploading(workId)
      const fileExt = file.name.split(".").pop()
      const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`
      const filePath = `works/${uniqueFileName}`
      const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, file)
      if (uploadError) throw uploadError
      const { data: { publicUrl } } = supabase.storage.from("photos").getPublicUrl(filePath)
      const isNewItem = String(workId).startsWith("new_")
      if (!isNewItem) {
        const { error: dbError } = await supabase.from("works").update({ image: publicUrl }).eq("id", workId)
        if (dbError) throw dbError
      }
      updateWork(workId, "image", publicUrl)
      await supabase.from("activities").insert([{
        admin_email: adminEmail,
        action_name: "Uploaded Media",
        target_name: `Image for Project (${uniqueFileName})`
      }])
      showToast("✓ Gambar berhasil diunggah!")
    } catch (error) {
      alert("Gagal mengunggah gambar: " + error.message)
    } finally {
      setUploading(null)
    }
  }

  // ─── CONTENT ──────────────────────────────────────────────────────────────
  const handleChange = (section, key, value) => {
    setContent(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
  }

  const saveContent = async (section) => {
    setSaving(true)
    const fields = content[section] || {}
    const updates = Object.entries(fields).map(([key, value]) => ({
      section, key, value, lang, updated_at: new Date().toISOString()
    }))
    const { error } = await supabase.from("content").upsert(updates, { onConflict: "section,key,lang" })
    if (!error) {
      await supabase.from("activities").insert([{
        admin_email: adminEmail,
        action_name: "Updated Content",
        target_name: `Section ${section.toUpperCase()} (${lang.toUpperCase()})`
      }])
      showToast("✓ Perubahan disimpan!")
    } else {
      alert("Gagal menyimpan konten: " + error.message)
    }
    setSaving(false)
  }

  const val = (section, key) => content[section]?.[key] ?? ""

  // ─── SCOPE ────────────────────────────────────────────────────────────────
  const updateScope = (id, field, value) => {
    setScopeItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))
  }
  const addScope = () => {
    setScopeItems(prev => [...prev, { id: `new_${Date.now()}`, name: "", link: "#", order_index: prev.length, _new: true }])
  }
  const deleteScope = async (item) => {
    if (!item._new) {
      await supabase.from("scope_services").delete().eq("id", item.id)
    }
    setScopeItems(prev => prev.filter(s => s.id !== item.id))
  }
  const saveScope = async () => {
    setSaving(true)
    try {
      for (const item of scopeItems) {
        const { id, _new, ...rest } = item
        if (_new) { await supabase.from("scope_services").insert(rest) }
        else { await supabase.from("scope_services").update(rest).eq("id", id) }
      }
      await fetchScope()
      showToast("✓ Scope disimpan!")
    } catch (error) {
      alert("Gagal: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  // ─── WORKS ────────────────────────────────────────────────────────────────
  const updateWork = (id, field, value) => {
    setWorks(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w))
  }
  const addWork = () => {
    const cat = filterCategory !== "all" ? filterCategory : "wedding"
    setWorks(prev => [...prev, {
      id: `new_${Date.now()}`,
      title: "", tags: "", image: "",
      link: "",           // ← kosong, biar getLink() di Works.jsx fallback ke category
      category: cat,
      subcategory: SUBCATEGORIES[cat]?.[0] || "",
      meta: "",
      order_index: prev.length,
      _new: true
    }])
  }
  const deleteWork = async (item) => {
    if (!item._new) await supabase.from("works").delete().eq("id", item.id)
    setWorks(prev => prev.filter(w => w.id !== item.id))
  }
  const saveWorks = async () => {
    setSaving(true)
    try {
      for (const item of works) {
        const { id, _new, ...rest } = item
        // Pastikan link selalu kosong supaya navigasi otomatis by category
        rest.link = ""
        if (_new) { await supabase.from("works").insert(rest) }
        else { await supabase.from("works").update(rest).eq("id", id) }
      }
      await supabase.from("activities").insert([{
        admin_email: adminEmail,
        action_name: "Saved Portfolio List",
        target_name: "Works Showcase Manager"
      }])
      await fetchWorks()
      showToast("✓ Works disimpan!")
    } catch (error) {
      alert("Gagal: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
  const divisionTabs = ["wedding", "music", "production", "workshop", "event"]

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
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
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-1 py-1">
            <Globe size={14} className="text-zinc-500 ml-2" />
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${lang === l.code ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs — grouped */}
        <div className="flex gap-1.5 flex-wrap mb-2">
          {["hero", "about", "services", "contact"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition ${activeTab === tab ? "bg-white text-black" : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Division tabs */}
        <div className="flex gap-1.5 flex-wrap mb-2 mt-1">
          {divisionTabs.map(tab => {
            const col = SECTION_COLORS[tab]
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${activeTab === tab ? "bg-white text-black border-white" : `bg-zinc-900 border-zinc-800 hover:text-white ${col.tab}`}`}>
                {col.icon} {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Utility tabs */}
        <div className="flex gap-1.5 flex-wrap mb-8 mt-1">
          {["scope", "works"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition ${activeTab === tab ? "bg-white text-black" : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── CONTENT SECTIONS ── */}
        {CONTENT_SECTIONS[activeTab] && (
          <div>
            {/* Division info banner */}
            {SECTION_COLORS[activeTab] && (
              <div className={`border rounded-2xl px-5 py-4 mb-6 text-sm ${SECTION_COLORS[activeTab].banner}`}>
                <p className="font-medium mb-1">{SECTION_COLORS[activeTab].icon} Konten Halaman {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</p>
                <p className="opacity-70 text-xs">
                  Tampil di halaman <code className="bg-black/20 px-1 rounded">/{activeTab}</code>.
                  Foto dikelola di tab <strong>Works</strong> → filter kategori <strong>{activeTab}</strong>.
                </p>
              </div>
            )}

            {!SECTION_COLORS[activeTab] && (
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                <Globe size={12} />
                Mengedit bahasa: <span className="text-white font-medium">{lang === "id" ? "Indonesia" : "English"}</span>
              </div>
            )}

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
                      <input type="text"
                        className="w-full bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm border border-zinc-700 focus:outline-none focus:border-blue-500 transition"
                        value={val(activeTab, f.key)}
                        onChange={e => handleChange(activeTab, f.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => saveContent(activeTab)} disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-50">
              <Save size={15} />
              {saving ? "Menyimpan..." : "Simpan perubahan"}
            </button>
          </div>
        )}

        {/* ── SCOPE ── */}
        {activeTab === "scope" && (
          <div>
            <p className="text-zinc-500 text-sm mb-6">Edit daftar layanan di section Scope.</p>
            <div className="flex flex-col gap-4 mb-6">
              {scopeItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Urutan</label>
                      <input type="number" className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700"
                        value={item.order_index} onChange={e => updateScope(item.id, "order_index", Number(e.target.value))} />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Nama Layanan</label>
                      <input type="text" className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700"
                        value={item.name} onChange={e => updateScope(item.id, "name", e.target.value)} placeholder="cth: Wedding Organizer" />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-xs mb-1 block">Link</label>
                      <input type="text" className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm border border-zinc-700"
                        value={item.link} onChange={e => updateScope(item.id, "link", e.target.value)} placeholder="cth: /wedding" />
                    </div>
                  </div>
                  <button onClick={() => deleteScope(item)} className="mt-6 p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={addScope} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-5 py-2.5 rounded-xl text-sm border border-zinc-700">
                <Plus size={14} /> Tambah Layanan
              </button>
              <button onClick={saveScope} disabled={saving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-2.5 rounded-xl font-semibold text-sm">
                <Save size={14} /> {saving ? "Menyimpan..." : "Simpan Scope"}
              </button>
            </div>
          </div>
        )}

        {/* ── WORKS ── */}
        {activeTab === "works" && (
          <div>
            {/* Info box */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 mb-6 text-xs text-zinc-400">
              <p className="font-semibold text-white mb-1">📁 Cara kerja Works</p>
              <p>Setiap foto yang ditambah akan muncul di halaman divisinya masing-masing berdasarkan <strong>Kategori</strong>.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.entries(CATEGORY_ROUTES).map(([cat, route]) => (
                  <span key={cat} className="bg-zinc-800 px-3 py-1 rounded-lg">
                    {SECTION_COLORS[cat]?.icon} <strong>{cat}</strong> → <code>{route}</code>
                  </span>
                ))}
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {["all", "wedding", "music", "production", "workshop", "event"].map((cat) => (
                <button key={cat} onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs capitalize transition ${filterCategory === cat ? "bg-white text-black" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
                  {SECTION_COLORS[cat] ? `${SECTION_COLORS[cat].icon} ` : ""}{cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6 mb-6">
              {works
                .filter(item => filterCategory === "all" || item.category === filterCategory)
                .map((item) => (
                  <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col md:flex-row gap-6 relative group">

                    {/* Kategori badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                        item.category === "wedding"    ? "bg-amber-900/40 text-amber-400" :
                        item.category === "music"      ? "bg-violet-900/40 text-violet-400" :
                        item.category === "production" ? "bg-blue-900/40 text-blue-400" :
                        item.category === "workshop"   ? "bg-green-900/40 text-green-400" :
                        item.category === "event"      ? "bg-rose-900/40 text-rose-400" :
                        "bg-zinc-800 text-zinc-400"
                      }`}>
                        {SECTION_COLORS[item.category]?.icon} → {CATEGORY_ROUTES[item.category] || "/"}
                      </span>
                    </div>

                    {/* Media uploader */}
                    <div className="w-full md:w-40 h-40 bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shrink-0 relative flex items-center justify-center">
                      {item.image
                        ? <img src={item.image} className="w-full h-full object-cover" alt="Preview" />
                        : <div className="text-zinc-600"><ImageIcon size={32} /></div>
                      }
                      <label className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                        {uploading === item.id ? <Loader2 className="animate-spin" /> : <HardDriveUpload />}
                        <span className="text-xs mt-1 text-white">Upload foto</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, item.id)} />
                      </label>
                    </div>

                    {/* Form fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-zinc-500 text-xs mb-1 block">Judul</label>
                        <input className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                          value={item.title || ""} onChange={e => updateWork(item.id, "title", e.target.value)} placeholder="Nama project" />
                      </div>

                      <div>
                        <label className="text-zinc-500 text-xs mb-1 block">Kategori</label>
                        <select className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                          value={item.category || "wedding"} onChange={e => updateWork(item.id, "category", e.target.value)}>
                          <option value="wedding">💍 Wedding</option>
                          <option value="music">🎵 Music</option>
                          <option value="production">🎬 Production</option>
                          <option value="workshop">🛠️ Workshop</option>
                          <option value="event">🎪 Event</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-zinc-500 text-xs mb-1 block">
                          Subkategori
                          <span className="ml-1 text-zinc-600">(filter di halaman {item.category})</span>
                        </label>
                        <select className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                          value={item.subcategory || ""}
                          onChange={e => updateWork(item.id, "subcategory", e.target.value)}>
                          <option value="">— Pilih subkategori —</option>
                          {(SUBCATEGORIES[item.category] || []).map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-zinc-500 text-xs mb-1 block">Info Tambahan <span className="text-zinc-600">(cth: March 2024 · 250 pax)</span></label>
                        <input className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                          value={item.meta || ""} onChange={e => updateWork(item.id, "meta", e.target.value)} placeholder="cth: 2024 · 300 pax" />
                      </div>

                      <div>
                        <label className="text-zinc-500 text-xs mb-1 block">Tags <span className="text-zinc-600">(pisah koma)</span></label>
                        <input className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                          value={item.tags || ""} onChange={e => updateWork(item.id, "tags", e.target.value)} placeholder="outdoor, intimate" />
                      </div>

                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="text-zinc-500 text-xs mb-1 block">Urutan</label>
                          <input type="number" className="w-full bg-zinc-800 text-white rounded-xl px-3 py-2 text-sm border border-zinc-700"
                            value={item.order_index || 0} onChange={e => updateWork(item.id, "order_index", Number(e.target.value))} />
                        </div>
                        <button onClick={() => deleteWork(item)} className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={addWork} className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl text-sm border border-zinc-700">
                <Plus size={14} className="inline mr-1" /> Tambah Project
              </button>
              <button onClick={saveWorks} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl text-sm font-bold disabled:opacity-50">
                {saving ? "Menyimpan..." : "Simpan Semua Works"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}