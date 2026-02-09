export default function Home() {
  return (
    <section id="home" className="min-h-screen bg-white relative overflow-hidden">

 <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2
flex items-center gap-2 sm:gap-3
backdrop-blur bg-white/70
px-4 py-2
rounded-full shadow
whitespace-nowrap
hover:scale-105 transition duration-300 cursor-pointer">

  <img
    src="/logo.webp"
    alt="WD Logo"
    className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
  />

  <span className="text-xs sm:text-sm font-semibold tracking-wide">
    WD Group Company
  </span>

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
