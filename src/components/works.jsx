import { Link } from "react-router-dom"
import { useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Wedding Organizer",
    tags: ["E-Commerce", "Brand"],
    image: "/resources/Wedding/wedding.webp",
    link: "/wedding"
  },
  {
    title: "Workshop",
    tags: ["Training", "Creative"],
    image: "/resources/Workshop/Workshop.webp",
    link: "/workshop"
  },
  {
    title: "Event Organizer",
    tags: ["Training", "Creative"],
    image: "/resources/Event_Organizer/Event.webp",
    link: "/event"
  },
  {
    title: "Music & Entertainment",
    tags: ["Training", "Creative"],
    image: "/resources/Music_ENT/Music_ENT.webp",
    link: "/music"
  },
  {
    title: "Production Organizer",
    tags: ["Training", "Creative"],
    image: "/resources/Production/Production.webp",
    link: "/production"
  }
]

export default function Works() {
  const videoRefs = useRef([])

  // 🔥 AUTO SCROLL KE HASH
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")

    if (hash) {
      const el = document.getElementById(hash)

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center"
          })
        }, 100)
      }
    }
  }, [])

  const handleClick = (index) => {
    const video = videoRefs.current[index]
    if (!video) return

    video.paused ? video.play() : video.pause()
  }

  return (
    <section id="works" className="py-32">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl text-center mb-20 font-semibold tracking-tight">
          Selected Works
        </h2>

        <div className="grid md:grid-cols-2 gap-14 mt-24">

          {projects.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`group transition duration-500 ${
                i % 2 === 0 ? "md:-translate-y-24" : "md:translate-y-24"
              }`}
            >

              <div className="relative rounded-3xl overflow-hidden bg-neutral-100">
                <div className="aspect-[4/5] overflow-hidden">

                  {item.video ? (
                    <video
                      ref={el => videoRefs.current[i] = el}
                      poster={item.image}
                      muted
                      playsInline
                      className="w-full h-full object-cover cursor-pointer transition duration-700 group-hover:scale-110"
                      onClick={(e) => {
                        e.preventDefault()
                        handleClick(i)
                      }}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  )}

                </div>
              </div>

              {/* 🔥 INI TARGET SCROLL */}
              <div
                id={item.link.replace("/", "")}
                className="mt-6 space-y-3"
              >

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {item.title}
                  </h3>

                  <div className="p-2 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white transition">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  )
}