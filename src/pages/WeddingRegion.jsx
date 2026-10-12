import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import { weddingRegions } from "./weddingRegionData";
import { 
  Building2, 
  MapPin, 
  HeartHandshake, 
  HelpCircle, 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2,
  Phone
} from "lucide-react";
import "./wedding.css";

const bookingBase = "https://wa.me/6285707909415?text=";
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";

export default function WeddingRegion({ regionKey: propKey }) {
  const { regionSlug } = useParams();
  const currentKey = propKey || regionSlug;
  const region = weddingRegions[currentKey];

  if (!region) {
    return <Navigate to="/wedding" replace />;
  }

  const bookingHref = `${bookingBase}${encodeURIComponent(
    `Halo WD Sky Wedding, saya ingin konsultasi paket wedding organizer untuk wilayah ${region.name} (Solo Raya).`
  )}`;

  const regionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://www.wdgroupcompany.biz.id/wedding/${region.key}#business`,
        "name": `WD Sky Wedding Organizer ${region.name} - Solo Raya`,
        "url": `https://www.wdgroupcompany.biz.id/wedding/${region.key}`,
        "image": region.image || "https://www.wdgroupcompany.biz.id/portfolio/resepsi/resepsi-8.jpg",
        "telephone": "+6285707909415",
        "email": "groupcompanywd@gmail.com",
        "description": region.seoDescription,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Griya Edelweis No.12a, Dusun V, Joho",
          "addressLocality": "Mojolaban",
          "addressRegion": "Kabupaten Sukoharjo",
          "postalCode": "57554",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -7.593558,
          "longitude": 110.883616
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": region.name },
          { "@type": "AdministrativeArea", "name": "Surakarta" },
          { "@type": "AdministrativeArea", "name": "Solo Raya" }
        ],
        "sameAs": [
          "https://instagram.com/wdgroupcompany",
          "https://maps.google.com/?cid=423251003407914670"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.wdgroupcompany.biz.id/wedding/${region.key}#faq`,
        "mainEntity": region.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.wdgroupcompany.biz.id/wedding/${region.key}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://www.wdgroupcompany.biz.id/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Wedding Organizer Solo Raya",
            "item": "https://www.wdgroupcompany.biz.id/wedding"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": region.name,
            "item": `https://www.wdgroupcompany.biz.id/wedding/${region.key}`
          }
        ]
      }
    ]
  };

  const otherRegions = Object.values(weddingRegions).filter((r) => r.key !== region.key);

  return (
    <>
      <SEO
        title={region.title}
        description={region.seoDescription}
        url={`https://www.wdgroupcompany.biz.id/wedding/${region.key}`}
        image={region.image || "https://www.wdgroupcompany.biz.id/portfolio/resepsi/resepsi-8.jpg"}
        imageAlt={`Dekorasi pernikahan wedding organizer di ${region.name} Solo Raya - WD Sky Wedding`}
        jsonLd={regionJsonLd}
      />

      <div className="dp-root dp-wedding" style={{ "--accent": "#c89f67", "--bg": "#100c09" }}>
        {/* NAV TOP */}
        <nav className="dp-nav">
          <Link to="/wedding" className="dp-back" style={{ textDecoration: "none" }}>
            <ArrowLeft size={14} />
            <span>Ke Wedding Solo Raya</span>
          </Link>
          <div className="dp-logo">
            WD <span>Sky</span> Wedding
          </div>
          <div className="dp-badge">{region.name} · Solo Raya</div>
        </nav>

        {/* REGIONAL HERO BANNER */}
        <header style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px) 24px",
          textAlign: "center"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(200, 159, 103, 0.12)",
            border: "1px solid rgba(200, 159, 103, 0.35)",
            color: "#d8af75",
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 16
          }}>
            <MapPin size={12} />
            <span>Layanan Wilayah {region.name}</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4.5vw, 50px)",
            lineHeight: 1.2,
            fontWeight: 600,
            color: "#ffffff",
            margin: "0 0 18px",
            letterSpacing: "-0.01em"
          }}>
            {region.h1}
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            color: "#cfc4b8",
            maxWidth: 780,
            margin: "0 auto 28px",
            lineHeight: 1.7
          }}>
            {region.introLead}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="w-package-btn" style={{ width: "auto" }}>
              <MessageCircle size={16} />
              <span>Konsultasi Pernikahan {region.name}</span>
              <ArrowUpRight size={15} />
            </a>
            <Link to="/wedding#paket-pernikahan" className="w-package-btn w-package-btn-outline" style={{ width: "auto" }}>
              <span>Lihat Paket Lengkap</span>
            </Link>
          </div>
        </header>

        {/* REGIONAL CONTENT BODY */}
        <main className="w-rich-wrapper" style={{ paddingTop: 20 }}>
          
          {/* OVERVIEW SECTION */}
          <section className="w-section" style={{ marginTop: 20 }}>
            <div className="w-intro-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="w-intro-text">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", marginBottom: 16 }}>
                  Karakteristik & Keunggulan Layanan di <em>{region.name}</em>
                </h2>
                {region.overviewParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* VENUES SECTION */}
          <section className="w-section">
            <div className="w-section-header">
              <span className="w-kicker">
                <Building2 size={13} />
                <span>Rekomendasi Venue</span>
              </span>
              <h2 className="w-title">
                Gedung & Lokasi Pernikahan Populer di <em>{region.name}</em>
              </h2>
              <p className="w-subtitle">
                Tim WD Sky Wedding siap berkoordinasi dengan pengelola venue favorit di {region.name} untuk memastikan tata ruang dan teknis acara berjalan lancar.
              </p>
            </div>

            <div className="w-trust-grid">
              {region.popularVenues.map((venue, idx) => (
                <div className="w-trust-card" key={idx}>
                  <h4>
                    <Building2 size={16} />
                    <span>{venue.name}</span>
                  </h4>
                  <p>{venue.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* LOCAL TRADITIONS SECTION */}
          <section className="w-section">
            <div className="w-intro-grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="w-intro-text">
                <span className="w-kicker">
                  <HeartHandshake size={13} />
                  <span>Kearifan Lokal</span>
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", marginBottom: 16 }}>
                  Tradisi Adat & Nuansa Pernikahan di <em>{region.name}</em>
                </h2>
                <p>{region.localTraditions}</p>
                <p>
                  Kami menghormati setiap tata krama keluarga setempat. Sebelum hari perhelatan, kami mengadakan koordinasi intensif bersama sesepuh adat dan pranata cara agar alur sakral berjalan selaras dan penuh kehormatan.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-section">
            <div className="w-section-header">
              <span className="w-kicker">
                <HelpCircle size={13} />
                <span>Pertanyaan Wilayah</span>
              </span>
              <h2 className="w-title">
                Tanya Jawab Seputar Wedding Organizer di <em>{region.name}</em>
              </h2>
              <p className="w-subtitle">
                Pertanyaan umum calon pengantin seputar layanan, jangkauan, dan teknis acara di Kabupaten {region.name}.
              </p>
            </div>

            <div className="w-faq-list">
              {region.faqs.map((f, idx) => (
                <details className="w-faq-item" key={idx} open={idx === 0}>
                  <summary className="w-faq-summary">{f.q}</summary>
                  <div className="w-faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* CROSS REGION NAVIGATION */}
          <section className="w-section">
            <div className="w-section-header">
              <span className="w-kicker">
                <MapPin size={13} />
                <span>Area Layanan Lainnya</span>
              </span>
              <h2 className="w-title">
                Eksplorasi Wilayah Lain di <em>Solo Raya</em>
              </h2>
              <p className="w-subtitle">
                WD Sky Wedding Organizer juga melayani perhelatan pernikahan profesional di seluruh penjuru Solo Raya:
              </p>
            </div>

            <div className="w-region-grid">
              {otherRegions.map((other) => (
                <Link to={`/wedding/${other.key}`} className="w-region-card" key={other.key}>
                  <div>
                    <div className="w-region-name">
                      <span>{other.name}</span>
                      <span className="w-region-tag">Solo Raya</span>
                    </div>
                    <p className="w-region-desc">
                      Layanan wedding organizer dan wedding planner profesional di wilayah {other.name}.
                    </p>
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                    <span>Buka Panduan {other.name}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* BACK TO MAIN WEDDING CTA */}
          <section className="w-section" style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{
              background: "rgba(200, 159, 103, 0.05)",
              border: "1px solid rgba(200, 159, 103, 0.25)",
              borderRadius: 20,
              padding: "36px 24px",
              maxWidth: 720,
              margin: "0 auto"
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 12 }}>
                Butuh Informasi Selengkapnya?
              </h3>
              <p style={{ color: "#b7a79b", fontSize: 14.5, marginBottom: 24, lineHeight: 1.6 }}>
                Kembali ke halaman utama untuk melihat portofolio foto akad & resepsi, unduh pricelist resmi, dan pelajari alur kerja 4 tahap kami.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <Link to="/wedding" className="w-package-btn" style={{ width: "auto" }}>
                  <ArrowLeft size={16} />
                  <span>Ke Halaman Utama Wedding Solo Raya</span>
                </Link>
                <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="w-package-btn w-package-btn-outline" style={{ width: "auto" }}>
                  <MessageCircle size={16} />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* FLOATING WA BUTTON */}
        <a
          href={bookingHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-floating-wa"
          title={`Konsultasi Wedding Organizer di ${region.name} via WhatsApp`}
        >
          <MessageCircle size={22} />
          <span>Konsultasi Wedding {region.name}</span>
        </a>
      </div>
    </>
  );
}
