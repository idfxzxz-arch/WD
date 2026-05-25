import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function MusicBrandLayout() {
  const [selected, setSelected] = useState(null);
  const [works, setWorks] = useState([]);
  const [content, setContent] = useState({ title: "Music Entertainment", desc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Mengambil data kategori 'music'
      const { data: worksData } = await supabase.from("works").select("*").eq("category", "music").order("order_index");
      if (worksData) setWorks(worksData);

      const { data: contentData } = await supabase.from("content").select("*").eq("section", "music");
      if (contentData) {
        setContent({
          title: contentData.find(c => c.key === "title")?.value || "Music Entertainment",
          desc: contentData.find(c => c.key === "description")?.value || ""
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#F2F2F2] min-h-screen font-sans text-neutral-900 pb-20">
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => navigate("/")} className="px-5 py-2 bg-white/90 backdrop-blur-md border border-neutral-200 text-black rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-sm">← Back</button>
      </div>
      
      {/* Hero Section & Grid sama seperti sebelumnya, otomatis terisi data 'music' */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">
        {/* ... (Hero structure) ... */}
      </section>

      <section className="bg-[#F8F9FA] px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {works.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border" onClick={() => setSelected(item.image)}>
              <img src={item.image} className="w-full aspect-[4/3] rounded-2xl object-cover" alt={item.title} />
            </div>
          ))}
        </div>
      </section>
      {/* ... (Modal) ... */}
    </div>
  );
}