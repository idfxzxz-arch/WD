import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .po-root { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background: #0a0a0c; 
    color: #ffffff; 
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV BAR */
  .po-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 0; background: rgba(10,10,12,0.8);
    backdrop-filter: blur(16px); z-index: 50;
  }
  .po-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
    color: #999; cursor: pointer; padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; background: none;
    transition: .2s;
  }
  .po-back:hover { color: #fff; border-color: #FFB300; background: rgba(255,179,0,0.05); }
  .po-nav-logo { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
  .po-nav-logo span { color: #FFB300; }

  /* HERO HEADER AREA */
  .po-hero-section {
    max-w: 1300px; margin: 0 auto; padding: 40px;
    display: flex; flex-direction: column; gap: 32px;
  }
  .po-text-block { max-w: 700px; }
  .po-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,179,0,0.1); border: 1px solid rgba(255,179,0,0.2);
    padding: 6px 14px; color: #FFB300; font-size: 11px; font-weight: 700; 
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; border-radius: 100px;
  }
  .po-h {
    font-size: 52px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; text-transform: uppercase; margin-bottom: 16px;
  }
  .po-h em { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; text-transform: lowercase; color: #FFE082; }
  .po-desc { color: #8e8e93; font-size: 15px; line-height: 1.6; font-weight: 300; }

  /* IPAD FRAME LAYOUT */
  .po-ipad-frame {
    width: 100%; max-width: 1100px; height: 680px; background: #000;
    border-radius: 36px; padding: 18px; border: 4px solid #2d2d30;
    box-shadow: 0 40px 90px -20px rgba(255,179,0,0.15);
    margin: 0 auto; position: relative;
  }
  .po-ipad-screen {
    background: #f8f9fa; width: 100%; height: 100%; border-radius: 22px;
    color: #1c1c1e; display: grid; grid-template-columns: 80px 1fr;
    overflow: hidden; position: relative;
  }

  /* IPAD SIDEBAR */
  .po-ipad-sidebar {
    background: #111115; border-right: 1px solid #e5e5e7;
    display: flex; flex-direction: column; align-items: center; padding: 24px 0; gap: 28px;
  }
  .po-ipad-side-icon {
    width: 44px; height: 44px; border-radius: 12px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; color: #8e8e93; cursor: pointer; transition: 0.2s;
  }
  .po-ipad-side-icon.active { background: #FFB300; color: #111115; }

  /* MAIN AREA BAR */
  .po-ipad-main { padding: 24px; display: flex; flex-direction: column; overflow: hidden; height: 100%; }
  .po-ipad-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .po-ipad-title { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #111; }
  
  /* TOP HORIZONTAL TABS */
  .po-ipad-tabs { display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; scrollbar-width: none; }
  .po-ipad-tabs::-webkit-scrollbar { display: none; }
  .po-ipad-tab-btn {
    padding: 8px 18px; font-size: 12px; font-weight: 700; border-radius: 12px;
    background: #fff; color: #555; border: 1px solid #e5e5e7; cursor: pointer; transition: 0.15s; white-space: nowrap;
  }
  .po-ipad-tab-btn.active { background: #111; color: #fff; border-color: #111; }

  /* 3-COLUMN GRID FOR PORTFOLIO PHOTOS */
  .po-ipad-grid {
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 12px;
    overflow-y: auto; 
    flex: 1; 
    padding-bottom: 20px; 
    scrollbar-width: none;
  }
  .po-ipad-grid::-webkit-scrollbar { display: none; }

  .po-ipad-card {
    background: #ffffff; 
    border-radius: 14px; 
    overflow: hidden;
    border: 2px solid transparent; 
    cursor: pointer; 
    transition: all 0.2s ease-in-out;
    aspect-ratio: 4/3; 
    display: flex;
  }
  .po-ipad-card:hover { 
    transform: scale(0.98); 
    box-shadow: 0 8px 20px rgba(0,0,0,0.1); 
  }
  
  .po-ipad-card-img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    background: #eee; 
  }

  /* TOAST ALERTS */
  .po-toast {
    position: fixed; top: 32px; right: 32px; background: #FFB300; color: #111115;
    padding: 14px 24px; border-radius: 16px; font-size: 14px; font-weight: 600;
    box-shadow: 0 20px 40px rgba(255,179,0,0.2); z-index: 100;
  }
`

const ORGANIZER_TABS = ["All Projects", "Planning", "Crew & Team", "Decoration", "Live Execution"]

export default function ProductionOrganizer() {
  const [works, setWorks] = useState([])
  const [activeTab, setActiveTab] = useState("All Projects")
  const [shortlist, setShortlist] = useState([])
  const [toastMsg, setToastMsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const { data: worksData, error } = await supabase
          .from("works")
          .select("id, title, image, subcategory")
          // 👇 INI YANG SAYA UBAH: Ditarik dari kategori "production" bukan "wedding" lagi
          .eq("category", "production") 
          .order("order_index")

        if (error) throw error

        if (worksData && isMounted) {
          setWorks(worksData)
          if (worksData.length > 0) {
            setShortlist([
              { id: worksData[0].id, title: worksData[0].title, image: worksData[0].image }
            ])
          }
        }
      } catch (err) {
        console.error("Error loading organizer data:", err.message)
      }
    }

    fetchData()
    return () => { isMounted = false }
  }, [])

  const triggerToast = (msg) => {
    setToastMsg(msg)
  }

  useEffect(() => {
    if (!toastMsg) return
    const timer = setTimeout(() => setToastMsg(""), 2000)
    return () => clearTimeout(timer)
  }, [toastMsg])

  const filteredProjects = works.filter((item) => {
    if (activeTab === "All Projects") return true
    const sub = (item.subcategory || "").toLowerCase().trim()
    return sub === activeTab.toLowerCase().trim()
  })

  const toggleShortlist = (item) => {
    const isExist = shortlist.find((s) => s.id === item.id)
    if (isExist) {
      setShortlist(shortlist.filter((s) => s.id !== item.id))
      triggerToast("Removed from Spotlight")
    } else {
      setShortlist([...shortlist, { id: item.id, title: item.title, image: item.image }])
      triggerToast("✨ Project Selected")
    }
  }

  return (
    <>
      <style>{css}</style>

      <div className="po-root">
        <AnimatePresence mode="wait">
          {toastMsg && (
            <motion.div 
              className="po-toast"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="po-nav">
          <button className="po-back" onClick={() => navigate("/")}>
            ← Back to Gallery
          </button>
          <div className="po-nav-logo">WD<span>Organizer</span></div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#111115] bg-[#FFB300] px-4 py-1.5 rounded-full">
            iPad Control Panel Mode
          </div>
        </nav>

        <div className="po-hero-section">
          <div className="po-text-block">
            <div className="po-tag">Production Behind-The-Scenes</div>
            <h1 className="po-h">
              Production <em>& Organizer</em>
            </h1>
            <p className="po-desc">
              Menampilkan arsip dokumentasi kerja, manajemen tim, dekorasi panggung, serta eksekusi balik layar tim organizer kami di lapangan.
            </p>
          </div>

          <div className="po-ipad-frame">
            <div className="po-ipad-screen">
              
              <div className="po-ipad-sidebar">
                <div className="po-ipad-side-icon active" title="Showcase Mode">📋</div>
                <div className="po-ipad-side-icon" onClick={() => { setShortlist([]); triggerToast("Showcase Cleared"); }} title="Clear Selection">🧹</div>
              </div>

              <div className="po-ipad-main">
                <div className="po-ipad-header">
                  <h2 className="po-ipad-title">Production Gallery</h2>
                  <span className="text-xs text-zinc-400 font-semibold">{filteredProjects.length} Archive(s)</span>
                </div>

                <div className="po-ipad-tabs">
                  {ORGANIZER_TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`po-ipad-tab-btn ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="po-ipad-grid">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((item) => {
                      const isSaved = shortlist.some((s) => s.id === item.id)
                      return (
                        <div 
                          key={item.id} 
                          className="po-ipad-card"
                          style={{ 
                            borderColor: isSaved ? '#FFB300' : 'transparent',
                            boxShadow: isSaved ? '0 0 0 2px #FFB300' : ''
                          }}
                          onClick={() => toggleShortlist(item)}
                        >
                          <img 
                            src={item.image} 
                            className="po-ipad-card-img" 
                            alt={item.title || "Production Project"} 
                            loading="lazy"
                          />
                        </div>
                      )
                    })
                  ) : (
                    <div className="col-span-3 text-center py-24 text-xs text-zinc-400 bg-white border border-dashed rounded-2xl flex flex-col items-center justify-center gap-2">
                      <span>Tidak ada data foto untuk kategori "{activeTab}".</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}