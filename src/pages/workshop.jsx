import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  Hammer, 
  Wrench, 
  Ruler, 
  Layers, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  Send, 
  Award,
  HelpCircle,
  Flame,
  ShoppingBag
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD Jaya Workshop, saya ingin konsultasi seputar kompor oli bekas WD Jaya.";
const bookingHref = `https://wa.me/628817134774?text=${encodeURIComponent(defaultWaMsg)}`;
const shopeeStoreUrl = "https://shopee.co.id/wdjayaworkshop?categoryId=100010&entryPoint=ShopByPDP&itemId=29955406536";
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const workshopJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness"],
      "@id": "https://www.wdgroupcompany.biz.id/workshop#business",
      "name": "WD Jaya Workshop Solo - Magetan",
      "alternateName": [
        "WD Jaya Workshop",
        "Produsen Kompor Oli Bekas Solo Raya",
        "Kompor Oli WD Jaya Magetan",
        "Pusat Kompor Oli Bekas Hemat Energi"
      ],
      "url": "https://www.wdgroupcompany.biz.id/workshop",
      "image": "https://www.wdgroupcompany.biz.id/portfolio/workshop/ws-kompor-1.webp",
      "telephone": "+628817134774",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Produsen inovasi kompor oli bekas WD Jaya hemat gas hingga 85% untuk kebutuhan memasak usaha kuliner, catering, peternakan, dan industri di Solo Raya, Magetan & seluruh Indonesia.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Irian Gang Durian No. 3, Tawanganom",
        "addressLocality": "Magetan",
        "addressRegion": "Jawa Timur",
        "postalCode": "63312",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.6538,
        "longitude": 111.3283
      },
      "sameAs": [
        "https://instagram.com/wdgroupcompany",
        "https://maps.google.com/?cid=423251003407914670"
      ],
      "areaServed": [
        "Surakarta", "Sukoharjo", "Karanganyar", "Klaten", "Boyolali", "Sragen", "Wonogiri", "Magetan", "Madiun", "Ngawi"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wdgroupcompany.biz.id/workshop#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Apa keunggulan kompor oli bekas WD Jaya dibanding kompor gas LPG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kompor oli bekas WD Jaya mampu memangkas biaya bahan bakar harian hingga 85%, menghasilkan nyala api biru stabil yang tidak merusak/menggosongkan panci, serta dilengkapi paket Blower Super pengatur kecepatan angin."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah melayani pemesanan kompor custom dan pengiriman ke seluruh Indonesia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami melayani kustomisasi ukuran meja, tinggi dudukan, dan jumlah tungku kompor oli, serta melayani pengiriman ke seluruh Indonesia dengan opsi transaksi aman COD (Bayar di Tempat) dan via Shopee."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/workshop#breadcrumb",
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
          "name": "Kompor Oli Bekas WD Jaya Workshop",
          "item": "https://www.wdgroupcompany.biz.id/workshop"
        }
      ]
    }
  ]
};

const workshopConfig = {
  category: "workshop",
  brand: "WD Jaya Workshop",
  logoText: "WD",
  logoAccent: "Jaya",
  logoSuffix: "Workshop",
  badge: "Inovasi Kompor Oli Bekas WD Jaya",
  kicker: "WD Jaya Workshop",
  title: "Inovasi Kompor Oli Bekas,",
  titleAccent: "Hemat Hingga 85% & Lebih Kuat.",
  description:
    "WD Jaya Workshop menghadirkan inovasi kompor oli bekas hemat bahan bakar hingga 85% dibanding gas LPG untuk kebutuhan usaha kuliner, warung makan, katering, peternakan, hingga industri kecil di Solo Raya, Magetan & seluruh Indonesia. Dilengkapi paket Blower Super, api biru stabil, dan bergaransi resmi.",
  seoTitle: "Produsen Kompor Oli Bekas Berkualitas Solo - Magetan | WD Jaya Workshop",
  seoDescription:
    "Produsen kompor oli bekas WD Jaya hemat gas hingga 85% di Solo Raya & Magetan. Dilengkapi kipas blower super, api biru stabil, rangka besi tebal, dan bergaransi resmi.",
  seoUrl: "https://www.wdgroupcompany.biz.id/workshop",
  seoImage: "https://www.wdgroupcompany.biz.id/portfolio/workshop/ws-kompor-1.webp",
  seoImageAlt: "Produk kompor oli bekas WD Jaya Workshop hemat energi",
  seoJsonLd: workshopJsonLd,
  primaryCta: "Konsultasi & Pesan Produk",
  primaryHref: bookingHref,
  primaryToast: "Inquiry produk workshop dicatat",
  savedMessage: "Referensi produk disimpan",
  galleryTitle: "Katalog & Portofolio Kompor Oli Bekas WD Jaya",
  mark: "WS",
  tabs: ["Semua Produk", "Kompor"],
  tabAliases: {
    "Kompor": ["kompor", "stove", "burner"],
    "Commercial Stoves": ["kompor", "stove", "burner"],
  },
  stats: [
    { value: "85%", label: "Efisiensi Hemat BBM" },
    { value: "Blue Fire", label: "Api Biru Bersih" },
    { value: "Garansi", label: "Jaminan Mutu Hasil" },
  ],
  accent: "#22c55e",
  accentSoft: "rgba(34,197,94,0.14)",
  accentBorder: "rgba(34,197,94,0.28)",
  bg: "#07110c",
  muted: "#9aa89f",
};

