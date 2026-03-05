import React, { useState } from "react";

const portfolioData = [
  { type: "image", src: "/resources/Wedding/wedding.webp" },
  { type: "image", src: "/resources/Wedding/wedding1.webp" },
  { type: "image", src: "/resources/Wedding/wedding2.webp" },
  { type: "image", src: "/resources/Workshop/Workshop.webp" },
  { type: "image", src: "/resources/Workshop/workshop1.webp" },
  { type: "image", src: "/resources/Workshop/workshop2.webp" },
  { type: "image", src: "/resources/Event_Organizer/Event.webp" },
  { type: "image", src: "/resources/Event_Organizer/Event1.webp" },
  { type: "image", src: "/resources/Event_Organizer/Event2.webp" },
  { type: "image", src: "/resources/Music_ENT/Music_ENT.webp" },
  { type: "image", src: "/resources/Music_ENT/Music_ENT1.webp" },
  { type: "image", src: "/resources/Music_ENT/Music_ENT2.webp" },
  { type: "image", src: "/resources/Production/Production.webp" },
  { type: "image", src: "/resources/Production/Production1.webp" },
  { type: "image", src: "/resources/Production/Production2.webp" },
  { type: "image", src: "/resources/Store/Store.webp" }
];

export default function Portofolio() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Portofolio Kami
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() =>
                item.type === "video" && setActiveVideo(item.src)
              }
            >
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt="Portfolio"
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt="Video Thumbnail"
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="bg-white rounded-full p-4 text-xl">
                        ▶
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl px-4">
            <button
              className="absolute -top-10 right-4 text-white text-2xl"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>

            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
             <video
  controls
  autoPlay
  preload="metadata"
  className="absolute inset-0 w-full h-full"
>
  <source src={activeVideo} type="video/mp4" />
  Browser tidak mendukung video.
</video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}