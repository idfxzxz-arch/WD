export default function TeamHero() {
  return (
    <section className="relative h-[72svh] min-h-[480px] sm:h-screen w-full overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <img
        src="/resources/hero.webp"
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* GIANT TEXT MASK */}
      <h1 className="
        absolute inset-0
        flex items-center justify-center
        px-4 text-center text-[19vw] sm:text-[18vw] font-black tracking-tight
        text-transparent
        bg-clip-text
        bg-center bg-cover
        pointer-events-none
      "
      style={{
        backgroundImage: "url('/resources/hero.webp')"
      }}
      >
        WD Group
      </h1>

    </section>
  )
}
