import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .wo-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #fbf7f1;
    color: #211916;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }
  .wo-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 12% 8%, rgba(204, 160, 106, 0.20), transparent 34%),
      radial-gradient(circle at 90% 18%, rgba(246, 220, 208, 0.55), transparent 32%),
      linear-gradient(180deg, rgba(255,255,255,0.64), rgba(251,247,241,0));
  }
  .wo-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 20px 40px;
    border-bottom: 1px solid rgba(76,49,37,0.08);
    position: sticky;
    top: 0;
    background: rgba(251,247,241,0.84);
    backdrop-filter: blur(16px);
    z-index: 50;
  }
  .wo-back {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .05em;
    text-transform: uppercase;
    color: #8a7366;
    cursor: pointer;
    padding: 8px 18px;
    border: 1px solid rgba(76,49,37,0.12);
    border-radius: 100px;
    background: rgba(255,255,255,0.56);
    transition: .2s;
  }
  .wo-back:hover {
    color: #211916;
    border-color: #c89f67;
    background: #fff;
  }
  .wo-nav-logo {
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .wo-nav-logo span { color: #b88446; }
  .wo-nav-badge {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #8a5e2d;
    background: rgba(200,159,103,0.14);
    border: 1px solid rgba(200,159,103,0.22);
    padding: 8px 14px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .wo-hero {
    max-width: 1300px;
    margin: 0 auto;
    padding: 56px 40px 72px;
    display: grid;
    grid-template-columns: minmax(0, .9fr) minmax(520px, 1.1fr);
    gap: 42px;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .wo-copy { max-width: 640px; }
  .wo-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.68);
    border: 1px solid rgba(200,159,103,0.26);
    padding: 7px 14px;
    color: #9f6b31;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
    border-radius: 100px;
  }
  .wo-title {
    font-size: clamp(46px, 6vw, 82px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 0.98;
    margin: 0 0 22px;
  }
  .wo-title em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: #b88446;
  }
  .wo-desc {
    color: #67564d;
    font-size: 16px;
    line-height: 1.75;
    font-weight: 400;
    max-width: 560px;
  }
  .wo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .wo-primary,
  .wo-secondary {
    border-radius: 999px;
    padding: 13px 20px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .02em;
    cursor: pointer;
    transition: .2s;
    border: 1px solid transparent;
  }
  .wo-primary {
    background: #211916;
    color: #fff;
    box-shadow: 0 18px 38px rgba(33,25,22,.18);
  }
  .wo-primary:hover {
    transform: translateY(-2px);
    background: #3a2b25;
  }
  .wo-secondary {
    background: rgba(255,255,255,.6);
    color: #211916;
    border-color: rgba(76,49,37,.14);
  }
  .wo-secondary:hover {
    background: #fff;
    border-color: #c89f67;
  }
  .wo-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 12px;
    margin-top: 34px;
    max-width: 560px;
  }
  .wo-stat {
    background: rgba(255,255,255,.62);
    border: 1px solid rgba(76,49,37,.09);
    border-radius: 18px;
    padding: 16px;
  }
  .wo-stat strong {
    display: block;
    font-size: 22px;
    letter-spacing: -.03em;
    color: #211916;
  }
  .wo-stat span {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #8a7366;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .08em;
  }
  .wo-gallery-frame {
    width: 100%;
    height: 680px;
    background: linear-gradient(135deg, #fff, #efe4d6);
    border-radius: 36px;
    padding: 14px;
    border: 1px solid rgba(76,49,37,0.12);
    box-shadow: 0 40px 90px -30px rgba(89,62,45,0.35);
  }
  .wo-gallery-screen {
    background: #fffdf9;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    color: #1c1c1e;
    display: grid;
    grid-template-columns: 80px 1fr;
    overflow: hidden;
    position: relative;
  }
  .wo-sidebar {
    background: #2a201c;
    border-right: 1px solid rgba(76,49,37,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
    gap: 28px;
  }
  .wo-side-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    color: rgba(255,255,255,.58);
    cursor: pointer;
    transition: 0.2s;
  }
  .wo-side-icon.active {
    background: #c89f67;
    color: #211916;
  }
  .wo-main {
    padding: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  .wo-main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    margin-bottom: 20px;
  }
  .wo-main-title {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #211916;
  }
  .wo-main-meta {
    font-size: 12px;
    color: #9b897f;
    font-weight: 700;
    text-align: right;
  }
  .wo-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .wo-tabs::-webkit-scrollbar { display: none; }
  .wo-tab {
    padding: 8px 18px;
    font-size: 12px;
    font-weight: 800;
    border-radius: 12px;
    background: #fff;
    color: #7a665b;
    border: 1px solid #efe4d6;
    cursor: pointer;
    transition: 0.15s;
    white-space: nowrap;
  }
  .wo-tab.active {
    background: #211916;
    color: #fff;
    border-color: #211916;
  }
  .wo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 20px;
    scrollbar-width: none;
  }
  .wo-grid::-webkit-scrollbar { display: none; }
  .wo-card {
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    aspect-ratio: 16/10;
    display: flex;
  }
  .wo-card:first-child {
    grid-column: 1 / -1;
    aspect-ratio: 16/7;
  }
  .wo-card:hover {
    transform: scale(0.98);
    box-shadow: 0 8px 20px rgba(89,62,45,0.12);
  }
  .wo-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #eee;
  }
  .wo-card::after {
    content: "View";
    position: absolute;
    inset: auto 12px 12px auto;
    z-index: 2;
    border-radius: 999px;
    padding: 7px 12px;
    background: rgba(255,255,255,.88);
    color: #211916;
    font-size: 11px;
    font-weight: 800;
    opacity: 0;
    transform: translateY(6px);
    transition: .2s;
  }
  .wo-card:hover::after {
    opacity: 1;
    transform: translateY(0);
  }
  .wo-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 96px 24px;
    color: #9b897f;
    background: #fff;
    border: 1px dashed #e4d6c8;
    border-radius: 18px;
    font-size: 13px;
  }
  .wo-toast {
    position: fixed;
    top: 32px;
    right: 32px;
    background: #211916;
    color: #fff;
    padding: 14px 24px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 20px 40px rgba(33,25,22,0.2);
    z-index: 100;
  }
  .wo-lightbox {
    position: fixed;
    inset: 0;
    z-index: 120;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    background: rgba(20, 14, 12, .78);
    backdrop-filter: blur(18px);
  }
  .wo-lightbox-panel {
    width: min(1120px, 100%);
    max-height: min(820px, calc(100vh - 56px));
    display: grid;
    grid-template-columns: minmax(0, 1fr) 280px;
    overflow: hidden;
    border-radius: 30px;
    background: #fffdf9;
    border: 1px solid rgba(255,255,255,.35);
    box-shadow: 0 42px 120px rgba(0,0,0,.35);
  }
  .wo-lightbox-media {
    min-height: 620px;
    background: #17110f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wo-lightbox-media img {
    width: 100%;
    height: 100%;
    max-height: min(820px, calc(100vh - 56px));
    object-fit: contain;
    display: block;
  }
  .wo-lightbox-info {
    padding: 26px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #211916;
  }
  .wo-lightbox-kicker {
    width: fit-content;
    border-radius: 999px;
    padding: 7px 12px;
    background: rgba(200,159,103,.14);
    color: #8a5e2d;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .wo-lightbox-title {
    margin: 0;
    font-size: 26px;
    line-height: 1.08;
    letter-spacing: -.04em;
  }
  .wo-lightbox-meta {
    color: #8a7366;
    font-size: 13px;
    line-height: 1.6;
  }
  .wo-lightbox-actions {
    display: grid;
    gap: 10px;
    margin-top: auto;
  }
  .wo-lightbox-btn {
    border: 1px solid rgba(76,49,37,.12);
    background: #fff;
    color: #211916;
    border-radius: 14px;
    padding: 12px 14px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: .2s;
  }
  .wo-lightbox-btn:hover {
    border-color: #c89f67;
    background: #fbf7f1;
  }
  .wo-lightbox-close,
  .wo-lightbox-nav {
    position: absolute;
    border: 1px solid rgba(255,255,255,.22);
    background: rgba(255,255,255,.90);
    color: #211916;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(0,0,0,.18);
  }
  .wo-lightbox-close {
    top: 22px;
    right: 22px;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    font-size: 20px;
  }
  .wo-lightbox-nav {
    top: 50%;
    width: 46px;
    height: 46px;
    border-radius: 999px;
    font-size: 24px;
    transform: translateY(-50%);
  }
  .wo-lightbox-nav.prev { left: 22px; }
  .wo-lightbox-nav.next { right: 22px; }

  @media (max-width: 900px) {
    .wo-nav { padding: 16px 18px; gap: 12px; }
    .wo-nav-logo { font-size: 14px; }
    .wo-nav-badge { display: none; }
    .wo-hero { grid-template-columns: 1fr; padding: 36px 18px 42px; gap: 28px; }
    .wo-title { font-size: 44px; }
    .wo-stats { grid-template-columns: 1fr; }
    .wo-gallery-frame { height: 560px; border-radius: 26px; padding: 8px; }
    .wo-gallery-screen { grid-template-columns: 1fr; border-radius: 20px; }
    .wo-sidebar { display: none; }
    .wo-main { padding: 16px; }
    .wo-main-header { align-items: flex-start; }
    .wo-grid { grid-template-columns: 1fr; gap: 14px; }
    .wo-card,
    .wo-card:first-child {
      grid-column: auto;
      aspect-ratio: 16/10;
    }
    .wo-lightbox { padding: 14px; }
    .wo-lightbox-panel {
      grid-template-columns: 1fr;
      max-height: calc(100vh - 28px);
      border-radius: 22px;
    }
    .wo-lightbox-media {
      min-height: 0;
      height: 62vh;
    }
    .wo-lightbox-media img {
      max-height: 62vh;
    }
    .wo-lightbox-info {
      padding: 18px;
    }
    .wo-lightbox-close {
      top: 10px;
      right: 10px;
    }
    .wo-lightbox-nav.prev { left: 10px; }
    .wo-lightbox-nav.next { right: 10px; }
  }
