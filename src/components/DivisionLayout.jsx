import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { LanguageContext } from "../context/LanguageContext";
import { FileText, ArrowUpRight, Building2 } from "lucide-react";
import SEO from "./SEO";
import "./DivisionLayout.css";

const MotionDiv = motion.div;

const getWeddingStaticWorks = () => [
  {
    id: 'static_akad_0',
    title: 'Dekorasi Meja Ijab Qobul Akad Nikah Solo',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-1.jpg?v=2',
    meta: 'Meja akad nikah khidmat dengan rangkaian melati segar adat Jawa di Solo',
    link: ''
  },
  {
    id: 'static_akad_1',
    title: 'Prosesi Sungkeman Khidmat Akad Nikah Solo Raya',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-2.jpg?v=2',
    meta: 'Momen sakral pengantin memohon restu orang tua prosesi pernikahan Solo',
    link: ''
  },
  {
    id: 'static_akad_2',
    title: 'Pelaminan Akad Nikah Minimalis Modern Solo',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-3.jpg?v=2',
    meta: 'Backdrop pelaminan akad nikah elegan bernuansa floral pastel di Solo',
    link: ''
  },
  {
    id: 'static_akad_3',
    title: 'Busana Pengantin Tradisional Akad Nikah Solo',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-4.jpg?v=2',
    meta: 'Tata rias paes ageng dan busana kebaya adat Jawa pengantin Solo',
    link: ''
  },
  {
    id: 'static_akad_4',
    title: 'Lorong Masuk & Welcoming Gate Akad Solo Raya',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-5.jpg?v=2',
    meta: 'Aisle decor dan welcoming sign intimate wedding venue Solo Raya',
    link: ''
  },
  {
    id: 'static_akad_5',
    title: 'Prosesi Ijab Qobul Khidmat di Gedung Solo',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-6.jpg?v=2',
    meta: 'Momen sakral ijab qobul pengantin bersama penghulu di gedung Solo',
    link: ''
  },
  {
    id: 'static_akad_6',
    title: 'Detail Ronce Melati & Mahar Akad Nikah Solo',
    category: 'wedding',
    subcategory: 'akad',
    image: '/portfolio/akad/akad-7.jpg?v=2',
    meta: 'Detail kotak mahar pernikahan dan ronce melati harum akad nikah Solo Raya',
    link: ''
  },
  {
    id: 'static_res_0',
    title: 'Dekorasi Pelaminan Resepsi Ballroom Hotel Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-1.jpg?v=2',
    meta: 'Panggung pelaminan megah dengan instalasi lampu kristal di ballroom Solo',
    link: ''
  },
  {
    id: 'static_res_1',
    title: 'Lighting & Ambience Resepsi Malam Solo Raya',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-2.jpg?v=2',
    meta: 'Tata pencahayaan dramatis dan panggung pelaminan mewah di Solo Raya',
    link: ''
  },
  {
    id: 'static_res_2',
    title: 'Gaun Pengantin Resepsi Internasional Modern Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-3.jpg?v=2',
    meta: 'Gaun resepsi modern konsep internasional karya wedding planner Solo',
    link: ''
  },
  {
    id: 'static_res_3',
    title: 'Tata Meja VIP & Ruang Resepsi Gedung Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-4.jpg?v=2',
    meta: 'Penataan meja VIP keluarga dan lorong masuk resepsi pernikahan Solo',
    link: ''
  },
  {
    id: 'static_res_4',
    title: 'Grand Entrance Pengantin Resepsi Solo Raya',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-5.jpg?v=2',
    meta: 'Iring-iringan kirab pengantin dan orang tua memasuki area resepsi Solo',
    link: ''
  },
  {
    id: 'static_res_5',
    title: 'Pelaminan Adat Jawa Gebyok Ukir Klasik Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-6.jpg?v=2',
    meta: 'Pelaminan gebyok jati khas keraton Solo berpadu bunga segar',
    link: ''
  },
  {
    id: 'static_res_6',
    title: 'Wedding Gate Lorong Bunga Resepsi Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-7.jpg?v=2',
    meta: 'Gerbang floral menyambut tamu undangan resepsi pernikahan Solo Raya',
    link: ''
  },
  {
    id: 'static_res_7',
    title: 'Panggung Pelaminan Mewah dengan Chandelier Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-8.jpg?v=2',
    meta: 'Tata panggung resepsi pernikahan megah dengan lampu kristal di Solo',
    link: ''
  },
  {
    id: 'static_res_8',
    title: 'Pengantin Busana Solo Basahan Tradisional',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-9.jpg?v=2',
    meta: 'Keanggunan busana pengantin tradisional Solo basahan di pelaminan',
    link: ''
  },
  {
    id: 'static_res_9',
    title: 'Suasana Ruang Resepsi Convention Hall Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-10.jpg?v=2',
    meta: 'Pemandangan pesta resepsi luas kapasitas ribuan tamu convention hall Solo',
    link: ''
  },
  {
    id: 'static_res_10',
    title: 'Live Music Acoustic Resepsi Wedding Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-11.jpg?v=2',
    meta: 'Harmoni live band akustik mengiringi momen ramah tamah resepsi Solo',
    link: ''
  },
  {
    id: 'static_res_11',
    title: 'Photobooth Rustic Modern Resepsi Pernikahan Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-12.jpg?v=2',
    meta: 'Spot foto photobooth estetik untuk tamu resepsi pernikahan Solo Raya',
    link: ''
  },
  {
    id: 'static_res_12',
    title: 'Kru WD Sky Wedding Bertugas di Resepsi Solo',
    category: 'wedding',
    subcategory: 'resepsi',
    image: '/portfolio/resepsi/resepsi-13.jpg?v=2',
    meta: 'Koordinasi tim WO profesional menjaga kelancaran pesta resepsi Solo',
    link: ''
  }
];

