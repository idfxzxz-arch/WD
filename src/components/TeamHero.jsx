import GooeyFilter from "./ui/GooeyFilter"
import { PixelTrail } from "./ui/PixelTrail"
import { useScreenSize } from "../hook/useScreenSize"

export default function TeamHero() {
  const screenSize = useScreenSize()

  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#050505] text-white sm:h-screen">

      {/* BACKGROUND IMAGE */}
      <img
        src="/resources/hero.webp"
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-80 grayscale"
      />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1.5px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.22)_38%,rgba(0,0,0,0.82)_100%),linear-gradient(90deg,rgba(0,0,0,0.74),transparent_42%,rgba(0,0,0,0.66))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="pointer-events-none absolute inset-x-8 bottom-12 hidden h-px bg-white/15 sm:block" />

      <GooeyFilter id="gooey-filter-team-trail" strength={5} />
      <div
        className="absolute inset-0 z-0 hidden opacity-70 mix-blend-screen md:block"
        style={{ filter: "url(#gooey-filter-team-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 28 : 36}
          fadeDuration={220}
          delay={180}
          pixelClassName="bg-white/75"
        />
      </div>

      {/* GIANT TEXT MASK */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5">
        <h1
          className="w-full max-w-[calc(100vw-2rem)] whitespace-nowrap bg-cover bg-center text-center text-[2.85rem] font-black leading-none tracking-normal text-transparent bg-clip-text opacity-95 drop-shadow-[0_24px_90px_rgba(255,255,255,0.16)] min-[360px]:text-[3.15rem] min-[390px]:text-[3.45rem] min-[430px]:text-[3.85rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.75rem] xl:text-[11rem] 2xl:text-[13rem]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.22),rgba(255,255,255,0.22)), url('/resources/hero.webp')",
          }}
        >
          WD Group
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 hidden px-5 pb-8 sm:block sm:px-10 sm:pb-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/45">
              WD Jaya Group
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
              Creative media, production, event, wedding, workshop, music, and digital solution in one focused team.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-right sm:min-w-[24rem] sm:gap-8">
            <div>
              <p className="text-2xl font-semibold leading-none sm:text-3xl">06</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">Divisi</p>
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none sm:text-3xl">360</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">Service</p>
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none sm:text-3xl">ID</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">Based</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
