import { useState, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Mail, MessageCircle, Calendar, DollarSign, Building2, User, FileText, CheckCircle2, Loader2 } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import { supabase } from "../lib/supabase"

const WA_ADMIN = "6285707909415"
const EMAIL_ADMIN = "groupcompanywd@gmail.com"

export default function InquiryModal({ isOpen, onClose }) {
  const { lang } = useContext(LanguageContext)
  const t = lang?.inquiry || {}

  const availableDivisions = [
    { id: "wedding", label: "Wedding Organizer" },
    { id: "event", label: "Event Organizer" },
    { id: "production", label: "Creative Production (Foto/Video)" },
    { id: "music", label: "Music Entertainment & Class" },
    { id: "workshop", label: "Workshop & Training" },
    { id: "it", label: "IT & Digital Solution" },
  ]

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    divisions: ["event"],
    date: "",
    budget: t.budgetOptions?.[0] || "Fleksibel / Belum Ditentukan",
    notes: "",
  })

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const toggleDivision = (divId) => {
    setFormData((prev) => {
      const exists = prev.divisions.includes(divId)
      if (exists) {
        if (prev.divisions.length === 1) return prev // keep at least one
        return { ...prev, divisions: prev.divisions.filter((d) => d !== divId) }
      }
      return { ...prev, divisions: [...prev.divisions, divId] }
    })
  }

  const validate = () => {
    if (!formData.name.trim() || !formData.contact.trim() || !formData.notes.trim()) {
      setError(t.validationError || "Harap lengkapi Nama, Kontak, dan Deskripsi kebutuhan.")
      return false
    }
    setError("")
    return true
  }

  const getSelectedDivisionsLabel = () => {
    return formData.divisions
      .map((d) => availableDivisions.find((item) => item.id === d)?.label || d)
      .join(", ")
  }

  const buildWaSummaryText = () => {
    const selectedDivisionsLabel = getSelectedDivisionsLabel()

    return `*BRIEF PROYEK & KONSULTASI - WD GROUP*
━━━━━━━━━━━━━━━━━━━━
👤 *Nama Lengkap:* ${formData.name.trim()}
🏢 *Instansi / Brand / Pasangan:* ${formData.company.trim() || "-"}
📱 *Kontak (WA/Email):* ${formData.contact.trim()}
🎯 *Divisi / Layanan:* ${selectedDivisionsLabel}
📅 *Perkiraan Jadwal:* ${formData.date.trim() || "-"}
💰 *Estimasi Budget:* ${formData.budget}
━━━━━━━━━━━━━━━━━━━━
📝 *Deskripsi & Kebutuhan Proyek:*
${formData.notes.trim()}
━━━━━━━━━━━━━━━━━━━━
_Pesan dikirim melalui formulir konsultasi website WD Group Company._`
  }

  const buildEmailSummaryText = () => {
    const selectedDivisionsLabel = getSelectedDivisionsLabel()

    return `Halo Tim WD Group Company,

Berikut adalah data formulir brief & konsultasi proyek yang dikirimkan melalui website resmi:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATA KLIEN & RINCIAN PROYEK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nama Lengkap: ${formData.name.trim()}
• Instansi / Brand / Pasangan: ${formData.company.trim() || "-"}
• Kontak (WhatsApp / Email): ${formData.contact.trim()}
• Divisi / Layanan yang Dipilih: ${selectedDivisionsLabel}
• Target Tanggal / Pelaksanaan: ${formData.date.trim() || "-"}
• Estimasi Anggaran: ${formData.budget}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESKRIPSI BRIEF & KEBUTUHAN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.notes.trim()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email ini dikirim otomatis dari Formulir Konsultasi Proyek WD Group Company.`
  }

  const saveToDatabase = async (channel) => {
    try {
      const record = {
        name: formData.name.trim(),
        company: formData.company.trim() || null,
        contact: formData.contact.trim(),
        divisions: formData.divisions,
        target_date: formData.date.trim() || null,
        budget: formData.budget,
        notes: formData.notes.trim(),
        channel: channel,
        status: "new",
      }

      // 1. Simpan ke tabel inquiries
      await supabase.from("inquiries").insert([record])

      // 2. Catat ke tabel activities admin
      await supabase.from("activities").insert([
        {
          admin_email: formData.contact.trim(),
          action_name: `Brief Inquired (${channel.toUpperCase()})`,
          target_name: `${formData.name.trim()} - ${formData.divisions.join(", ")}`,
        },
      ])
    } catch (dbErr) {
      console.warn("Database saving notice:", dbErr)
    }
  }

  const handleSendWa = async (e) => {
    if (e) e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    await saveToDatabase("whatsapp")

    const summary = buildWaSummaryText()
    const encoded = encodeURIComponent(summary)
    window.open(`https://wa.me/${WA_ADMIN}?text=${encoded}`, "_blank", "noopener,noreferrer")
    setSubmitting(false)
    onClose()
  }

  const handleSendEmail = async (e) => {
    if (e) e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    await saveToDatabase("email")

    const selectedDivisionsLabel = getSelectedDivisionsLabel()
    const summary = buildEmailSummaryText()
    const subject = encodeURIComponent(`[Brief Proyek] ${formData.name.trim()} - ${selectedDivisionsLabel}`)
    const body = encodeURIComponent(summary)
    window.open(`mailto:${EMAIL_ADMIN}?subject=${subject}&body=${body}`, "_blank", "noopener,noreferrer")
    setSubmitting(false)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="custom-cursor-show fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto cursor-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="custom-cursor-show relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f11] p-6 text-white shadow-2xl sm:p-8 my-auto cursor-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300">
                <CheckCircle2 size={13} />
                {t.badge || "Project Inquiry Form"}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {t.title || "Ajukan Brief Proyek"}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/55">
                {t.subtitle || "Ceritakan rencana proyek atau kebutuhan bisnis Anda."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
              aria-label={t.close || "Tutup"}
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Content */}
          <form className="mt-6 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                  <User size={13} className="text-blue-400" />
                  {t.nameLabel || "Nama Lengkap *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder || "Nama Anda"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                  <Building2 size={13} className="text-blue-400" />
                  {t.companyLabel || "Instansi / Perusahaan"}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={t.companyPlaceholder || "PT Maju Bersama / Personal"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                  <MessageCircle size={13} className="text-emerald-400" />
                  {t.contactLabel || "WhatsApp / Email *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder={t.contactPlaceholder || "08123456789 atau email@domain.com"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                  <Calendar size={13} className="text-amber-400" />
                  {t.dateLabel || "Target Tanggal / Jadwal"}
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Misal: Oktober 2026 / Q4 2026"
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>
            </div>

            {/* Division Multi-Select */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                {t.divisionLabel || "Pilih Divisi / Layanan yang Dibutuhkan *"}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDivisions.map((div) => {
                  const isSelected = formData.divisions.includes(div.id)
                  return (
                    <button
                      type="button"
                      key={div.id}
                      onClick={() => toggleDivision(div.id)}
                      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? "border border-white/40 bg-white text-black font-semibold shadow-md"
                          : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {div.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                <DollarSign size={13} className="text-green-400" />
                {t.budgetLabel || "Estimasi Budget"}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full cursor-pointer rounded-xl border border-white/12 bg-[#18181b] px-3.5 py-2.5 text-sm text-white focus:border-white/40 focus:outline-none"
              >
                {(t.budgetOptions || [
                  "Fleksibel / Belum Ditentukan",
                  "< Rp 10 Juta",
                  "Rp 10 - 25 Juta",
                  "Rp 25 - 50 Juta",
                  "Rp 50 - 100 Juta",
                  "> Rp 100 Juta",
                ]).map((opt) => (
                  <option key={opt} value={opt} className="bg-[#18181b] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Notes */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                <FileText size={13} className="text-blue-400" />
                {t.notesLabel || "Deskripsi Brief & Kebutuhan Proyek *"}
              </label>
              <textarea
                required
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.notesPlaceholder || "Jelaskan konsep, target output, lokasi, atau kebutuhan khusus..."}
                className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              />
            </div>

            {/* Destination Notice */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[11px] text-white/55">
              <span className="flex items-center gap-1.5">
                <MessageCircle size={13} className="text-emerald-400 shrink-0" />
                <span>WA Admin: <strong className="text-white/85 font-medium">+62 857-0790-9415</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <span>Email: <strong className="text-white/85 font-medium">groupcompanywd@gmail.com</strong></span>
              </span>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto cursor-pointer px-4 py-2.5 text-xs font-semibold text-white/60 hover:text-white transition disabled:opacity-50"
            >
              {t.close || "Batal"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSendEmail}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition disabled:opacity-50"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} className="text-blue-400" />}
              {t.submitEmail || "Kirim Email"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSendWa}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-zinc-200 transition shadow-lg disabled:opacity-50"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} className="text-black" />}
              {t.submitWa || "Kirim via WhatsApp"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
