import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Music – Entertainment",
    tags: ["Event", "Stage", "Audio"],
    image: "/resources/Music_ENT/Music_ENT.webp",
    link: "#"
  },
  {
    title: "Store – Ananta Bettafish",
    tags: ["E-Commerce", "Brand"],
    image: "/resources/Store/Store.webp",
    link: "#"
  },
  {
    title: "Workshop",
    tags: ["Training", "Creative"],
    image: "/resources/Workshop/Workshop.webp",
    link: "#"
  },
  {
    title: "Production",
    tags: ["Studio", "Media"],
    image: "/resources/Production/roduction.webp",
    link: "#"
  },
  {
    title: "Event Organizer",
    tags: ["Planning", "Execution"],
    image: "/resources/Event_Organizer/Event.webp",
    link: "#"
  }
]


export default function Works() {
  return (
    <section id="works" className="py-40">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl text-center mb-28 font-medium">
          Works
        </h2>

        <div className="grid md:grid-cols-2 gap-20 justify-items-center">

          {projects.map((item,i)=>(
            <div key={i} className="w-full max-w-sm">

              {/* IMAGE */}
              <div className="relative rounded-2xl overflow-hidden shadow-md">

  <div className="aspect-[3/4] overflow-hidden">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
    />
  </div>

  <div className="
    absolute inset-0
    bg-gradient-to-t from-black/70 via-black/10 to-transparent
    opacity-70 group-hover:opacity-100
    transition
  "/>

  <div className="
    absolute inset-0 flex items-center justify-center
    opacity-0 group-hover:opacity-100
    transition
  ">
    <div className="bg-white text-black text-sm px-5 py-2 rounded-full shadow">
      View Project
    </div>
  </div>



                {/* overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"/>

                {/* detail button */}
                <div className="
                  absolute top-1/2 left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  opacity-0 scale-90
                  group-hover:opacity-100 group-hover:scale-100
                  transition duration-300
                ">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-sm shadow">
                    Detail
                  </div>
                </div>

              </div>

              {/* TAGS */}
              <div className="flex gap-2 mt-5">
                {item.tags.map((tag,j)=>(
                  <span key={j} className="border rounded-full px-4 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* TITLE */}
              <div className="flex justify-between items-center mt-4">

                <h3 className="text-xl font-medium">
                  {item.title}
                </h3>

                <div className="border rounded-full p-2 hover:scale-110 transition">
                  <ArrowUpRight size={16}/>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