const getDivisionStaticWorks = (category) => {
  if (category === "wedding") return getWeddingStaticWorks();
  if (category === "event") {
    return [
      {
        id: "static_event_0",
        title: "Panggung & Tata Suara Konser Musik Solo Raya",
        category: "event",
        subcategory: "concert",
        image: "/resources/Event_Organizer/Event.webp",
        meta: "Konsep panggung outdoor megah dan kontrol akustik prima konser Solo",
        link: ""
      },
      {
        id: "static_event_1",
        title: "Corporate Gathering & Gala Dinner Solo",
        category: "event",
        subcategory: "corporate",
        image: "/resources/Event_Organizer/Event1.webp",
        meta: "Manajemen acara perusahaan dan jamuan makan malam elegan convention hall Solo",
        link: ""
      },
      {
        id: "static_event_2",
        title: "Exhibition & Festival Lighting Solo Raya",
        category: "event",
        subcategory: "exhibition",
        image: "/resources/Event_Organizer/Event2.webp",
        meta: "Instalasi tata pencahayaan panggung dan tata sirkulasi pameran Solo",
        link: ""
      }
    ];
  }
  if (category === "production") {
    return [
      {
        id: "static_prod_0",
        title: "Dokumentasi Video Sinematik & Drone Solo Raya",
        category: "production",
        subcategory: "video",
        image: "/resources/Production/Production.webp",
        meta: "Produksi video dokumentasi sinematik dengan gear kamera profesional Solo",
        link: ""
      },
      {
        id: "static_prod_1",
        title: "Fotografi Komersial & Visual Branding Solo",
        category: "production",
        subcategory: "photo",
        image: "/resources/Production/Production1.webp",
        meta: "Pemotretan produk komersial dan materi publikasi visual brand Solo",
        link: ""
      },
      {
        id: "static_prod_2",
        title: "Dokumentasi Multi-Kamera Acara Akbar Solo",
        category: "production",
        subcategory: "video",
        image: "/resources/Production/Production2.webp",
        meta: "Liputan video multi-kamera dan video highlight perhelatan akbar Solo Raya",
        link: ""
      }
    ];
  }
  if (category === "music") {
    return [
      {
        id: "static_music_0",
        title: "Live Music Band Pengiring Wedding & Event Solo",
        category: "music",
        subcategory: "music",
        image: "/resources/Music_ENT/Music_ENT.webp",
        meta: "Penampilan panggung live band profesional pengisi acara pernikahan Solo",
        link: ""
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `static_music_${i + 1}`,
        title: `Talent Music & Studio Session Solo - ${i + 1}`,
        category: "music",
        subcategory: i % 2 === 0 ? "music" : "music class",
        image: `/resources/Music_ENT/wm${i + 1}.webp`,
        meta: `Dokumentasi talent panggung dan kelas edukasi musik WD Music Solo`,
        link: ""
      }))
    ];
  }
  if (category === "workshop") {
    return [
      {
        id: "static_ws_0",
        title: "Suasana Kelas Pelatihan Keterampilan Praktis Solo",
        category: "workshop",
        subcategory: "workshop",
        image: "/resources/Workshop/Workshop.webp",
        meta: "Sesi pelatihan intensif dengan bimbingan mentor praktisi berpengalaman di Solo",
        link: ""
      },
      {
        id: "static_ws_1",
        title: "Diskusi Interaktif & Mentoring Peserta Bootcamp Solo",
        category: "workshop",
        subcategory: "workshop",
        image: "/resources/Workshop/workshop1.webp",
        meta: "Bimbingan kelompok kecil dan simulasi pemecahan studi kasus nyata",
        link: ""
      },
      {
        id: "static_ws_2",
        title: "Presentasi Hasil Proyek Pelatihan Vokasi Solo Raya",
        category: "workshop",
        subcategory: "workshop",
        image: "/resources/Workshop/workshop2.webp",
        meta: "Evaluasi karya langsung dan pemberian sertifikat kelulusan program workshop",
        link: ""
      }
    ];
  }
  if (category === "it") {
    return [
      {
        id: "static_it_0",
        title: "Pengembangan Website E-Commerce & Toko Online Solo",
        category: "it",
        subcategory: "website",
        image: "/resources/Store/Store.webp",
        meta: "Arsitektur toko online responsif dan sistem manajemen inventaris modern di Solo",
        link: ""
      }
    ];
  }
  return [];
};

