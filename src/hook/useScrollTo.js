export function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return

  const start = window.scrollY
  const target = el.getBoundingClientRect().top + window.scrollY
  const distance = target - start
  const duration = 800 // ms
  let startTime = null

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, start + distance * ease)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}