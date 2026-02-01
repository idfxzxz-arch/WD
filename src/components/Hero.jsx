export default function Home() {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden">

      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 font-bold text-xl">
        WD Jaya
      </div>

      {/* BIG TEXT */}
      <h1 className="text-[18vw] font-serif leading-none text-center mt-32 select-none">
        WD
      </h1>

      {/* Subtitle */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        <h2 className="text-4xl font-semibold">
          A Passionate <br /> Creative Agency
        </h2>
      </div>

      {/* Scroll Button */}
      <div className="absolute bottom-10 right-10">
        <div className="w-16 h-16 border rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-black hover:text-white transition">
          ↓
        </div>
      </div>

    </section>
  )
}
