import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  Music2, 
  Mic2, 
  Radio, 
  Sparkles, 
  GraduationCap, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck,
  Send,
  Headphones
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD Music, saya ingin tanya layanan live music atau kelas musik.";
const bookingHref = `https://wa.me/6285707909415?text=${encodeURIComponent(defaultWaMsg)}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const musicJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EntertainmentBusiness"],
      "@id": "https://www.wdgroupcompany.biz.id/music#business",
      "name": "WD Music Entertainment Solo Raya",
      "alternateName": ["WD Music", "WD Wedding Band Solo", "WD Music Class & Studio"],
      "url": "https://www.wdgroupcompany.biz.id/music",
      "image": "https://www.wdgroupcompany.biz.id/resources/Music_ENT/wm8.webp",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Layanan wedding band Solo, live music event Solo, rental recording studio, dan kursus musik profesional dari WD Music Entertainment Solo Raya.",
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
      "@id": "https://www.wdgroupcompany.biz.id/music#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Format live band apa saja yang tersedia untuk pernikahan dan event di Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami menyediakan format Acoustic Trio/Quartet (vokal, gitar/piano, kajon/bass), Full Band Pop/Jazz, Kamar Musik Klasik (string chamber), hingga format Big Band pengisi pesta resepsi pernikahan dan gala dinner di Solo Raya."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah klien diperbolehkan me-request daftar lagu (song list) khusus pengantin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tentu saja. Calon pengantin dapat memilih lagu pengiring kirab (grand entrance song), lagu first dance, maupun lagu-lagu kenangan keluarga yang akan dibawakan secara apik oleh musisi kami."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah paket live music sudah termasuk peralatan alat musik dan sound system panggung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami menyediakan paket all-in lengkap dengan alat musik standar panggung (keyboard, gitar akustik/elektrik, bass, drum set/cajon) dan tata suara sound system monitor panggung yang seimbang."
          }
        },
        {
          "@type": "Question",
          "name": "Di mana lokasi studio recording dan kelas musik WD Music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fasilitas studio latihan dan kelas musik kami berada di area operasional WD Group Sukoharjo-Solo dengan jadwal sesi yang dapat disesuaikan."
          }
        },
        {
          "@type": "Question",
          "name": "Instrumen musik apa saja yang diajarkan pada program kursus musik WD Music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami membuka kelas instrumen vokal, gitar akustik/elektrik, keyboard & piano, drum, bass, serta pemahaman dasar aransemen musik dan rekaman audio digital."
          }
        },
        {
          "@type": "Question",
          "name": "Wilayah mana saja yang dilayani untuk jasa wedding band di Solo Raya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami melayani seluruh 7 wilayah Solo Raya: Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri tanpa kendala logistik peralatan musik."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/music#breadcrumb",
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
          "name": "Music Entertainment Solo Raya",
          "item": "https://www.wdgroupcompany.biz.id/music"
        }
      ]
    }
  ]
};

const musicConfig = {
  category: "music",
  brand: "WD Music Entertaiment and Music Class",
  logoText: "WD",
  logoAccent: "Music",
  badge: "Music Entertainment & Class Solo Raya",
  kicker: "WD Music Entertaiment and Music Class",
  title: "Wedding Band & Live Music",
  titleAccent: "Solo & Solo Raya.",
  description:
    "WD Music Entertainment menghadirkan jasa wedding band Solo, live music event Solo Raya, penyewaan studio rekaman, dan kursus musik berbobot dengan musisi bertalenta dan aransemen panggung yang elegan.",
  seoTitle: "Wedding Band Solo & Live Music Event | WD Music",
  seoDescription:
    "Jasa live music wedding band Solo dan studio musik Solo dari WD Music. Layanan pengisi acara pernikahan, rental studio recording, dan kelas musik kursus.",
  seoUrl: "https://www.wdgroupcompany.biz.id/music",
  seoImage: "https://www.wdgroupcompany.biz.id/resources/Music_ENT/wm8.webp",
  seoImageAlt: "Penampilan musisi live wedding band WD Music Entertainment Solo Raya",
  seoJsonLd: musicJsonLd,
  primaryCta: "Konsultasi Live Music",
  primaryHref: bookingHref,
  primaryToast: "Inquiry music dicatat",
  savedMessage: "Referensi music disimpan",
  galleryTitle: "Portofolio Musisi & Sesi Musik",
  mark: "MU",
  tabs: ["All Projects", "Music", "Music Class"],
  tabAliases: {
    Music: ["music", "performance", "recording", "concert", "behind the scene"],
    "Music Class": ["music class"],
  },
  stats: [
    { value: "Live", label: "Panggung" },
    { value: "Class", label: "Edukasi" },
    { value: "Talent", label: "Dukungan Artis" },
  ],
  accent: "#a855f7",
  accentSoft: "rgba(168,85,247,0.15)",
  accentBorder: "rgba(168,85,247,0.30)",
  bg: "#0d0714",
  muted: "#a99ab6",
};

export default function MusicLayout() {
  const [formState, setFormState] = useState({
    name: "",
    needs: "Wedding Band Akustik",
    date: "",
    budget: "Fleksibel / Diskusi",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD Music, saya ingin tanya layanan live music atau kelas musik:
- Nama: ${formState.name}
- Jenis Kebutuhan: ${formState.needs}
- Tanggal Acara / Mulai Kelas: ${formState.date || "Belum ditentukan"}
- Estimasi Budget: ${formState.budget}`;
    window.open(`https://wa.me/6285707909415?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={musicConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGANTAR DIVISI */}
        <section className="div-section" id="tentang-music">
          <div className="div-section-header">
            <span className="div-kicker">
              <Music2 size={13} />
              <span>Harmoni Nada Profesional</span>
            </span>
            <h2 className="div-title">
              Wedding Band Solo & <em>Live Music Event Solo Raya</em>
            </h2>
            <p className="div-subtitle">
              Menghidupkan suasana pernikahan dan panggung acara Anda dengan alunan musik berkualitas, harmonisasi vokal merdu, dan aransemen elegan.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                Musik adalah jiwa dari setiap perhelatan. Musik yang tepat mampu mengubah jamuan santap biasa menjadi momen makan malam yang syahdu, serta mengiringi langkah kirab pengantin dengan rasa haru yang mendalam. <strong>WD Music Entertainment and Music Class</strong>, divisi seni pertunjukan dari <strong>WD Group Company</strong>, menghadirkan layanan <strong>wedding band Solo, live music event Solo, studio musik Solo, dan kursus musik Solo</strong> yang berkelas dan profesional.
              </p>
              <p>
                Para musisi dan vokalis kami memiliki jam terbang panggung yang tinggi di berbagai hotel berbintang, ballroom convention hall, hingga intimate cafe di wilayah Surakarta. Kami menguasai aneka genre musik populer: pop romantic, jazz acoustic, bossa nova, lagu kenangan tematik (evergreen/oldies), hingga lagu-lagu tradisional kontemporer yang selaras dengan tema acara Anda.
              </p>
              <p>
                Selain pertunjukan panggung live, WD Music juga mengoperasikan <strong>studio musik &amp; recording</strong> serta <strong>kelas musik edukatif</strong> untuk mengasah bakat generasi muda di Solo Raya. Bersama ekosistem <Link to="/wedding">WD Sky Wedding</Link> dan <Link to="/event">WD Event</Link>, kami menghadirkan kolaborasi panggung yang selaras tanpa hambatan teknis koordinasi sound system.
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <Mic2 size={18} />
                  <span>Musisi & Vokalis Berpengalaman</span>
                </h4>
                <p>
                  Talenta panggung pilihan dengan penguasaan repertoar lagu lokal dan internasional yang kaya, tampil anggun dengan dresscode formal yang rapi.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <Radio size={18} />
                  <span>Keseimbangan Tata Suara Panggung</span>
                </h4>
                <p>
                  Kami memastikan volume audio live music tertata nyaman di telinga para tamu undangan, tidak memekakkan ruang obrolan, namun tetap hidup dan menghibur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DAFTAR LAYANAN */}
        <section className="div-section" id="layanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Headphones size={13} />
              <span>Pilihan Hiburan</span>
            </span>
            <h2 className="div-title">
              Layanan Utama <em>WD Music</em>
            </h2>
            <p className="div-subtitle">
              Pilihan format pengisi acara pernikahan, hiburan korporat, hingga fasilitas edukasi dan recording di Solo Raya.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <Mic2 size={22} />
              </div>
              <h3>Wedding Band Akustik & Pop</h3>
              <p>
                Format live music pengiring resepsi pernikahan dan prosesi temu pengantin dengan aransemen lagu cinta yang romantis dan hangat.
              </p>
              <ul className="div-service-list">
                <li>Format Acoustic Trio (Vokal, Gitar/Piano, Cajon)</li>
                <li>Format Full Band Pop/Jazz 5-6 musisi</li>
                <li>Request lagu spesial pengantin & kirab</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Radio size={22} />
              </div>
              <h3>Live Music Gathering & Event</h3>
              <p>
                Pengisi acara panggung untuk gala dinner perusahaan, pameran expo, perayaan ulang tahun, dan festival komunitas di Solo Raya.
              </p>
              <ul className="div-service-list">
                <li>Repertoar lagu all-genre berenergi tinggi</li>
                <li>Interaksi panggung ramah bersama audiens</li>
                <li>Paket lengkap sound monitor panggung</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Radio size={22} />
              </div>
              <h3>Studio Musik & Audio Recording</h3>
              <p>
                Penyewaan studio latihan berperedam akustik rapi dan fasilitas recording rekaman lagu cover, jingle iklan, maupun rekaman voice over.
              </p>
              <ul className="div-service-list">
                <li>Peralatan instrumen musik terawat & lengkap</li>
                <li>Digital audio workstation & soundcard pro</li>
                <li>Operator sound engineer pendamping sesi</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <GraduationCap size={22} />
              </div>
              <h3>Kelas Musik & Edukasi Bakat</h3>
              <p>
                Program bimbingan kursus musik privat dan kelompok untuk anak-anak, remaja, hingga dewasa dengan kurikulum praktik yang menyenangkan.
              </p>
              <ul className="div-service-list">
                <li>Kelas vokal pop & olah pernapasan panggung</li>
                <li>Kelas keyboard, piano, gitar, & drum</li>
                <li>Praktik bermusik bersama (ensemble band)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR KERJA */}
        <section className="div-section" id="alur-kerja">
          <div className="div-section-header">
            <span className="div-kicker">
              <Music2 size={13} />
              <span>SOP Penampilan</span>
            </span>
            <h2 className="div-title">
              Alur Koordinasi Musik <em>WD Music</em>
            </h2>
            <p className="div-subtitle">
              Memastikan pemilihan lagu dan koordinasi teknis panggung berjalan selaras dengan rundown perhelatan Anda.
            </p>
          </div>

          <div className="div-workflow-grid">
            <div className="div-step-card">
              <div className="div-step-num">01</div>
              <h3 className="div-step-title">Konsultasi Format & Repertoar</h3>
              <p className="div-step-desc">
                Membahas format musisi yang paling cocok dengan ukuran venue, tema dekorasi, serta daftar lagu wajib (must-play songs) dari klien.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">02</div>
              <h3 className="div-step-title">Latihan & Sinkronisasi Rundown</h3>
              <p className="div-step-desc">
                Sesi latihan aransemen lagu khusus dan koordinasi aba-aba lagu masuk pengantin bersama Show Director atau Wedding Organizer.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">03</div>
              <h3 className="div-step-title">Soundcheck di Lokasi Venue</h3>
              <p className="div-step-desc">
                Tiba 2-3 jam sebelum acara dimulai untuk melakukan penyeimbangan tata suara (soundcheck) dan memastikan kenyamanan mikrofon vokal.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-num">04</div>
              <h3 className="div-step-title">Live Performance Panggung</h3>
              <p className="div-step-desc">
                Menghidupkan panggung acara secara profesional, mengawal transisi sambutan dengan jingle lembut, dan menghibur para tamu hingga tuntas.
              </p>
            </div>
          </div>
        </section>

        {/* 4. STANDAR KEPERCAYAAN */}
        <section className="div-section" id="kepercayaan">
          <div className="div-section-header">
            <span className="div-kicker">
              <ShieldCheck size={13} />
              <span>Keunggulan Layanan</span>
            </span>
            <h2 className="div-title">
              Komitmen Profesional <em>WD Music</em>
            </h2>
            <p className="div-subtitle">
              Menghadirkan harmonisasi musikal berkualitas untuk momen sakral maupun panggung hiburan Anda di Solo Raya.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Informasi Studio & Jadwal Kelas</span>
              </h4>
              <p>
                Fasilitas studio latihan rekaman dan kelas kursus musik berlokasi di area operasional Mojolaban Sukoharjo-Solo dengan jadwal sesi yang fleksibel. Hubungi kami untuk jadwal dan reservasi.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Penampilan Bersih & Berkelas</span>
              </h4>
              <p>
                Musisi kami selalu mengenakan pakaian formal (jas, kemeja rapi, atau busana tematik) yang serasi dengan kemegahan panggung pesta Anda.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Instrumen Musik Berkualitas Tinggi</span>
              </h4>
              <p>
                Menggunakan instrumen panggung bermerek ternama dengan kabel dan sistem wireless minim gangguan interferensi sinyal.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Konektivitas Audio Langsung</span>
              </h4>
              <p>
                Dapat terhubung mulus dengan tim dokumentasi video ([WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx)) untuk merekam audio musik langsung (direct line) tanpa bising lingkungan.
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
              Kepuasan pasangan pengantin dan penyelenggara acara adalah bukti integritas bermusik kami di Solo Raya.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami menjunjung transparansi ulasan asli. Seluruh ulasan mengenai performa live music dan layanan WD Group Company dapat Anda telaah langsung di profil resmi Google Maps kami.
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
              Informasi seputar format wedding band, request lagu, durasi penampilan, dan sewa studio musik di Solo.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Format live band apa saja yang tersedia untuk resepsi wedding dan gathering?
              </summary>
              <div className="div-faq-answer">
                Kami menyediakan format Acoustic Trio/Quartet (vokal, gitar/piano, kajon/bass) yang sangat cocok untuk intimate wedding, format Full Band Pop/Jazz 5-6 musisi untuk pesta megah di ballroom gedung, hingga format mini chamber string di Solo Raya.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa lama durasi penampilan panggung live band dalam satu acara resepsi?
              </summary>
              <div className="div-faq-answer">
                Durasi standar penampilan adalah 2 hingga 3 jam (mengikuti waktu operasional resepsi atau gathering), dengan jeda istirahat singkat yang diselaraskan dengan sambutan formal keluarga atau sesi seremoni penting.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah calon pengantin boleh mengajukan lagu khusus (song request)?
              </summary>
              <div className="div-faq-answer">
                Tentu boleh. Kami sangat menyarankan pasangan memilih 3 hingga 5 lagu istimewa untuk momen grand entrance kirab, lempar bunga, atau lagu dansa pertama (first dance) agar diaransemen secara khusus oleh musisi kami.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah paket live band sudah mencakup sound system dan alat musik?
              </summary>
              <div className="div-faq-answer">
                Ya, kami menyediakan paket all-in yang sudah mencakup instrumen musik panggung lengkap beserta sound system monitor khusus band. Kami juga dapat berkoordinasi langsung dengan pihak vendor sound system gedung yang telah Anda sewa.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Bagaimana sistem penyewaan studio recording dan pendaftaran kelas musik?
              </summary>
              <div className="div-faq-answer">
                Sewa studio latihan atau recording dapat dipesan per jam dengan operator teknis. Sedangkan pendaftaran kelas musik privat (vokal, keyboard, gitar, drum) dijadwalkan secara berkala per bulan dengan mentor berlatar pendidikan musik.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Wilayah mana saja yang dijangkau untuk jasa live band di Solo Raya?
              </summary>
              <div className="div-faq-answer">
                Kami melayani seluruh 7 wilayah Solo Raya: Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri tanpa kendala mobilitas peralatan.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI CEPAT */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Hubungi Musisi Kami</span>
            </span>
            <h2 className="div-title">
              Konsultasikan <em>Kebutuhan Musik Anda</em>
            </h2>
            <p className="div-subtitle">
              Kirimkan brief acara atau kebutuhan kelas musik Anda. Tim WD Music siap memberikan rekomendasi susunan format yang sesuai.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Pasangan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Dimas & Laras"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Jenis Layanan Musik *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Wedding Band Akustik">Wedding Band Akustik Intimate</option>
                  <option value="Wedding Full Band">Wedding Full Band Pop/Jazz</option>
                  <option value="Live Music Gathering">Live Music Gathering & Event</option>
                  <option value="Sewa Studio Recording">Sewa Studio Musik & Recording</option>
                  <option value="Kelas Musik">Kelas Kursus Musik Privat</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Rencana Tanggal Pelaksanaan *</label>
                <input
                  type="text"
                  placeholder="Misal: Januari 2027 / Jadwal Segera"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Estimasi Anggaran (Budget)</label>
                <input
                  type="text"
                  placeholder="Misal: Rp 5 - 15 Juta / Fleksibel"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Konsultasi Musik via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN: PAKET WEDDING LENGKAP */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Ingin Paket Wedding Termasuk Live Band Romantis?</h3>
              <p>
                Hemat waktu dan biaya dengan memilih <strong>Paket Wedding Lengkap</strong> WD Group Company. Menggabungkan Wedding Organizer ([WD Sky Wedding](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/wedding.jsx)), live music band romantis ([WD Music](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/music.jsx)), dan dokumentasi video sinematik ([WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx)) dalam satu kontrak terpadu.
              </p>
            </div>
            <Link to="/wedding" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Lihat Paket Terpadu</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>

        {/* FOOTER COPYRIGHT */}
        <footer className="div-footer-copyright">
          <p>@2026 PT WD GROUP SOLO</p>
        </footer>

      </div>

      {/* FLOATING WA BUTTON */}
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="div-floating-wa"
        title="Konsultasi Wedding Band Solo via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Konsultasi Live Music</span>
      </a>
    </DivisionLayout>
  );
}
