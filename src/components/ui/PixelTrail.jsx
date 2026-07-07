import { memo, useCallback, useId, useMemo, useRef } from "react"
import { motion as Motion, useAnimationControls } from "framer-motion"
import { useDimensions } from "../hooks/useDebouncedDimensions"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) {
  const containerRef = useRef(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useId().replace(/:/g, "")

  const handleMouseMove = useCallback((event) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / pixelSize)
    const y = Math.floor((event.clientY - rect.top) / pixelSize)
    const pixelElement = document.getElementById(`${trailId}-pixel-${x}-${y}`)

    if (pixelElement?.__animatePixel) {
      pixelElement.__animatePixel()
    }
  }, [pixelSize, trailId])

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  )
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cx("absolute inset-0 h-full w-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const PixelDot = memo(function PixelDot({ id, size, fadeDuration, delay, className }) {
  const controls = useAnimationControls()

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
    })
  }, [controls, delay, fadeDuration])

  const ref = useCallback((node) => {
    if (node) node.__animatePixel = animatePixel
  }, [animatePixel])

  return (
    <Motion.div
      id={id}
      ref={ref}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    />
  )
})

export { PixelTrail }
