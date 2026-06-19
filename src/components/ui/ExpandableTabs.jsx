import { useEffect, useRef } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"

const buttonVariants = {
  compact: {
    gap: 0,
    paddingLeft: "0.58rem",
    paddingRight: "0.58rem",
  },
  expanded: {
    gap: "0.38rem",
    paddingLeft: "0.82rem",
    paddingRight: "0.82rem",
  },
}

const labelVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: { width: "auto", opacity: 1 },
}

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.55,
}

export default function ExpandableTabs({ tabs, activeIndex, onChange }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) onChange?.(null)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [onChange])

  return (
    <nav
      ref={containerRef}
      aria-label="Navigasi utama"
      className="flex w-full max-w-[22rem] items-center justify-center gap-0.5 overflow-hidden rounded-full border border-black/10 bg-white/95 p-1 shadow-[0_14px_36px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:w-auto sm:max-w-none sm:gap-1 sm:p-1.5"
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon
        const isActive = activeIndex === index

        return (
          <Motion.button
            key={tab.value}
            type="button"
            aria-label={tab.label}
            aria-current={isActive ? "page" : undefined}
            variants={buttonVariants}
            initial={false}
            animate={isActive ? "expanded" : "compact"}
            transition={transition}
            onClick={() => onChange?.(index)}
            className={`relative flex h-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold transition-colors duration-300 sm:h-10 sm:min-w-10 sm:text-sm ${
              isActive
                ? "bg-black text-white"
                : "text-black/45 hover:bg-black/[0.06] hover:text-black"
            }`}
          >
            <Icon aria-hidden="true" size={16} strokeWidth={1.9} className="shrink-0 sm:h-[17px] sm:w-[17px]" />
            <AnimatePresence initial={false}>
              {isActive && (
                <Motion.span
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.label}
                </Motion.span>
              )}
            </AnimatePresence>
          </Motion.button>
        )
      })}
    </nav>
  )
}
