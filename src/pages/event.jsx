import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .eo-root { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background: #0a0a0c; 
    color: #ffffff; 
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV BAR */
  .eo-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 0; background: rgba(10,10,12,0.8);
    backdrop-filter: blur(16px); z-index: 50;
  }
  .eo-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
    color: #999; cursor: pointer; padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; background: none;
    transition: .2s;
  }
  .eo-back:hover { color: #fff; border-color: #6366F1; background: rgba(99,102,241,0.05); }
  .eo-nav-logo { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
  .eo-nav-logo span { color: #6366F1; }

  /* HERO HEADER AREA */
  .eo-hero-section {
    max-w: 1300px; margin: 0 auto; padding: 40px;
    display: flex; flex-direction: column; gap: 32px;
  }
  .eo-text-block { max-w: 700px; }
  .eo-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
    padding: 6px 14px; color: #6366F1; font-size: 11px; font-weight: 700; 
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; border-radius: 100px;
  }
  .eo-h {
    font-size: 52px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; text-transform: uppercase; margin-bottom: 16px;
  }
  .eo-h em { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; text-transform: lowercase; color: #818CF8; }
  .eo-desc { color: #8e8e93; font-size: 15px; line-height: 1.6; font-weight: 300; }

  /* IPAD FRAME LAYOUT */
  .eo-ipad-frame {
    width: 100%; max-width: 1100px; height: 680px; background: #000;
    border-radius: 36px; padding: 18px; border: 4px solid #2d2d30;
    box-shadow: 0 40px 90px -20px rgba(99,102,241,0.25);
    margin: 0 auto; position: relative;
  }
  .eo-ipad-screen {
    background: #f8f9fa; width: 100%; height: 100%; border-radius: 22px;
    color: #1c1c1e; display: grid; grid-template-columns: 80px 1fr;
    overflow: hidden; position: relative;
  }

  /* IPAD SIDEBAR */
  .eo-ipad-sidebar {
    background: #111115; border-right: 1px solid #e5e5e7;
    display: flex; flex-direction: column; align-items: center; padding: 24px 0; gap: 28px;
  }
  .eo-ipad-side-icon {
    width: 44px; height: 44px; border-radius: 12px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; color: #8e8e93; cursor: pointer; transition: 0.2s;
  }
  .eo-ipad-side-icon.active { background: #6366F1; color: #fff; }

  /* MAIN AREA BAR */
  .eo-ipad-main { padding: 24px; display: flex; flex-direction: column; overflow: hidden; height: 100%; }
  .eo-ipad-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .eo-ipad-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #111; }
  
  /* TOP HORIZONTAL TABS */
  .eo-ipad-tabs { display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; scrollbar-width: none; }
  .eo-ipad-tabs::-webkit-scrollbar { display: none; }
  .eo-ipad-tab-btn {
    padding: 8px 18px; font-size: 12px; font-weight: 700; border-radius: 12px;
    background: #fff; color: #555; border: 1px solid #e5e5e7; cursor: pointer; transition: 0.15s; white-space: nowrap;
  }
  .eo-ipad-tab-btn.active { background: #111; color: #fff; border-color: #111; }

  /* 3-COLUMN GRID FOR PHOTOS ONLY */
  .eo-ipad-grid {
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 12px;
    overflow-y: auto; 
    flex: 1; 
    padding-bottom: 20px; 
    scrollbar-width: none;
  }
  .eo-ipad-grid::-webkit-scrollbar { display: none; }

  .eo-ipad-card {
    background: #ffffff; 
    border-radius: 14px; 
    overflow: hidden;
    border: 2px solid transparent; 
    cursor: pointer; 
    transition: all 0.2s ease-in-out;
    aspect-ratio: 4/3; 
    display: flex;
  }
  .eo-ipad-card:hover { 
    transform: scale(0.98); 
    box-shadow: 0 8px 20px rgba(0,0,0,0.1); 
  }
  
  .eo-ipad-card-img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    background: #eee; 
  }

  /* TOAST ALERTS */
  .eo-toast {
    position: fixed; top: 32px; right: 32px; background: #6366F1; color: #fff;
    padding: 14px 24px; border-radius: 16px; font-size: 14px; font-weight: 600;
    box-shadow: 0 20px 40px rgba(99,102,241,0.3); z-index: 100;
  }
`

const EVENT_TABS = ["All Events", "Corporate", "Concert", "Exhibition", "Private Party"];

export default function EventOrganizer() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Events");
  const [shortlist, setShortlist] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: worksData, error } = await supabase
          .from("works")
          .select("*")
          .eq("category", "event") // 👈 Fokus query khusus untuk Event Organizer
          .order("order_index");
        
        if (error) throw error;

        if (worksData && isMounted) {
          setWorks(worksData);
          if (worksData.length > 0) {
            setShortlist([
              { id: worksData[0].id, title: worksData[0].title, image: worksData[0].image }
            ]);
          }
        }
      } catch (err) {
        console.error("Error loading event data:", err.message);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const filteredEvents = works.filter((item) => {
    if (activeTab === "All Events") return true;
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
      triggerToast("✨ Event Highlighted");
    }
  };

  return (
    <>
      <style>{css}</style>

      <div className="eo-root">
        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div 
              className="eo-toast"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP NAVBAR */}
        <nav className="eo-nav">
          <button className="eo-back" onClick={() => navigate("/")}>
            ← Back to Gallery
          </button>
          <div className="eo-nav-logo">WD<span>Event</span>Organizer</div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#6366F1] bg-[#6366F1]/10 px-4 py-1.5 rounded-full">
            iPad Showcase Mode
          </div>
        </nav>

        {/* HERO HEADER */}
        <div className="eo-hero-section">
          <div className="eo-text-block">
            <div className="eo-tag">Live Event Portfolios</div>
            <h1 className="eo-h">
              Memorable <em>Experiences</em>
            </h1>
            <p className="eo-desc">
              Menampilkan galeri portofolio eksekusi event, tata panggung, manajemen acara, dan momen-momen spektakuler dari berbagai event yang kami tangani.
            </p>
          </div>

          {/* REALISTIC IPAD FRAME CONTAINER */}
          <div className="eo-ipad-frame">
            <div className="eo-ipad-screen">
              
              {/* PANEL 1: SIDEBAR (KIRI) */}
              <div className="eo-ipad-sidebar">
                <div className="eo-ipad-side-icon active">🎪</div>
                <div className="eo-ipad-side-icon" onClick={() => setShortlist([])} title="Clear Selections">🧹</div>
              </div>

              {/* PANEL 2: MAIN GRID (3 KOLOM - FOTO SAJA) */}
              <div className="eo-ipad-main">
                <div className="eo-ipad-header">
                  <h2 className="eo-ipad-title">Event Gallery</h2>
                  <span className="text-xs text-zinc-400 font-semibold">{filteredEvents.length} Photos</span>
                </div>

                {/* HORIZONTAL TAB BAR */}
                <div className="eo-ipad-tabs">
                  {EVENT_TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`eo-ipad-tab-btn ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 3 COLUMNS PHOTO GRID */}
                <div className="eo-ipad-grid">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((item) => {
                      const isSaved = shortlist.some((s) => s.id === item.id);
                      return (
                        <div 
                          key={item.id} 
                          className="eo-ipad-card"
                          style={{ 
                            borderColor: isSaved ? '#6366F1' : 'transparent',
                            boxShadow: isSaved ? '0 0 0 2px #6366F1' : ''
                          }}
                          onClick={() => toggleShortlist(item)}
                        >
                          {/* Hanya Menampilkan Foto Langsung */}
                          <img src={item.image} className="eo-ipad-card-img" alt={item.title || "Event Image"} loading="lazy" />
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