export default function WorkshopLayout() {
  const [formState, setFormState] = useState({
    name: "",
    needs: "Kompor Oli Bekas WD Jaya (Model Standard / 2 Tungku)",
    location: "",
    notes: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD Jaya Workshop, saya ingin konsultasi pemesanan produk:
- Nama: ${formState.name}
- Kategori Produk: ${formState.needs}
- Lokasi Pemasangan: ${formState.location || "Solo Raya / Magetan"}
- Keterangan / Estimasi Ukuran: ${formState.notes || "Belum ada detail, mohon survey/konsultasi"}`;
    window.open(`https://wa.me/628817134774?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={workshopConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGENALAN WD JAYA WORKSHOP */}
        <section className="div-section" id="tentang-workshop">
          <div className="div-section-header">
            <span className="div-kicker">
              <Building2 size={13} />
              <span>Mengenal Profil Divisi</span>
            </span>
            <h2 className="div-title">
              Mengenal WD Jaya Workshop &amp; <em>Solusi Manufaktur Terapan</em>
            </h2>
            <p className="div-subtitle">
              Divisi manufaktur dan rekayasa mekanikal dari WD Group Company yang berfokus menciptakan inovasi peralatan usaha tangguh, efisien, dan berdaya guna tinggi.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                <strong>WD Jaya Workshop</strong> adalah unit manufaktur, rekayasa mekanikal, dan fabrikasi alat industri terapan yang bernaung di bawah naungan <strong>WD Group Company</strong>. Berpusat di <strong>Magetan</strong> serta melayani jangkauan di <strong>Solo Raya (Surakarta, Sukoharjo, Karanganyar, Boyolali, Klaten, Wonogiri, Sragen), Magetan, Madiun, hingga pengiriman ke seluruh Indonesia</strong>, workshop kami berdedikasi menciptakan perlengkapan kerja dan peralatan produksi yang kokoh, presisi, dan solutif bagi kemajuan usaha Anda.
              </p>
              <p>
                Sebagai bengkel manufaktur yang adaptif terhadap kebutuhan dunia usaha, kami tidak sekadar merakit besi konvensional, melainkan berfokus pada <strong>inovasi teknologi tepat guna yang memangkas biaya operasional harian</strong>. Salah satu produk unggulan terdepan kami adalah <strong>Kompor Oli Bekas WD Jaya</strong>—sebuah terobosan pembakaran hemat energi yang terbukti mampu memangkas pengeluaran bahan bakar hingga <strong>85%</strong> dibanding gas LPG biasa, dilengkapi paket <em>Blower Super</em> pengatur debit udara serta konstruksi rangka besi tebal tahan beban panas ekstrem.
              </p>
              <p>
                Didukung keterampilan bubut mekanikal, teknik pengelasan presisi yang matang, serta uji fungsi menyeluruh sebelum produk diserahkan, WD Jaya Workshop memadukan standar mutu andal dengan harga yang sangat terjangkau bagi para pelaku UMKM kuliner, katering, peternakan, maupun industri pengolahan. Kami berkomitmen memberikan kenyamanan bertransaksi melalui layanan purna jual bergaransi resmi serta opsi transaksi aman dengan sistem <strong>COD (Bayar di Tempat)</strong>.
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <Flame size={18} />
                  <span>Pelopor Inovasi Hemat Biaya</span>
                </h4>
                <p>
                  Menghadirkan terobosan teknologi pembakaran aplikatif seperti Kompor Oli Bekas yang memangkas pengeluaran bahan bakar dapur usaha harian hingga 85%.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <ShieldCheck size={18} />
                  <span>Konstruksi Kokoh &amp; Bergaransi</span>
                </h4>
                <p>
                  Dirakit dari profil besi tebal bermutu tinggi dengan sambungan las matang, uji fungsi riil, serta melayani sistem pembayaran aman COD (Bayar di Tempat).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRODUK & LAYANAN FABRIKASI (KOMPOR OLI BEKAS WD JAYA WORKSHOP) */}
        <section className="div-section" id="produk-layanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Flame size={13} />
              <span>Produk Unggulan Workshop</span>
            </span>
            <h2 className="div-title">
              Kompor Oli Bekas <em>WD Jaya Workshop</em>
            </h2>
            <p className="div-subtitle">
              Inovasi teknologi pembakaran hemat BBM cerdas hingga 85% berbahan bakar oli bekas untuk memasak harian usaha kuliner, warung makan, catering, peternakan, hingga industri rumahan.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <Flame size={24} />
              </div>
              <h3 className="div-service-title">Kompor Oli Siap Pakai (1 &amp; 2 Tungku)</h3>
              <p className="div-service-desc">
                Pilihan unit kompor oli bekas siap pakai untuk kebutuhan harian usaha: Model Standard 1 tungku, Model Kaki Tinggi ergonomis, dan Meja Double 2 Tungku untuk dapur komersial.
              </p>
              <ul className="div-service-bullets">
                <li>Bakar tanpa boros &amp; hemat biaya gas hingga 85% (Rp5.000/liter)</li>
                <li>Nyala api biru stabil, terarah, dan pembakaran optimal tanpa menggosongkan panci</li>
                <li>Konstruksi rangka besi tebal kokoh tahan panas ekstrem dan beban masakan berat</li>
                <li>Siap pakai langsung dan melayani opsi transaksi COD (Bayar di Tempat)</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Sparkles size={24} />
              </div>
              <h3 className="div-service-title">Paket Blower Super &amp; Speed Controller</h3>
              <p className="div-service-desc">
                Seluruh pembelian kompor oli sudah include unit kipas Blower Super bertenaga tinggi dan box pengatur kecepatan udara untuk pembakaran sempurna dan minim asap.
              </p>
              <ul className="div-service-bullets">
                <li>Dilengkapi box pengatur kecepatan (speed controller) untuk menyetel besar-kecil semburan api</li>
                <li>Aliran udara kencang &amp; stabil, serta konsumsi daya listrik sangat rendah</li>
                <li>Posisi dudukan blower fleksibel (bebas diatur di kiri, kanan, depan, atau belakang)</li>
                <li>Motor blower tahan panas dan awet digunakan untuk operasional dapur non-stop</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Wrench size={24} />
              </div>
              <h3 className="div-service-title">Layanan Custom Sesuai Kebutuhan Usaha</h3>
              <p className="div-service-desc">
                Kami memahami setiap dapur usaha memiliki kebutuhan berbeda. WD Jaya Workshop siap membuat kompor oli custom sesuai dimensi dan target produksi Anda.
              </p>
              <ul className="div-service-bullets">
                <li>Pilihan tingkatan custom: Basic Custom, Medium Custom, hingga Full Custom industri</li>
                <li>Bebas request ukuran panjang, lebar, tinggi meja kompor, serta jumlah burner tungku</li>
                <li>Estimasi harga transparan, jujur, serta konsultasi kebutuhan teknis gratis</li>
                <li>Kemasan packing proteksi ekstra dan jaminan garansi resmi kepuasan pelanggan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR PEMESANAN & PEMBELIAN (SHOPEE & WHATSAPP) */}
        <section className="div-section" id="alur-pemesanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <CheckCircle2 size={13} />
              <span>Pilihan Belanja Praktis &amp; Fleksibel</span>
            </span>
            <h2 className="div-title">
              Alur Pemesanan <em>Bisa via Shopee &amp; WhatsApp</em>
            </h2>
            <p className="div-subtitle">
              Pilih jalur transaksi yang paling mudah bagi Anda: checkout aman langsung lewat Official Store Shopee atau konsultasi via WhatsApp dengan opsi COD (Bayar di Tempat).
            </p>
          </div>

          <div className="div-steps-grid">
            <div className="div-step-card">
              <div className="div-step-number">01</div>
              <h4 className="div-step-title">Pilih Jalur Order (Shopee / WA)</h4>
              <p className="div-step-desc">
                Bisa langsung pesan unit kompor oli &amp; blower super lewat toko Shopee kami, atau hubungi WhatsApp jika ingin konsultasi spesifikasi khusus terlebih dahulu.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">02</div>
              <h4 className="div-step-title">Metode Pembayaran Aman &amp; COD</h4>
              <p className="div-step-desc">
                Gunakan berbagai metode pembayaran terverifikasi di Shopee (SPayLater/cicilan/transfer), atau pilih opsi sistem COD (Bayar di Tempat) saat barang tiba di lokasi Anda.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">03</div>
              <h4 className="div-step-title">Uji Fungsi &amp; Packing Ekstra Kuat</h4>
              <p className="div-step-desc">
                Setiap unit kompor diuji nyala api birunya dan sistem blower di bengkel sebelum dipacking kayu / bubble tebal agar aman dalam pengiriman ekspedisi kargo.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">04</div>
              <h4 className="div-step-title">Pengiriman Cepat &amp; Bergaransi</h4>
              <p className="div-step-desc">
                Nomor resi pengiriman dapat dipantau langsung via aplikasi Shopee maupun ekspedisi kargo resmi, lengkap dengan garansi resmi dan panduan pemakaian purna jual.
              </p>
            </div>
          </div>

          {/* BANNER PILIHAN JALUR TRANSAKSI: SHOPEE & WHATSAPP */}
          <div style={{
            marginTop: "24px",
            padding: "22px 26px",
            background: "linear-gradient(135deg, rgba(238, 77, 45, 0.12), rgba(255, 255, 255, 0.03))",
            border: "1px solid rgba(238, 77, 45, 0.35)",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ee4d2d", fontWeight: "700", fontSize: "14.5px", marginBottom: "6px" }}>
                <ShoppingBag size={19} />
                <span>Belanja Cepat &amp; Praktis via Shopee</span>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", maxWidth: "560px", lineHeight: "1.6" }}>
                Mau transaksi dengan jaminan proteksi marketplace, gratis ongkir, dan voucher promo? Kunjungi Official Store Shopee kami atau pesan langsung via WhatsApp dengan layanan COD.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={shopeeStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#ee4d2d",
                  border: "1px solid #ee4d2d",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(238, 77, 45, 0.35)"
                }}
              >
                <ShoppingBag size={16} />
                <span>Beli Langsung di Shopee</span>
              </a>
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="div-btn-google"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none"
                }}
              >
                <MessageCircle size={16} />
                <span>Konsultasi WA / COD</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. TIGA PILAR NILAI WD JAYA WORKSHOP */}
        <section className="div-section" id="keunggulan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Award size={13} />
              <span>Komitmen Kualitas</span>
            </span>
            <h2 className="div-title">
              Mengapa Memilih <em>WD Jaya Workshop?</em>
            </h2>
            <p className="div-subtitle">
              Tiga keunggulan utama yang menjadikan kami mitra terpercaya kebutuhan peralatan usaha dan manufaktur Anda.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>1. Harga Terjangkau (Murah)</span>
              </h4>
              <p>
                Produksi langsung di workshop sendiri tanpa perantara pihak ketiga. Anda mendapatkan harga tangan pertama yang transparan dan kompetitif.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>2. Konsultasi Ramah &amp; Solutif</span>
              </h4>
              <p>
                Jangan ragu berkonsultasi mengenai efisiensi bahan bakar, kapasitas produksi, maupun spesifikasi teknis mesin untuk usaha Anda.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <ShieldCheck size={17} />
                <span>3. Bergaransi &amp; Konstruksi Rapi</span>
              </h4>
              <p>
                Kualitas rangka besi kokoh tahan panas, sistem pengelasan matang teruji, serta jaminan garansi resmi purna jual.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <Building2 size={17} />
                <span>Ekosistem Lengkap WD Group</span>
              </h4>
              <p>
                Didukung oleh ekosistem WD Group Company dengan reputasi terpercaya di Jawa Tengah dan Jawa Timur dalam pengerjaan aneka proyek.
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
              Ulasan &amp; Reputasi Kami di <em>Google Maps</em>
            </h2>
            <p className="div-subtitle">
              Kepercayaan konsumen hunian pribadi, kontraktor, dan instansi adalah prioritas dedikasi kami.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami menjunjung tinggi integritas kepuasan pelanggan. Seluruh penilaian mengenai ketepatan waktu fabrikasi, kerapian instalasi pagar, kanopi, dan konstruksi dapat Anda lihat secara terbuka di profil resmi Google Maps kami.
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
              Informasi lengkap seputar pemakaian kompor oli bekas, efisiensi bahan bakar, paket blower super, dan garansi resmi.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Apa saja keunggulan Kompor Oli Bekas WD Jaya dibandingkan kompor gas LPG?
              </summary>
              <div className="div-faq-answer">
                Kompor oli bekas inovasi WD Jaya mampu memangkas biaya bahan bakar dapur hingga <strong>85%</strong> (hanya sekitar Rp5.000/liter oli bekas). Nyala api biru stabil dan terarah berkat paket <em>Blower Super</em>, pembakaran maksimal tanpa menggosongkan bagian bawah panci, serta rangka besi tebal kokoh tahan panas ekstrem.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa lama estimasi pengiriman dan apakah unit sudah siap pakai?
              </summary>
              <div className="div-faq-answer">
                Seluruh unit kompor oli siap pakai (Standard, Kaki Tinggi, Meja 2 Tungku) berstatus <strong>ready stock</strong> dan siap dikirim dalam 1–2 hari kerja lengkap dengan paket Blower Super &amp; box speed controller. Untuk unit custom khusus dengan dimensi tertentu diproses dalam 3–7 hari kerja.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah bisa pesan kompor oli custom (ukuran meja, tinggi rangka &amp; tungku)?
              </summary>
              <div className="div-faq-answer">
                Sangat bisa. Kami menyediakan pilihan <strong>Basic Custom, Medium Custom, hingga Full Custom</strong>. Anda dapat menentukan panjang, lebar, tinggi meja kompor, jumlah tungku, hingga posisi dudukan kipas blower (kiri/kanan/depan/belakang) sesuai tata letak dapur Anda.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Bagaimana jaminan garansi dan apakah bisa bayar di tempat (COD)?
              </summary>
              <div className="div-faq-answer">
                Kami memberikan garansi resmi fungsi pembakaran, kekuatan konstruksi rangka las, dan motor kipas blower super. Kami juga melayani transaksi aman sistem <strong>COD (Bayar di Tempat)</strong> saat barang sampai di lokasi Anda, atau melalui Official Store Shopee kami.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Di mana lokasi workshop dan bagaimana jangkauan pengirimannya?
              </summary>
              <div className="div-faq-answer">
                Workshop kami berpusat di Jalan Irian Gang Durian No. 3 Tawanganom, Magetan. Kami melayani pengantaran langsung ke area Solo Raya (Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri), Magetan, Madiun, Ngawi, serta pengiriman kargo berproteksi kayu/bubble tebal ke seluruh Indonesia.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI / PESAN PRODUK */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Hitung Estimasi Biaya</span>
            </span>
            <h2 className="div-title">
              Pemesanan Produk &amp; <em>Konsultasi Workshop</em>
            </h2>
            <p className="div-subtitle">
              Sampaikan pesanan kompor oli bekas, paket blower super, atau konsultasi custom ukuran untuk mendapatkan respon cepat dan penawaran terbaik.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Instansi *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bapak Gunawan / Dapur Kuliner Berkah"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Pilihan Model Kompor Oli / Layanan *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Kompor Oli Model Standard (1 Tungku)">Kompor Oli Bekas Model Standard (1 Tungku)</option>
                  <option value="Kompor Oli Model Meja (2 Tungku)">Kompor Oli Bekas Model Meja (Double 2 Tungku)</option>
                  <option value="Kompor Oli Model Kaki Tinggi / Big Power">Kompor Oli Model Kaki Tinggi / Big Power</option>
                  <option value="Kompor Oli Bekas Custom (Sesuai Kebutuhan Usaha)">Kompor Oli Bekas Custom (Ukuran &amp; Rangka Khusus)</option>
                  <option value="Paket Kipas Blower Super &amp; Speed Controller">Paket Kipas Blower Super &amp; Speed Controller</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Kota / Alamat Pengiriman *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Magetan / Solo / Madiun / Surabaya / Luar Jawa"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Catatan Pesanan / Keterangan Kebutuhan</label>
                <input
                  type="text"
                  placeholder="Misal: Paket Kompor Oli Bekas + Blower Super, kirim via COD / Shopee"
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Pesanan / Konsultasi via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN KE DIVISI LAIN */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Membutuhkan Pengadaan Acara atau Solusi Digital?</h3>
              <p>
                Selain inovasi kompor oli bekas, ekosistem <strong>WD Group Company</strong> juga menyediakan layanan profesional <Link to="/wedding">Wedding Organizer</Link>, <Link to="/event">Event Organizer</Link>, <Link to="/production">Visual Media Production</Link>, hingga <Link to="/it">Solusi Teknologi IT</Link>.
              </p>
            </div>
            <Link to="/it" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Eksplor Layanan WD Group</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

        {/* FOOTER COPYRIGHT */}
        <footer className="div-footer-copyright">
          <p>@2026 PT WD GROUP SOLO – WD JAYA WORKSHOP</p>
        </footer>

      </div>

      {/* FLOATING WA BUTTON */}
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="div-floating-wa"
        title="Pesan Kompor Oli & Konsultasi Workshop via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Pesan & Konsultasi</span>
      </a>
    </DivisionLayout>
  );
}
