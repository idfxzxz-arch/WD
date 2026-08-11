import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const TransitionContext = createContext()

export function usePageTransition() {
  return useContext(TransitionContext)
}

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()

  const navigateWithTransition = (to) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Waktu slide-in 600ms
    setTimeout(() => {
      navigate(to)
      
      // Tunggu DOM update sejenak lalu slide-out
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 600)
  }

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center"
          >
            {/* Opsional: Teks atau Logo kecil saat transisi */}
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}

export function TransitionLink({ to, children, className, onClick, ...props }) {
  const navigateWithTransition = usePageTransition()

  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    navigateWithTransition(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
