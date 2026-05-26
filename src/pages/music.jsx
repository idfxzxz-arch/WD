import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .mu-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #08090d;
    color: #ffffff;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV */
  .mu-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 0; background: rgba(8,9,13,0.85);
    backdrop-filter: blur(16px); z-index: 50;
  }
  .mu-back {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
    color: #999; cursor: pointer; padding: 8px 18px;
    border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; background: none;
    transition: .2s;
  }
  .mu-back:hover { color: #fff; border-color: #7c5cfc; background: rgba(124,92,252,0.06); }
  .mu-nav-logo { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; text-transform: uppercase; }
  .mu-nav-logo span { color: #7c5cfc; }
  .mu-nav-badge {
    font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: #7c5cfc; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2);
    padding: 6px 16px; border-radius: 100px;
  }

  /* HERO */
  .mu-hero {
    padding: 56px 40px 40px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
    max-width: 1200px; margin: 0 auto;
  }
  .mu-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2);
    padding: 6px 14px; color: #7c5cfc; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; border-radius: 100px;
  }
  .mu-hero-h {
    font-size: 56px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05;
    text-transform: uppercase; margin-bottom: 20px;
  }
  .mu-hero-h em {
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400;
    text-transform: lowercase; color: #a78bfa;
  }
  .mu-hero-desc { color: #8e8e93; font-size: 14px; line-height: 1.7; font-weight: 300; margin-bottom: 28px; }
  .mu-hero-cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: #7c5cfc; color: #fff; border: none; border-radius: 100px;
    padding: 13px 28px; font-size: 12px; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; cursor: pointer; transition: .2s; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .mu-hero-cta:hover { background: #6d4ef0; transform: translateY(-1px); }
  .mu-hero-stats { display: flex; gap: 32px; margin-top: 36px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.06); }
  .mu-stat-n { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1; }
  .mu-stat-l { font-size: 11px; color: #666; margin-top: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; }

  /* HERO RIGHT - vinyl record visual */
  .mu-hero-right { display: flex; align-items: center; justify-content: center; position: relative; }
  .mu-vinyl {
    width: 280px; height: 280px; border-radius: 50%;
    background: conic-gradient(from 0deg, #1a1a2e, #16213e, #0f3460, #7c5cfc, #a78bfa, #7c5cfc, #0f3460, #16213e, #1a1a2e);
    box-shadow: 0 0 60px rgba(124,92,252,0.35), 0 0 120px rgba(124,92,252,0.15);
    animation: spin 8s linear infinite; display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .mu-vinyl-center {
    width: 80px; height: 80px; border-radius: 50%;
    background: #08090d; border: 3px solid #7c5cfc;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #7c5cfc;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .mu-vinyl-arm {
    position: absolute; right: -10px; top: 20px; width: 90px; height: 4px;
    background: linear-gradient(to right, #7c5cfc, #a78bfa);
    border-radius: 2px; transform: rotate(25deg); transform-origin: right center;
  }

  /* DEVICE FRAME */
  .mu-device-wrap { padding: 40px; max-width: 1200px; margin: 0 auto; }
  .mu-device-label { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #555; margin-bottom: 20px; }
  .mu-device {
    background: #111117; border-radius: 28px; padding: 16px;
    border: 2px solid #1e1e2a;
    box-shadow: 0 32px 80px -20px rgba(124,92,252,0.2);
  }
  .mu-device-screen {
    background: #f5f5f7; border-radius: 18px; overflow: hidden;
    display: grid; grid-template-columns: 72px 1fr; min-height: 600px; color: #111;
  }

  /* SIDEBAR */
  .mu-sidebar {
    background: #111117; display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 20px; border-right: 1px solid rgba(255,255,255,0.04);
  }
  .mu-sidebar-icon {
    width: 42px; height: 42px; border-radius: 12px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; cursor: pointer; transition: .2s;
    color: #555;
  }
  .mu-sidebar-icon.on { background: #7c5cfc; color: #fff; }

  /* MAIN */
  .mu-main { padding: 22px; display: flex; flex-direction: column; height: 100%; }
  .mu-main-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .mu-main-title { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
  .mu-main-sub { font-size: 11px; color: #999; font-weight: 500; }

  /* TABS */
  .mu-tabs { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .mu-tab {
    padding: 7px 16px; font-size: 11px; font-weight: 700; border-radius: 10px;
    background: #fff; color: #777; border: 1px solid #e5e5e7; cursor: pointer; transition: .15s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .mu-tab.on { background: #111; color: #fff; border-color: #111; }

  /* GRID */
  .mu-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    overflow-y: auto; flex: 1; padding-bottom: 16px; scrollbar-width: none;
  }
  .mu-grid::-webkit-scrollbar { display: none; }
  .mu-card {
    border-radius: 12px; overflow: hidden; cursor: pointer;
    aspect-ratio: 4/3; position: relative;
    border: 2px solid transparent; transition: all .2s;
    background: #e0e0e0;
  }
  .mu-card:hover { transform: scale(0.97); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
  .mu-card.saved { border-color: #7c5cfc; box-shadow: 0 0 0 2px #7c5cfc; }
  .mu-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mu-card-ov {
    position: absolute; inset: 0; background: rgba(124,92,252,0); transition: .25s;
    display: flex; align-items: center; justify-content: center;
  }
  .mu-card:hover .mu-card-ov { background: rgba(124,92,252,0.15); }
  .mu-card-dot {
    width: 28px; height: 28px; border-radius: 50%; background: #7c5cfc;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: #fff; opacity: 0; transition: .2s;
  }
  .mu-card:hover .mu-card-dot { opacity: 1; }

  /* EMPTY STATE */
  .mu-empty {
    grid-column: span 3; text-align: center; padding: 60px 20px;
    font-size: 12px; color: #aaa; background: #fff;
    border: 1.5px dashed #e0e0e0; border-radius: 16px;
  }

  /* TOAST */
  .mu-toast {
    position: fixed; top: 28px; right: 28px;
    background: #7c5cfc; color: #fff; padding: 12px 22px;
    border-radius: 14px; font-size: 13px; font-weight: 600;
    box-shadow: 0 16px 40px rgba(124,92,252,0.25); z-index: 100;
  }

  /* LIGHTBOX */
  .mu-lb {
    position: fixed; inset: 0; z-index: 200; background: rgba(5,5,8,0.94);
    display: flex; align-items: center; justify-content: center; padding: 40px;
  }
  .mu-lb-inner { position: relative; max-width: 600px; width: 100%; }
  .mu-lb-inner img { width: 100%; display: block; border-radius: 12px; }
  .mu-lb-close {
    position: absolute; top: -14px; right: -14px; width: 32px; height: 32px;
    border-radius: 50%; background: #7c5cfc; border: none; color: #fff;
    display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px;
  }
  .mu-lb-foot { margin-top: 14px; display: flex; justify-content: space-between; align-items: center; }
  .mu-lb-name { font-size: 18px; font-weight: 700; color: #fff; }
  .mu-lb-tag { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #7c5cfc; }
`;

const MUSIC_TABS = ["All", "Performance", "Recording", "Concert", "Behind The Scene"];

export default function MusicLayout() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState({
    title: "Music",
    desc: "",
    statShows: "150+",
    statArtists: "40+",
    statYears: "7",
    contactLink: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: worksData } = await supabase
        .from("works")
        .select("*")
        .eq("category", "music")
        .order("order_index");
      if (worksData) setWorks(worksData);

      const { data: contentData } = await supabase
        .from("content")
        .select("*")
        .eq("section", "music");
      if (contentData) {
        const g = (key, fallback = "") =>
          contentData.find((c) => c.key === key)?.value || fallback;
        setContent({
          title:       g("title",        "Music"),
          desc:        g("description",  ""),
          statShows:   g("stat_shows",   "150+"),
          statArtists: g("stat_artists", "40+"),
          statYears:   g("stat_years",   "7"),
          contactLink: g("contact_link", ""),
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
      showToast("🎵 Added to selection");
    }
  };

  const filtered = works.filter((item) => {
    if (activeTab === "All") return true;
    return (item.subcategory || "").toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <>
      <style>{css}</style>

      <div className="mu-root">
        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="mu-toast"
              initial={{ opacity: 0, y: -16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.92 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAV */}
        <nav className="mu-nav">
          <button className="mu-back" onClick={() => navigate("/")}>← Back</button>
          <div className="mu-nav-logo">WD<span>Group</span></div>
          <div className="mu-nav-badge">Music Showcase</div>
        </nav>

        {/* HERO */}
        <div className="mu-hero">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mu-hero-tag">🎵 Live Portfolio</div>
            <h1 className="mu-hero-h">
              {content.title.split(" ")[0]}<br />
              <em>{content.title.split(" ").slice(1).join(" ") || "Production"}</em>
            </h1>
            <p className="mu-hero-desc">
              {content.desc || "Capturing the energy, emotion, and artistry behind every live performance, recording session, and concert stage."}
            </p>
            <button
              className="mu-hero-cta"
              onClick={() => content.contactLink && window.open(content.contactLink, "_blank")}
            >
              Contact Us →
            </button>
            <div className="mu-hero-stats">
              <div>
                <div className="mu-stat-n">{content.statShows}</div>
                <div className="mu-stat-l">Shows</div>
              </div>
              <div>
                <div className="mu-stat-n">{content.statArtists}</div>
                <div className="mu-stat-l">Artists</div>
              </div>
              <div>
                <div className="mu-stat-n">{content.statYears}</div>
                <div className="mu-stat-l">Years</div>
              </div>
            </div>
          </motion.div>

          {/* Vinyl Record */}
          <motion.div
            className="mu-hero-right"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mu-vinyl">
              <div className="mu-vinyl-center">WD</div>
            </div>
            <div className="mu-vinyl-arm" />
          </motion.div>
        </div>

        {/* DEVICE FRAME */}
        <div className="mu-device-wrap">
          <div className="mu-device-label">Portfolio Gallery · Table: works · category = music</div>
          <motion.div
            className="mu-device"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mu-device-screen">

              {/* SIDEBAR */}
              <div className="mu-sidebar">
                <div className="mu-sidebar-icon on">🎵</div>
                <div className="mu-sidebar-icon" onClick={() => setSaved([])}>🗑️</div>
                <div className="mu-sidebar-icon" style={{ marginTop: "auto" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: saved.length ? "#7c5cfc" : "#555" }}>
                    {saved.length}
                  </span>
                </div>
              </div>

              {/* MAIN */}
              <div className="mu-main">
                <div className="mu-main-top">
                  <div className="mu-main-title">Music Gallery</div>
                  <div className="mu-main-sub">{filtered.length} items</div>
                </div>

                <div className="mu-tabs">
                  {MUSIC_TABS.map((t) => (
                    <button
                      key={t}
                      className={`mu-tab${activeTab === t ? " on" : ""}`}
                      onClick={() => setActiveTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mu-grid">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const isSaved = saved.some((s) => s.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className={`mu-card${isSaved ? " saved" : ""}`}
                          onClick={() => setSelected(item)}
                        >
                          <img src={item.image} alt={item.title} />
                          <div className="mu-card-ov">
                            <div className="mu-card-dot">♪</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="mu-empty">
                      Tidak ada foto dengan subcategory "{activeTab}".<br />
                      Tambahkan di admin panel → Works → category: music
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
            className="mu-lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="mu-lb-inner" onClick={(e) => e.stopPropagation()}>
              <button className="mu-lb-close" onClick={() => setSelected(null)}>✕</button>
              <img src={selected.image} alt={selected.title} />
              <div className="mu-lb-foot">
                <div className="mu-lb-name">{selected.title}</div>
                <div className="mu-lb-tag">{selected.subcategory || "Music"}{selected.meta ? ` · ${selected.meta}` : ""}</div>
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