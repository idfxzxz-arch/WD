import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowUpRight, Bot, Send } from "lucide-react"
import { LanguageContext } from "../context/LanguageContext"
import {
  chatbotFaqSuggestions,
  chatbotQuickReplies,
  chatbotServices,
  getBotReply,
  getInitialMessage,
} from "../components/Chatbot"

export default function AssistantPage() {
  const navigate = useNavigate()
  const { lang } = useContext(LanguageContext)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(() => [
    { id: "intro", role: "bot", text: getInitialMessage(lang.code), showFaq: true },
  ])
  const endRef = useRef(null)
  const services = useMemo(() => chatbotServices, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  useEffect(() => {
    setMessages([{ id: "intro", role: "bot", text: getInitialMessage(lang.code), showFaq: true }])
  }, [lang.code])

  const sendMessage = (value = input) => {
    const trimmed = value.trim()
    if (!trimmed) return

    const reply = getBotReply(trimmed)
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text: trimmed },
      { id: `bot-${Date.now()}`, role: "bot", ...reply },
    ])
    setInput("")
  }

  const openAction = (href) => {
    if (href.startsWith("/")) {
      navigate(href)
      return
    }

    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <main className="flex min-h-[100dvh] flex-col bg-[#080808] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080808]/92 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/75"
            aria-label="Kembali"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
              <Bot size={20} />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#080808] bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold leading-none">WD Assistant</h1>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Tanya jawab WD Group
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`min-w-0 ${message.role === "user" ? "max-w-[84%]" : "w-full max-w-[96%]"}`}>
                <div
                  className={`px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "ml-auto rounded-[1.15rem] rounded-br-md bg-white text-black"
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
                          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-black"
                        >
                          {action.label}
                          <ArrowUpRight size={11} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {message.showServices && (
                  <div className="mt-2 grid gap-2">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <button
                          key={service.key}
                          type="button"
                          onClick={() => openAction(service.link)}
                          className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-left"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold text-white">{service.title}</span>
                            <span className="mt-0.5 block truncate text-xs leading-5 text-white/44">{service.text}</span>
                          </span>
                          <ArrowUpRight size={14} className="shrink-0 text-white/35" />
                        </button>
                      )
                    })}
                  </div>
                )}

                {message.showFaq && (
                  <div className="mt-2 grid gap-2">
                    {chatbotFaqSuggestions.map((question) => (
                      <button
                        key={`${message.id}-${question}`}
                        type="button"
                        onClick={() => sendMessage(question)}
                        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-left"
                      >
                        <span className="min-w-0 truncate text-sm font-semibold text-white/78">
                          {question}
                        </span>
                        <ArrowUpRight size={14} className="shrink-0 text-white/35" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0d0d0d]/96 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {chatbotQuickReplies.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => sendMessage(item)}
                className="shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/70"
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
            className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.065] p-1.5"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tulis pertanyaan..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/34"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black"
              aria-label="Kirim pesan"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </footer>
    </main>
  )
}
