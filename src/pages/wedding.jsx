import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/resources/Wedding/WO/WO1.webp",
  "/resources/Wedding/WO/WO2.webp",
  "/resources/Wedding/WO/WO3.webp",
  "/resources/Wedding/WO/WO4.webp",
  "/resources/Wedding/WO/WO5.webp",
  "/resources/Wedding/WO/WO6.webp",
];

export default function WeddingBrandLayout() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F2F2F2] min-h-screen font-sans text-neutral-900 pb-16">
      
      {/* BACK BUTTON */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-white/90 backdrop-blur-md border border-neutral-200 text-black rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-sm"
        >
          ← Back
        </button>
      </div>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        
        {/* LEFT */}
        <div className="bg-black flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center scale-110" 
            style={{ backgroundImage: `url(${images[0]})` }}
          />
          
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-[260px] aspect-[9/19] bg-[#1a1a1a] rounded-[2.5rem] border-[6px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-5 pt-10 flex flex-col h-full">
              
              <div className="w-10 h-[3px] bg-neutral-700 mx-auto rounded-full mb-8" />
              
              <p className="text-[9px] text-neutral-500 mb-2 uppercase tracking-widest">
                About Portfolio
              </p>

              <h3 className="text-white text-lg font-bold mb-6 leading-tight">
                Wedding Organizer
              </h3>
              
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img src={images[2]} className="w-full h-full object-cover" />
              </div>

              <div className="aspect-[4/4] rounded-xl overflow-hidden">
                <img src={images[3]} className="w-full h-full object-cover" />
              </div>
              
              <div className="mt-auto pt-4 flex flex-col gap-2">
                <div className="h-[3px] w-full bg-neutral-800/60 rounded-full" />
                <div className="h-[3px] w-2/3 bg-neutral-800/60 rounded-full mb-3" />
                
                <button className="h-11 w-full bg-[#0071E3] rounded-xl text-[10px] text-white font-bold uppercase">
                  Contact Person
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#F8F9FA] flex items-center justify-center p-10">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 w-full max-w-md"
          >
            <div className="text-[10px] text-neutral-400 mb-4 flex justify-between border-b pb-2 uppercase">
              <span>Wedding</span>
              <span>Organizer</span>
            </div>

            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden">
              <img src={images[5]} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

      </section>

      {/* BRAND INFO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20 py-14 bg-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Wedding Organizer
        </h1>

        <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
          WD Jaya Group is a creative wedding organizer committed to turning your dream wedding into reality.
          We bring every love story to life through curated concepts and detail-focused execution.
        </p>
      </section>

      {/* DOUBLE CARD */}
      <section className="bg-[#F8F9FA] px-6 md:px-20 py-12">
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">

          {[0,1].map((row) => (
            <div key={row} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {[3,4].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100"
                >
                  <div className="text-[10px] text-neutral-400 mb-4 flex justify-between border-b pb-2 uppercase">
                    <span>Wedding</span>
                    <span>Organizer</span>
                  </div>

                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img src={images[img]} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}

            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-14 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-800">
          Tell Your Story.
        </h2>

        <button className="px-10 py-3 bg-black text-white rounded-full text-sm font-bold">
          CONTACT ME
        </button>
      </footer>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-10"
          onClick={() => setSelected(null)}
        >
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selected} 
            className="max-h-full max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}