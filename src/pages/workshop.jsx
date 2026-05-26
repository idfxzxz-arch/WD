import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .ws-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #08090d;
    color: #ffffff;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV */
  .ws-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 0; background: rgba(8,9,13,0.85);
    backdrop-filter: blur(16px); z-index: 50;
  }
  .ws-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
    color: #999; cursor: pointer; padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; background: none;
    transition: .2s;
  }
  .ws-back:hover { color: #fff; border-color: #7c5cfc; background: rgba(124,92,252,0.06); }
  .ws-nav-logo { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
  .ws-nav-logo span { color: #7c5cfc; }
  .ws-nav-badge {
    font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: #7c5cfc; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2);
    padding: 6px 16px; border-radius: 100px;
  }

  /* HERO */
  .ws-hero {
    padding: 56px 40px 40px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
    max-width: 1200px; margin: 0 auto;
  }
  .ws-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2);
    padding: 6px 14px; color: #7c5cfc; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; border-radius: 100px;
  }
  .ws-hero-h {
    font-size: 56px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
    text-transform: uppercase; margin-bottom: 20px;
  }
  .ws-hero-h em {
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400;
    text-transform: lowercase; color: #a78bfa;
  }
  .ws-hero-desc { color: #8e8e93; font-size: 14px; line-height: 1.7; font-weight: 300; margin-bottom: 28px; }
  .ws-hero-cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: #7c5cfc; color: #fff; border: none; border-radius: 100px;
    padding: 13px 28px; font-size: 12px; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; cursor: pointer; transition: .2s; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .ws-hero-cta:hover { background: #6d4ef0; transform: translateY(-1px); }
  .ws-hero-stats { display: flex; gap: 32px; margin-top: 36px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.06); }
  .ws-stat-n { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1; }
  .ws-stat-l { font-size: 11px; color: #666; margin-top: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; }

  /* HERO RIGHT - Industrial Gear visual */
  .ws-hero-right { display: flex; align-items: center; justify-content: center; position: relative; }
  .ws-gear {
    width: 280px; height: 280px; border-radius: 50%;
    background: conic-gradient(from 0deg, #1a1a2e, #16213e, #0f3460, #7c5cfc, #a78bfa, #7c5cfc, #0f3460, #16213e, #1a1a2e);
    box-shadow: 0 0 60px rgba(124,92,252,0.35), 0 0 120px rgba(124,92,252,0.15);
    animation: spin 12s linear infinite; display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .ws-gear-center {
    width: 90px; height: 90px; border-radius: 50%;
    background: #08090d; border: 3px solid #7c5cfc;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #7c5cfc;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .ws-gear-indicator {
    position: absolute; right: -10px; top: 20px; width: 90px; height: 4px;
    background: linear-gradient(to right, #7c5cfc, #a78bfa);
    border-radius: 2px; transform: rotate(25deg); transform-origin: right center;
  }

  /* DEVICE FRAME */
  .ws-device-wrap { padding: 40px; max-width: 1200px; margin: 0 auto; }
  .ws-device-label { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #555; margin-bottom: 20px; }
  .ws-device {
    background: #111117; border-radius: 28px; padding: 16px;
    border: 2px solid #1e1e2a;
    box-shadow: 0 32px 80px -20px rgba(124,92,252,0.2);
  }
  .ws-device-screen {
    background: #f5f5f7; border-radius: 18px; overflow: hidden;
    display: grid; grid-template-columns: 72px 1fr; min-height: 600px; color: #111;
  }

  /* SIDEBAR */
  .ws-sidebar {
    background: #111117; display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 20px; border-right: 1px solid rgba(255,255,255,0.04);
  }
  .ws-sidebar-icon {
    width: 42px; height: 42px; border-radius: 12px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; cursor: pointer; transition: .2s;
    color: #555;
  }
  .ws-sidebar-icon.on { background: #7c5cfc; color: #fff; }

  /* MAIN */
  .ws-main { padding: 22px; display: flex; flex-direction: column; height: 100%; }
  .ws-main-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .ws-main-title { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
  .ws-main-sub { font-size: 11px; color: #999; font-weight: 500; }

  /* TABS */
  .ws-tabs { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .ws-tab {
    padding: 7px 16px; font-size: 11px; font-weight: 700; border-radius: 10px;
    background: #fff; color: #777; border: 1px solid #e5e5e7; cursor: pointer; transition: .15s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .ws-tab.on { background: #111; color: #fff; border-color: #111; }

  /* GRID */
  .ws-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    overflow-y: auto; flex: 1; padding-bottom: 16px; scrollbar-width: none;
  }
  .ws-grid::-webkit-scrollbar { display: none; }
  .ws-card {
    border-radius: 12px; overflow: hidden; cursor: pointer;
    aspect-ratio: 4/3; position: relative;
    border: 2px solid transparent; transition: all .2s;
    background: #e0e0e0;
  }
  .ws-card:hover { transform: scale(0.97); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
  .ws-card.saved { border-color: #7c5cfc; box-shadow: 0 0 0 2px #7c5cfc; }
  .ws-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ws-card-ov {
    position: absolute; inset: 0; background: rgba(124,92,252,0); transition: .25s;
    display: flex; align-items: center; justify-content: center;
  }
  .ws-card:hover .ws-card-ov { background: rgba(124,92,252,0.15); }
  .ws-card-dot {
    width: 28px; height: 28px; border-radius: 50%; background: #7c5cfc;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: #fff; opacity: 0; transition: .2s;
  }
  .ws-card:hover .ws-card-dot { opacity: 1; }

  /* EMPTY STATE */
  .ws-empty {
    grid-column: span 3; text-align: center; padding: 60px 20px;
    font-size: 12px; color: #aaa; background: #fff;
    border: 1.5px dashed #e0e0e0; border-radius: 16px;
  }

  /* TOAST */
  .ws-toast {
    position: fixed; top: 28px; right: 28px;
    background: #7c5cfc; color: #fff; padding: 12px 22px;
    border-radius: 14px; font-size: 13px; font-weight: 600;
    box-shadow: 0 16px 40px rgba(124,92,252,0.25); z-index: 100;
  }

  /* LIGHTBOX */
  .ws-lb {
    position: fixed; inset: 0; z-index: 200; background: rgba(5,5,8,0.94);
    display: flex; align-items: center; justify-content: center; padding: 40px;
  }
  .ws-lb-inner { position: relative; max-width: 600px; width: 100%; }
  .ws-lb-inner img { width: 100%; display: block; border-radius: 12px; }
  .ws-lb-close {
    position: absolute; top: -14px; right: -14px; width: 32px; height: 32px;
    border-radius: 50%; background: #7c5cfc; border: none; color: #fff;
    display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px;
  }
  .ws-lb-foot { margin-top: 14px; display: flex; justify-content: space-between; align-items: center; }
  .ws-lb-name { font-size: 18px; font-weight: 700; color: #fff; }
  .ws-lb-tag { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #7c5cfc; }
`;

const WORKSHOP_TABS = ["All", "Fabrication", "Detailing", "Tuning", "Repair", "Behind The Scene"];

export default function WorkshopLayout() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState({
    title: "Workshop",
    desc: "",
    statProjects: "300+",
    statMechanics: "15+",
    statYears: "10+",
    contactLink: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: worksData } = await supabase
        .from("works")
        .select("*")
        .eq("category", "workshop")
        .order("order_index");
      if (worksData) setWorks(worksData);

      const { data: contentData } = await supabase
        .from("content")
        .select("*")
        .eq("section", "workshop");
      if (contentData) {
        const g = (key, fallback = "") =>
          contentData.find((c) => c.key === key)?.value || fallback;
        setContent({
          title:         g("title",        "Workshop"),
          desc:          g("description",  ""),
          statProjects:  g("stat_projects", "300+"),
          statMechanics: g("stat_mechanics", "15+"),
          statYears:     g("stat_years",     "10+"),
          contactLink:   g("contact_link", ""),
        });
      }
    };
    fetchData();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const toggleSaved = (item) => {
    const exists = saved.find((s) => s.id === item.id);
    if (exists) {
      setSaved(saved.filter((s) => s.id !== item.id));
      showToast("Removed from selection");
    } else {
      setSaved([...saved, item]);
      showToast("🛠️ Added to selection");
    }
  };

  const filtered = works.filter((item) => {
    if (activeTab === "All") return true;
    return (item.subcategory || "").toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <>
      <style>{css}</style>

      <div className="ws-root">
        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="ws-toast"
              initial={{ opacity: 0, y: -16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAV */}
        <nav className="ws-nav">
          <button className="ws-back" onClick={() => navigate("/")}>← Back</button>
          <div className="ws-nav-logo">WD<span>Group</span></div>
          <div className="ws-nav-badge">Workshop Showcase</div>
        </nav>

        {/* HERO */}
        <div className="ws-hero">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ws-hero-tag">⚙️ Live Portfolio</div>
            <h1 className="ws-hero-h">
              {content.title.split(" ")[0]}<br />
              <em>{content.title.split(" ").slice(1).join(" ") || "Garage"}</em>
            </h1>
            <p className="ws-hero-desc">
              {content.desc || "Precision, craftsmanship, and power behind every project, detailing job, and custom build inside our workshop."}
            </p>
            <button
              className="ws-hero-cta"
              onClick={() => content.contactLink && window.open(content.contactLink, "_blank")}
            >
              Contact Us →
            </button>
            <div className="ws-hero-stats">
              <div>
                <div className="ws-stat-n">{content.statProjects}</div>
                <div className="ws-stat-l">Projects</div>
              </div>
              <div>
                <div className="ws-stat-n">{content.statMechanics}</div>
                <div className="ws-stat-l">Experts</div>
              </div>
              <div>
                <div className="ws-stat-n">{content.statYears}</div>
                <div className="ws-stat-l">Years</div>
              </div>
            </div>
          </motion.div>

          {/* Industrial Gear Visual */}
          <motion.div
            className="ws-hero-right"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ws-gear">
              <div className="ws-gear-center">WD</div>
            </div>
            <div className="ws-gear-indicator" />
          </motion.div>
        </div>

        {/* DEVICE FRAME */}
        <div className="ws-device-wrap">
          <div className="ws-device-label">Portfolio Gallery · Table: works · category = workshop</div>
          <motion.div
            className="ws-device"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ws-device-screen">

              {/* SIDEBAR */}
              <div className="ws-sidebar">
                <div className="ws-sidebar-icon on">🛠️</div>
                <div className="ws-sidebar-icon" onClick={() => setSaved([])}>🗑️</div>
                <div className="ws-sidebar-icon" style={{ marginTop: "auto" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: saved.length ? "#7c5cfc" : "#555" }}>
                    {saved.length}
                  </span>
                </div>
              </div>

              {/* MAIN */}
              <div className="ws-main">
                <div className="ws-main-top">
                  <div className="ws-main-title">Workshop Gallery</div>
                  <div className="ws-main-sub">{filtered.length} items</div>
                </div>

                <div className="ws-tabs">
                  {WORKSHOP_TABS.map((t) => (
                    <button
                      key={t}
                      className={`ws-tab${activeTab === t ? " on" : ""}`}
                      onClick={() => setActiveTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="ws-grid">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const isSaved = saved.some((s) => s.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className={`ws-card${isSaved ? " saved" : ""}`}
                          onClick={() => setSelected(item)}
                        >
                          <img src={item.image} alt={item.title} />
                          <div className="ws-card-ov">
                            <div className="ws-card-dot">🔧</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="ws-empty">
                      Tidak ada foto dengan subcategory "{activeTab}".<br />
                      Tambahkan di admin panel → Works → category: workshop
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* LIGHTBOX */}
        {selected && (
          <motion.div
            className="ws-lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="ws-lb-inner" onClick={(e) => e.stopPropagation()}>
              <button className="ws-lb-close" onClick={() => setSelected(null)}>✕</button>
              <img src={selected.image} alt={selected.title} />
              <div className="ws-lb-foot">
                <div className="ws-lb-name">{selected.title}</div>
                <div className="ws-lb-tag">{selected.subcategory || "Workshop"}{selected.meta ? ` · ${selected.meta}` : ""}</div>
              </div>
              <button
                style={{ marginTop: 12, padding: "8px 20px", background: "#7c5cfc", border: "none", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                onClick={(e) => { e.stopPropagation(); toggleSaved(selected); }}
              >
                {saved.some((s) => s.id === selected.id) ? "✓ Saved" : "+ Save"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}