import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Sparkles, 
  Database, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Send,
  Laptop,
  HeartHandshake
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD IT, saya ingin konsultasi pembuatan website atau aplikasi.";
const bookingHref = `https://wa.me/6285707909415?text=${encodeURIComponent(defaultWaMsg)}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const itJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.wdgroupcompany.biz.id/it#business",
      "name": "WD IT - Jasa Pembuatan Website Solo & Web Developer",
      "alternateName": ["WD IT", "Jasa Website Solo", "Web Developer Solo Raya", "Jasa Undangan Digital Solo"],
      "url": "https://www.wdgroupcompany.biz.id/it",
      "image": "https://www.wdgroupcompany.biz.id/resources/Store/Store.webp",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Jasa pembuatan website Solo, jasa web developer Solo Raya, pembuatan sistem informasi internal, web e-commerce, dan undangan digital dari WD IT.",
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
      "@id": "https://www.wdgroupcompany.biz.id/it#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa biaya jasa pembuatan website di Solo bersama WD IT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Biaya pembuatan website disesuaikan dengan jenis kebutuhan, mulai dari paket website profil perusahaan UMKM, toko online e-commerce, hingga web aplikasi kustom. Seluruh paket sudah termasuk domain, hosting berkecepatan tinggi, dan optimasi mobile."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama estimasi pengerjaan website sampai siap online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Untuk website profil perusahaan standar dan undangan digital pernikahan, pengerjaan berkisar antara 5 hingga 14 hari kerja setelah materi konten lengkap. Untuk sistem informasi kustom, durasi disesuaikan dengan kompleksitas modul sistem."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah website yang dibuat sudah ramah mesin pencari Google (SEO friendly)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, setiap website yang kami kembangkan dirancang dengan struktur SEO on-page yang bersih, kecepatan muat cepat, meta tag standar, peta situs sitemap XML, dan schema markup JSON-LD agar mudah diindeks oleh Google."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah klien bisa memperbarui konten teks dan foto produk secara mandiri?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bisa. Kami menyediakan panel administrasi konten yang mudah dioperasikan tanpa perlu pemahaman teknis pemrograman, lengkap dengan panduan tutorial singkat bagi pengelola website."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah WD IT juga melayani pembuatan website undangan digital pernikahan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami membuat website undangan digital interaktif yang elegan, terintegrasi dengan tombol RSVP konfirmasi WhatsApp, navigasi Google Maps lokasi resepsi, dan galeri foto pra-nikah."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah tersedia layanan garansi pemeliharaan dan perbaikan teknis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami memberikan garansi pemeliharaan berkala, backup database rutin, dan bantuan teknis saat website mengalami kendala akses atau error."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/it#breadcrumb",
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
          "name": "Jasa Pembuatan Website & IT Solo",
          "item": "https://www.wdgroupcompany.biz.id/it"
        }
      ]
    }
  ]
};

const itConfig = {
  category: "it",
  brand: "WD IT",
  logoText: "WD",
  logoAccent: "IT",
  badge: "Jasa Pembuatan Website & IT Solo Raya",
  kicker: "WD IT",
  title: "Jasa Pembuatan Website &",
  titleAccent: "Solusi Digital Solo.",
  description:
    "WD IT menyediakan jasa pembuatan website Solo, web developer Solo Raya, pengembangan sistem internal bisnis, dan undangan digital interaktif dengan arsitektur modern, performa kilat, dan tampilan responsif.",
  seoTitle: "Jasa Pembuatan Website Solo & Web Developer Solo | WD IT",
  seoDescription:
    "Jasa pembuatan website Solo, web developer Solo Raya, toko online e-commerce, dan undangan digital dari WD IT. Desain responsif, SEO-friendly, dan bergaransi.",
  seoUrl: "https://www.wdgroupcompany.biz.id/it",
  seoImage: "https://www.wdgroupcompany.biz.id/resources/Store/Store.webp",
  seoImageAlt: "Tampilan solusi website modern dan aplikasi digital rancangan WD IT Solo",
  seoJsonLd: itJsonLd,
  primaryCta: "Konsultasi Website",
  primaryHref: bookingHref,
  primaryToast: "Inquiry IT dicatat",
  savedMessage: "Referensi IT disimpan",
  galleryTitle: "Portofolio Proyek Digital & Website",
  mark: "IT",
  tabs: ["All Projects", "Website", "App", "System", "Support"],
  tabAliases: {
    Website: ["website", "landing page", "company profile", "undangan digital"],
    App: ["app", "mobile", "web app"],
    System: ["system", "pos", "inventory", "internal"],
    Support: ["support", "maintenance", "seo"],
  },
  stats: [
    { value: "Cepat", label: "Performa Kilat" },
    { value: "Responsif", label: "Mobile-First" },
    { value: "SEO-Ready", label: "Siap Google" },
  ],
  accent: "#0ea5e9",
  accentSoft: "rgba(14,165,233,0.15)",
  accentBorder: "rgba(14,165,233,0.30)",
  bg: "#020b16",
  muted: "#9bb6c7",
};

export default function ITPage() {
  const [formState, setFormState] = useState({
    name: "",
    needs: "Website Profil Perusahaan (Company Profile)",
    budget: "Fleksibel / Diskusi",
    notes: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD IT, saya ingin konsultasi pembuatan website atau aplikasi:
- Nama: ${formState.name}
- Jenis Kebutuhan Web: ${formState.needs}
- Estimasi Budget: ${formState.budget}
- Keterangan Fitur: ${formState.notes || "Sesuai rekomendasi tim WD IT"}`;
    window.open(`https://wa.me/6285707909415?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={itConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGANTAR DIVISI */}
        <section className="div-section" id="tentang-it">
          <div className="div-section-header">
            <span className="div-kicker">
              <Code2 size={13} />
              <span>Transformasi Digital Bisnis</span>
            </span>
            <h2 className="div-title">
              Jasa Pembuatan Website Solo & <em>Web Developer Solo Raya</em>
            </h2>
            <p className="div-subtitle">
              Membangun kehadiran digital profesional bagi bisnis, UMKM, instansi, dan personal dengan website berperforma tinggi dan desain modern.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                Di era di mana calon pelanggan mencari informasi layanan dan produk langsung melalui mesin pencari Google, keberadaan website profesional bukan lagi sekadar pilihan pelengkap, melainkan aset utama kredibilitas brand Anda. <strong>WD IT</strong>, unit teknologi dan solusi digital dari <strong>WD Group Company</strong>, menghadirkan layanan <strong>jasa pembuatan website Solo, web developer Solo, jasa aplikasi web Solo Raya, dan pembuatan undangan digital Solo</strong> yang dirancang elegan, cepat dibuka, dan mudah ditemukan.
              </p>
              <p>
                Kami memahami bahwa setiap bisnis memiliki keunikan model operasional. Oleh karena itu, kami tidak sekadar memasang template generik yang lambat. Tim web developer kami membangun struktur halaman yang rapi (clean architecture), optimal di layar ponsel (mobile-first design), serta dilengkapi optimasi SEO on-page yang matang agar domain website Anda cepat bersaing di halaman pencarian Google.
              </p>
              <p>
                Layanan kami mencakup pembuatan website profil perusahaan, toko online e-commerce dengan integrasi WhatsApp checkout, aplikasi manajemen internal, hingga website undangan digital bagi calon pengantin yang menggunakan layanan [WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx). Kami juga berkolaborasi erat dengan tim multimedia [WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx) guna menghasilkan aset foto dan video beresolusi tajam tanpa membebani kecepatan loading situs Anda.
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <Globe size={18} />
                  <span>Kecepatan Akses & Standar SEO</span>
                </h4>
                <p>
                  Setiap baris kode dioptimalkan untuk meminimalkan beban muat, meningkatkan skor Google PageSpeed, dan mempermudah perayapan bot mesin pencari.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <Smartphone size={18} />
                  <span>Tampilan Fleksibel Semua Layar</span>
                </h4>
                <p>
                  Tampilan website menyesuaikan proporsi layar smartphone, tablet, maupun monitor desktop dengan navigasi yang intuitif dan nyaman dijelajahi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LAYANAN IT & WEB DEVELOPMENT */}
        <section className="div-section" id="layanan-it">
          <div className="div-section-header">
            <span className="div-kicker">
              <Sparkles size={13} />
              <span>Solusi Digital Terpadu</span>
            </span>
            <h2 className="div-title">
              Layanan Pengembangan Website & <em>Aplikasi Kami</em>
            </h2>
            <p className="div-subtitle">
              Pilihan arsitektur digital sesuai skala usaha Anda, dari landing page konversi cepat hingga platform operasional terintegrasi.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <Laptop size={24} />
              </div>
              <h3 className="div-service-title">Website Profil Perusahaan (Company Profile)</h3>
              <p className="div-service-desc">
                Membangun reputasi terpercaya bagi korporasi, UMKM, konsultan, klinik, maupun kantor jasa di Solo Raya. Dilengkapi profil bisnis, katalog layanan, portofolio, dan integrasi tombol kontak langsung.
              </p>
              <ul className="div-service-bullets">
                <li>Desain eksklusif mencerminkan identitas brand</li>
                <li>Halaman Tentang Kami, Layanan, Kontak, dan FAQ</li>
                <li>Koneksi Google Maps alamat kantor & tombol WhatsApp</li>
                <li>Optimasi struktur metadata Google Search Console</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Globe size={24} />
              </div>
              <h3 className="div-service-title">Toko Online & E-Commerce Responsif</h3>
              <p className="div-service-desc">
                Solusi penjualan produk mandiri tanpa potongan komisi marketplace. Dilengkapi etalase produk interaktif, fitur checkout langsung ke WhatsApp admin, serta kalkulasi ongkir yang praktis.
              </p>
              <ul className="div-service-bullets">
                <li>Manajemen etalase produk dan kategori mudah</li>
                <li>Alur checkout cepat via WhatsApp CS</li>
                <li>Panel pengelola stok dan pesanan sederhana</li>
                <li>Keamanan enkripsi SSL gembok hijau aktif</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Database size={24} />
              </div>
              <h3 className="div-service-title">Sistem Informasi & Aplikasi Web Kustom</h3>
              <p className="div-service-desc">
                Pengembangan dashboard dan perangkat lunak berbasis web untuk mengotomatiskan alur kerja internal kantor: inventaris barang, pencatatan transaksi, sistem booking layanan, hingga arsip digital.
              </p>
              <ul className="div-service-bullets">
                <li>Arsitektur database relasional yang aman & terukur</li>
                <li>Hak akses multi-user (Admin, Kasir, Manajer)</li>
                <li>Laporan berkala dan ekspor data ke Excel/PDF</li>
                <li>Dukungan hosting cloud berkinerja stabil</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <HeartHandshake size={24} />
              </div>
              <h3 className="div-service-title">Undangan Digital & Landing Page Event</h3>
              <p className="div-service-desc">
                Website undangan pernikahan digital atau registrasi acara formal yang elegan. Fitur nama tamu personal, amplop digital, buku tamu online, musik latar, serta panduan rute Google Maps.
              </p>
              <ul className="div-service-bullets">
                <li>Tampilan estetik modern ramah ponsel</li>
                <li>Fitur konfirmasi kehadiran (RSVP) real-time</li>
                <li>Galeri foto kenangan & pemutar lagu pengiring</li>
                <li>Panduan navigasi rute lokasi pesta pernikahan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR PENGERJAAN WEBSITE */}
        <section className="div-section" id="alur-kerja">
          <div className="div-section-header">
            <span className="div-kicker">
              <CheckCircle2 size={13} />
              <span>Metodologi Pengembangan</span>
            </span>
            <h2 className="div-title">
              Alur Kerja Pengerjaan <em>Website Profesional</em>
            </h2>
            <p className="div-subtitle">
              Empat fase sistematis mulai dari perumusan ide hingga website aktif mengudara dan dapat diakses pelanggan Anda di seluruh dunia.
            </p>
          </div>

          <div className="div-steps-grid">
            <div className="div-step-card">
              <div className="div-step-number">01</div>
              <h4 className="div-step-title">Konsultasi Kebutuhan & Analisis</h4>
              <p className="div-step-desc">
                Mendiskusikan sasaran bisnis, fitur yang dibutuhkan, referensi desain, serta memilih nama domain (.com / .id / .biz.id).
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">02</div>
              <h4 className="div-step-title">Perancangan UI/UX & Konten</h4>
              <p className="div-step-desc">
                Menyusun tata letak halaman yang menarik, hierarki teks yang mudah dipahami, serta integrasi foto dari tim dokumentasi.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">03</div>
              <h4 className="div-step-title">Pengembangan Kode & Optimasi SEO</h4>
              <p className="div-step-desc">
                Proses coding responsif, konfigurasi kecepatan pemuatan (Core Web Vitals), serta penanaman meta tag SEO lokal Google.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">04</div>
              <h4 className="div-step-title">Pengujian, Peluncuran & Pendampingan</h4>
              <p className="div-step-desc">
                Uji coba lintas peramban, serah terima akun pengelola, panduan admin, serta pendampingan teknis berkala.
              </p>
            </div>
          </div>
        </section>

        {/* 4. MENGAPA WD IT */}
        <section className="div-section" id="keunggulan">
          <div className="div-section-header">
            <span className="div-kicker">
              <ShieldCheck size={13} />
              <span>Kelebihan Layanan Kami</span>
            </span>
            <h2 className="div-title">
              Mengapa Memilih Jasa Website <em>WD IT di Solo Raya?</em>
            </h2>
            <p className="div-subtitle">
              Bukan sekadar website selesai dibuat, tetapi platform digital yang siap bekerja mendukung penjualan dan kredibilitas bisnis Anda.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card placeholder-highlight">
              <h4>
                <Database size={17} />
                <span>Transparansi Portofolio & Paket</span>
              </h4>
              <p>
                [ISI: contoh proyek (website/klien yang boleh disebut), paket dan harga, misal paket profil bisnis mulai dari Rp 1.xxx.xxx].
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Struktur Kode Bersih & Ringan</span>
              </h4>
              <p>
                Bebas dari plugin berlebih yang memperlambat website. Kode disusun rapi sehingga website memuat secepat kilat saat dibuka calon konsumen.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Terintegrasi Ekosistem WD Group</span>
              </h4>
              <p>
                Kebutuhan konten foto & video produk disuplai langsung oleh [WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx), menghemat waktu koordinasi vendor terpisah.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Bantuan Teknis & Pemeliharaan</span>
              </h4>
              <p>
                Tim support kami berlokasi di Solo Raya, siap membantu konsultasi berkala, pembaruan data, maupun penanganan kendala server teknis.
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
              Kredibilitas pengembangan teknologi digital dan dedikasi pelayanan WD Group Company di Solo Raya.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami memegang prinsip kejujuran dalam pelayanan. Seluruh penilaian serta testimoni dari klien pengguna solusi teknologi dan divisi WD Group Company dapat Anda periksa langsung di profil resmi Google Maps kami.
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
              Informasi seputar biaya pembuatan website, kepemilikan domain hosting, durasi pengerjaan, dan optimasi SEO di Solo.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Berapa biaya jasa pembuatan website di Solo bersama tim WD IT?
              </summary>
              <div className="div-faq-answer">
                Biaya disesuaikan dengan kebutuhan modul dan kompleksitas fitur, mulai dari landing page UMKM, website profil bisnis, toko online e-commerce, hingga sistem aplikasi kustom. Paket sudah termasuk domain tahun pertama, server hosting kilat, dan sertifikat SSL keamanan.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa lama waktu yang dibutuhkan untuk menyelesaikan pembuatan website?
              </summary>
              <div className="div-faq-answer">
                Untuk website profil standar dan undangan digital pernikahan, proses pengerjaan rata-rata 5 sampai 14 hari kerja setelah teks, logo, dan foto diterima. Sedangkan untuk aplikasi web kustom disesuaikan dengan daftar modul fungsional yang disepakati.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah website yang dibuat di WD IT sudah mendukung SEO Google?
              </summary>
              <div className="div-faq-answer">
                Ya, kami menerapkan standar teknis SEO on-page: struktur heading H1-H3 yang runut, kecepatan muat gambar terkompresi, meta tags judul dan deskripsi terarah, URL ramah mesin pencari, serta data terstruktur schema JSON-LD.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah nama domain dan hosting sepenuhnya menjadi milik klien?
              </summary>
              <div className="div-faq-answer">
                Tentu saja. Kepemilikan akun domain dan hosting didaftarkan atas nama klien atau brand Anda. Kami memberikan seluruh akses kredensial login pengelolaan kepada Anda secara transparan.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah saya bisa mengupdate tulisan dan foto produk sendiri nantinya?
              </summary>
              <div className="div-faq-answer">
                Bisa. Kami merancang panel pengelolaan konten (CMS / admin dashboard) yang intuitif dan mudah dipelajari. Kami juga memberikan sesi panduan singkat agar staf Anda dapat mengunggah artikel blog atau produk baru secara mandiri.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Wilayah mana saja yang dilayani oleh jasa web developer WD IT?
              </summary>
              <div className="div-faq-answer">
                Kami melayani seluruh wilayah Solo Raya (Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri) baik melalui pertemuan tatap muka langsung maupun koordinasi daring di seluruh Indonesia.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI CEPAT */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Diskusi Proyek Digital</span>
            </span>
            <h2 className="div-title">
              Konsultasikan <em>Kebutuhan Website Anda</em>
            </h2>
            <p className="div-subtitle">
              Ceritakan ide proyek atau kendala sistem bisnis Anda. Tim WD IT siap memberikan estimasi teknis dan solusi yang paling efisien.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Perusahaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Hendra Pratama / CV Berkah Solo"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Jenis Kebutuhan Website / Aplikasi *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Website Profil Perusahaan (Company Profile)">Website Profil Perusahaan (Company Profile)</option>
                  <option value="Toko Online E-Commerce WhatsApp">Toko Online E-Commerce WhatsApp</option>
                  <option value="Sistem Informasi Internal & Dashboard">Sistem Informasi Internal &amp; Dashboard</option>
                  <option value="Undangan Digital Pernikahan / Event">Undangan Digital Pernikahan / Event</option>
                  <option value="Pemeliharaan & Optimasi Website">Pemeliharaan &amp; Optimasi Website</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Estimasi Anggaran (Budget)</label>
                <input
                  type="text"
                  placeholder="Misal: Rp 2 - 10 Juta / Menyesuaikan Fitur"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Catatan Fitur / Referensi Website</label>
                <input
                  type="text"
                  placeholder="Misal: Butuh menu reservasi meja & galeri foto"
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Konsultasi Website via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN KE DIVISI LAIN */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Butuh Undangan Digital Sekaligus Wedding Organizer?</h3>
              <p>
                Rencanakan pernikahan impian Anda bersama [WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx) dan dokumentasi video sinematik [WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx). Undangan digital eksklusif dapat dipaketkan langsung dalam <strong>Paket Wedding Lengkap</strong> kami.
              </p>
            </div>
            <Link to="/wedding" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Pelajari Paket Wedding</span>
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
        title="Konsultasi Jasa Website Solo via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Konsultasi Website IT</span>
      </a>
    </DivisionLayout>
  );
}
