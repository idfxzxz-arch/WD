import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { LanguageContext } from "../context/LanguageContext";
import SEO from "./SEO";
import "./DivisionLayout.css";

const getWeddingStaticWorks = () => [
  ...Array.from({length: 7}, (_, i) => ({
    id: `static_akad_${i}`,
    title: `Akad Nikah ${i+1}`,
    category: 'wedding',
    subcategory: 'akad',
    image: `/portfolio/akad/akad-${i+1}.jpg?v=2`,
    meta: 'Portfolio Akad Nikah',
    link: ''
  })),
  ...Array.from({length: 13}, (_, i) => ({
    id: `static_res_${i}`,
    title: `Resepsi ${i+1}`,
    category: 'wedding',
    subcategory: 'resepsi',
    image: `/portfolio/resepsi/resepsi-${i+1}.jpg?v=2`,
    meta: 'Portfolio Resepsi',
    link: ''
  })),
  ...Array.from({length: 3}, (_, i) => ({
    id: `static_price_${i}`,
    title: `Pricelist Paket Wedding - Halaman ${i+1}`,
    category: 'wedding',
    subcategory: 'pricelist',
    image: `/portfolio/pricelist/Pricelist_WD_Group_Page_${i+1}.webp`,
    meta: 'Pricelist Resmi WD Sky Wedding Organizer',
    link: `/portfolio/pricelist/Pricelist_WD_Group_Page_${i+1}.webp`
  }))
];

