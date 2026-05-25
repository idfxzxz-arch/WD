import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .wo-testi-root { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background: #0a0a0c; 
    color: #ffffff; 
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV BAR */
  .wo-testi-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 0; background: rgba(10,10,12,0.8);
    backdrop-filter: blur(16px); z-index: 50;
  }
  .wo-testi-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
    color: #999; cursor: pointer; padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; background: none;
    transition: .2s;
  }
  .wo-testi-back:hover { color: #fff; border-color: #FF5A24; background: rgba(255,90,36,0.05); }
  .wo-testi-nav-logo { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
  .wo-testi-nav-logo span { color: #FF5A24; }

  /* HERO HEADER AREA */
  .wo-testi-hero-section {
    max-w: 1300px; margin: 0 auto; padding: 40px;
    display: flex; flex-direction: column; gap: 32px;
  }
  .wo-testi-text-block { max-w: 700px; }
  .wo-testi-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,90,36,0.1); border: 1px solid rgba(255,90,36,0.2);
    padding: 6px 14px; color: #FF5A24; font-size: 11px; font-weight: 700; 
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; border-radius: 100px;
  }
  .wo-testi-h {
    font-size: 52px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; text-transform: uppercase; margin-bottom: 16px;
  }
  .wo-testi-h em { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; text-transform: lowercase; color: #ff8156; }
  .wo-testi-desc { color: #8e8e93; font-size: 15px; line-height: 1.6; font-weight: 300; }

  /* IPAD FRAME LAYOUT */
  .wo-testi-ipad-frame {
    width: 100%; max-width: 1100px; height: 680px; background: #000;
    border-radius: 36px; padding: 18px; border: 4px solid #2d2d30;
    box-shadow: 0 40px 90px -20px rgba(255,90,36,0.25);
    margin: 0 auto; position: relative;
  }
  .wo-testi-ipad-screen {
    background: #f8f9fa; width: 100%; height: 100%; border-radius: 22px;
    color: #1c1c1e; display: grid; grid-template-columns: 80px 1fr;
    overflow: hidden; position: relative;
  }

  /* IPAD SIDEBAR */
  .wo-testi-ipad-sidebar {
    background: #111115; border-right: 1px solid #e5e5e7;
    display: flex; flex-direction: column; align-items: center; padding: 24px 0; gap: 28px;
  }
  .wo-testi-ipad-side-icon {
    width: 44px; height: 44px; border-radius: 12px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; color: #8e8e93; cursor: pointer; transition: 0.2s;
  }
  .wo-testi-ipad-side-icon.active { background: #FF5A24; color: #fff; }

  /* MAIN AREA BAR */
  .wo-testi-ipad-main { padding: 24px; display: flex; flex-direction: column; overflow: hidden; height: 100%; }
  .wo-testi-ipad-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .wo-testi-ipad-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #111; }
  
  /* TOP HORIZONTAL TABS */
  .wo-testi-ipad-tabs { display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; scrollbar-width: none; }
  .wo-testi-ipad-tabs::-webkit-scrollbar { display: none; }
  .wo-testi-ipad-tab-btn {
    padding: 8px 18px; font-size: 12px; font-weight: 700; border-radius: 12px;
    background: #fff; color: #555; border: 1px solid #e5e5e7; cursor: pointer; transition: 0.15s; white-space: nowrap;
  }
  .wo-testi-ipad-tab-btn.active { background: #111; color: #fff; border-color: #111; }

  /* 3-COLUMN GRID FOR TESTIMONIAL PHOTOS ONLY */
  .wo-testi-ipad-grid {
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 12px;
    overflow-y: auto; 
    flex: 1; 
    padding-bottom: 20px; 
    scrollbar-width: none;
  }
  .wo-testi-ipad-grid::-webkit-scrollbar { display: none; }

  .wo-testi-ipad-card {
    background: #ffffff; 
    border-radius: 14px; 
    overflow: hidden;
    border: 2px solid transparent; 
    cursor: pointer; 
    transition: all 0.2s ease-in-out;
    aspect-ratio: 4/3; 
    display: flex;
  }
  .wo-testi-ipad-card:hover { 
    transform: scale(0.98); 
    box-shadow: 0 8px 20px rgba(0,0,0,0.1); 
  }
  
  .wo-testi-ipad-card-img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    background: #eee; 
  }

  /* TOAST ALERTS */
  .wo-testi-toast {
    position: fixed; top: 32px; right: 32px; background: #FF5A24; color: #fff;
    padding: 14px 24px; border-radius: 16px; font-size: 14px; font-weight: 600;
    box-shadow: 0 20px 40px rgba(255,90,36,0.2); z-index: 100;
  }
`;

const TESTI_TABS = ["All Reviews", "Akad", "Resepsi", "Outdoor"];

export default function WeddingTestimonialsIpad() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Reviews");
  const [shortlist, setShortlist] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: worksData } = await supabase
        .from("works")
        .select("*")
        .eq("category", "wedding")
        .order("order_index");
      
      if (worksData) {
        setWorks(worksData);
        
        if (worksData.length > 0) {
          setShortlist([
            { id: worksData[0].id, title: worksData[0].title, image: worksData[0].image }
          ]);
        }
      }
    };
    fetchData();
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const filteredTestimonials = works.filter((item) => {
    if (activeTab === "All Reviews") return true;
    const sub = item.subcategory?.toLowerCase() || "";
    return sub === activeTab.toLowerCase();
  });

  const toggleShortlist = (item) => {
    const isExist = shortlist.find((s) => s.id === item.id);
    if (isExist) {
      setShortlist(shortlist.filter((s) => s.id !== item.id));
      triggerToast("Removed from Selection");
    } else {
      setShortlist([...shortlist, { id: item.id, title: item.title, image: item.image }]);
      triggerToast("❤️ Image Selected");
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="wo-testi-root">
        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div 
              className="wo-testi-toast"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP NAVBAR */}
        <nav className="wo-testi-nav">
          <button className="wo-testi-back" onClick={() => navigate("/")}>
            ← Back to Gallery
          </button>
          <div className="wo-testi-nav-logo">WD<span>Group</span>Company</div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF5A24] bg-[#FF5A24]/10 px-4 py-1.5 rounded-full">
            iPad Showcase Mode
          </div>
        </nav>

        {/* HERO HEADER */}
        <div className="wo-testi-hero-section">
          <div className="wo-testi-text-block">
            <div className="wo-testi-tag">Live Database Connection</div>
            <h1 className="wo-testi-h">
              Client <em>Happy Stories</em>
            </h1>
            <p className="wo-testi-desc">
              Menampilkan galeri foto ulasan asli dan kebahagiaan dari pasangan pengantin yang diambil langsung dari database core portfolio.
            </p>
          </div>

          {/* REALISTIC IPAD FRAME CONTAINER */}
          <div className="wo-testi-ipad-frame">
            <div className="wo-testi-ipad-screen">
              
              {/* PANEL 1: SIDEBAR (KIRI) */}
              <div className="wo-testi-ipad-sidebar">
                <div className="wo-testi-ipad-side-icon active">📸</div>
                <div className="wo-testi-ipad-side-icon" onClick={() => setShortlist([])}>🧹</div>
              </div>

              {/* PANEL 2: MAIN GRID (3 KOLOM - FOTO SAJA) */}
              <div className="wo-testi-ipad-main">
                <div className="wo-testi-ipad-header">
                  <h2 className="wo-testi-ipad-title">Testimonial Photos</h2>
                  <span className="text-xs text-zinc-400 font-semibold">Table: works</span>
                </div>

                {/* HORIZONTAL TAB BAR */}
                <div className="wo-testi-ipad-tabs">
                  {TESTI_TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`wo-testi-tab-btn ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 3 COLUMNS PHOTO GRID */}
                <div className="wo-testi-ipad-grid">
                  {filteredTestimonials.length > 0 ? (
                    filteredTestimonials.map((item) => {
                      const isSaved = shortlist.some((s) => s.id === item.id);
                      return (
                        <div 
                          key={item.id} 
                          className="wo-testi-ipad-card"
                          style={{ 
                            borderColor: isSaved ? '#FF5A24' : 'transparent',
                            boxShadow: isSaved ? '0 0 0 2px #FF5A24' : ''
                          }}
                          onClick={() => toggleShortlist(item)}
                        >
                          {/* Hanya Menampilkan Foto Langsung */}
                          <img src={item.image} className="wo-testi-ipad-card-img" alt="" />
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-3 text-center py-24 text-xs text-zinc-400 bg-white border border-dashed rounded-2xl">
                      Tidak ada foto dengan subcategory "{activeTab}" di database.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}