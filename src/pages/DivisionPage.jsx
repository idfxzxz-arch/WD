import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

  .dp-root {
    --accent: #f7c948;
    --accent-soft: rgba(247, 201, 72, 0.14);
    --accent-border: rgba(247, 201, 72, 0.26);
    --bg: #08090d;
    --panel: #111216;
    --ink: #ffffff;
    --muted: #9a9aa3;
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(circle at 12% 10%, var(--accent-soft), transparent 34%),
      radial-gradient(circle at 88% 12%, rgba(255,255,255,0.06), transparent 28%),
      var(--bg);
    color: var(--ink);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .dp-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 20px 40px;
    background: color-mix(in srgb, var(--bg) 86%, transparent);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(16px);
  }
  .dp-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .05em;
    text-transform: uppercase;
    transition: .2s;
  }
  .dp-back:hover {
    color: #fff;
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .dp-logo {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .dp-logo span { color: var(--accent); }
  .dp-badge {
    border: 1px solid var(--accent-border);
    background: var(--accent-soft);
    color: var(--accent);
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .dp-hero {
    max-width: 1300px;
    margin: 0 auto;
    padding: 58px 40px 72px;
    display: grid;
    grid-template-columns: minmax(0, .92fr) minmax(520px, 1.08fr);
    gap: 44px;
    align-items: center;
  }
  .dp-copy { max-width: 660px; }
  .dp-kicker {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--accent-border);
    background: var(--accent-soft);
    color: var(--accent);
    border-radius: 999px;
    padding: 7px 14px;
    margin-bottom: 18px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  .dp-title {
    margin: 0 0 22px;
    font-size: clamp(44px, 5.7vw, 78px);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: .98;
  }
  .dp-title em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
  }
  .dp-desc {
    max-width: 590px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
    font-weight: 400;
  }
  .dp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .dp-primary,
  .dp-secondary {
    border-radius: 999px;
    padding: 13px 20px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: .2s;
    border: 1px solid transparent;
    font-family: inherit;
  }
  .dp-primary {
    background: var(--accent);
    color: var(--button-ink, #08090d);
    box-shadow: 0 18px 38px color-mix(in srgb, var(--accent) 24%, transparent);
  }
  .dp-primary:hover { transform: translateY(-2px); }
  .dp-secondary {
    background: rgba(255,255,255,.06);
    color: #fff;
    border-color: rgba(255,255,255,.12);
  }
  .dp-secondary:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .dp-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 12px;
    margin-top: 34px;
  }
  .dp-stat {
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px;
    padding: 16px;
  }
  .dp-stat strong {
    display: block;
    color: #fff;
    font-size: 21px;
    letter-spacing: -.03em;
  }
  .dp-stat span {
    display: block;
    margin-top: 4px;
    color: var(--muted);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .dp-showcase {
    height: 680px;
    padding: 14px;
    border-radius: 34px;
    background: linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.04));
    border: 1px solid rgba(255,255,255,.10);
    box-shadow: 0 40px 90px -30px rgba(0,0,0,.65);
  }
  .dp-screen {
    height: 100%;
    display: grid;
    grid-template-columns: 80px 1fr;
    overflow: hidden;
    border-radius: 22px;
    background: #f7f7f8;
    color: #111;
  }
  .dp-side {
    background: #111216;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 24px 0;
  }
  .dp-side-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--button-ink, #08090d);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .04em;
  }
  .dp-side-count {
    margin-top: auto;
    color: var(--accent);
    font-size: 12px;
    font-weight: 900;
  }
  .dp-main {
    min-height: 0;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
  .dp-main-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    margin-bottom: 18px;
  }
  .dp-main-title {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -.03em;
  }
  .dp-main-meta {
    color: #8a8a91;
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }
  .dp-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 18px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .dp-tabs::-webkit-scrollbar { display: none; }
  .dp-tab {
    flex: 0 0 auto;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid #e4e4e7;
    background: #fff;
    color: #63636b;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
  }
  .dp-tab.active {
    background: #111216;
    border-color: #111216;
    color: #fff;
  }
  .dp-grid {
    min-height: 0;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    overflow-y: auto;
    padding-bottom: 18px;
    scrollbar-width: none;
  }
  .dp-grid::-webkit-scrollbar { display: none; }
  .dp-card {
    aspect-ratio: 4/3;
    border-radius: 15px;
    overflow: hidden;
    border: 2px solid transparent;
    background: #e8e8ea;
    cursor: pointer;
    transition: .2s;
  }
  .dp-card:hover {
    transform: scale(.98);
    box-shadow: 0 12px 28px rgba(0,0,0,.14);
  }
  .dp-card.saved {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent);
  }
  .dp-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .dp-empty {
    grid-column: 1 / -1;
    border: 1px dashed #d8d8dd;
    background: #fff;
    border-radius: 18px;
    padding: 92px 24px;
    color: #8a8a91;
    text-align: center;
    font-size: 13px;
  }
  .dp-toast {
    position: fixed;
    top: 32px;
    right: 32px;
    z-index: 100;
    border-radius: 16px;
    padding: 14px 22px;
    background: var(--accent);
    color: var(--button-ink, #08090d);
    box-shadow: 0 18px 42px color-mix(in srgb, var(--accent) 26%, transparent);
    font-size: 13px;
    font-weight: 800;
  }

  @media (max-width: 900px) {
    .dp-nav { padding: 16px 18px; }
    .dp-logo { font-size: 14px; }
    .dp-badge { display: none; }
    .dp-hero { grid-template-columns: 1fr; padding: 36px 18px 44px; gap: 28px; }
    .dp-title { font-size: 44px; }
    .dp-stats { grid-template-columns: 1fr; }
    .dp-showcase { height: 560px; border-radius: 26px; padding: 8px; }
    .dp-screen { grid-template-columns: 1fr; border-radius: 20px; }
    .dp-side { display: none; }
    .dp-main { padding: 16px; }
    .dp-main-top { align-items: flex-start; }
    .dp-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

export default function DivisionPage({ config }) {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState(config.tabs[0]);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchWorks = async () => {
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .eq("category", config.category)
        .order("order_index");

      if (error) {
        console.error(`Error loading ${config.category} works:`, error.message);
        return;
      }

      if (mounted) {
        setWorks(data || []);
        if (data?.[0]) setSaved([{ id: data[0].id }]);
      }
    };

    fetchWorks();
    return () => { mounted = false; };
  }, [config.category]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const filtered = works.filter((item) => {
    if (activeTab === config.tabs[0]) return true;
    return (item.subcategory || "").toLowerCase().trim() === activeTab.toLowerCase().trim();
  });

  const toggleSaved = (item) => {
    const exists = saved.some((savedItem) => savedItem.id === item.id);
    if (exists) {
      setSaved(saved.filter((savedItem) => savedItem.id !== item.id));
      showToast("Removed from selection");
    } else {
      setSaved([...saved, { id: item.id }]);
      showToast(config.savedMessage);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div
        className="dp-root"
        style={{
          "--accent": config.accent,
          "--accent-soft": config.accentSoft,
          "--accent-border": config.accentBorder,
          "--bg": config.bg,
          "--muted": config.muted,
          "--button-ink": config.buttonInk || "#08090d",
        }}
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              className="dp-toast"
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="dp-nav">
          <button className="dp-back" onClick={() => navigate("/")}>
            &larr; Back
          </button>
          <div className="dp-logo" dangerouslySetInnerHTML={{ __html: config.logoHtml }} />
          <div className="dp-badge">{config.badge}</div>
        </nav>

        <main className="dp-hero">
          <motion.div
            className="dp-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dp-kicker">{config.kicker}</div>
            <h1 className="dp-title">
              {config.title} <em>{config.titleAccent}</em>
            </h1>
            <p className="dp-desc">{config.description}</p>

            <div className="dp-actions">
              <button className="dp-primary" onClick={() => showToast(config.primaryToast)}>
                {config.primaryCta}
              </button>
              <button
                className="dp-secondary"
                onClick={() => document.querySelector(".dp-showcase")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Portfolio
              </button>
            </div>

            <div className="dp-stats">
              {config.stats.map((stat) => (
                <div className="dp-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="dp-showcase"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dp-screen">
              <aside className="dp-side">
                <div className="dp-side-mark">{config.mark}</div>
                <div className="dp-side-count">{saved.length}</div>
              </aside>

              <section className="dp-main">
                <div className="dp-main-top">
                  <h2 className="dp-main-title">{config.galleryTitle}</h2>
                  <span className="dp-main-meta">{filtered.length} curated items</span>
                </div>

                <div className="dp-tabs">
                  {config.tabs.map((tab) => (
                    <button
                      className={`dp-tab ${activeTab === tab ? "active" : ""}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="dp-grid">
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      const isSaved = saved.some((savedItem) => savedItem.id === item.id);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={`dp-card ${isSaved ? "saved" : ""}`}
                          onClick={() => toggleSaved(item)}
                        >
                          <img src={item.image} alt={item.title || `${config.brand} portfolio`} loading="lazy" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="dp-empty">
                      Belum ada portfolio untuk kategori "{activeTab}".
                    </div>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