export default function DivisionLayout({ config }) {
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);

  // Localization overrides
  const divisionLang = lang?.divisions?.[config.category] || {};
  const ui = lang?.divisionUi || {
    back: "Back",
    viewPortfolio: "View Portfolio",
    bookingNow: "Booking Now",
    curatedItems: "curated items",
    slide: "Slide",
    previous: "Previous",
    next: "Next",
    emptyCategory: "No portfolio items found in this category.",
    saveToSelection: "Save to Selection",
    removeFromSelection: "Remove from Selection",
    savedToast: "Saved to selection",
    removedToast: "Removed from selection",
    viewFull: "View Full Image",
  };

  const brand = divisionLang.brand || config.brand;
  const badge = divisionLang.badge || config.badge;
  const kicker = divisionLang.kicker || config.kicker;
  const title = divisionLang.title || config.title;
  const titleAccent = divisionLang.titleAccent || config.titleAccent;
  const description = divisionLang.description || config.description;
  const primaryCta = divisionLang.primaryCta || config.primaryCta;
  const galleryTitle = divisionLang.galleryTitle || config.galleryTitle;
  const tabs = divisionLang.tabs || config.tabs;
  const stats = divisionLang.stats || config.stats;

  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [galleryPage, setGalleryPage] = useState(0);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Sync activeTab when language changes tabs
  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [lang?.code, tabs]);

  useEffect(() => {
    let mounted = true;

    const fetchWorks = async () => {
      try {
        const fetchPromise = supabase
          .from("works")
          .select("*")
          .eq("category", config.category)
          .order("order_index");

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 15000)
        );

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (error) throw error;

        if (mounted) {
          let finalData = data || [];
          
          if (config.category === "wedding") {
            const staticWorks = getWeddingStaticWorks();
            const existingTitles = new Set(finalData.map(d => d.title));
            const newWorks = staticWorks.filter(sw => !existingTitles.has(sw.title));
            finalData = [...finalData, ...newWorks];
          }

          setWorks(finalData);
          if (finalData?.[0]) setSaved([{ id: finalData[0].id }]);
          else setSaved([]);
        }
      } catch (err) {
        console.error(`Error loading ${config.category} works:`, err);
        if (mounted) {
          if (config.category === "wedding") {
            const staticWorks = getWeddingStaticWorks();
            setWorks(staticWorks);
            setSaved([{ id: staticWorks[0].id }]);
          } else {
            setWorks([]);
            setSaved([]);
          }
        }
      }
    };

    fetchWorks();
    return () => { mounted = false; };
  }, [config.category, brand]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const filtered = useMemo(() => {
    if (activeTab === tabs[0]) return works;
    const tabMatches = config.tabAliases?.[activeTab] || [activeTab];
    return works.filter((item) => {
      const subcategory = (item.subcategory || "").toLowerCase().trim();
      return tabMatches.some((tab) => subcategory === tab.toLowerCase().trim());
    });
  }, [works, activeTab, tabs, config.tabAliases]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(galleryPage, totalPages - 1);
  const pageStart = safePage * itemsPerPage;
  const visibleWorks = filtered.slice(pageStart, pageStart + itemsPerPage);

  useEffect(() => {
    setGalleryPage(0);
    setSelectedIndex(null);
  }, [activeTab]);

  useEffect(() => {
    if (galleryPage > totalPages - 1) {
      setGalleryPage(Math.max(0, totalPages - 1));
      setSelectedIndex(null);
    }
  }, [galleryPage, totalPages]);

  useEffect(() => {
    if (selectedIndex !== null && (selectedIndex < 0 || selectedIndex >= visibleWorks.length)) {
      setSelectedIndex(null);
    }
  }, [visibleWorks, selectedIndex]);

  const toggleSaved = (item) => {
    const exists = saved.some((savedItem) => savedItem.id === item.id);
    if (exists) {
      setSaved(saved.filter((savedItem) => savedItem.id !== item.id));
      showToast(ui.removedToast);
    } else {
      setSaved([...saved, { id: item.id }]);
      showToast(ui.savedToast);
    }
  };

  const selectedWork = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < visibleWorks.length ? visibleWorks[selectedIndex] : null;
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = () => {
    setSelectedIndex((current) => {
      if (current === null || visibleWorks.length === 0) return null;
      return (current - 1 + visibleWorks.length) % visibleWorks.length;
    });
  };
  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null || visibleWorks.length === 0) return null;
      return (current + 1) % visibleWorks.length;
    });
  };

  return (
    <>
      <SEO 
        title={config.seoTitle || `${title} ${titleAccent} – ${brand}`} 
        description={config.seoDescription || description} 
        keywords={config.keywords} 
        url={`https://www.wdgroupcompany.biz.id/${config.category}`}
      />
      <div
        className={`dp-root dp-${config.category}`}
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
            &larr; {ui.back}
          </button>
          <div className="dp-logo">
            {config.logoText} <span>{config.logoAccent}</span>
            {config.logoSuffix ? ` ${config.logoSuffix}` : ""}
          </div>
          <div className="dp-badge">{badge}</div>
        </nav>

        <main className="dp-hero">
          <motion.div
            className="dp-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dp-kicker">{kicker}</div>
            <h1 className="dp-title">
              {title} <em>{titleAccent}</em>
            </h1>
            <p className="dp-desc">{description}</p>

            <div className="dp-actions">
              <button
                className="dp-primary"
                onClick={() => {
                  if (config.primaryHref) {
                    window.open(config.primaryHref, "_blank", "noopener,noreferrer");
                    return;
                  }
                  showToast(config.primaryToast || ui.bookingNow);
                }}
              >
                {primaryCta}
              </button>
              <button
                className="dp-secondary"
                onClick={() => document.querySelector(".dp-showcase")?.scrollIntoView({ behavior: "smooth" })}
              >
                {ui.viewPortfolio}
              </button>
            </div>

            <div className="dp-stats">
              {stats.map((stat) => (
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
                  <h2 className="dp-main-title">{galleryTitle}</h2>
                  <span className="dp-main-meta">{filtered.length} {ui.curatedItems}</span>
                </div>

                <div className="dp-tabs">
                  {tabs.map((tab) => (
                    <button
                      className={`dp-tab ${activeTab === tab ? "active" : ""}`}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className={`dp-grid ${(activeTab || "").toLowerCase().trim() === "pricelist" ? "dp-grid-doc" : ""}`}>
                  {filtered.length > 0 ? (
                    visibleWorks.map((item, index) => {
                      const isSaved = saved.some((savedItem) => savedItem.id === item.id);
                      const isDoc = (item.subcategory || "").toLowerCase().trim() === "pricelist";
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={`dp-card ${isSaved ? "saved" : ""} ${isDoc ? "dp-card-doc" : ""}`}
                          onClick={() => openLightbox(index)}
                        >
                          <img src={item.image} alt={item.title || `${brand} portfolio`} loading="lazy" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="dp-empty">
                      {ui.emptyCategory}
                    </div>
                  )}
                </div>

                {filtered.length > itemsPerPage && (
                  <div className="dp-gallery-footer">
                    <div className="dp-gallery-page">
                      {ui.slide} {safePage + 1} / {totalPages} · {filtered.length} {ui.curatedItems}
                    </div>
                    <div className="dp-gallery-actions">
                      <button
                        type="button"
                        className="dp-page-btn"
                        disabled={safePage === 0}
                        onClick={() => {
                          setSelectedIndex(null);
                          setGalleryPage((page) => Math.max(0, page - 1));
                        }}
                      >
                        {ui.previous}
                      </button>
                      <button
                        type="button"
                        className="dp-page-btn"
                        disabled={safePage >= totalPages - 1}
                        onClick={() => {
                          setSelectedIndex(null);
                          setGalleryPage((page) => Math.min(totalPages - 1, page + 1));
                        }}
                      >
                        {ui.next}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {selectedWork && (
            <motion.div
              className="dp-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button className="dp-lightbox-close" onClick={closeLightbox} aria-label="Close image">
                &times;
              </button>
              {visibleWorks.length > 1 && (
                <>
                  <button className="dp-lightbox-nav prev" onClick={(event) => { event.stopPropagation(); showPrev(); }} aria-label="Previous image">
                    &lsaquo;
                  </button>
                  <button className="dp-lightbox-nav next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image">
                    &rsaquo;
                  </button>
                </>
              )}
              <motion.div
                className="dp-lightbox-panel"
                initial={{ scale: 0.96, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="dp-lightbox-media">
                  <img src={selectedWork.image} alt={selectedWork.title || `${brand} portfolio`} />
                </div>
                <div className="dp-lightbox-info">
                  <div className="dp-lightbox-kicker">
                    {selectedWork.subcategory || badge}
                  </div>
                  <h2 className="dp-lightbox-title">
                    {selectedWork.title || `${brand} Portfolio`}
                  </h2>
                  <p className="dp-lightbox-meta">
                    {selectedWork.meta || `A curated portfolio item from ${brand}.`}
                  </p>
                  <div className="dp-lightbox-actions">
                    <button className="dp-lightbox-btn" onClick={() => toggleSaved(selectedWork)}>
                      {saved.some((item) => item.id === selectedWork.id) ? ui.removeFromSelection : ui.saveToSelection}
                    </button>
                    <a
                      className="dp-lightbox-btn"
                      href={selectedWork.link || selectedWork.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: "center", textDecoration: "none" }}
                    >
                      {ui.viewFull || "Buka Gambar Penuh"}
                    </a>
                    <button className="dp-lightbox-btn" onClick={closeLightbox}>
                      {ui.back}
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
