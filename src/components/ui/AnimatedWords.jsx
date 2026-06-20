import { useEffect, useId, useState } from "react"
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion"

export default function AnimatedWords({
  words,
  interval = 2600,
  className = "",
  appearance = "solid",
}) {
  const id = useId()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || words.length < 2) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [interval, reduceMotion, words.length])

  const currentWord = words[index] || ""
  const appearanceClass = appearance === "editorial"
    ? "border-b border-white/55 pb-[0.05em] text-white"
    : "rounded-lg border border-white/15 bg-white px-[0.16em] text-black shadow-[0_18px_70px_rgba(255,255,255,0.1)]"

  return (
    <span
      className={`relative inline-flex min-h-[1.2em] items-center overflow-hidden ${appearanceClass} ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Motion.span
          key={`${id}-${currentWord}`}
          initial={reduceMotion ? false : { opacity: 0, y: "45%", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: "-45%", filter: "blur(8px)" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex whitespace-nowrap"
        >
          {currentWord.split("").map((letter, letterIndex) => (
            <Motion.span
              key={`${currentWord}-${letterIndex}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : letterIndex * 0.025, duration: 0.28 }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </Motion.span>
          ))}
        </Motion.span>
      </AnimatePresence>
    </span>
  )
}
