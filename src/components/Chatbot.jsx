import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowUpRight, Bot, CalendarHeart, Code2, GraduationCap, MessageCircle, Mic2, Send, Sparkles, Video, X } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"

const WA_LINK = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20konsultasi%20layanan."
const IG_LINK = "https://instagram.com/wdgroupcompany"
const EMAIL_LINK = "mailto:wdgroupcompany@gmail.com"

export const chatbotServices = [
  {
    key: "wedding",
    icon: CalendarHeart,
    title: "WD Sky Wedding Organizer",
    text: "Membantu perencanaan wedding dari konsep, rundown, vendor coordination, sampai eksekusi acara.",
    link: "/wedding",
  },
  {
    key: "event",
    icon: Sparkles,
    title: "WD Event Organizer",
    text: "Membantu acara corporate, private event, konser, exhibition, dan kebutuhan event lain.",
    link: "/event",
  },
  {
    key: "production",
    icon: Video,
    title: "WD Production",
    text: "Mengerjakan foto, video, dokumentasi acara, visual brand, dan kebutuhan creative production.",
    link: "/production",
  },
  {
    key: "music",
    icon: Mic2,
    title: "WD Music",
    text: "Menyediakan entertainment, music class, recording, talent panggung, dan performance.",
    link: "/music",
  },
  {
    key: "workshop",
    icon: GraduationCap,
    title: "WD Jaya Workshop",
    text: "Menyediakan program kelas, pelatihan, dan workshop praktik dengan output yang jelas.",
    link: "/workshop",
  },
  {
    key: "it",
    icon: Code2,
    title: "WD IT",
    text: "Membantu pembuatan website, aplikasi, sistem internal, dan support digital untuk bisnis.",
    link: "/it",
  },
]

export const chatbotQuickReplies = ["Layanan", "Profil", "Fitur", "Portofolio", "Booking", "Kontak"]

export const chatbotFaqSuggestions = [
  "Apa itu WD Group?",
  "Apa tujuan website ini?",
  "Apa saja fitur website?",
  "Apa saja divisi WD Group?",
  "Bagaimana cara booking?",
  "Bagaimana alur demo presentasi?",
]

export function getInitialMessage(langCode) {
  if (langCode === "en") {
    return "Hi, I am WD Assistant. I can help with WD Group profile, services, website features, booking, portfolio, and contact information."
  }

  return "Halo, saya WD Assistant. Saya bisa bantu jelaskan profil WD Group, layanan, fitur website, booking, portofolio, dan kontak."
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word))
}

