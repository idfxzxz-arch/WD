import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Music – Entertaiment",
    tags: [],
    image: "/resources/Music_ENT/Music_ENT.webp",
  },
  {
    title: "Store – Ananta Bettafish",
    tags: [],
    image: "/resources/Store/Store.webp",
  },
   {
    title: "Workshop",
    tags: [],
    image: "/resources/Workshop/Workshop.webp",
  },
   {
    title: "Production",
    tags: [],
    image: "/resources/Production/roduction.webp",
  },
   {
    title: "Event – Organizer",
    tags: [],
    image: "/resources/Event_Organizer/Event.webp",
  },
   {
    title: "1-888-ECHO – Website",
    tags: ["Website", "Agency"],
    image: "/resources/wedding/photo1.webp",
  },
   {
    title: "1-888-ECHO – Website",
    tags: ["Website", "Agency"],
    image: "/resources/wedding/photo1.webp",
  },
   {
    title: "1-888-ECHO – Website",
    tags: ["Website", "Agency"],
    image: "/resources/wedding/photo1.webp",
  },
   {
    title: "1-888-ECHO – Website",
    tags: ["Website", "Agency"],
    image: "/resources/wedding/photo1.webp",
  },
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
              <div className="relative group rounded-2xl overflow-hidden bg-gray-100 shadow-sm">

                <div className="w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full h-full
                      object-cover object-center
                      transition duration-700
                      group-hover:scale-105
                    "
                  />
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
