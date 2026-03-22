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
      HYRD
    </h1>
  </div>

  {/* RIGHT: DESCRIPTION */}
  <div className="space-y-6 max-w-md">
    <p className="text-sm text-neutral-600 leading-relaxed">
      Hyrd is an AI-powered talent engagement and relationship management 
      platform designed to effortlessly build candidate relationships.
    </p>

    <div className="space-y-3 text-sm">
      <div>
        <p className="text-neutral-400">Location</p>
        <p className="font-medium">Frankfurt, Germany</p>
      </div>

      <div>
        <p className="text-neutral-400">Industries</p>
        <p className="font-medium">Human Resources, Recruiting</p>
      </div>

      <div>
        <p className="text-neutral-400">Funding</p>
        <p className="font-medium">€100,000</p>
      </div>

      <div>
        <p className="text-neutral-400">Founders</p>
        <p className="font-medium">Benjamin Weller, Dennis Pfaff</p>
      </div>
    </div>
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


      {/* SECTION 2: COLOR PALETTE */}
      <section className="flex flex-col">
        <div className="bg-[#0071E3] h-64 p-8 flex flex-col justify-end text-white">
          <p className="text-[10px] font-mono opacity-80 uppercase tracking-widest mb-1">#0071E3</p>
          <p className="text-[10px] font-mono opacity-80 uppercase">RGBA(0, 113, 227, 1)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 h-64">
          <div className="bg-[#0050A1] p-8 flex flex-col justify-end text-white">
            <p className="text-[10px] font-mono opacity-80">#0050A1</p>
            <p className="text-[10px] font-mono opacity-80 tracking-tighter">RGBA(0, 80, 161, 1)</p>
          </div>
          <div className="bg-[#1E1E1E] p-8 flex flex-col justify-end text-white">
            <p className="text-[10px] font-mono opacity-80">#1E1E1E</p>
            <p className="text-[10px] font-mono opacity-80 tracking-tighter">RGBA(30, 30, 30, 1)</p>
          </div>
          <div className="bg-[#FFFFFF] p-8 flex flex-col justify-end text-black border-t md:border-t-0 border-neutral-100">
            <p className="text-[10px] font-mono opacity-60">#FFFFFF</p>
            <p className="text-[10px] font-mono opacity-60 tracking-tighter">RGBA(255, 255, 255, 1)</p>
          </div>
        </div>
      </section>

      

      {/* SECTION 3: COMPONENTS */}
      <section className="p-12 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Kartu Lokasi */}
        <motion.div 
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 40, opacity: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-lg">Locations</h3>
              <p className="text-xs text-blue-600 font-bold">60 Destination</p>
            </div>
          </div>
          <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setSelected(images[3])}>
            <img src={images[3]} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="map context" />
            <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-all" />
          </div>
        </motion.div>

        {/* Kartu Profil */}
        <motion.div 
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 40, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-md">
              <img src={images[4]} className="w-full h-full object-cover" alt="profile" />
            </div>
            <div>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Wedding Expert</p>
              <p className="text-sm font-bold">Review Portfolio 2024</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span>WEDDING PLANNING</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} className="bg-[#0071E3] h-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span>GALA DINNER</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "40%" }} className="bg-blue-300 h-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER CTA */}
      <footer className="text-center py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-neutral-800">Tell Your Story.</h2>
        <button className="px-12 py-4 bg-black text-white rounded-full text-sm font-bold hover:scale-105 transition-all shadow-xl active:scale-95">
          START YOUR PROJECT
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