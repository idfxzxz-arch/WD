import { useState } from "react";
import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Sparkles, 
  Briefcase, 
  HelpCircle, 
  MapPin, 
  ArrowUpRight, 
  MessageCircle, 
  CheckCircle2, 
  Award,
  Send,
  Target,
  FileCheck
} from "lucide-react";
import "./division.css";

const defaultWaMsg = "Halo WD Jaya Workshop, saya ingin tanya program pelatihan.";
const bookingHref = `https://wa.me/6285707909415?text=${encodeURIComponent(defaultWaMsg)}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const workshopJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": "https://www.wdgroupcompany.biz.id/workshop#business",
      "name": "WD Jaya Workshop Solo Raya",
      "alternateName": ["WD Jaya Workshop", "Pusat Pelatihan Keterampilan Solo", "Bootcamp Solo"],
      "url": "https://www.wdgroupcompany.biz.id/workshop",
      "image": "https://www.wdgroupcompany.biz.id/resources/Workshop/workshop2.webp",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Lembaga pelatihan keterampilan Solo, bootcamp intensif, seminar vokasi, dan in-house corporate training dari WD Jaya Workshop Solo Raya.",
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
      "@id": "https://www.wdgroupcompany.biz.id/workshop#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Program pelatihan dan workshop apa saja yang diselenggarakan di Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WD Jaya Workshop menyelenggarakan kelas keterampilan praktis, seminar keahlian terapan, bootcamp vokasi intensif, pelatihan in-house untuk staf perusahaan/instansi, serta sesi workshop kreatif akhir pekan di Solo Raya."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah peserta pemula tanpa pengalaman dasar bisa mengikuti kelas workshop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bisa. Setiap kurikulum dirancang berjenjang dari level dasar (fundamental) hingga mahir, dengan pendampingan mentor praktisi langkah demi langkah sehingga peserta pemula dapat mempraktikkan materi dengan percaya diri."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah peserta mendapatkan sertifikat kelulusan setelah menyelesaikan pelatihan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, setiap peserta yang menyelesaikan modul pelatihan dan tugas akhir proyek akan memperoleh sertifikat resmi dari WD Jaya Workshop sebagai bukti kompetensi keikutsertaan."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah WD Jaya Workshop melayani in-house training untuk instansi atau perusahaan di Solo Raya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami melayani in-house corporate training dengan kurikulum yang dikustomisasi sesuai sasaran kebutuhan kompetensi tim internal perusahaan atau instansi di wilayah Surakarta dan sekitarnya."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa kapasitas peserta dalam satu sesi kelas workshop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Untuk menjaga efektivitas belajar dan interaksi langsung dengan mentor, kapasitas kelas dibatasi (small-class model), berkisar antara 10 hingga 25 peserta per sesi pelatihan intensif."
          }
        },
        {
          "@type": "Question",
          "name": "Di mana lokasi pelaksanaan pelatihan workshop WD Jaya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sesi kelas dilaksanakan di ruang pelatihan jaringan WD Group di koridor Sukoharjo-Solo, atau di lokasi venue mitra, coworking space, maupun auditorium instansi klien di wilayah Solo Raya."
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
          "name": "Pelatihan Keterampilan & Workshop Solo",
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
  badge: "Pusat Pelatihan Keterampilan & Bootcamp Solo",
  kicker: "WD Jaya Workshop",
  title: "Pelatihan Keterampilan &",
  titleAccent: "Bootcamp Praktis Solo.",
  description:
    "WD Jaya Workshop menyelenggarakan kelas pelatihan keterampilan Solo, bootcamp intensif, seminar aplikatif, dan in-house corporate training di Solo Raya dengan kurikulum praktis, bimbingan mentor berpengalaman, dan hasil karya nyata.",
  seoTitle: "Workshop Solo & Pelatihan Keterampilan Solo | WD Jaya Workshop",
  seoDescription:
    "Jasa workshop Solo, pelatihan keterampilan Solo, dan bootcamp intensif dari WD Jaya Workshop. Kelas praktis, seminar korporat, bimbingan mentor, dan sertifikat resmi.",
  seoUrl: "https://www.wdgroupcompany.biz.id/workshop",
  seoImage: "https://www.wdgroupcompany.biz.id/resources/Workshop/workshop2.webp",
  seoImageAlt: "Sesi pelatihan keterampilan dan interaksi peserta bootcamp WD Jaya Workshop Solo",
  seoJsonLd: workshopJsonLd,
  primaryCta: "Tanya Program Pelatihan",
  primaryHref: bookingHref,
  primaryToast: "Inquiry workshop dicatat",
  savedMessage: "Referensi workshop disimpan",
  galleryTitle: "Portofolio & Dokumentasi Kelas Workshop",
  mark: "WS",
  tabs: ["All Programs", "Workshop"],
  stats: [
    { value: "Praktik", label: "Aplikatif 80%" },
    { value: "Mentor", label: "Praktisi Ahli" },
    { value: "Karya", label: "Portofolio Nyata" },
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
    needs: "Kelas Keterampilan Praktis",
    participants: "Individu / 1 Orang",
    date: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WD Jaya Workshop, saya ingin tanya program pelatihan:
- Nama: ${formState.name}
- Jenis Program: ${formState.needs}
- Jumlah Peserta / Kategori: ${formState.participants}
- Rencana Waktu / Jadwal: ${formState.date || "Jadwal terdekat"}`;
    window.open(`https://wa.me/6285707909415?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <DivisionLayout config={workshopConfig}>
      <div className="div-rich-wrapper">
        
        {/* 1. PENGANTAR DIVISI */}
        <section className="div-section" id="tentang-workshop">
          <div className="div-section-header">
            <span className="div-kicker">
              <GraduationCap size={13} />
              <span>Pengembangan Kompetensi Nyata</span>
            </span>
            <h2 className="div-title">
              Pusat Workshop Solo & <em>Pelatihan Keterampilan Solo Raya</em>
            </h2>
            <p className="div-subtitle">
              Meningkatkan kapasitas sumber daya manusia melalui program kelas aplikatif, seminar interaktif, dan bootcamp intensif berorientasi hasil karya.
            </p>
          </div>

          <div className="div-intro-grid">
            <div className="div-intro-text">
              <p>
                Kebutuhan akan keterampilan terapan yang relevan dengan perkembangan industri terus meningkat pesat. Teori semata tidak lagi mencukupi tanpa adanya pengalaman praktik langsung. <strong>WD Jaya Workshop</strong>, divisi edukasi dan pengembangan talenta dari <strong>WD Group Company</strong>, hadir sebagai pusat penyelenggaraan <strong>workshop Solo, pelatihan keterampilan Solo, bootcamp Solo, dan program kursus keterampilan Solo Raya</strong> yang menitikberatkan pada pembelajaran langsung (hands-on learning).
              </p>
              <p>
                Setiap program kelas dirancang secara matang dengan silabus yang terstruktur, studi kasus nyata, dan bimbingan mentor yang aktif berkecimpung di industri. Peserta tidak hanya duduk mendengarkan pemaparan materi, tetapi langsung mempraktikkan alat, memecahkan kendala teknis, serta merampungkan output karya yang dapat dijadikan bekal kerja, pengembangan usaha mandiri, maupun peningkatan karier profesional.
              </p>
              <p>
                Kami melayani peserta individu, komunitas kreatif, mahasiswa, hingga <em>in-house corporate training</em> bagi instansi pemerintahan dan korporasi swasta di area Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri. Bersama divisi teknologi [WD IT](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/it.jsx) dan divisi kreatif [WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx), kami juga kerap menyelenggarakan kelas kolaboratif di bidang digital multimedia dan produksi konten kreatif.
              </p>
            </div>

            <div className="div-intro-sidebar">
              <div className="div-highlight-box">
                <h4>
                  <BookOpen size={18} />
                  <span>Kurikulum Aplikatif & Terukur</span>
                </h4>
                <p>
                  Materi disusun ringkas, padat, dan bebas jargon membingungkan sehingga peserta dapat segera menguasai alur kerja praktis dari nol.
                </p>
              </div>

              <div className="div-highlight-box">
                <h4>
                  <Users size={18} />
                  <span>Pendampingan Mentor Praktisi</span>
                </h4>
                <p>
                  Didampingi langsung oleh praktisi berpengalaman yang memberikan umpan balik personal terhadap setiap karya dan latihan peserta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROGRAM & LAYANAN WORKSHOP */}
        <section className="div-section" id="program-layanan">
          <div className="div-section-header">
            <span className="div-kicker">
              <Sparkles size={13} />
              <span>Pilihan Program Belajar</span>
            </span>
            <h2 className="div-title">
              Layanan Pelatihan & <em>Program Kelas Kami</em>
            </h2>
            <p className="div-subtitle">
              Pilihan format pembelajaran yang fleksibel, mulai dari sesi singkat akhir pekan hingga pelatihan intensif berbasis proyek.
            </p>
          </div>

          <div className="div-services-grid">
            <div className="div-service-card">
              <div className="div-service-icon">
                <BookOpen size={24} />
              </div>
              <h3 className="div-service-title">Kelas Keterampilan Praktis</h3>
              <p className="div-service-desc">
                Kelas workshop reguler berdurasi 1-2 hari yang difokuskan pada penguasaan keterampilan teknis tertentu. Peserta dibekali modul ringkas, lembar kerja, dan simulasi kasus yang relevan dengan kebutuhan lapangan sehari-hari.
              </p>
              <ul className="div-service-bullets">
                <li>Sesi teori singkat dan 80% praktik mandiri</li>
                <li>Modul panduan dan bahan praktik lengkap</li>
                <li>Sesi tanya jawab interaktif dengan narasumber</li>
                <li>Sertifikat resmi tanda keikutsertaan program</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Briefcase size={24} />
              </div>
              <h3 className="div-service-title">In-House Corporate Training</h3>
              <p className="div-service-desc">
                Program peningkatan kapasitas tim kerja perusahaan, instansi BUMN, UMKM, maupun lembaga pendidikan di Solo Raya. Materi dan jadwal disesuaikan penuh dengan sasaran kompetensi bisnis serta budaya organisasi klien.
              </p>
              <ul className="div-service-bullets">
                <li>Analisis kebutuhan pelatihan (training needs analysis)</li>
                <li>Kustomisasi silabus sesuai kasus operasional kantor</li>
                <li>Laporan evaluasi performa dan kemajuan peserta</li>
                <li>Pelaksanaan di kantor klien atau venue rekanan WD Group</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Target size={24} />
              </div>
              <h3 className="div-service-title">Bootcamp Intensif Proyek</h3>
              <p className="div-service-desc">
                Program akselerasi keahlian vokasi yang berlangsung secara intensif selama beberapa hari hingga beberapa pekan. Peserta belajar dalam format tim kecil dan menyelesaikan proyek nyata (capstone project) sebagai portofolio kerja.
              </p>
              <ul className="div-service-bullets">
                <li>Pembelajaran berbasis proyek riil terpadu</li>
                <li>Mentoring mingguan dan review kode/karya detail</li>
                <li>Portofolio akhir yang siap dilampirkan ke CV kerja</li>
                <li>Jaringan networking sesama alumni dan praktisi</li>
              </ul>
            </div>

            <div className="div-service-card">
              <div className="div-service-icon">
                <Award size={24} />
              </div>
              <h3 className="div-service-title">Workshop Kreatif Komunitas</h3>
              <p className="div-service-desc">
                Kelas kreatif akhir pekan yang santai namun berbobot bagi pemuda, pegiat hobi, dan pelaku usaha mikro. Mempelajari kreasi konten visual, manajemen event dasar, hingga pemanfaatan alat digital untuk menunjang promosi usaha.
              </p>
              <ul className="div-service-bullets">
                <li>Atmosfer belajar santai, interaktif, dan kolaboratif</li>
                <li>Pemanfaatan perangkat yang dimiliki peserta</li>
                <li>Tips efisiensi biaya dan optimasi kreativitas lokal</li>
                <li>Komunitas belajar berkelanjutan pasca pelatihan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ALUR PELATIHAN */}
        <section className="div-section" id="alur-pelatihan">
          <div className="div-section-header">
            <span className="div-kicker">
              <CheckCircle2 size={13} />
              <span>Metodologi Belajar</span>
            </span>
            <h2 className="div-title">
              Alur Pembelajaran <em>Terstruktur & Efektif</em>
            </h2>
            <p className="div-subtitle">
              Tahapan sistematis dari identifikasi kebutuhan hingga evaluasi hasil karya agar setiap peserta menyerap ilmu secara optimal.
            </p>
          </div>

          <div className="div-steps-grid">
            <div className="div-step-card">
              <div className="div-step-number">01</div>
              <h4 className="div-step-title">Konsultasi & Analisis Kebutuhan</h4>
              <p className="div-step-desc">
                Memetakan latar belakang peserta atau kebutuhan divisi kerja perusahaan untuk memastikan silabus kelas tepat sasaran.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">02</div>
              <h4 className="div-step-title">Silabus & Modul Berbasis Praktik</h4>
              <p className="div-step-desc">
                Penyusunan panduan materi bertahap dengan studi kasus nyata yang mudah dicerna dan langsung dapat dipraktikkan.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">03</div>
              <h4 className="div-step-title">Sesi Interaktif & Simulasi Lapangan</h4>
              <p className="div-step-desc">
                Eksekusi kelas dengan metode interaktif, pengerjaan tugas langsung, dan pendampingan mentor secara intensif.
              </p>
            </div>

            <div className="div-step-card">
              <div className="div-step-number">04</div>
              <h4 className="div-step-title">Ulasan Karya & Sertifikasi</h4>
              <p className="div-step-desc">
                Presentasi hasil proyek, evaluasi masukan konstruktif mentor, serta penyerahan sertifikat resmi tanda kelulusan.
              </p>
            </div>
          </div>
        </section>

        {/* 4. MENGAPA WD JAYA WORKSHOP */}
        <section className="div-section" id="keunggulan">
          <div className="div-section-header">
            <span className="div-kicker">
              <ShieldCheck size={13} />
              <span>Nilai Tambah Kami</span>
            </span>
            <h2 className="div-title">
              Mengapa Memilih <em>WD Jaya Workshop di Solo?</em>
            </h2>
            <p className="div-subtitle">
              Pendekatan praktis tanpa teori berbelit, fokus pada pembentukan portofolio dan kesiapan kerja nyata di Solo Raya.
            </p>
          </div>

          <div className="div-trust-grid">
            <div className="div-trust-card">
              <h4>
                <FileCheck size={17} />
                <span>Rincian Program & Jadwal Terbuka</span>
              </h4>
              <p>
                Program bootcamp vokasi, seminar praktis, dan in-house corporate training diselenggarakan secara berkala dengan silabus aplikatif. Hubungi kami untuk jadwal sesi aktif dan proposal in-house.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Rasio Mentor & Peserta Ideal</span>
              </h4>
              <p>
                Kami membatasi kuota peserta setiap sesi agar mentor dapat memperhatikan dan mengoreksi praktik tiap peserta secara mendalam.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Dukungan Ekosistem WD Group</span>
              </h4>
              <p>
                Peserta dapat mengamati langsung praktik industri event, produksi multimedia, dan pengembangan teknologi digital dari divisi saudara.
              </p>
            </div>

            <div className="div-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Fasilitas Ruang Nyaman & Aksesibel</span>
              </h4>
              <p>
                Ruang pelatihan ber-AC, proyektor beresolusi tinggi, koneksi internet stabil, serta area parkir yang luas di kawasan Sukoharjo-Solo.
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
              Ulasan & Reputasi Kami di <em>Google Maps</em>
            </h2>
            <p className="div-subtitle">
              Kepercayaan para alumni pelatihan dan mitra korporat adalah prioritas dedikasi kami di wilayah Solo Raya.
            </p>
          </div>

          <div className="div-review-box">
            <div className="div-review-stars">★★★★★</div>
            <p className="div-review-text">
              Kami menjunjung tinggi integritas ulasan nyata. Seluruh penilaian mengenai kualitas pelatihan, program kelas, dan layanan operasional WD Group Company dapat Anda lihat secara terbuka di profil resmi Google Maps kami.
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
              Jawaban seputar pendaftaran kelas, syarat keikutsertaan, in-house corporate training, dan sertifikat workshop di Solo.
            </p>
          </div>

          <div className="div-faq-list">
            <details className="div-faq-item" open>
              <summary className="div-faq-summary">
                Program pelatihan apa saja yang diselenggarakan oleh WD Jaya Workshop di Solo?
              </summary>
              <div className="div-faq-answer">
                Kami menyediakan kelas pelatihan keterampilan teknis, bootcamp intensif berbasis proyek, seminar vokasi terapan, pelatihan korporat internal (in-house corporate training), dan workshop kreatif komunitas di wilayah Surakarta dan Solo Raya.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah pemula tanpa latar belakang teknis dapat mengikuti kelas ini?
              </summary>
              <div className="div-faq-answer">
                Tentu saja bisa. Silabus kami dirancang bertahap mulai dari konsep fundamental yang mudah dipahami, disertai lembar kerja latihan yang dibimbing langsung oleh mentor praktisi hingga peserta mandiri mengaplikasikannya.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Apakah peserta memperoleh sertifikat setelah menyelesaikan kelas?
              </summary>
              <div className="div-faq-answer">
                Ya, setiap peserta yang menghadiri sesi dan menuntaskan tugas akhir praktik akan mendapatkan sertifikat resmi kelulusan dari WD Jaya Workshop sebagai bukti keikutsertaan dan penguasaan materi.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Bagaimana prosedur mengadakan in-house training untuk instansi atau perusahaan?
              </summary>
              <div className="div-faq-answer">
                Anda cukup menghubungi tim kami via WhatsApp untuk menjadwalkan sesi konsultasi kebutuhan tim. Kami akan menyusun proposal penawaran, rancangan modul khusus, dan jadwal pelaksanaan yang fleksibel sesuai agenda instansi Anda.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Berapa kuota peserta dalam satu sesi kelas workshop?
              </summary>
              <div className="div-faq-answer">
                Demi menjaga mutu pembelajaran dan efektivitas interaksi dua arah dengan mentor, kelas reguler dibatasi antara 10 hingga 25 orang per angkatan, sehingga bimbingan bersifat personal dan terarah.
              </div>
            </details>

            <details className="div-faq-item">
              <summary className="div-faq-summary">
                Di mana lokasi kegiatan kelas workshop dilaksanakan di Solo Raya?
              </summary>
              <div className="div-faq-answer">
                Kegiatan tatap muka berlangsung di ruang kelas jaringan WD Group di koridor Sukoharjo-Solo, atau di ruang pertemuan mitra yang nyaman, ber-AC, dan memiliki akses transportasi mudah di seantero Solo Raya.
              </div>
            </details>
          </div>
        </section>

        {/* 7. FORM KONSULTASI CEPAT */}
        <section className="div-section" id="form-konsultasi">
          <div className="div-section-header">
            <span className="div-kicker">
              <MessageCircle size={13} />
              <span>Daftar & Tanya Info</span>
            </span>
            <h2 className="div-title">
              Konsultasikan <em>Kebutuhan Pelatihan Anda</em>
            </h2>
            <p className="div-subtitle">
              Sampaikan ketertarikan Anda pada program tertentu atau ajukan kebutuhan in-house training kantor Anda.
            </p>
          </div>

          <div className="div-form-card">
            <form onSubmit={handleFormSubmit} className="div-form-grid">
              <div className="div-form-group">
                <label>Nama Lengkap / Instansi *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Budi Santoso / PT Maju Sejahtera"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="div-form-group">
                <label>Pilihan Program Pelatihan *</label>
                <select
                  value={formState.needs}
                  onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                >
                  <option value="Kelas Keterampilan Praktis">Kelas Keterampilan Praktis (Reguler)</option>
                  <option value="In-House Corporate Training">In-House Corporate Training Perusahaan</option>
                  <option value="Bootcamp Intensif Proyek">Bootcamp Intensif Berbasis Proyek</option>
                  <option value="Workshop Kreatif Komunitas">Workshop Kreatif & Komunitas</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Jumlah Peserta *</label>
                <select
                  value={formState.participants}
                  onChange={(e) => setFormState({ ...formState, participants: e.target.value })}
                >
                  <option value="Individu / 1 Orang">Individu (1 Orang)</option>
                  <option value="Kelompok Kecil (2-5 Orang)">Kelompok Kecil (2 - 5 Orang)</option>
                  <option value="Rombongan / Tim Kantor (6-20 Orang)">Rombongan Kantor (6 - 20 Orang)</option>
                  <option value="Korporat Akbar (>20 Orang)">Korporat Akbar (&gt; 20 Orang)</option>
                </select>
              </div>

              <div className="div-form-group">
                <label>Rencana Jadwal Pelatihan</label>
                <input
                  type="text"
                  placeholder="Misal: Bulan Depan / Jadwal Terdekat"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                />
              </div>

              <div className="div-form-group full">
                <button type="submit" className="div-form-submit">
                  <Send size={16} />
                  <span>Kirim Pertanyaan Pelatihan via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 8. PROMOSI JEMBATAN KE DIVISI LAIN */}
        <section className="div-section" style={{ paddingBottom: 20 }}>
          <div className="div-bundle-banner">
            <div className="div-bundle-text">
              <h3>Ingin Mempelajari Pembuatan Website atau Konten Visual?</h3>
              <p>
                Pelajari juga implementasi teknologi digital bersama [WD IT](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/it.jsx) untuk pengembangan website bisnis, atau kolaborasi produksi media visual bersama [WD Production](file:///c:/Users/WD%20Group/Documents/idk/Project%20WD/WD-Company%20web%20utama/src/pages/production.jsx). Ekosistem WD Group siap mendukung pertumbuhan keahlian Anda.
              </p>
            </div>
            <Link to="/it" className="div-btn-google" style={{ whiteSpace: "nowrap" }}>
              <span>Eksplor Layanan WD IT</span>
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
        title="Konsultasi Program Workshop Solo via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Tanya Info Workshop</span>
      </a>
    </DivisionLayout>
  );
}
