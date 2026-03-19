import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function WeddingBrandLayout() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1200; // ukuran design desktop kamu
      const currentWidth = window.innerWidth;
      const newScale = Math.min(currentWidth / baseWidth, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#F2F2F2] min-h-screen flex justify-center">

      {/* WRAPPER SCALE */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: "1200px",
        }}
        className="font-sans text-neutral-900"
      >

        {/* BACK BUTTON */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-white/80 backdrop-blur-md border border-neutral-200 text-black rounded-full text-sm hover:bg-black hover:text-white transition-all shadow-sm"
          >
            ← Back
          </button>
        </div>

        {/* HERO SPLIT */}
        <section className="grid grid-cols-2 h-[600px]">
          <div className="relative overflow-hidden">
            <img src="/resources/Wedding/WO/WO1.webp" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative overflow-hidden">
            <img src="/resources/Wedding/WO/WO2.webp" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </section>

        {/* TRIPLE IMAGE */}
        <section className="grid grid-cols-3 h-[420px] gap-[2px] bg-neutral-200">
          <img src="/resources/Wedding/WO/WO3.webp" className="w-full h-full object-cover" />
          <img src="/resources/Wedding/WO/WO4.webp" className="w-full h-full object-cover" />
          <img src="/resources/Wedding/WO/WO5.webp" className="w-full h-full object-cover" />
        </section>

        {/* IMAGE GRID */}
        <section className="px-16 py-20 grid grid-cols-2 gap-6 max-w-6xl mx-auto">

          <motion.img
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            src="/resources/Wedding/WO/WO1.webp"
            className="w-full h-[380px] object-cover rounded-3xl"
          />

          <motion.img
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: 0.1 }}
            src="/resources/Wedding/WO/WO2.webp"
            className="w-full h-[380px] object-cover rounded-3xl"
          />

          <motion.img
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: 0.2 }}
            src="/resources/Wedding/WO/WO3.webp"
            className="w-full h-[420px] object-cover rounded-3xl col-span-2"
          />

        </section>

        {/* BIG IMAGE */}
        <section className="px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            <img
              src="/resources/Wedding/WO/WO4.webp"
              className="w-full h-[500px] object-cover rounded-3xl"
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center bg-white border-t border-neutral-100">
          <h2 className="text-2xl font-bold">Ready to start?</h2>
          <button className="mt-6 px-8 py-3 bg-black text-white rounded-full hover:scale-105 transition shadow-lg">
            Contact Us
          </button>
        </footer>

      </div>
    </div>
  );
}