`;

const MOMENT_TABS = ["All Moments", "Akad", "Resepsi", "Outdoor"];

export default function Wedding() {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Moments");
  const [shortlist, setShortlist] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
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

  const filteredWorks = works.filter((item) => {
    if (activeTab === "All Moments") return true;
    const sub = item.subcategory?.toLowerCase() || "";
    return sub === activeTab.toLowerCase();
  });

  const toggleShortlist = (item) => {
    const isExist = shortlist.find((s) => s.id === item.id);
    if (isExist) {
      setShortlist(shortlist.filter((s) => s.id !== item.id));
      triggerToast("Moment removed from selection");
    } else {
      setShortlist([...shortlist, { id: item.id, title: item.title, image: item.image }]);
      triggerToast("Moment saved for inspiration");
    }
  };

  const selectedWork = selectedIndex !== null ? filteredWorks[selectedIndex] : null;
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = () => {
    setSelectedIndex((current) => {
      if (current === null || filteredWorks.length === 0) return null;
      return (current - 1 + filteredWorks.length) % filteredWorks.length;
    });
  };
  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null || filteredWorks.length === 0) return null;
      return (current + 1) % filteredWorks.length;
    });
  };

  return (
    <>
      <style>{css}</style>

      <div className="wo-root">
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              className="wo-toast"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
            >
              {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="wo-nav">
          <button className="wo-back" onClick={() => navigate("/")}>
            &larr; Back to Home
          </button>
          <div className="wo-nav-logo">WD <span>Sky</span> Wedding</div>
          <div className="wo-nav-badge">Wedding Organizer</div>
        </nav>

        <main className="wo-hero">
          <motion.div
            className="wo-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wo-tag">WD Sky Wedding Organizer</div>
            <h1 className="wo-title">
              Elegant wedding, <em>beautifully directed.</em>
            </h1>
            <p className="wo-desc">
              Kami membantu pasangan merancang hari pernikahan yang tenang, rapi,
              dan berkesan. Dari alur acara, koordinasi vendor, hingga detail
              visual, WD Sky Wedding Organizer memastikan setiap momen berjalan
              terarah tanpa menghilangkan rasa personal dari cerita cinta Anda.
            </p>

            <div className="wo-actions">
              <button className="wo-primary" onClick={() => triggerToast("Consultation request noted")}>
                Plan Your Wedding
              </button>
              <button className="wo-secondary" onClick={() => document.querySelector(".wo-gallery-frame")?.scrollIntoView({ behavior: "smooth" })}>
                View Moments
              </button>
            </div>

            <div className="wo-stats">
              <div className="wo-stat">
                <strong>End-to-end</strong>
                <span>Planning</span>
              </div>
              <div className="wo-stat">
                <strong>Vendor</strong>
                <span>Coordination</span>
              </div>
              <div className="wo-stat">
                <strong>Detail</strong>
                <span>Execution</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="wo-gallery-frame"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wo-gallery-screen">
              <div className="wo-sidebar">
                <div className="wo-side-icon active">SKY</div>
                <div className="wo-side-icon" onClick={() => setShortlist([])}>CLR</div>
              </div>

              <div className="wo-main">
                <div className="wo-main-header">
                  <h2 className="wo-main-title">Wedding Moments</h2>
                  <span className="wo-main-meta">
                    {filteredWorks.length} curated photos
                  </span>
                </div>

                <div className="wo-tabs">
                  {MOMENT_TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`wo-tab ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="wo-grid">
                  {filteredWorks.length > 0 ? (
                    filteredWorks.map((item, index) => {
                      const isSaved = shortlist.some((s) => s.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className="wo-card"
                          style={{
                            borderColor: isSaved ? "#c89f67" : "transparent",
                            boxShadow: isSaved ? "0 0 0 2px #c89f67" : ""
                          }}
                          onClick={() => openLightbox(index)}
                        >
                          <img
                            src={item.image}
                            className="wo-card-img"
                            alt={item.title || "WD Sky Wedding moment"}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="wo-empty">
                      Belum ada foto untuk kategori "{activeTab}".
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              className="wo-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button className="wo-lightbox-close" onClick={closeLightbox} aria-label="Close image">
                ×
              </button>
              {filteredWorks.length > 1 && (
                <>
                  <button className="wo-lightbox-nav prev" onClick={(event) => { event.stopPropagation(); showPrev(); }} aria-label="Previous image">
                    ‹
                  </button>
                  <button className="wo-lightbox-nav next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image">
                    ›
                  </button>
                </>
              )}
              <motion.div
                className="wo-lightbox-panel"
                initial={{ scale: 0.96, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="wo-lightbox-media">
                  <img src={selectedWork.image} alt={selectedWork.title || "WD Sky Wedding moment"} />
                </div>
                <div className="wo-lightbox-info">
                  <div className="wo-lightbox-kicker">
                    {selectedWork.subcategory || "Wedding Moment"}
                  </div>
                  <h2 className="wo-lightbox-title">
                    {selectedWork.title || "WD Sky Wedding Moment"}
                  </h2>
                  <p className="wo-lightbox-meta">
                    {selectedWork.meta || "A curated wedding moment from WD Sky Wedding Organizer portfolio."}
                  </p>
                  <div className="wo-lightbox-actions">
                    <button className="wo-lightbox-btn" onClick={() => toggleShortlist(selectedWork)}>
                      {shortlist.some((s) => s.id === selectedWork.id) ? "Remove from inspiration" : "Save as inspiration"}
                    </button>
                    <button className="wo-lightbox-btn" onClick={closeLightbox}>
                      Back to gallery
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
