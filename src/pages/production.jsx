import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProductionBrandLayout() {
  const [selected, setSelected] = useState(null);
  const [works, setWorks] = useState([]);
  const [content, setContent] = useState({ title: "Production", desc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Filter khusus untuk kategori 'production'
      const { data: worksData } = await supabase
        .from("works")
        .select("*")
        .eq("category", "production")
        .order("order_index");
      
      if (worksData) setWorks(worksData);

      const { data: contentData } = await supabase.from("content").select("*").eq("section", "production");
      if (contentData) {
        setContent({
          title: contentData.find(c => c.key === "title")?.value || "Production",
          desc: contentData.find(c => c.key === "description")?.value || ""
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#F2F2F2] min-h-screen font-sans text-neutral-900 pb-20">
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => navigate("/")} className="px-5 py-2 bg-white/90 backdrop-blur-md border border-neutral-200 text-black rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-sm">
          ← Back
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">
        {/* HERO */}
        <div className="bg-[#000] flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-cover bg-center scale-110" style={{ backgroundImage: `url(${works[0]?.image})` }} />
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-[280px] aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col p-6 pt-12">
            <h3 className="text-white text-xl font-bold mb-8">{content.title}</h3>
            {works[1] && <img src={works[1].image} className="w-full aspect-[4/3] rounded-2xl object-cover mb-6" alt="work" />}
          </motion.div>
        </div>
        <div className="bg-[#F8F9FA] flex items-center justify-center p-12">
            {works[2] && <img src={works[2].image} className="w-full max-w-md aspect-[4/3] rounded-2xl shadow-lg object-cover" alt="work" />}
        </div>
      </section>

      {/* BRAND INFO */}
      <section className="px-6 md:px-20 py-20 bg-white grid grid-cols-1 md:grid-cols-2 gap-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-md">{content.desc}</p>
      </section>

      {/* GRID */}
      <section className="bg-[#F8F9FA] px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {works.map((item) => (
            <motion.div key={item.id} whileInView={{ scale: 1 }} initial={{ scale: 0.95 }} className="bg-white p-8 rounded-2xl shadow-sm border cursor-pointer" onClick={() => setSelected(item.image)}>
              <img src={item.image} className="w-full aspect-[4/3] rounded-2xl object-cover" alt={item.title} />
              <p className="mt-4 font-bold text-neutral-800">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-10" onClick={() => setSelected(null)}>
          <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={selected} className="max-h-full max-w-full rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
}