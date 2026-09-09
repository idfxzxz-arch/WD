import { useEffect, useState } from "react"

export function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let timeoutId

    const updateDimensions = () => {
      if (!ref.current) return
      const { width, height } = ref.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    const debouncedUpdateDimensions = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(updateDimensions, 250)
    }

    updateDimensions()
    window.addEventListener("resize", debouncedUpdateDimensions)

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      window.clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions
}
