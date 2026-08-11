import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SEO from "./SEO";
import "./DivisionLayout.css";


export default function DivisionLayout({ config }) {
  const itemsPerPage = 9;
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState(config.tabs[0]);
  const [galleryPage, setGalleryPage] = useState(0);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const getFallbackWorks = (category) => {
    const defaultImage = {
      wedding: "/resources/Wedding/wedding.webp",
      production: "/resources/Production/Production.webp",
      event: "/resources/Event_Organizer/Event.webp",
      workshop: "/resources/Workshop/Workshop.webp",
      music: "/resources/Music_ENT/Music_ENT.webp",
    }[category] || "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80";

    return Array.from({ length: 6 }).map((_, i) => ({
      id: `fallback-${category}-${i}`,
      category: category,
      title: `Sample ${config.brand} Project ${i + 1}`,
      subcategory: config.tabs[ (i % (config.tabs.length - 1)) + 1 ] || config.tabs[0],
      image: defaultImage,
      meta: "This is a sample portfolio item.",
    }));
  };

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
          const finalData = data && data.length > 0 ? data : getFallbackWorks(config.category);
          setWorks(finalData);
          if (finalData?.[0]) setSaved([{ id: finalData[0].id }]);
        }
      } catch (err) {
        console.error(`Error loading ${config.category} works:`, err);
        if (mounted) {
          const finalData = getFallbackWorks(config.category);
          setWorks(finalData);
          if (finalData?.[0]) setSaved([{ id: finalData[0].id }]);
        }
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
    const subcategory = (item.subcategory || "").toLowerCase().trim();
    const tabMatches = config.tabAliases?.[activeTab] || [activeTab];
    return tabMatches.some((tab) => subcategory === tab.toLowerCase().trim());
  });
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
    // Reset selectedIndex jika visibleWorks berubah (pagination/filter)
    if (selectedIndex !== null && (selectedIndex < 0 || selectedIndex >= visibleWorks.length)) {
      setSelectedIndex(null);
    }
  }, [visibleWorks, selectedIndex]);

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
      <SEO title={config.title} description={config.description} />
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
            &larr; Back
          </button>
          <div className="dp-logo">
            {config.logoText} <span>{config.logoAccent}</span>
            {config.logoSuffix ? ` ${config.logoSuffix}` : ""}
          </div>
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
              <button
                className="dp-primary"
                onClick={() => {
                  if (config.primaryHref) {
                    window.open(config.primaryHref, "_blank", "noopener,noreferrer");
                    return;
                  }
                  showToast(config.primaryToast);
                }}
              >
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
                    visibleWorks.map((item, index) => {
                      const isSaved = saved.some((savedItem) => savedItem.id === item.id);
                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={`dp-card ${isSaved ? "saved" : ""}`}
                          onClick={() => openLightbox(index)}
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

                {filtered.length > itemsPerPage && (
                  <div className="dp-gallery-footer">
                    <div className="dp-gallery-page">
                      Slide {safePage + 1} / {totalPages} · {filtered.length} items
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
                        Previous
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
                        Next
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
                  <img src={selectedWork.image} alt={selectedWork.title || `${config.brand} portfolio`} />
                </div>
                <div className="dp-lightbox-info">
                  <div className="dp-lightbox-kicker">
                    {selectedWork.subcategory || config.badge}
                  </div>
                  <h2 className="dp-lightbox-title">
                    {selectedWork.title || `${config.brand} Portfolio`}
                  </h2>
                  <p className="dp-lightbox-meta">
                    {selectedWork.meta || `A curated portfolio item from ${config.brand}.`}
                  </p>
                  <div className="dp-lightbox-actions">
                    <button className="dp-lightbox-btn" onClick={() => toggleSaved(selectedWork)}>
                      {saved.some((item) => item.id === selectedWork.id) ? "Remove from selection" : "Save to selection"}
                    </button>
                    <button className="dp-lightbox-btn" onClick={closeLightbox}>
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
