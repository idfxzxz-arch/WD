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
    <div className="bg-[#F2F2F2] min-h-screen font-sans text-neutral-900 pb-20">
      {/* BACK BUTTON */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-white/90 backdrop-blur-md border border-neutral-200 text-black rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-sm"
        >
          ← Back
        </button>
      </div>

      {/* SECTION 1: HERO SPLIT (MOCKUP & TYPOGRAPHY) */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">
        {/* Sisi Kiri: Mockup HP */}
        <div className="bg-[#000] flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center scale-110" 
            style={{ backgroundImage: `url(${images[0]})` }}
          />
          
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-[280px] aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Konten simulasi Aplikasi (Persis Screenshot) */}
            <div className="p-6 pt-12 flex flex-col h-full">
              {/* Notch/Speaker Top */}
              <div className="w-12 h-[3px] bg-neutral-700 mx-auto rounded-full mb-10" />
              
              <p className="text-[9px] text-neutral-500 mb-2 uppercase tracking-widest font-medium">About Portfolio</p>
              <h3 className="text-white text-xl font-bold mb-8 leading-tight">Wedding Organizer</h3>
              
              {/* Foto dalam mockup */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src={images[2]} className="w-full h-full object-cover" alt="preview" />
              </div>

              <div className="aspect-[4/4] rounded-2xl overflow-hidden shadow-lg mt-4">
                <img src={images[3]} className="w-full h-full object-cover" alt="preview2" />
              </div>
              
              {/* Spacing push to bottom */}
              <div className="mt-auto mb-6 flex flex-col gap-2">
                {/* Placeholder Lines (Skeleton) */}
                <div className="h-[3px] w-full bg-neutral-800/60 rounded-full" />
                <div className="h-[3px] w-2/3 bg-neutral-800/60 rounded-full mb-4" />
                
                {/* Button Contact Person */}
                <button className="h-12 w-full bg-[#0071E3] rounded-2xl flex items-center justify-center text-[11px] text-white font-bold tracking-wider hover:bg-blue-600 transition-colors uppercase">
                  Contact Person
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sisi Kanan: Typography Showcase */}
        <div className="bg-[#F8F9FA] flex items-center justify-center p-12">
  <motion.div 
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 w-full max-w-md"
  >
    {/* Header */}
    <div className="text-[10px] text-neutral-400 mb-6 flex justify-between border-b pb-2 font-mono uppercase tracking-tighter">
      <span>Wedding</span>
      <span>Organizer</span>
    </div>

    {/* Foto lebih besar */}
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
      <img
        src={images[5]}
        className="w-full h-full object-cover"
        alt="preview"
      />
    </div>
  </motion.div>
</div>
      </section>

      {/* SECTION 1.5: BRAND INFO (HYRD STYLE) */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20 py-20 bg-white">
  
  {/* LEFT: TITLE */}
  <div className="flex items-start">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
      Wedding Organizer
    </h1>
  </div>

  {/* RIGHT: DESCRIPTION */}
  <div className="space-y-6 max-w-md">
    <p className="text-sm text-neutral-600 leading-relaxed">
      WD Jaya Group is a creative wedding organizer committed to turning your dream wedding into reality. 
      We believe every love story is unique, and we bring that story to life through beautifully curated concepts, 
      meticulous planning, and heartfelt execution. From intimate ceremonies to grand celebrations, 
      we handle every detail so you can focus on what truly matters—your special moment.
    </p>
  </div>
</section>

 {/* SECTION: DOUBLE CARD (KIRI + KANAN) */}
<section className="bg-[#F8F9FA] px-6 md:px-20 py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

    {/* CARD KIRI */}
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 w-full"
    >
      {/* Header */}
      <div className="text-[10px] text-neutral-400 mb-6 flex justify-between border-b pb-2 font-mono uppercase tracking-tighter">
        <span>Wedding</span>
        <span>Organizer</span>
      </div>

      {/* Foto */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[3]}
          className="w-full h-full object-cover"
          alt="left"
        />
      </div>
    </motion.div>

    {/* CARD KANAN */}
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 w-full"
    >
      {/* Header */}
      <div className="text-[10px] text-neutral-400 mb-6 flex justify-between border-b pb-2 font-mono uppercase tracking-tighter">
        <span>Wedding</span>
        <span>Organizer</span>
      </div>

      {/* Foto */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[4]}
          className="w-full h-full object-cover"
          alt="right"
        />
      </div>
    </motion.div>
  </div>
</section>

 {/* SECTION: DOUBLE CARD (KIRI + KANAN) */}
<section className="bg-[#F8F9FA] px-6 md:px-20 py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

    {/* CARD KIRI */}
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 w-full"
    >
      {/* Header */}
      <div className="text-[10px] text-neutral-400 mb-6 flex justify-between border-b pb-2 font-mono uppercase tracking-tighter">
        <span>Wedding</span>
        <span>Organizer</span>
      </div>

      {/* Foto */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[3]}
          className="w-full h-full object-cover"
          alt="left"
        />
      </div>
    </motion.div>

    {/* CARD KANAN */}
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 w-full"
    >
      {/* Header */}
      <div className="text-[10px] text-neutral-400 mb-6 flex justify-between border-b pb-2 font-mono uppercase tracking-tighter">
        <span>Wedding</span>
        <span>Organizer</span>
      </div>

      {/* Foto */}
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[4]}
          className="w-full h-full object-cover"
          alt="right"
        />
      </div>
    </motion.div>
  </div>
</section>

      {/* FOOTER CTA */}
      <footer className="text-center py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-neutral-800">Tell Your Story.</h2>
        <button className="px-12 py-4 bg-black text-white rounded-full text-sm font-bold hover:scale-105 transition-all shadow-xl active:scale-95">
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
            className="max-h-full max-w-full rounded-lg shadow-2xl" 
          />
        </div>
      )}
    </div>
  );
}