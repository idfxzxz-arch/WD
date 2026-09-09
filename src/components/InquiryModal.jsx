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
    phone: "",
    email: "",
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
    if (!formData.name.trim() || (!formData.phone.trim() && !formData.email.trim()) || !formData.notes.trim()) {
      setError(t.validationError || "Harap lengkapi Nama, WhatsApp/Email, dan Deskripsi kebutuhan.")
      return false
    }
    setError("")
    return true
  }

  const isEn = lang?.code === "en"

  const getSelectedDivisionsLabel = () => {
    return formData.divisions
      .map((d) => availableDivisions.find((item) => item.id === d)?.label || d)
      .join(", ")
  }

  const buildWaSummaryText = () => {
    const selectedDivisionsLabel = getSelectedDivisionsLabel()

    if (isEn) {
      return `*BRIEF & CONSULTATION REQUEST*
*WD GROUP COMPANY*
━━━━━━━━━━━━━━━━━━━━━━━━━━

*Dear WD Group Team,*
I would like to submit a project brief and consultation request with the following details:

👤 *1. CLIENT INFORMATION*
• *Full Name:* ${formData.name.trim()}
• *Company / Brand / Couple:* ${formData.company.trim() || "-"}
• *WhatsApp Number:* ${formData.phone.trim() || "-"}
• *Email Address:* ${formData.email.trim() || "-"}

🎯 *2. SERVICE & SCOPE*
• *Division / Services:* ${selectedDivisionsLabel}
• *Target Timeline / Date:* ${formData.date.trim() || "-"}
• *Budget Estimation:* ${formData.budget}

📋 *3. BRIEF DESCRIPTION & NOTES*
"${formData.notes.trim()}"

━━━━━━━━━━━━━━━━━━━━━━━━━━
Please kindly review and let us know your availability and initial proposal. Thank you!`
    }

    return `*BRIEF & PERMOHONAN KONSULTASI PROYEK*
*WD GROUP COMPANY*
━━━━━━━━━━━━━━━━━━━━━━━━━━

*Yth. Tim Konsultan & Admin WD Group,*
Halo, saya ingin mengajukan brief rencana proyek dan permohonan konsultasi dengan rincian berikut:

👤 *1. DATA KLIEN*
• *Nama Lengkap:* ${formData.name.trim()}
• *Instansi / Brand / Pasangan:* ${formData.company.trim() || "-"}
• *Nomor WhatsApp:* ${formData.phone.trim() || "-"}
• *Alamat Email:* ${formData.email.trim() || "-"}

🎯 *2. LAYANAN YANG DIBUTUHKAN*
• *Divisi / Layanan:* ${selectedDivisionsLabel}
• *Rencana Tanggal / Jadwal:* ${formData.date.trim() || "-"}
• *Estimasi Anggaran:* ${formData.budget}

📋 *3. RINGKASAN BRIEF & KEBUTUHAN PROYEK*
"${formData.notes.trim()}"

━━━━━━━━━━━━━━━━━━━━━━━━━━
Mohon info ketersediaan jadwal serta penawaran solusi / estimasinya. Terima kasih.`
  }

  const buildEmailSubject = () => {
    const selectedDivisionsLabel = getSelectedDivisionsLabel()
    if (isEn) {
      return `[Project Brief] ${formData.name.trim()} - ${selectedDivisionsLabel} | WD Group`
    }
    return `[Pengajuan Brief Proyek] ${formData.name.trim()} - ${selectedDivisionsLabel} | WD Group`
  }

  const buildEmailSummaryText = () => {
    const selectedDivisionsLabel = getSelectedDivisionsLabel()

    if (isEn) {
      return `Kepada Yth.
Tim Manajemen & Konsultan Proyek WD Group Company
(groupcompanywd@gmail.com)

Dear WD Group Team,

In regards to our upcoming project plan, we would like to submit our project brief and inquiry details as outlined below:

=======================================================
I. CLIENT & COMPANY INFORMATION
=======================================================
• Full Name           : ${formData.name.trim()}
• Company / Brand     : ${formData.company.trim() || "-"}
• WhatsApp Number     : ${formData.phone.trim() || "-"}
• Email Address       : ${formData.email.trim() || "-"}

=======================================================
II. PROJECT SCOPE & SERVICE REQUIREMENTS
=======================================================
• Services / Division : ${selectedDivisionsLabel}
• Target Timeline     : ${formData.date.trim() || "-"}
• Estimated Budget    : ${formData.budget}

=======================================================
III. BRIEF DESCRIPTION & PROJECT NOTES
=======================================================
${formData.notes.trim()}

=======================================================

We look forward to receiving your initial review, quotation, or proposal. Please feel free to reach out to us via the contact provided above for further discussions.

Thank you for your attention and collaboration.

Sincerely,
${formData.name.trim()}${formData.company.trim() ? `\n${formData.company.trim()}` : ""}`
    }

    return `Kepada Yth.
Tim Manajemen & Konsultan Proyek WD Group Company
(groupcompanywd@gmail.com)

Dengan hormat,

Sehubungan dengan rencana pelaksanaan proyek/acara kami, bersama pesan ini kami bermaksud mengajukan formulir brief proyek dan permohonan konsultasi dengan rincian sebagai berikut:

=======================================================
I. DATA KLIEN & INSTANSI
=======================================================
• Nama Lengkap          : ${formData.name.trim()}
• Perusahaan / Brand    : ${formData.company.trim() || "-"}
• Nomor WhatsApp        : ${formData.phone.trim() || "-"}
• Alamat Email          : ${formData.email.trim() || "-"}

=======================================================
II. SPESIFIKASI KEBUTUHAN & LAYANAN
=======================================================
• Divisi / Layanan      : ${selectedDivisionsLabel}
• Rencana Pelaksanaan   : ${formData.date.trim() || "-"}
• Estimasi Anggaran     : ${formData.budget}

=======================================================
III. DESKRIPSI BRIEF & CATATAN PROYEK
=======================================================
${formData.notes.trim()}

=======================================================

Besar harapan kami brief ini dapat dipelajari oleh tim WD Group guna penyusunan konsep serta penawaran terbaik. Kami siap untuk mendiskusikan kebutuhan ini lebih lanjut.

Atas perhatian dan kerja samanya, kami ucapkan terima kasih.

Hormat kami,
${formData.name.trim()}${formData.company.trim() ? `\n${formData.company.trim()}` : ""}`
  }

  const saveToDatabase = async (channel) => {
    try {
      const contactInfo = [formData.phone.trim(), formData.email.trim()].filter(Boolean).join(" | ")
      const record = {
        name: formData.name.trim(),
        company: formData.company.trim() || null,
        contact: contactInfo || formData.phone.trim() || formData.email.trim(),
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
          admin_email: formData.email.trim() || formData.phone.trim() || "guest",
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

    const subject = encodeURIComponent(buildEmailSubject())
    const body = encodeURIComponent(buildEmailSummaryText())
    window.open(`mailto:${EMAIL_ADMIN}?subject=${subject}&body=${body}`, "_blank", "noopener,noreferrer")
    setSubmitting(false)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="custom-cursor-show fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto cursor-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="custom-cursor-show relative z-10 w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0e0e11] p-4 sm:p-5 text-white shadow-2xl my-auto cursor-auto max-h-[95vh] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    {t.title || "Ajukan Brief Proyek"}
                  </h2>
                  <span className="hidden sm:inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
                    {t.badge || "Konsultasi"}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/50 leading-tight">
                  {t.subtitle || "Ceritakan rencana proyek Anda. Tim WD Group siap membantu."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 p-1.5 text-white/60 transition hover:bg-white/15 hover:text-white"
              aria-label={t.close || "Tutup"}
            >
              <X size={16} />
            </button>
          </div>

          {/* Form Content */}
          <form className="mt-3 space-y-2.5 overflow-y-auto sm:overflow-visible pr-0.5 max-h-[72vh] sm:max-h-none">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300">
                {error}
              </div>
            )}

            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <User size={12} className="text-blue-400" />
                  {t.nameLabel || "Nama Lengkap *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder || "Nama Anda"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <Building2 size={12} className="text-blue-400" />
                  {t.companyLabel || "Instansi / Perusahaan"}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={t.companyPlaceholder || "PT Maju Bersama / Personal"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>
            </div>

            {/* Row 2: WhatsApp & Email */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <MessageCircle size={12} className="text-emerald-400" />
                  {t.phoneLabel || "Nomor WhatsApp *"}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.phonePlaceholder || "Misal: 08123456789"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <Mail size={12} className="text-blue-400" />
                  {t.emailLabel || "Alamat Email *"}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder || "Misal: nama@email.com"}
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>
            </div>

            {/* Row 3: Target Date & Budget */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <Calendar size={12} className="text-amber-400" />
                  {t.dateLabel || "Target Tanggal / Jadwal"}
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Misal: Oktober 2026 / Q4 2026"
                  className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <DollarSign size={12} className="text-green-400" />
                  {t.budgetLabel || "Estimasi Budget"}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full cursor-pointer rounded-xl border border-white/12 bg-[#18181b] px-3 py-2 text-xs sm:text-sm text-white focus:border-white/40 focus:outline-none"
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
            </div>

            {/* Division Multi-Select */}
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-white/70">
                {t.divisionLabel || "Pilih Divisi / Layanan yang Dibutuhkan *"}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableDivisions.map((div) => {
                  const isSelected = formData.divisions.includes(div.id)
                  return (
                    <button
                      type="button"
                      key={div.id}
                      onClick={() => toggleDivision(div.id)}
                      className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                        isSelected
                          ? "border border-white/40 bg-white text-black font-semibold shadow-sm"
                          : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {div.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Project Notes */}
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                <FileText size={12} className="text-blue-400" />
                {t.notesLabel || "Deskripsi Brief & Kebutuhan Proyek *"}
              </label>
              <textarea
                required
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={t.notesPlaceholder || "Jelaskan konsep, target output, lokasi, atau kebutuhan khusus..."}
                className="w-full cursor-text rounded-xl border border-white/12 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              />
            </div>

            {/* Destination Notice */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10.5px] text-white/55">
              <span className="flex items-center gap-1.5">
                <MessageCircle size={12} className="text-emerald-400 shrink-0" />
                <span>WA Admin: <strong className="text-white/85 font-medium">+62 857-0790-9415</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="text-blue-400 shrink-0" />
                <span>Email: <strong className="text-white/85 font-medium">groupcompanywd@gmail.com</strong></span>
              </span>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto cursor-pointer px-3.5 py-2 text-xs font-semibold text-white/60 hover:text-white transition disabled:opacity-50"
            >
              {t.close || "Batal"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSendEmail}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 transition disabled:opacity-50"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} className="text-blue-400" />}
              {t.submitEmail || "Kirim Email"}
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSendWa}
              className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-zinc-200 transition shadow-md disabled:opacity-50"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} className="text-black" />}
              {t.submitWa || "Kirim via WhatsApp"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
