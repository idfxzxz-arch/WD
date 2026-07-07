import { useEffect, useMemo, useState } from "react"

const sizeOrder = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
}

function getScreenSize(width) {
  if (width >= 1536) return "2xl"
  if (width >= 1280) return "xl"
  if (width >= 1024) return "lg"
  if (width >= 768) return "md"
  if (width >= 640) return "sm"
  return "xs"
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState("xs")

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return useMemo(() => ({
    value: screenSize,
    equals: (other) => screenSize === other,
    lessThan: (other) => sizeOrder[screenSize] < sizeOrder[other],
    greaterThan: (other) => sizeOrder[screenSize] > sizeOrder[other],
    lessThanOrEqual: (other) => sizeOrder[screenSize] <= sizeOrder[other],
    greaterThanOrEqual: (other) => sizeOrder[screenSize] >= sizeOrder[other],
  }), [screenSize])
}