export default function DivisionLayout({ config, children }) {
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
  const tabsString = (divisionLang.tabs || config.tabs || []).join("|");
  const tabs = useMemo(() => {
    const rawTabs = divisionLang.tabs || config.tabs || [];
    return rawTabs.filter((tab) => {
      const t = (tab || "").toLowerCase().trim();
      return t !== "pricelist venue" && t !== "venue pricelist" && t !== "pricelist wo" && t !== "pricelist";
    });
  }, [tabsString]);
  const stats = divisionLang.stats || config.stats;

  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0] || "All Projects");
  const [galleryPage, setGalleryPage] = useState(0);
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Sync activeTab when language changes tabs
  useEffect(() => {
    if (tabs && tabs[0]) {
      setActiveTab((prev) => (tabs.includes(prev) ? prev : tabs[0]));
    }
  }, [lang?.code, tabsString]);

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
          
          const staticWorks = getDivisionStaticWorks(config.category);
          const existingTitles = new Set(finalData.map(d => d.title));
          const newWorks = staticWorks.filter(sw => !existingTitles.has(sw.title));
          finalData = [...finalData, ...newWorks];

          setWorks(finalData);
          if (finalData?.[0]) setSaved([{ id: finalData[0].id }]);
          else setSaved([]);
        }
      } catch (err) {
        console.error(`Error loading ${config.category} works:`, err);
        if (mounted) {
          const staticWorks = getDivisionStaticWorks(config.category);
          setWorks(staticWorks);
          if (staticWorks?.[0]) setSaved([{ id: staticWorks[0].id }]);
          else setSaved([]);
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
    const baseWorks = works.filter((item) => {
      const sub = (item.subcategory || "").toLowerCase().trim();
      return sub !== "pricelist" && sub !== "venue";
    });
    if (activeTab === tabs[0]) return baseWorks;
    const tabMatches = config.tabAliases?.[activeTab] || [activeTab];
    return baseWorks.filter((item) => {
      const subcategory = (item.subcategory || "").toLowerCase().trim();
      return tabMatches.some((tab) => subcategory === tab.toLowerCase().trim());
    });
  }, [works, activeTab, tabs, config.tabAliases]);

  const isVenueTab = (activeTab || "").toLowerCase().trim().includes("venue");
  const itemsPerPage = isVenueTab ? 4 : 9;
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
        url={config.seoUrl || `https://www.wdgroupcompany.biz.id/${config.category}`}
        image={config.seoImage || "https://www.wdgroupcompany.biz.id/resources/Event_Organizer/Event.webp"}
        imageAlt={config.seoImageAlt || `${brand} - WD Group Company`}
        jsonLd={config.seoJsonLd}
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
            <MotionDiv
              className="dp-toast"
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
            >
              {toast}
            </MotionDiv>
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
          <MotionDiv
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
          </MotionDiv>

          <MotionDiv
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

                <div className={`dp-grid ${isVenueTab ? "dp-grid-venue" : ""}`}>
                  {filtered.length > 0 ? (
                    visibleWorks.map((item, index) => {
                      const isSaved = saved.some((savedItem) => savedItem.id === item.id);
                      const isDoc = (item.subcategory || "").toLowerCase().trim() === "pricelist";
                      const isVenueLink = item.isExternalLink || (item.link && !item.image);

                      if (isVenueLink) {
                        return (
                          <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dp-card dp-card-venue-link"
                            title={`${item.title} - Buka di Google Drive`}
                          >
                            <div className="dp-venue-card-inner">
                              <div className="dp-venue-top">
                                <span className="dp-venue-badge">
                                  <FileText size={11} />
                                  <span>PDF</span>
                                </span>
                                <span className="dp-venue-external-icon">
                                  <ArrowUpRight size={13} />
                                </span>
                              </div>

                              <div className="dp-venue-body">
                                <div className="dp-venue-kicker">
                                  <Building2 size={10} />
                                  <span>{item.tag || "VENUE"}</span>
                                </div>
                                <h3 className="dp-venue-title">{item.title}</h3>
                                <p className="dp-venue-meta">{item.meta || "Pricelist & Wedding Package"}</p>
                              </div>

                              <div className="dp-venue-footer">
                                <span className="dp-venue-cta-btn">
                                  <span>Buka Google Drive</span>
                                  <ArrowUpRight size={12} />
                                </span>
                              </div>
                            </div>
                          </a>
                        );
                      }

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
          </MotionDiv>
        </main>
        {children}

        <AnimatePresence>
          {selectedWork && (
            <MotionDiv
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
              <MotionDiv
                className="dp-lightbox-panel"
                initial={{ scale: 0.96, y: 18 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 18 }}
                transition={{ duration: 0.22 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="dp-lightbox-media">
                  {selectedWork.isExternalLink || !selectedWork.image ? (
                    <div className="dp-lightbox-doc-view" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32, textAlign: "center", background: "#111217", color: "#fff" }}>
                      <FileText size={56} style={{ color: "var(--accent, #c89f67)", marginBottom: 16 }} />
                      <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{selectedWork.title}</h3>
                      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 360, margin: "0 0 20px" }}>{selectedWork.meta}</p>
                      <a
                        href={selectedWork.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dp-lightbox-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                      >
                        <span>Buka di Google Drive</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  ) : (
                    <img src={selectedWork.image} alt={selectedWork.title || `${brand} portfolio`} />
                  )}
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
                      {selectedWork.isExternalLink ? "Buka di Google Drive" : (ui.viewFull || "Buka Gambar Penuh")}
                    </a>
                    <button className="dp-lightbox-btn" onClick={closeLightbox}>
                      {ui.back}
                    </button>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
