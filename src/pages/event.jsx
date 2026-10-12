import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Building2, 
  Music2, 
  CalendarCheck2, 
  Users2, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  Send
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD Event Organizer, saya ingin konsultasi untuk acara kami.";
const bookingHref = `https://wa.me/6285707909415?text=${encodeURIComponent(defaultWaMsg)}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EventPlanner", "LocalBusiness"],
      "@id": "https://www.wdgroupcompany.biz.id/event#business",
      "name": "WD Event Organizer Solo Raya",
      "alternateName": ["WD Event", "WD EO Solo", "WD Group Company Event"],
      "url": "https://www.wdgroupcompany.biz.id/event",
      "image": "https://www.wdgroupcompany.biz.id/resources/Event_Organizer/Event2.webp",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Jasa event organizer Solo dan EO Solo Raya profesional. Melayani corporate event, gathering perusahaan, konser musik, pameran expo, dan seminar.",
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
      "@id": "https://www.wdgroupcompany.biz.id/event#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Acara apa saja yang dapat ditangani oleh WD Event Organizer di Solo Raya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami menangani corporate gathering, konser musik, festival, pameran (exhibition & expo), seminar, product launching, gala dinner, hingga perhelatan private gathering di seluruh wilayah Solo dan Solo Raya."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana alur penyusunan konsep dan anggaran acara?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami memulai dari sesi brief kebutuhan klien, dilanjutkan perancangan proposal tematik, breakdown anggaran transparan, jadwal kerja teknis, hingga pengawalan show management di hari-H."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah WD Event Organizer menyediakan perlengkapan panggung, sound system, dan lighting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami bekerja sama dengan vendor rigging panggung, sound system line-array berdaya besar, lighting panggung artistik, dan layar LED videotron standar industri konser dan korporat."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa minimal waktu persiapan sebelum tanggal acara terselenggara?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Untuk event korporat dan seminar disarankan minimal 1 hingga 2 bulan persiapan. Sedangkan untuk festival konser musik skala besar disarankan 2 hingga 4 bulan untuk perizinan dan talent booking."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah melayani pengurusan perizinan keramaian dan pengamanan acara di Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, tim kami siap mendampingi proses koordinasi perizinan instansi terkait, kepolisian, pengamanan lokasi, hingga protokol kesehatan dan keselamatan kerja (K3) di lokasi venue."
          }
        },
        {
          "@type": "Question",
          "name": "Wilayah mana saja yang dijangkau oleh tim WD Event Organizer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami melayani 7 wilayah Solo Raya: Surakarta (Kota Solo), Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri tanpa kendala mobilitas operasional."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/event#breadcrumb",
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
          "name": "Event Organizer Solo Raya",
          "item": "https://www.wdgroupcompany.biz.id/event"
        }
      ]
    }
  ]
};

const eventConfig = {
  category: "event",
  brand: "WD Event Organizer",
  logoText: "WD",
  logoAccent: "Event",
  logoSuffix: "Organizer",
  badge: "Event Organizer Solo Raya",
  kicker: "WD Event Organizer",
  title: "Event Organizer",
  titleAccent: "Solo & Solo Raya.",
  description:
    "WD Event Organizer melayani jasa EO Solo dan Solo Raya untuk corporate event, konser musik, pameran expo, seminar, dan perhelatan gathering dengan konsep terarah, koordinasi vendor solid, dan eksekusi panggung tertib.",
  seoTitle: "Event Organizer Solo & EO Solo Raya | WD Event Organizer",
  seoDescription:
    "Jasa event organizer Solo dan EO Solo Raya dari WD Event. Ahli corporate gathering, konser musik, pameran expo, festival, dan seminar profesional.",
  seoUrl: "https://www.wdgroupcompany.biz.id/event",
  seoImage: "https://www.wdgroupcompany.biz.id/resources/Event_Organizer/Event2.webp",
  seoImageAlt: "Panggung megah konser dan tata pencahayaan pameran oleh WD Event Organizer Solo Raya",
  seoJsonLd: eventJsonLd,
  primaryCta: "Konsultasi Acara",
  primaryHref: bookingHref,
  primaryToast: "Inquiry event dicatat",
  savedMessage: "Referensi event disimpan",
  galleryTitle: "Portofolio Event & Produksi Panggung",
  mark: "EO",
  tabs: ["All Projects", "Corporate", "Concert", "Exhibition", "Private"],
  stats: [
    { value: "Concept", label: "Perencanaan" },
    { value: "Vendor", label: "Koordinasi" },
    { value: "Field", label: "Kontrol Lapangan" },
  ],
  accent: "#6366f1",
  accentSoft: "rgba(99,102,241,0.15)",
  accentBorder: "rgba(99,102,241,0.30)",
  bg: "#080914",
  muted: "#9b9db6",
};

export default function EventOrganizer() {
  const [formState, setFormState] = useState({
    name: "",
    needs: "Corporate Gathering",
    date: "",
    budget: "Fleksibel / Diskusi",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD Event Organizer, saya ingin konsultasi acara:
- Nama: ${formState.name}
- Jenis Kebutuhan: ${formState.needs}
- Tanggal Acara: ${formState.date || "Belum ditentukan"}
- Estimasi Budget: ${formState.budget}`;
    window.open(`https://wa.me/6285707909415?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={eventConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGANTAR DIVISI */}
        <section className="div-section" id="tentang-eo">
          <div className="div-section-header">
            <span className="div-kicker">
              <Sparkles size={13} />
              <span>Manajemen Acara Berkelas</span>
            </span>
            <h2 className="div-title">
              Jasa Event Organizer di <em>Solo dan Solo Raya</em> dengan Kontrol Presisi
            </h2>
            <p className="div-subtitle">
              Mengubah gagasan acara Anda menjadi pengalaman nyata yang tertata rapi, megah, dan berkesan bagi seluruh audiens dan pemangku kepentingan.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                Menyelenggarakan sebuah acara berskala besar maupun menengah di <strong>Solo dan Solo Raya</strong> menuntut integrasi manajemen yang matang. Di tengah pesatnya pertumbuhan industri kreatif, pariwisata, dan bisnis di kawasan Surakarta, <strong>WD Event Organizer</strong> (divisi dari <strong>WD Group Company</strong>) hadir memberikan solusi manajemen acara komprehensif, mulai dari konseptualisasi kreatif, perancangan tata panggung, manajemen artis/talent, hingga pengawasan teknis di lapangan.
              </p>
              <p>
                Kami percaya bahwa kesuksesan sebuah perhelatan—baik berupa <strong>corporate event, konser musik, pameran expo, seminar bisnis, maupun private gathering</strong>—ditentukan oleh ketelitian dalam mengelola detail terkecil. Dengan koordinasi komunikasi radio yang solid, setiap menit rundown dikawal secara ketat agar tidak terjadi kekosongan panggung atau kepanikan teknis.
              </p>
              <p>
                Cakupan layanan kami menjangkau seluruh 7 wilayah <strong>Solo Raya</strong>: <strong>Kota Surakarta (Solo), Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri</strong>. Didukung kekuatan ekosistem internal WD Group, kami menyelaraskan tata panggung dengan dokumentasi multi-kamera ([WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx)) dan pengisi acara musik berkualitas ([WD Music](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/music.jsx)).
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <ShieldCheck size={18} />
                  <span>Ketenangan Klien & Ketertiban Show</span>
                </h4>
                <p>
                  Anda dan jajaran manajemen dapat fokus pada substansi acara dan menyambut tamu VIP, sementara urusan teknis panggung dan rundown berjalan otomatis di bawah kendali kami.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <Layers size={18} />
                  <span>Jaringan Vendor Panggung Terlengkap</span>
                </h4>
                <p>
                  Terkoneksi langsung dengan persewaan rigging panggung kokoh, sound system standar konser, lighting panggung canggih, dan LED videotron resolusi tajam di Solo Raya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DAFTAR LAYANAN DENGAN PENJELASAN */}
        <section className="div-section" id="layanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Building2 size={13} />
              <span>Ruang Lingkup</span>
            </span>
            <h2 className="div-title">
              Layanan Utama <em>WD Event Organizer</em>
            </h2>
            <p className="div-subtitle">
              Solusi fleksibel untuk berbagai format perhelatan formal, semi-formal, maupun festival hiburan massal di Solo Raya.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <Building2 size={22} />
              </div>
              <h3>Corporate Event & Gathering</h3>
              <p>
                Manajemen family gathering perusahaan, gala dinner tahunan, employee outing, hingga malam apresiasi penghargaan karyawan dengan tema interaktif dan berkesan.
              </p>
              <ul className="div-service-list">
                <li>Penyusunan games & team building berbobot</li>
                <li>Pengaturan tata meja gala dinner & menu katering</li>
                <li>MC profesional & hiburan panggung terpadu</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Music2 size={22} />
              </div>
              <h3>Konser Musik & Festival</h3>
              <p>
                Eksekusi perhelatan festival musik, pentas seni sekolah/kampus, dan konser live artis nasional dengan standar tata panggung, tata suara, dan barikade penonton yang aman.
              </p>
              <ul className="div-service-list">
                <li>Manajemen tata suara line-array & lighting</li>
                <li>Hospitality & riders manajemen artis/talent</li>
                <li>Crowd control & keamanan zonasi penonton</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Layers size={22} />
              </div>
              <h3>Pameran, Expo & Exhibition</h3>
              <p>
                Perencanaan tata ruang booth pameran dagang, pameran UMKM, bursa kerja (job fair), dan expo otomotif/properti di mall maupun convention hall Solo.
              </p>
              <ul className="div-service-list">
                <li>Layouting alur pengunjung & booth pameran</li>
                <li>Penyediaan partisi stand, listrik, & signage</li>
                <li>Registrasi pengunjung & show management</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <CalendarCheck2 size={22} />
              </div>
              <h3>Seminar & Product Launching</h3>
              <p>
                Penyelenggaraan seminar nasional, workshop bisnis, peresmian gedung, dan peluncuran produk baru dengan presentasi multimedia yang memukau mitra bisnis.
              </p>
              <ul className="div-service-list">
                <li>Instalasi panggung modern & LED screen</li>
                <li>Manajemen registrasi peserta & seminar kit</li>
                <li>Live streaming & dokumentasi liputan media</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Users2 size={22} />
              </div>
              <h3>Private Gathering & Syukuran</h3>
              <p>
                Pengawalan pesta ulang tahun eksklusif, reuni akbar keluarga/alumni, dan jamuan syukuran pribadi dengan suasana akrab, hangat, dan tertib.
              </p>
              <ul className="div-service-list">
                <li>Konsep dekorasi tematik intim</li>
                <li>Akustik live music pengiring santai</li>
                <li>Dokumentasi foto & video sinematik</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR KERJA */}
        <section className="div-section" id="alur-kerja">
          <div className="div-section-header">
            <span className="div-kicker">
              <CalendarCheck2 size={13} />
              <span>Workflow Teruji</span>
            </span>
            <h2 className="div-title">
              Alur Kerja Profesional <em>Manajemen Event</em>
            </h2>
            <p className="div-subtitle">
              Setiap tahapan dirancang sistematis untuk menjamin transparansi biaya dan keberhasilan eksekusi di lokasi acara.
            </p>
          </div>

          <div className="div-workflow-grid">
            <div className="div-step-card">
              <div className="div-step-num">01</div>
              <h3 className="div-step-title">Brief & Pemetaan Tujuan</h3>
              <p className="div-step-desc">
                Mendengarkan sasaran acara, profil tamu undangan, kebutuhan fasilitas teknis, dan perkiraan alokasi anggaran yang direncanakan klien.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">02</div>
              <h3 className="div-step-title">Desain Konsep & Proposal</h3>
              <p className="div-step-desc">
                Menyusun proposal terperinci berisi tema kreatif, timeline persiapan, spesifikasi teknis vendor, layout venue, dan rincian anggaran transparan.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">03</div>
              <h3 className="div-step-title">Technical Meeting & Rehearsal</h3>
              <p className="div-step-desc">
                Koordinasi teknis bersama seluruh pihak pengelola venue, vendor audio visual, pengisi acara, dan gladi bersih gladi kotor sebelum hari-H.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">04</div>
              <h3 className="div-step-title">Eksekusi Hari-H & Evaluasi</h3>
              <p className="div-step-desc">
                Pengoperasian panggung oleh Show Director dan kru lapangan dengan komunikasi HT terpadu, disusul laporan pertanggungjawaban acara.
              </p>
            </div>
          </div>
        </section>

        {/* 4. STANDAR KEPERCAYAAN */}
        <section className="div-section" id="kepercayaan">
          <div className="div-section-header">
            <span className="div-kicker">
              <ShieldCheck size={13} />
              <span>Integritas Kerja</span>
            </span>
            <h2 className="div-title">
              Komitmen Kualitas <em>WD Event Organizer</em>
            </h2>
            <p className="div-subtitle">
              Menghadirkan standar operasional yang dapat diandalkan oleh korporasi, instansi, maupun komunitas di Solo Raya.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Pengalaman Proyek & Lapangan</span>
              </h4>
              <p>
                [ISI: jenis acara yang sering ditangani, jumlah proyek, contoh Telah menangani puluhan gathering perusahaan, konser musik kampus, dan expo di Solo Raya].
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Kru Lapangan Terlatih & Beretika</span>
              </h4>
              <p>
                Setiap anggota kru dibekali SOP kerja yang santun, tanggap darurat, dan berseragam identitas resmi selama bertugas di lokasi acara.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Rencana Kontinjensi Cadangan</span>
              </h4>
              <p>
                Selalu menyiapkan back-up teknis genset, mic cadangan, pengamanan cuaca panggung outdoor, dan jalur evakuasi keselamatan pengunjung.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Transparansi Laporan Anggaran</span>
              </h4>
              <p>
                Rincian biaya disajikan secara terbuka tanpa ada biaya tersembunyi yang merugikan pihak panitia atau perusahaan Anda.
              </p>
            </div>
          </div>
        </section>

        {/* 5. ULASAN GOOGLE MAPS */}
        <section className="div-section" id="ulasan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Sparkles size={13} />
              <span>Transparansi Pelayanan</span>
            </span>
            <h2 className="div-title">
              Ulasan Klien Kami di <em>Google Maps</em>
            </h2>
            <p className="div-subtitle">
              Simak penilaian langsung dari klien-klien yang telah mempercayakan perhelatan acaranya kepada WD Group Company di Google Maps.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami menghargai setiap masukan dan pengalaman nyata dari para penyelenggara acara. Seluruh ulasan klien WD Group dapat Anda periksa secara terbuka pada profil Google Maps resmi kami.
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

        {/* 6. FAQ LENGKAP (MINIMAL 6) */}
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
              Informasi seputar konsultasi, perizinan, dan penanganan event di wilayah Solo dan Solo Raya.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Acara apa saja yang dapat ditangani oleh WD Event Organizer di Solo Raya?
              </summary>
              <div className="div-faq-answer">
                Kami melayani berbagai format acara: corporate event, company gathering, konser musik, pentas seni, pameran (exhibition & expo), seminar nasional, peluncuran produk (product launching), hingga private party di Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Bagaimana proses konsultasi awal dan penyusunan proposal acara?
              </summary>
              <div className="div-faq-answer">
                Konsultasi awal dapat dilakukan secara daring maupun tatap muka langsung di kantor kami. Anda cukup menyampaikan garis besar tujuan acara, perkiraan tanggal, dan estimasi audiens. Tim kami akan menyusun rancangan konsep tematik dan penawaran anggaran terstruktur untuk dipelajari bersama.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah WD Event Organizer menyediakan perlengkapan audio visual, panggung, dan lighting?
              </summary>
              <div className="div-faq-answer">
                Ya, kami menyediakan paket peralatan lengkap mencakup rigging panggung, sound system berdaya tinggi, tata lampu panggung (moving head, par led, beam), LED videotron indoor/outdoor, genset cadangan, hingga perlengkapan multimedia panggung standar konser.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa minimal waktu persiapan sebelum perhelatan acara dimulai?
              </summary>
              <div className="div-faq-answer">
                Untuk perhelatan corporate gathering dan seminar, waktu ideal adalah 1 hingga 2 bulan sebelumnya. Untuk konser musik dan festival skala publik yang memerlukan perizinan keamanan kepolisian serta booking artis nasional, disarankan 2 hingga 4 bulan persiapan.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah tim membantu pengurusan perizinan keramaian lokasi di Solo?
              </summary>
              <div className="div-faq-answer">
                Tentu saja. Kami siap mendampingi pihak panitia dalam mengurus perizinan keramaian kepolisian, koordinasi keamanan setempat, tim medis, pemadam kebakaran, serta perizinan teknis dengan pengelola venue convention hall di Solo Raya.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Wilayah mana saja yang dijangkau oleh tim WD Event Organizer?
              </summary>
              <div className="div-faq-answer">
                Kami melayani seluruh 7 daerah di Solo Raya tanpa kendala akomodasi: Kota Surakarta, Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri, dengan basis operasional di koridor strategis Sukoharjo-Solo.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI CEPAT & AREA LAYANAN */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Mulai Rencana Anda</span>
            </span>
            <h2 className="div-title">
              Konsultasikan <em>Event Anda Sekarang</em>
            </h2>
            <p className="div-subtitle">
              Kirimkan brief singkat acara Anda. Tim WD Event Organizer akan segera menghubungi Anda dengan estimasi solusi terbaik.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Nama Perusahaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Budi Santoso / PT Maju Gemilang"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Jenis Kebutuhan Acara *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Corporate Gathering">Corporate Event & Gathering</option>
                  <option value="Konser Musik & Festival">Konser Musik & Festival</option>
                  <option value="Pameran & Exhibition Expo">Pameran / Exhibition Expo</option>
                  <option value="Seminar & Launching">Seminar & Product Launching</option>
                  <option value="Private Gathering">Private Gathering / Syukuran</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Rencana Tanggal Pelaksanaan *</label>
                <input
                  type="text"
                  placeholder="Misal: November 2026 / Q4 2026"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Estimasi Anggaran (Budget)</label>
                <input
                  type="text"
                  placeholder="Misal: Rp 25 - 50 Juta / Fleksibel"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Konsultasi via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN: PAKET WEDDING LENGKAP */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Merencanakan Acara Pernikahan Sekaligus?</h3>
              <p>
                WD Group Company menyediakan <strong>Paket Wedding Lengkap</strong> yang memadukan keahlian Wedding Organizer ([WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx)), dokumentasi sinematik ([WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx)), dan live band hiburan panggung ([WD Music](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/music.jsx)) dalam satu paket terpadu yang lebih hemat dan praktis.
              </p>
            </div>
            <Link to="/wedding" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Lihat Paket Wedding</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="div-floating-wa"
        title="Konsultasi Event Organizer Solo via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Konsultasi EO Solo</span>
      </a>
    </DivisionLayout>
  );
}