export function getBotReply(input) {
  const text = input.toLowerCase()

  if (includesAny(text, ["apa itu wd", "profil", "tentang", "about", "wd group itu", "perusahaan apa"])) {
    return {
      text: "WD Group Company adalah perusahaan media kreatif yang menggabungkan branding, produksi multimedia, event, wedding, musik, workshop, dan solusi digital dalam satu ekosistem layanan.",
      actions: [{ label: "Lihat About", href: "/#about" }],
    }
  }

  if (includesAny(text, ["tujuan website", "fungsi website", "kenapa website", "manfaat website", "dibuat untuk apa"])) {
    return {
      text: "Website ini dibuat sebagai profil digital WD Group Company: memperkenalkan brand, menampilkan divisi layanan, memamerkan portofolio, dan memudahkan calon klien menghubungi tim WD Group.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["fitur website", "fitur publik", "fitur apa", "apa saja fitur", "menu website"])) {
    return {
      text: "Fitur utama website ini meliputi hero interaktif, pilihan bahasa Indonesia/Inggris, halaman divisi, Works/portofolio, Scope of Work, CTA kontak, chatbot WD Assistant, dan halaman detail layanan.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["teknologi", "tech stack", "react", "vite", "tailwind", "supabase", "framer"])) {
    return {
      text: "Website ini dibangun dengan teknologi web modern agar tampil responsif, interaktif, cepat, dan nyaman digunakan di desktop maupun mobile.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["dashboard", "admin panel", "cms", "kelola konten", "content management", "login admin"])) {
    return {
      text: "Maaf, informasi dan akses admin bersifat internal WD Group Company. Untuk kebutuhan publik, saya bisa bantu tentang layanan, booking, portofolio, dan kontak.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["role", "superadmin", "admin biasa", "akses admin", "hak akses"])) {
    return {
      text: "Informasi role dan hak akses admin bersifat internal, jadi tidak ditampilkan untuk publik. Saya bisa bantu jelaskan layanan WD Group atau cara menghubungi tim.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["maintenance", "perawatan", "website mati", "mode maintenance"])) {
    return {
      text: "Jika website sedang dalam perawatan, pengunjung akan melihat pemberitahuan sementara. Untuk kebutuhan mendesak, pengunjung tetap bisa menghubungi WD Group melalui WhatsApp.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["bahasa", "multibahasa", "indonesia", "english", "inggris", "translate"])) {
    return {
      text: "Website mendukung bahasa Indonesia dan Inggris agar informasi WD Group lebih mudah dipahami oleh pengunjung yang berbeda.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["halaman", "page", "route", "navigasi", "struktur website"])) {
    return {
      text: "Struktur halaman publik terdiri dari Home, Works, Wedding, Workshop, Music, Event, Production, dan IT. Setiap divisi punya halaman detail agar pengunjung mudah memilih layanan.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["keunggulan", "kelebihan", "unggul", "nilai plus", "value"])) {
    return {
      text: "Keunggulan website ini adalah tampilan modern responsif, halaman detail tiap divisi, portofolio, kontak langsung WhatsApp, fitur multibahasa, dan alur informasi yang mudah dipahami.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["alur demo", "demo presentasi", "presentasi", "urutan demo", "cara presentasi"])) {
    return {
      text: "Alur demo yang disarankan: buka Home, jelaskan hero dan bahasa, scroll About, Services, Scope, Works, buka halaman divisi, lalu tunjukkan tombol booking WhatsApp dan bagian kontak.",
      showFaq: true,
    }
  }

  if (includesAny(text, ["wedding", "nikah", "pernikahan", "wo", "sky"])) {
    return {
      text: "Untuk wedding, WD Sky Wedding Organizer membantu perencanaan acara, koordinasi vendor, rundown, dan eksekusi detail hari pernikahan.",
      actions: [{ label: "Buka Wedding", href: "/wedding" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["event", "acara", "eo", "konser", "corporate", "exhibition"])) {
    return {
      text: "Untuk event, WD Event Organizer membantu konsep acara, rundown, vendor, kebutuhan panggung, dan kontrol lapangan.",
      actions: [{ label: "Buka Event", href: "/event" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["production", "produksi", "foto", "video", "dokumentasi", "shoot"])) {
    return {
      text: "Untuk production, WD Production menyediakan foto, video, dokumentasi event, visual komersial, dan kebutuhan konten brand.",
      actions: [{ label: "Buka Production", href: "/production" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["music", "musik", "band", "recording", "entertainment", "kelas musik"])) {
    return {
      text: "Untuk music, WD Music menyediakan performance, entertainment, music class, recording, dan talent panggung.",
      actions: [{ label: "Buka Music", href: "/music" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["workshop", "kelas", "pelatihan", "training"])) {
    return {
      text: "Untuk workshop, WD Jaya Workshop menyediakan program praktik, kelas, dan pelatihan dengan output yang bisa digunakan.",
      actions: [{ label: "Buka Workshop", href: "/workshop" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["it", "website", "aplikasi", "sistem", "digital", "app"])) {
    return {
      text: "Untuk kebutuhan digital, WD IT membantu pembuatan website, aplikasi, sistem internal, dan dukungan teknis bisnis.",
      actions: [{ label: "Buka WD IT", href: "/it" }, { label: "Booking WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["layanan", "service", "jasa", "divisi"])) {
    return {
      text: "WD Group memiliki 6 divisi utama: Wedding Organizer, Event Organizer, Production, Music, Workshop, dan IT/Digital Solution.",
      showServices: true,
    }
  }

  if (includesAny(text, ["booking", "pesan", "order", "harga", "pricelist", "konsultasi", "quote"])) {
    return {
      text: "Untuk booking atau konsultasi, paling cepat hubungi tim WD Group melalui WhatsApp. Ceritakan kebutuhan, tanggal acara, lokasi, dan layanan yang diinginkan.",
      actions: [{ label: "Chat WhatsApp", href: WA_LINK }],
    }
  }

  if (includesAny(text, ["portfolio", "portofolio", "works", "karya", "hasil"])) {
    return {
      text: "Portofolio WD Group bisa dilihat di bagian Works. Di sana ada kartu divisi dan contoh karya yang mengarah ke halaman detail layanan.",
      actions: [{ label: "Lihat Works", href: "/works" }],
    }
  }

  if (includesAny(text, ["kontak", "contact", "instagram", "email", "wa", "whatsapp", "hubungi"])) {
    return {
      text: "Kontak WD Group tersedia melalui WhatsApp, Instagram, dan email. Pilih kanal yang paling nyaman untuk Anda.",
      actions: [
        { label: "WhatsApp", href: WA_LINK },
        { label: "Instagram", href: IG_LINK },
        { label: "Email", href: EMAIL_LINK },
      ],
    }
  }

  return {
    text: "Saya bisa bantu tentang profil WD Group, layanan, fitur website, alur presentasi, booking, portofolio, dan kontak. Pilih salah satu pertanyaan di bawah.",
    showFaq: true,
  }
}

export default function Chatbot() {
  const { lang } = useContext(LanguageContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileCompact, setIsMobileCompact] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(() => [
    { id: "intro", role: "bot", text: getInitialMessage(lang.code) },
  ])
  const messageEndRef = useRef(null)

  const currentServices = useMemo(() => chatbotServices, [])

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)")
    const syncCompactMode = () => setIsMobileCompact(compactQuery.matches)

    syncCompactMode()

    if (compactQuery.addEventListener) {
      compactQuery.addEventListener("change", syncCompactMode)
      return () => compactQuery.removeEventListener("change", syncCompactMode)
    }

    compactQuery.addListener(syncCompactMode)
    return () => compactQuery.removeListener(syncCompactMode)
  }, [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isOpen])

  useEffect(() => {
    setMessages([{ id: "intro", role: "bot", text: getInitialMessage(lang.code) }])
  }, [lang.code])

  const sendMessage = (value = input) => {
    const trimmed = value.trim()
    if (!trimmed) return

    const userMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed }
    const reply = getBotReply(trimmed)
    const botMessage = { id: `bot-${Date.now()}`, role: "bot", ...reply }

    setMessages((current) => [...current, userMessage, botMessage])
    setInput("")
  }

  const openAction = (href) => {
    if (href.startsWith("/")) {
      window.location.href = href
      return
    }

    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-3 z-[10000] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-3 flex h-[min(28rem,calc(100dvh-8.75rem))] w-[calc(100vw-1rem)] max-w-[23rem] origin-bottom-right flex-col overflow-hidden rounded-[1.35rem] border border-white/14 bg-[#090909]/96 text-white shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:h-[min(32rem,calc(100dvh-7rem))] sm:w-[24rem] sm:max-w-[24rem] sm:rounded-[1.6rem]"
          >
            <header className="relative overflow-hidden border-b border-white/10 px-3.5 py-3 sm:px-4 sm:py-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(200,159,103,0.28),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.20),transparent_34%)]" />
              <div className="relative flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black shadow-lg shadow-white/10 sm:h-11 sm:w-11">
                    <Bot size={18} className="sm:h-5 sm:w-5" />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#090909] bg-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold leading-none">WD Assistant</p>
                    <p className="mt-1.5 truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
                      Creative support
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/60 transition hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                  aria-label="Tutup chatbot"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%)] px-3 py-3.5 sm:px-4 sm:py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`min-w-0 ${message.role === "user" ? "max-w-[84%]" : "w-full max-w-[94%]"}`}>
                    <div
                      className={`px-4 py-3 text-sm leading-6 shadow-sm ${
                        message.role === "user"
                          ? "ml-auto rounded-[1.15rem] rounded-br-md bg-white text-black shadow-white/5"
                          : "w-fit max-w-full rounded-[1.15rem] rounded-bl-md border border-white/10 bg-white/[0.075] text-white/84"
                      }`}
                    >
                      <p>{message.text}</p>

                      {message.actions?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.actions.map((action) => (
                            <button
                              key={`${message.id}-${action.label}`}
                              type="button"
                              onClick={() => openAction(action.href)}
                              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white px-3 py-1.5 text-[11px] font-bold text-black transition hover:bg-amber-100"
                            >
                              {action.label}
                              <ArrowUpRight size={11} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.showServices && (
                      <div className="mt-2 grid w-full gap-2">
                        {currentServices.map((service) => {
                          const Icon = service.icon
                          return (
                            <button
                              key={service.key}
                              type="button"
                              onClick={() => openAction(service.link)}
                              className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-2.5 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                                <Icon size={15} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-bold text-white">{service.title}</span>
                                <span className="mt-0.5 block truncate text-[11px] leading-4 text-white/44">{service.text}</span>
                              </span>
                              <ArrowUpRight size={14} className="shrink-0 text-white/35 transition group-hover:text-white" />
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {message.showFaq && (
                      <div className="mt-2 grid w-full gap-2">
                        {chatbotFaqSuggestions.map((question) => (
                          <button
                            key={`${message.id}-${question}`}
                            type="button"
                            onClick={() => sendMessage(question)}
                            className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
                          >
                            <span className="min-w-0 truncate text-xs font-semibold text-white/78">
                              {question}
                            </span>
                            <ArrowUpRight size={13} className="shrink-0 text-white/35 transition group-hover:text-white" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <div className="border-t border-white/10 bg-[#0d0d0d]/95 p-2.5 sm:p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {chatbotQuickReplies.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    className="shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/68 transition hover:bg-white/10 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage()
                }}
                className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.065] p-1.5 transition focus-within:border-white/25"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tulis pertanyaan..."
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/34"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-amber-100"
                  aria-label="Kirim pesan"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <motion.button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault()
            if (window.matchMedia("(max-width: 1023px)").matches) {
              navigate("/assistant")
              return
            }
            setIsOpen((current) => !current)
          }}
          initial={false}
          animate={isOpen ? { width: 56, y: 0 } : { width: isMobileCompact ? 56 : 154, y: [0, -4, 0] }}
          transition={
            isOpen
              ? { type: "spring", stiffness: 420, damping: 34 }
              : {
                  width: { type: "spring", stiffness: 420, damping: 34 },
                  y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                }
          }
          whileHover={{ y: -4, scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex h-14 items-center overflow-hidden rounded-full bg-[#050505] text-white shadow-[0_20px_50px_rgba(0,0,0,0.34)] ring-1 ring-white/20 sm:h-16"
          aria-label="Buka chatbot WD Assistant"
        >
          {!isOpen && (
            <>
              <span className="absolute inset-[-7px] rounded-full border border-black/14 animate-[wdChatPulse_2.2s_ease-out_infinite]" />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_34%)]" />
              <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,transparent_38%,rgba(255,255,255,0.18)_50%,transparent_62%,transparent_100%)] opacity-80 animate-[wdChatShine_3.4s_ease-in-out_infinite]" />
            </>
          )}

          <span className="relative z-10 ml-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-inner shadow-black/10 transition group-hover:scale-95 sm:ml-2 sm:h-12 sm:w-12">
            {isOpen ? (
              <X size={20} strokeWidth={2.4} />
            ) : (
              <span className="font-serif text-lg font-bold tracking-[-0.08em] sm:text-xl">WD</span>
            )}
          </span>

          <AnimatePresence initial={false}>
            {!isOpen && !isMobileCompact && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="relative z-10 min-w-0 px-2.5 text-left sm:px-3"
              >
                <span className="block whitespace-nowrap text-xs font-bold leading-none sm:text-sm">
                  WD Assistant
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-white/48 sm:mt-1.5 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  AI Chat
                </span>
              </motion.span>
            )}
          </AnimatePresence>

          {!isOpen && !isMobileCompact && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-black text-white shadow-lg sm:h-7 sm:w-7">
              <MessageCircle size={13} strokeWidth={2.5} />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
