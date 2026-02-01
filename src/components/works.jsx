import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Coffeel – App Delivery",
    tags: ["Mobile App", "Branding"],
    image: "/resources/hero.webp",
  },
  {
    title: "1-888-ECHO – Website",
    tags: ["Website", "Agency"],
    image: "/resources/hero.webp",
  },
]

export default function Works() {
  return (
    <section id="works" className="py-40">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl text-center mb-24 font-medium">
          Works
        </h2>

        <div className="grid md:grid-cols-2 gap-24">

          {projects.map((item,i)=>(
            <div key={i}>

              {/* IMAGE */}
              <div className="relative group overflow-hidden rounded-xl">

                <img
                  src={item.image}
                  className="w-full h-[380px] object-cover transition duration-700 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition"/>

                {/* detail button */}
                <div className="
                  absolute top-1/2 left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  opacity-0 scale-75
                  group-hover:opacity-100 group-hover:scale-100
                  transition
                ">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center text-sm">
                    Detail
                  </div>
                </div>

              </div>

              {/* TAGS */}
              <div className="flex gap-2 mt-4">
                {item.tags.map((tag,j)=>(
                  <span key={j} className="border rounded-full px-4 py-1 text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* TITLE */}
              <div className="flex justify-between items-center mt-4">

                <h3 className="text-2xl font-medium">
                  {item.title}
                </h3>

                <div className="border rounded-full p-2">
                  <ArrowUpRight size={18}/>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
