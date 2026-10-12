import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Video, 
  Film, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Send,
  Clapperboard
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD Production, saya ingin konsultasi jasa foto dan video.";
const bookingHref = `https://wa.me/6285707909415?text=${encodeURIComponent(defaultWaMsg)}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const productionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.wdgroupcompany.biz.id/production#business",
      "name": "WD Production Solo Raya",
      "alternateName": ["WD Production", "WD Photo Video Solo", "WD Creative Production"],
      "url": "https://www.wdgroupcompany.biz.id/production",
      "image": "https://www.wdgroupcompany.biz.id/resources/Production/Production2.webp",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Jasa foto video Solo dan dokumentasi event Solo Raya dari WD Production. Layanan video sinematik, video company profile, commercial campaign, dan fotografi produk profesional.",
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
      "sameAs": [
        "https://instagram.com/wdgroupcompany",
        "https://maps.google.com/?cid=423251003407914670"
      ],
      "areaServed": [
        "Surakarta", "Sukoharjo", "Karanganyar", "Klaten", "Boyolali", "Sragen", "Wonogiri"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wdgroupcompany.biz.id/production#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Layanan foto dan video apa saja yang disediakan oleh WD Production di Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami menyediakan jasa dokumentasi video sinematik, video company profile perusahaan, video iklan komersial, fotografi produk, dokumentasi event dan wedding, hingga aerial drone video di Solo dan Solo Raya."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama proses editing video hingga penyerahan hasil akhir (final delivery)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Untuk dokumentasi event atau teaser pendek membutuhkan waktu 3-7 hari kerja. Sedangkan untuk video company profile, commercial visual, dan dokumentasi pernikahan lengkap membutuhkan waktu 14-30 hari kerja tergantung tingkat kompleksitas revisi."
          }
        },
        {
          "@type": "Question",
          "name": "Peralatan (gear) kamera apa yang digunakan oleh tim WD Production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami menggunakan kamera sinema dan mirrorless resolusi 4K dengan dynamic range tinggi, stabilizer gimbal elektrik, lensa prime dan zoom profesional, tata cahaya studio/lapangan, wireless audio recorder, serta drone berlisensi."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah klien mendapatkan seluruh file foto mentah (raw files)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, seluruh file foto beresolusi tinggi (high-res) dan video editan final akan diserahkan melalui cloud drive Google Drive resmi atau flashdisk eksklusif sesuai kesepakatan paket."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah melayani liputan acara di luar Kota Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, tim kami melayani seluruh area Solo Raya (Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri) hingga kota-kota lain di Jawa Tengah dan D.I. Yogyakarta."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa kali batas kesempatan revisi video yang diberikan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Setiap paket produksi video mencakup 2 hingga 3 kali revisi minor (penyesuaian teks, musik latar, atau urutan adegan) untuk memastikan hasil karya sesuai dengan visi dan ekspektasi brand Anda."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/production#breadcrumb",
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
          "name": "Photo & Video Production Solo Raya",
          "item": "https://www.wdgroupcompany.biz.id/production"
        }
      ]
    }
  ]
};

const productionConfig = {
  category: "production",
  brand: "WD Production",
  logoText: "WD",
  logoAccent: "Production",
  badge: "Creative Production Solo Raya",
  kicker: "WD Production",
  title: "Jasa Foto Video",
  titleAccent: "Solo & Solo Raya.",
  description:
    "WD Production menghadirkan jasa dokumentasi foto dan video sinematik Solo Raya dengan standar visual bercerita yang kuat. Dari video company profile, iklan komersial, foto produk, hingga dokumentasi acara berskala besar.",
  seoTitle: "Jasa Foto Video Solo & Video Sinematik | WD Production",
  seoDescription:
    "Jasa foto video Solo dan dokumentasi event Solo Raya dari WD Production. Layanan video sinematik, company profile, visual komersial, dan foto produk.",
  seoUrl: "https://www.wdgroupcompany.biz.id/production",
  seoImage: "https://www.wdgroupcompany.biz.id/resources/Production/Production2.webp",
  seoImageAlt: "Kru kamera dan dokumentasi video sinematik WD Production Solo Raya",
  seoJsonLd: productionJsonLd,
  primaryCta: "Konsultasi Produksi",
  primaryHref: bookingHref,
  primaryToast: "Inquiry production dicatat",
  savedMessage: "Referensi production disimpan",
  galleryTitle: "Portofolio Karya Foto & Video",
  mark: "PR",
  tabs: ["All Projects", "Photo", "Video"],
  stats: [
    { value: "Concept", label: "Arahan Visual" },
    { value: "Shooting", label: "Produksi Lapangan" },
    { value: "Final", label: "Kualitas Render" },
  ],
  accent: "#f59e0b",
  accentSoft: "rgba(245,158,11,0.14)",
  accentBorder: "rgba(245,158,11,0.28)",
  bg: "#100c05",
  muted: "#aa9b87",
};

export default function ProductionOrganizer() {
  const [formState, setFormState] = useState({
    name: "",
    needs: "Video Sinematik",
    date: "",
    budget: "Fleksibel / Diskusi",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD Production, saya ingin konsultasi jasa foto dan video:
- Nama: ${formState.name}
- Jenis Kebutuhan: ${formState.needs}
- Tanggal Pelaksanaan: ${formState.date || "Belum ditentukan"}
- Estimasi Budget: ${formState.budget}`;
    window.open(`https://wa.me/6285707909415?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={productionConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGANTAR DIVISI */}
        <section className="div-section" id="tentang-production">
          <div className="div-section-header">
            <span className="div-kicker">
              <Camera size={13} />
              <span>Visual Storytelling</span>
            </span>
            <h2 className="div-title">
              Jasa Foto Video Solo & <em>Video Sinematik Solo Raya</em>
            </h2>
            <p className="div-subtitle">
              Menghadirkan karya visual foto dan video yang tidak sekadar merekam momen, namun membangkitkan emosi dan memperkuat nilai brand Anda.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                Di era digital yang serba cepat, kekuatan visual adalah faktor pembeda utama antara pesan yang berlalu begitu saja dan karya yang melekat dalam ingatan pemirsa. <strong>WD Production</strong>, divisi multimedia dan visual production dari <strong>WD Group Company</strong>, menghadirkan layanan <strong>jasa foto video Solo, video sinematik Solo, fotografer Solo, dan dokumentasi event Solo Raya</strong> dengan standar estetika sinematik modern dan penceritaan yang kuat.
              </p>
              <p>
                Kami melayani berbagai spektrum kebutuhan visual: mulai dari <strong>dokumentasi video sinematik pernikahan</strong> ([WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx)), liputan panggung acara akbar ([WD Event](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/event.jsx)), pembuatan video profil korporasi (company profile), video komersial iklan, hingga fotografi produk e-commerce berkategori premium.
              </p>
              <p>
                Wilayah operasional kami menjangkau seluruh <strong>Solo Raya</strong> (Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri). Dengan kru kamera terlatih, pengarah gaya visual (visual director), dan editor profesional yang menguasai teknik color grading standar industri, kami menjamin setiap aset visual yang Anda terima memiliki nilai jual dan daya pikat yang tinggi.
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <Clapperboard size={18} />
                  <span>Sinematografi Standar Industri</span>
                </h4>
                <p>
                  Menggunakan kamera bersensor 4K, lensa cinema tajam, gimbal stabilizer, audio nirkabel jernih, dan drone udara untuk sudut pandang memukau.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <Film size={18} />
                  <span>Color Grading & Audio Mixing Profesional</span>
                </h4>
                <p>
                  Setiap cuplikan video disempurnakan melalui proses koreksi warna (color grading) estetis dan penataan audio latar yang menggugah selera audiens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DAFTAR LAYANAN */}
        <section className="div-section" id="layanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Video size={13} />
              <span>Portofolio Layanan</span>
            </span>
            <h2 className="div-title">
              Layanan Produksi Visual <em>WD Production</em>
            </h2>
            <p className="div-subtitle">
              Solusi dokumentasi komersial dan rekaman momen sakral dengan fleksibilitas paket sesuai kebutuhan Anda di Solo Raya.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <Film size={22} />
              </div>
              <h3>Video Sinematik & Highlight Event</h3>
              <p>
                Dokumentasi video berkonsep film sinematik untuk perhelatan pernikahan, festival konser, peluncuran produk, dan gathering di Solo Raya.
              </p>
              <ul className="div-service-list">
                <li>Teaser video 60 detik untuk Instagram/TikTok</li>
                <li>Full video dokumentasi berdurasi panjang</li>
                <li>Pengambilan sudut sinematik drone aerial 4K</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Clapperboard size={22} />
              </div>
              <h3>Video Company Profile Instansi</h3>
              <p>
                Video profil perusahaan profesional yang merangkum visi, fasilitas kantor, etos kerja tim, dan portofolio keunggulan bisnis Anda.
              </p>
              <ul className="div-service-list">
                <li>Penyusunan naskah (scriptwriting) & storyboard</li>
                <li>Wawancara manajemen berkelas studio</li>
                <li>Animasi logo & infografis digital modern</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Camera size={22} />
              </div>
              <h3>Fotografi Komersial & Produk</h3>
              <p>
                Pemotretan produk makanan, pakaian fesyen, furnitur, dan manufaktur dengan tata cahaya studio untuk katalog toko online dan iklan cetak.
              </p>
              <ul className="div-service-list">
                <li>Lighting studio profesional multi-titik</li>
                <li>Pengarahan model & styling tata letak produk</li>
                <li>Retouching detail high-resolution siap pakai</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Video size={22} />
              </div>
              <h3>Multi-Kamera Live Streaming</h3>
              <p>
                Liputan langsung acara formal, wisuda, seminar nasional, dan ibadah dengan peralihan video switcher live menuju YouTube atau Zoom.
              </p>
              <ul className="div-service-list">
                <li>Setup multi-kamera kabel SDI minim latensi</li>
                <li>Audio mixing direct output kejernihan tinggi</li>
                <li>Overlay grafis nama pembicara & logo acara</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR KERJA */}
        <section className="div-section" id="alur-kerja">
          <div className="div-section-header">
            <span className="div-kicker">
              <Clapperboard size={13} />
              <span>SOP Produksi</span>
            </span>
            <h2 className="div-title">
              Alur Kerja Terarah <em>WD Production</em>
            </h2>
            <p className="div-subtitle">
              Dari pra-produksi hingga pasca-produksi, alur kerja kami terstruktur demi ketepatan waktu pengiriman hasil karya.
            </p>
          </div>

          <div className="div-workflow-grid">
            <div className="div-step-card">
              <div className="div-step-num">01</div>
              <h3 className="div-step-title">Pra-Produksi & Storyboard</h3>
              <p className="div-step-desc">
                Merumuskan konsep visual, mood board warna, naskah narasi, jadwal shooting (call sheet), dan persiapan lokasi bersama klien.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">02</div>
              <h3 className="div-step-title">Produksi & Pengambilan Gambar</h3>
              <p className="div-step-desc">
                Pelaksanaan shooting di lokasi dengan arahan sutradara visual, pengawasan komposisi framing, tata cahaya, dan rekaman audio jernih.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">03</div>
              <h3 className="div-step-title">Pasca-Produksi & Editing</h3>
              <p className="div-step-desc">
                Proses penyuntingan video (offline & online editing), penataan ritme potong klip, color grading sinematik, dan sound design.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">04</div>
              <h3 className="div-step-title">Revisi & Final Delivery</h3>
              <p className="div-step-desc">
                Pemberian akses preview draf video kepada klien, penyesuaian revisi minor, hingga penyerahan master file resolusi penuh 4K.
              </p>
            </div>
          </div>
        </section>

        {/* 4. STANDAR KEPERCAYAAN */}
        <section className="div-section" id="kepercayaan">
          <div className="div-section-header">
            <span className="div-kicker">
              <ShieldCheck size={13} />
              <span>Nilai Tambah</span>
            </span>
            <h2 className="div-title">
              Standar Profesional <em>WD Production</em>
            </h2>
            <p className="div-subtitle">
              Alasan mengapa perusahaan dan pasangan pengantin di Solo mempercayakan dokumentasi visualnya kepada kami.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Paket Dokumentasi & Klien Nyata</span>
              </h4>
              <p>
                Menyediakan paket dokumentasi video sinematik, foto liputan acara, dan video profil perusahaan yang disesuaikan dengan kebutuhan Anda. Hubungi kami untuk penawaran proposal detail.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Penyimpanan Data Aman (Dual Backup)</span>
              </h4>
              <p>
                Seluruh rekaman memori kamera langsung dicadangkan ke dua hard drive terpisah di lokasi acara untuk mencegah risiko kehilangan data.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Waktu Pengerjaan Tepat Waktu</span>
              </h4>
              <p>
                Kami memegang teguh komitmen deadline pengerjaan yang disepakati, dengan update progres berkala selama proses penyuntingan berlangsung.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Hak Cipta & Lisensi Audio Resmi</span>
              </h4>
              <p>
                Menggunakan musik latar (background score) berlisensi komersial sehingga video Anda aman diunggah ke YouTube, Instagram, dan Meta Ads.
              </p>
            </div>
          </div>
        </section>

        {/* 5. ULASAN GOOGLE MAPS */}
        <section className="div-section" id="ulasan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Sparkles size={13} />
              <span>Transparansi Klien</span>
            </span>
            <h2 className="div-title">
              Ulasan Klien Kami di <em>Google Maps</em>
            </h2>
            <p className="div-subtitle">
              Kepercayaan klien adalah aset berharga yang selalu kami jaga melalui kejujuran mutu karya visual.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami tidak pernah mengarang ulasan palsu. Anda dapat membaca ulasan transparan para klien yang telah menggunakan jasa foto dan video WD Group Company langsung di profil resmi Google Maps kami.
            </p>
            <div className="div-review-actions">
              <a href={reviewProfileUrl} target="_blank" rel="noopener noreferrer" className="div-btn-google">
                <MapPin size={18} color="#ea4335" />
                <span>Lihat Ulasan Kami di Google</span>
                <ArrowUpRight size={15} />
              </a>
              <a href={writeReviewUrl} target="_blank" rel="noopener noreferrer" className="div-btn-review-write">
                <span>Beri Ulasan di Google</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* 6. FAQ LENGKAP */}
        <section className="div-section" id="faq">
          <div className="div-section-header">
            <span className="div-kicker">
              <HelpCircle size={13} />
              <span>Tanya Jawab</span>
            </span>
            <h2 className="div-title">
              Pertanyaan yang Sering Diajukan <em>(FAQ)</em>
            </h2>
            <p className="div-subtitle">
              Informasi seputar teknis gear kamera, durasi pengerjaan, dan format penyerahan file foto video di Solo Raya.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Layanan foto dan video apa saja yang disediakan oleh WD Production di Solo?
              </summary>
              <div className="div-faq-answer">
                Kami menyediakan dokumentasi video sinematik pernikahan, dokumentasi event konser & gathering, pembuatan video company profile instansi, video iklan komersial, fotografi produk e-commerce, hingga liputan udara menggunakan drone di wilayah Solo Raya.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa lama waktu proses editing hingga penyerahan file akhir?
              </summary>
              <div className="div-faq-answer">
                Untuk video teaser pendek atau liputan event harian membutuhkan waktu 3-7 hari kerja. Untuk video company profile dan dokumentasi pernikahan lengkap membutuhkan waktu 14-30 hari kerja tergantung tingkat revisi dan kompleksitas color grading.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Peralatan kamera dan pendukung apa yang digunakan oleh tim?
              </summary>
              <div className="div-faq-answer">
                Kami menggunakan kamera sinema dan mirrorless 4K dengan dynamic range tinggi, paket lensa prime dan zoom premium, stabilizer gimbal elektrik, perlengkapan lighting studio/portable, mikrofon nirkabel broadcast, serta drone 4K berizin.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah klien mendapatkan seluruh file foto mentah dan video editan?
              </summary>
              <div className="div-faq-answer">
                Ya, seluruh foto beresolusi tinggi hasil grading warna beserta video final akan diserahkan melalui link Google Drive resmi berkapasitas besar atau flashdisk eksklusif sesuai kesepakatan paket kerja sama.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah melayani pengambilan gambar di luar wilayah Kota Solo?
              </summary>
              <div className="div-faq-answer">
                Ya, kami melayani seluruh kabupaten di Solo Raya (Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri) hingga lokasi shooting luar kota di Jawa Tengah dan Yogyakarta.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa kali batas kesempatan revisi video yang disediakan?
              </summary>
              <div className="div-faq-answer">
                Setiap paket video mencakup 2 hingga 3 kali revisi minor (penyesuaian teks nama, musik latar, atau urutan adegan klip) untuk memastikan hasil karya sesuai dengan visi yang Anda harapkan.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI CEPAT */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Konsultasi Kreatif</span>
            </span>
            <h2 className="div-title">
              Diskusikan <em>Proyek Visual Anda</em>
            </h2>
            <p className="div-subtitle">
              Sampaikan kebutuhan dokumentasi atau konsep visual yang Anda rencanakan. Tim WD Production siap memberikan proposal penawaran yang transparan.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Nama Bisnis *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rian Pratama / Brand Kopi Solo"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Jenis Kebutuhan Visual *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Video Sinematik">Video Sinematik & Event Highlight</option>
                  <option value="Video Company Profile">Video Company Profile Perusahaan</option>
                  <option value="Fotografi Produk">Fotografi Produk Komersial</option>
                  <option value="Dokumentasi Wedding">Dokumentasi Foto & Video Wedding</option>
                  <option value="Multi-Kamera Live">Multi-Kamera Live Streaming</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Rencana Tanggal Pelaksanaan *</label>
                <input
                  type="text"
                  placeholder="Misal: Desember 2026 / Segera"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Estimasi Anggaran (Budget)</label>
                <input
                  type="text"
                  placeholder="Misal: Rp 10 - 25 Juta / Fleksibel"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Konsultasi Foto & Video via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN: PAKET WEDDING LENGKAP */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Ingin Paket Wedding Termasuk Dokumentasi Sinematik?</h3>
              <p>
                Dapatkan efisiensi biaya maksimal melalui <strong>Paket Wedding Lengkap</strong> WD Group Company. Menggabungkan jasa Wedding Organizer ([WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx)), dokumentasi video sinematik ([WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx)), dan live band pengiring ([WD Music](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/music.jsx)) dalam satu penawaran istimewa.
              </p>
            </div>
            <Link to="/wedding" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Lihat Paket Terpadu</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

      </div>

      {/* FLOATING WA BUTTON */}
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="div-floating-wa"
        title="Konsultasi Jasa Foto Video Solo via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Konsultasi Foto & Video</span>
      </a>
    </DivisionLayout>
  );
}
