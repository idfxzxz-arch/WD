import DivisionLayout from "../components/DivisionLayout";
import { Link } from "react-router-dom";
import { 
  HeartHandshake, 
  Sparkles, 
  CalendarCheck2, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Building2, 
  Home, 
  Gem, 
  FileCheck, 
  MessageCircle,
  HelpCircle
} from "lucide-react";
import "./wedding.css";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20konsultasi%20paket%20wedding%20organizer%20di%20Solo%20Raya.";
const package1Href = `https://wa.me/6285707909415?text=${encodeURIComponent("Halo WD Sky Wedding, saya ingin tanya/booking Package 1 (Wedding Organizer - Promo Rp 5.500.000).")}`;
const package2Href = `https://wa.me/6285707909415?text=${encodeURIComponent("Halo WD Sky Wedding, saya ingin tanya/booking Package 2 (Wedding Planner & Organizer - Promo Rp 6.300.000).")}`;
const package3Href = `https://wa.me/6285707909415?text=${encodeURIComponent("Halo WD Sky Wedding, saya ingin tanya/booking Package 3 (Wedding Planner & Organizer VIP - Promo Rp 7.300.000).")}`;
const reviewProfileUrl = "https://maps.google.com/?cid=423251003407914670";
const writeReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJ5R9lUwAXei4Rrtb0jIuw3wU";

const partnerVenues = [
  {
    name: "Hotel Alila Solo",
    tag: "Hotel & Ballroom",
    image: "/venues/alila.webp",
    desc: "Alila X Masjid Zayed · Paket pernikahan Grand Ballroom hotel berbintang standar internasional.",
    link: "https://drive.google.com/file/d/13__fRe3H7ZRPUWJGl-s9arFA2_T1RSAI/view?usp=drive_link"
  },
  {
    name: "The Alana Hotel Solo",
    tag: "Luxury Hotel & Ballroom",
    image: "/venues/alana.webp",
    desc: "The Alana Hotel & Convention · Fasilitas ballroom mewah berbintang 4 dan paket lengkap.",
    link: "https://drive.google.com/file/d/1uiBbCc3yKZQBqWfBGBtM73FgvRPnVFSy/view?usp=drive_link"
  },
  {
    name: "Masjid Raya Zayed Solo",
    tag: "Convention & Ballroom",
    image: "/venues/zayed.webp",
    desc: "Masjid Raya Sheikh Zayed · Konsep akad nikah agung & convention ballroom berwibawa.",
    link: "https://drive.google.com/file/d/1G7zU6L4sqs-yimxgKawecRYMYcrF_GL-/view?usp=drive_link"
  },
  {
    name: "Convention Hall Tirtonadi",
    tag: "Grand Ballroom",
    image: "/venues/tirtonadi.webp",
    desc: "Convention Hall Tirtonadi · Grand ballroom modern berkapasitas ribuan tamu & parkir luas.",
    link: "https://drive.google.com/file/d/1_7IwZcI0Ryy-FQOc15wQOKqzP3j6ca-4/view?usp=drive_link"
  },
  {
    name: "Wisma Batari Solo",
    tag: "Historic & Ballroom",
    image: "/venues/wisma-batari.webp",
    desc: "Gedung Wisma Batari · Gedung pernikahan heritage klasik & primadona tradisi adat Jawa.",
    link: "https://drive.google.com/file/d/1FONWxtb0TwZt6yXJsmXMEZ0wLXQqpF9p/view?usp=drive_link"
  },
  {
    name: "Hotel UNS Solo",
    tag: "Hotel & Convention",
    image: "/venues/hotel-uns.webp",
    desc: "UNS Hotel & Convention · Ballroom modern dengan akses strategis di kawasan Solo Timur.",
    link: "https://drive.google.com/file/d/1Dnt7ib34PybSxYlgaXhQEdddcS0-bob0/view?usp=drive_link"
  },
  {
    name: "TBJT Solo (Taman Budaya)",
    tag: "Heritage & Hall",
    image: "/venues/tbjt.webp",
    desc: "Taman Budaya Jawa Tengah · Pendopo & ballroom seni budaya Jawa untuk perhelatan sakral.",
    link: "https://drive.google.com/file/d/1HfnoZ8TDWA775eJJbYRQYpTWctLVdZu0/view?usp=drive_link"
  },
  {
    name: "Grandis Barn Solo",
    tag: "Barn & Rustic Garden",
    image: "/venues/grandis-barn.webp",
    desc: "Grandis Barn Colomadu · Nuansa lumbung kayu rustic & aesthetic garden wedding instagramable.",
    link: "https://drive.google.com/file/d/1P216V_fGx86hud5Gs_1VRTkRsYKNe9Yg/view?usp=drive_link"
  },
  {
    name: "Anasera Solo",
    tag: "Outdoor & Garden",
    image: "/venues/anasera.webp",
    desc: "Anasera Solo · Konsep romantic intimate garden wedding dengan nuansa alam terbuka.",
    link: "https://drive.google.com/file/d/1ZVBEaU3qfoTGGLlfd_OKCcpAC_vy0kZz/view?usp=drive_link"
  },
  {
    name: "Mang Engking Solo",
    tag: "Outdoor & Resto",
    image: "/venues/mang-engking.webp",
    desc: "Gubug Makan Mang Engking · Suasana alam asri dan danau pedesaan untuk pesta keluarga hangat.",
    link: "https://drive.google.com/file/d/1EQc0ysyDBvAZh2YjKNa_4oT6uoAXNQ2v/view?usp=drive_link"
  },
  {
    name: "Happy Tuty Solo",
    tag: "Heritage & Garden",
    image: "/venues/happy-tuty.webp",
    desc: "Happy Tuty Solo · Venue berarsitektur klasik heritage untuk perhelatan intimate berkesan.",
    link: "https://drive.google.com/file/d/1ikDV4uzJXYlxxsdyWX1NryO7n5KXTzV1/view?usp=drive_link"
  },
  {
    name: "Beams Cafe Solo",
    tag: "Aesthetic Space",
    image: "/venues/beams-cafe.webp",
    desc: "Beams Cafe Solo · Ruang estetik kontemporer untuk pesta pernikahan modern & kasual.",
    link: "https://drive.google.com/file/d/1XLmj68_v5xu5R5f684i8dzRxczEPBs5n/view?usp=drive_link"
  },
  {
    name: "Arja Cafe Solo",
    tag: "Cafe & Intimate",
    image: "/venues/arja-cafe.webp",
    desc: "Arja Cafe Solo · Venue intimate cafe yang hangat dan personal bagi keluarga terdekat.",
    link: "https://drive.google.com/file/d/1RPVqD1saEBm8p2oV5gtqHbxua1ScVrR6/view?usp=drive_link"
  },
  {
    name: "Wastra Bumbu Solo",
    tag: "Restaurant & Intimate",
    image: "/venues/wastra-bumbu.webp",
    desc: "Wastra Bumbu Solo · Paduan kuliner lezat & intimate dining space elegan untuk hari bahagia.",
    link: "https://drive.google.com/file/d/1ol5_2yMwtaSnXUPILkPYAtRtE68-1tk1/view?usp=drive_link"
  }
];

const weddingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.wdgroupcompany.biz.id/wedding#business",
      "name": "WD Sky Wedding Organizer Solo Raya",
      "alternateName": ["WD Sky Wedding", "WO Solo", "Wedding Organizer Solo", "Paket WO Murah Solo", "WD GROUP SOLO Wedding", "WD Group Company"],
      "url": "https://www.wdgroupcompany.biz.id/wedding",
      "logo": "https://www.wdgroupcompany.biz.id/wd-group-logo.webp",
      "image": "https://www.wdgroupcompany.biz.id/portfolio/resepsi/resepsi-8.jpg",
      "telephone": "+6285707909415",
      "email": "groupcompanywd@gmail.com",
      "priceRange": "$$",
      "description": "Layanan jasa wedding organizer profesional dan wedding planner elegan terjangkau di Solo dan Solo Raya. Melayani perencanaan pernikahan, koordinasi akad nikah, resepsi gedung, dan pesta rumah.",
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
      "hasMap": "https://maps.google.com/?cid=423251003407914670",
      "sameAs": [
        "https://instagram.com/wdgroupcompany",
        "https://maps.google.com/?cid=423251003407914670"
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Surakarta" },
        { "@type": "AdministrativeArea", "name": "Sukoharjo" },
        { "@type": "AdministrativeArea", "name": "Karanganyar" },
        { "@type": "AdministrativeArea", "name": "Klaten" },
        { "@type": "AdministrativeArea", "name": "Boyolali" },
        { "@type": "AdministrativeArea", "name": "Sragen" },
        { "@type": "AdministrativeArea", "name": "Wonogiri" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Katalog Paket Pernikahan Solo Raya",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Package 1 (Wedding Organizer)",
            "price": "5500000",
            "priceCurrency": "IDR",
            "itemOffered": {
              "@type": "Service",
              "name": "Package 1 - Wedding Organizer Solo Raya",
              "description": "Layanan Wedding Organizer untuk Akad Nikah, Temu Manten, dan Resepsi Pernikahan dalam satu acara dengan maksimal 300 tamu undangan."
            }
          },
          {
            "@type": "Offer",
            "name": "Package 2 (Wedding Planner & Wedding Organizer)",
            "price": "6300000",
            "priceCurrency": "IDR",
            "itemOffered": {
              "@type": "Service",
              "name": "Package 2 - Wedding Planner & Wedding Organizer Solo Raya",
              "description": "Layanan Wedding Planner & Organizer dengan 12 kru bertugas untuk Akad Nikah, Temu Manten, dan Resepsi Pernikahan dalam satu acara."
            }
          },
          {
            "@type": "Offer",
            "name": "Package 3 (Wedding Planner & Wedding Organizer VIP)",
            "price": "7300000",
            "priceCurrency": "IDR",
            "itemOffered": {
              "@type": "Service",
              "name": "Package 3 - Wedding Planner & Wedding Organizer VIP Solo Raya",
              "description": "Layanan Wedding Planner & Organizer VIP dengan 14 kru bertugas, unlimited technical meeting, dan perlengkapan survival kit terlengkap."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.wdgroupcompany.biz.id/wedding#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa biaya jasa wedding organizer WD Sky Wedding di Solo dan Solo Raya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Biaya jasa wedding organizer kami disesuaikan dengan skala acara, jenis layanan (koordinasi hari-H atau full planning), dan kebutuhan jumlah kru. Kami mengusung positioning terjangkau dengan kualitas elegan, memastikan setiap rupiah dialokasikan secara efisien tanpa mengurangi kemegahan acara. Silakan hubungi kami untuk rincian paket dan proposal resmi."
          }
        },
        {
          "@type": "Question",
          "name": "Kapan waktu paling ideal untuk memesan (booking) layanan wedding organizer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waktu ideal adalah 3 hingga 6 bulan sebelum hari pernikahan, terutama bagi pasangan yang membutuhkan pendampingan pemilihan vendor gedung, katering, dan dekorasi di Solo Raya. Namun, bagi Anda yang sudah memiliki vendor lengkap dan hanya membutuhkan koordinasi hari-H (day-of coordinator), booking dapat dilakukan minimal 1 hingga 2 bulan sebelum acara."
          }
        },
        {
          "@type": "Question",
          "name": "Apa saja tugas dan tanggung jawab kru wedding organizer pada hari-H?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pada hari-H, tim WD Sky Wedding mengelola seluruh operasional acara: memandu timeline persiapan rias pengantin, mengawal kehadiran dan kesiapan vendor, memimpin jalannya prosesi akad dan temu pengantin, mengatur alur kirab, mengoordinasikan tamu VIP dan prasmanan katering, hingga mengamankan mahar dan kotak amplop."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah WD Sky Wedding melayani acara pernikahan di rumah selain di gedung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, kami sangat terbiasa menangani pesta pernikahan baik di gedung convention hall, ballroom hotel, maupun halaman rumah pribadi di wilayah Solo dan Solo Raya. Pernikahan di rumah memiliki dinamika alur tamu dan ruang yang khas, dan kru kami siap mengatur tata sirkulasi agar tetap tertib dan nyaman."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana sistem pembayaran dan ketentuan uang muka (DP)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sistem pembayaran dilakukan secara bertahap dan transparan. Calon pengantin mengamankan tanggal dengan pembayaran uang muka (DP), dilanjutkan dengan termin kedua saat technical meeting, dan pelunasan sebelum hari-H sesuai kesepakatan kontrak kerja sama."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah tim WD Sky Wedding berpengalaman menangani pernikahan adat Jawa di Solo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, tim kami memiliki pemahaman mendalam mengenai tata urutan upacara adat Jawa khas Surakarta Hadiningrat, seperti pasang tarub, siraman, midodareni, akad nikah, upacara panggih, balangan gantal, kacar-kucur, dulang-dulangan, hingga sungkeman kepada orang tua."
          }
        },
        {
          "@type": "Question",
          "name": "Wilayah mana saja di Solo Raya yang dilayani oleh WD Sky Wedding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kami melayani seluruh 7 wilayah Solo Raya: Kota Surakarta (Solo), Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri tanpa hambatan operasional, karena basis kantor kami berada di pusat konektivitas Solo Raya."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah klien diperbolehkan membawa vendor rekanan sendiri?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tentu saja. Anda bebas membawa vendor katering, dekorasi, rias, atau dokumentasi pilihan keluarga. Peran utama kami adalah menyatukan seluruh vendor tersebut dalam satu komando rundown agar bekerja selaras tanpa miskomunikasi."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana tim menangani kemungkinan kendala teknis atau cuaca saat acara berlangsung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Setiap perhelatan dilengkapi dengan rencana cadangan (contingency plan) yang disusun saat technical meeting. Tim dilengkapi alat komunikasi radio (HT) dan checklist darurat untuk mengantisipasi keterlambatan vendor, genset, cuaca hujan, maupun penyesuaian rundown mendadak."
          }
        },
        {
          "@type": "Question",
          "name": "Venue mana saja di Solo Raya yang siap dikoordinasikan oleh WD Sky Wedding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WD Sky Wedding siap mendampingi dan mengoordinasikan perhelatan di 14 venue populer di Solo Raya: Hotel Alila Solo, The Alana Hotel Solo, Masjid Raya Sheikh Zayed, Convention Hall Tirtonadi, Wisma Batari Solo, Hotel UNS Solo, TBJT (Taman Budaya Jawa Tengah), Grandis Barn Solo, Anasera Solo, Gubug Makan Mang Engking, Happy Tuty Solo, Beams Cafe Solo, Arja Cafe Solo, dan Wastra Bumbu Solo. Brosur dan pricelist masing-masing venue dapat diakses langsung melalui situs kami."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.wdgroupcompany.biz.id/wedding#breadcrumb",
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
        }
      ]
    }
  ]
};

const weddingConfig = {
  category: "wedding",
  brand: "WD Sky Wedding Organizer",
  logoText: "WD",
  logoAccent: "Sky",
  logoSuffix: "Wedding",
  badge: "Wedding Organizer Solo Raya",
  kicker: "WD Sky Wedding Organizer",
  title: "Wedding Organizer",
  titleAccent: "Solo & Solo Raya.",
  description:
    "Paket wedding yang disesuaikan dengan kebutuhan dan budget Anda, dengan konsep yang elegan di Solo dan Solo Raya. Kami merancang alur akad dan resepsi yang rapi, menenangkan pengantin, dan menghadirkan kenangan sakral yang berkesan bagi keluarga besar.",
  seoTitle: "Wedding Organizer Solo & Solo Raya | WD Sky Wedding",
  seoDescription:
    "Jasa wedding organizer Solo dan Solo Raya dari WD Sky Wedding. Layanan paket pernikahan elegan, terjangkau, koordinasi akad hingga resepsi gedung dan rumah.",
  seoUrl: "https://www.wdgroupcompany.biz.id/wedding",
  seoImage: "https://www.wdgroupcompany.biz.id/portfolio/resepsi/resepsi-8.jpg",
  seoImageAlt: "Dekorasi panggung pelaminan resepsi pernikahan elegan Solo Raya oleh WD Sky Wedding Organizer",
  seoJsonLd: weddingJsonLd,
  primaryCta: "Konsultasi Pernikahan",
  primaryHref: bookingHref,
  primaryToast: "Inquiry wedding dicatat",
  savedMessage: "Referensi wedding disimpan",
  galleryTitle: "Galeri Portofolio Dokumentasi",
  mark: "SKY",
  tabs: ["All Projects", "Akad", "Resepsi"],
  tabAliases: {
    Akad: ["akad"],
    Resepsi: ["resepsi"],
    Reception: ["resepsi"],
  },
  stats: [
    { value: "End-to-end", label: "Perencanaan" },
    { value: "Vendor", label: "Koordinasi" },
    { value: "Detail", label: "Eksekusi" },
  ],
  accent: "#c89f67",
  accentSoft: "rgba(200,159,103,0.15)",
  accentBorder: "rgba(200,159,103,0.30)",
  bg: "#100c09",
  muted: "#b7a79b",
};

export default function Wedding() {
  return (
    <DivisionLayout config={weddingConfig}>
      {/* RICH SEO SECTIONS CONTENT (1.000 - 1.500 KATA UNIK) */}
      <div className="w-rich-wrapper">
        
        {/* SECTION 1: PENGANTAR MENDALAM TENTANG WD SKY WEDDING */}
        <section className="w-section" id="tentang-layanan">
          <div className="w-section-header">
            <span className="w-kicker">
              <Gem size={13} />
              <span>Solusi Pernikahan Solo Raya</span>
            </span>
            <h2 className="w-title">
              Jasa Wedding Organizer di <em>Solo dan Solo Raya</em> dengan Kualitas Elegan
            </h2>
            <p className="w-subtitle">
              Mewujudkan hari pernikahan yang tertib, penuh kehangatan keluarga, dan memukau secara visual tanpa beban pikiran di pundak calon pengantin.
            </p>
          </div>

          <div className="w-intro-grid">
            <div className="w-intro-text">
              <p>
                Merencanakan sebuah pernikahan di <strong>Solo dan Solo Raya</strong> adalah perpaduan antara merawat nilai-nilai tradisi yang luhur dan menyelaraskan preferensi modern yang dinamis. <strong>WD Sky Wedding Organizer</strong> (layanan WO Solo dari <strong>WD Group Company</strong>) hadir sebagai mitra pendamping bagi setiap pasangan yang mendambakan perhelatan pernikahan yang tertata rapi, berkelas, dan memiliki alokasi anggaran yang transparan.
              </p>
              <p>
                Bagi kami, pernikahan bukan sekadar pesta kemeriahan sesaat, melainkan sebuah peristiwa sakral ketika dua keluarga besar bersatu. Oleh karena itu, pendekatan kerja kami bertumpu pada <em>paket wedding yang disesuaikan dengan kebutuhan dan budget Anda, dengan konsep yang elegan di Solo dan Solo Raya</em>. Setiap rincian teknis—mulai dari prosesi ijab qobul akad nikah, upacara adat Jawa, koordinasi katering, hingga pengaturan panggung hiburan—dikelola dengan disiplin waktu dan kepekaan rasa yang tinggi.
              </p>
              <p>
                Wilayah layanan kami menjangkau seluruh kawasan <strong>Solo Raya</strong>, meliputi <strong>Kota Surakarta (Solo), Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, hingga Wonogiri</strong>. Baik Anda merencanakan jamuan megah di ballroom hotel berbintang, syukuran hangat di convention hall, maupun pesta asri di halaman kediaman pribadi, tim profesional WD Sky Wedding Organizer siap mengawal setiap detik hari bahagia Anda dengan tenang dan terencana.
              </p>
            </div>

            <div className="w-intro-highlights">
              <div className="w-highlight-box">
                <h4>
                  <ShieldCheck size={18} />
                  <span>Ketenangan Pengantin & Keluarga</span>
                </h4>
                <p>
                  Pengantin dan kedua orang tua dapat sepenuhnya fokus menikmati momen haru dan menyambut para tamu terhormat, sementara seluruh koordinasi teknis berada di tangan tim kami.
                </p>
              </div>

              <div className="w-highlight-box">
                <h4>
                  <HeartHandshake size={18} />
                  <span>Penguasaan Adat & Konsep Modern</span>
                </h4>
                <p>
                  Memahami tata urutan upacara adat Jawa khas Surakarta (panggih, balangan gantal, kacar-kucur) maupun konsep resepsi nasional modern dan intimate garden party.
                </p>
              </div>

              <div className="w-highlight-box">
                <h4>
                  <Sparkles size={18} />
                  <span>Integrasi Ekosistem Kreatif WD Group</span>
                </h4>
                <p>
                  Didukung kemudahan sinergi bersama divisi dokumentasi foto sinematik (WD Production) dan live music panggung (WD Music Entertainment) dalam satu pintu komunikasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PAKET PERNIKAHAN WD SKY WEDDING */}
        <section className="w-section" id="paket-pernikahan">
          <div className="w-section-header">
            <span className="w-kicker">
              <FileCheck size={13} />
              <span>Transparansi Biaya & Fasilitas</span>
            </span>
            <h2 className="w-title">
              Pilihan Paket Wedding Organizer <em>Solo Raya</em>
            </h2>
            <p className="w-subtitle">
              Tersedia pilihan paket yang fleksibel untuk berbagai format acara, mulai dari akad nikah intim, resepsi gedung, hingga perencanaan menyeluruh.
            </p>
          </div>

          <div className="w-packages-grid">
            {/* PACKAGE 1 */}
            <div className="w-package-card">
              <div className="w-package-header">
                <span className="w-package-scope">Akad + Temu Manten + Resepsi</span>
                <h3 className="w-package-name">Package 1 (Wedding Organizer)</h3>
                <p className="w-package-desc">
                  Akad Nikah, Temu Manten, dan Resepsi Pernikahan dalam satu rangkaian acara terpadu. Cocok untuk pasangan dengan vendor sudah 85% siap dan maksimal 300 tamu undangan.
                </p>
                <div className="w-package-price">
                  <div className="w-price-row">
                    <span className="w-price-original">Rp 6.300.000</span>
                    <span className="w-price-val">Rp 5.500.000</span>
                  </div>
                  <span className="w-price-sub">*Akad + Temu Manten + Resepsi dalam 1 Acara (Maks 300 Tamu)</span>
                </div>
              </div>

              <ul className="w-package-features">
                <li style={{ fontWeight: 600, color: '#f6e6cb' }}>
                  Kapasitas maksimal 300 tamu undangan &amp; kondisi vendor sudah 85%
                </li>
                <li>Koordinasi dan konsultasi dilayani setiap hari sejak H-6 bulan</li>
                <li>Meeting 2 kali (pembuatan konsep acara, budget &amp; vendor + Final Meeting 1x H-3/H-1)</li>
                <li>Buku panduan pernikahan (Wedding Handbook) dicopykan oleh tim WO</li>
                <li>Survey venue 1 kali &amp; pembuatan layout tata letak acara</li>
                <li>Wedding concept discussion &amp; pendampingan budget planning</li>
                <li>Wedding timeline detail, rundown acara &amp; koordinasi vendor pilihan klien (H-30 &amp; H-7)</li>
                <li>Family briefing &amp; pengurusan loading venue H-1 acara</li>
                <li>Pengaturan alur tema, keprotokoleran &amp; que card kepada MC saat acara</li>
                <li>Pengaturan petugas buku tamu, souvenir &amp; kursi among tamu berstiker khusus</li>
                <li>Briefing all vendor &amp; keluarga pengantin sebelum prosesi dimulai</li>
                <li>Pengecekan seluruh vendor sebelum maupun sesudah acara</li>
                <li>Pengaturan waktu make up menuju akad, alur penerimaan tamu &amp; sesi foto keluarga</li>
                <li>Monitoring ketepatan rundown, antisipasi perubahan cepat &amp; closing meeting</li>
                <li style={{ color: '#d8af75', fontWeight: 600 }}>
                  Include: Buku Tamu &amp; Bolpoin, Confetti 2 pcs, Kunci Pundi 2 pcs, Keranjang Bridesmaid, Bunga Tabur, Air Mineral Pengantin/Ortu, Tisu &amp; Permen, Opening Bumper, Background IG Story, Hadiah Games, Emergency Sewing Kit, Safety Pins, Double Tape &amp; P3K
                </li>
              </ul>

              <a href={package1Href} target="_blank" rel="noopener noreferrer" className="w-package-btn w-package-btn-outline">
                <span>Pilih Package 1 (Rp 5,5 Jt)</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* PACKAGE 2 (FEATURED) */}
            <div className="w-package-card w-package-featured">
              <span className="w-featured-badge">Paling Banyak Dipilih</span>
              <div className="w-package-header">
                <span className="w-package-scope">Akad + Temu Manten + Resepsi</span>
                <h3 className="w-package-name">Package 2 (Wedding Planner &amp; WO)</h3>
                <div className="w-package-crew-badge">
                  <span>12 Orang Crew Bertugas (Lengkap HT)</span>
                </div>
                <p className="w-package-desc">
                  Solusi komprehensif Wedding Planner &amp; Organizer dengan 12 personel kru bertugas. Memberikan pendampingan intensif dari kurasi vendor hingga manajemen lapangan hari-H.
                </p>
                <div className="w-package-price">
                  <div className="w-price-row">
                    <span className="w-price-original">Rp 7.300.000</span>
                    <span className="w-price-val">Rp 6.300.000</span>
                  </div>
                  <span className="w-price-sub">*Akad + Temu Manten + Resepsi dalam 1 Acara (12 Kru Bertugas)</span>
                </div>
              </div>

              <ul className="w-package-features">
                <li style={{ fontWeight: 700, color: '#f6e6cb' }}>
                  12 Orang Crew Bertugas: Project Manager, Loading H-1, Pendamping CPP &amp; CPW, Pendamping MC, Protokoler, Stopper, Pelaminan, &amp; Pengantar Tamu VIP
                </li>
                <li>Unlimited Consultation &amp; koordinasi dilayani setiap hari</li>
                <li>Meeting 4 kali (konsep acara, budget, kurasi vendor, buku panduan &amp; final meeting)</li>
                <li>Wedding Planning Assistance &amp; kurasi dan rekomendasi vendor pilihan Solo Raya</li>
                <li>Vendor Comparison, Budget Review &amp; pendampingan meeting vendor</li>
                <li>Venue Survey 2 kali &amp; perancangan seating layout detail</li>
                <li>Guest Flow Planning &amp; VIP Flow Planning terstruktur</li>
                <li>Timeline detail H-60 s/d Hari-H &amp; Technical Rehearsal (gladi resik)</li>
                <li>Family Coordination Meeting &amp; pengurusan loading venue H-1 acara</li>
                <li>Pengaturan alur tema, keprotokoleran &amp; que card kepada MC saat acara</li>
                <li>Pengaturan petugas buku tamu, souvenir &amp; among tamu (kursi berstiker)</li>
                <li>Pengecekan all vendor sebelum maupun sesudah acara</li>
                <li>Pembuatan seluruh teks naskah acara yang digunakan saat prosesi</li>
                <li style={{ color: '#d8af75', fontWeight: 600 }}>
                  Include: Confetti 4 pcs, Kunci Pundi, Premium Wedding Handbook, Master Rundown Printed, Emergency Kit Premium, Touch Up Kit Pengantin, HT Communication Crew, Name Tag Crew, Clipboard Operasional, Vendor Contact Book, Welcome Sign Stand, Direction Sign, VIP Reserved Sign, &amp; Payung Transparan (jika hujan)
                </li>
              </ul>

              <a href={package2Href} target="_blank" rel="noopener noreferrer" className="w-package-btn">
                <span>Pilih Package 2 (Rp 6,3 Jt)</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* PACKAGE 3 */}
            <div className="w-package-card">
              <span className="w-featured-badge" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Paket Terlengkap</span>
              <div className="w-package-header">
                <span className="w-package-scope">Akad + Temu Manten + Resepsi</span>
                <h3 className="w-package-name">Package 3 (Planner &amp; WO VIP)</h3>
                <div className="w-package-crew-badge">
                  <span>14 Orang Crew Bertugas (VIP Full Team)</span>
                </div>
                <p className="w-package-desc">
                  Pelayanan VIP paripurna Wedding Planner &amp; Organizer dengan 14 personel kru bertugas, unlimited technical meeting, simulasi hari-H, dan toolkit perlengkapan terkomplit.
                </p>
                <div className="w-package-price">
                  <div className="w-price-row">
                    <span className="w-price-original">Rp 8.300.000</span>
                    <span className="w-price-val">Rp 7.300.000</span>
                  </div>
                  <span className="w-price-sub">*Akad + Temu Manten + Resepsi (14 Kru Bertugas &amp; Fasilitas VIP)</span>
                </div>
              </div>

              <ul className="w-package-features">
                <li style={{ fontWeight: 700, color: '#f6e6cb' }}>
                  14 Orang Crew Bertugas: Project Manager, Loading H-1 &amp; H-2, Pendamping CPP &amp; CPW, Pendamping MC, Protokoler, Stopper, Pelaminan, &amp; Pengantar Tamu VIP
                </li>
                <li>Unlimited Consultation Priority setiap hari bersama tim inti</li>
                <li>Meeting 3 kali + Technical Meeting Unlimited + Family Coordination Unlimited</li>
                <li>Full Wedding Planner Service &amp; Wedding Concept Development</li>
                <li>Venue Survey 2 kali &amp; Floor Plan Detail ruang acara</li>
                <li>Vendor Negotiation Assistance, Selection Assistance &amp; Vendor Monitoring ketat</li>
                <li>Guest Journey Planning &amp; Wedding Day Simulation</li>
                <li>Gladi Bersih komprehensif (rehearsal jika diperlukan)</li>
                <li>Loading H-1 &amp; H-2 venue (apabila diperlukan) &amp; koordinasi vendor hingga acara tuntas</li>
                <li>Pengaturan alur tema keprotokoleran, que card MC &amp; seluruh naskah prosesi</li>
                <li>Pengaturan petugas buku tamu, souvenir, among tamu berstiker, pengecekan all vendor</li>
                <li style={{ color: '#d8af75', fontWeight: 600 }}>
                  Include VIP: Premium Emergency Kit, Wedding Day Survival Kit, Instant Cleaning Kit, Exclusive Couple Hospitality Kit &amp; Touch Up Kit, Confetti 4 pcs + Extra 6 pcs (Total 10 pcs), Kunci Pundi 2, HT Full Team, Crew Uniform Accessories, Premium Signage Set, Reserved Sign VIP, Wedding Checklist Book, Vendor Payment Checklist, Couple Timeline Book, Family Timeline Book, Operational Toolkit, Snack &amp; Mineral Water Crew, Rain Backup Equipment, Hand Fan &amp; Cooling Pack, Extension Cable &amp; Terminal Listrik Cadangan
                </li>
              </ul>

              <a href={package3Href} target="_blank" rel="noopener noreferrer" className="w-package-btn w-package-btn-outline">
                <span>Pilih Package 3 (Rp 7,3 Jt)</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="w-payment-note" style={{ marginTop: '24px' }}>
            <p style={{ marginBottom: '8px', color: '#f6e6cb', fontWeight: 600 }}>
              <strong>Syarat &amp; Ketentuan Promo 2026:</strong> Potongan harga khusus (promo hemat Rp 800.000 s/d Rp 1.000.000) berlaku untuk pemesanan paket pernikahan periode tahun 2026 selama kuota bulanan masih tersedia. Hubungi admin WhatsApp kami untuk konfirmasi ketersediaan tanggal dan slot promo.
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>NB (Request Tambahan Properti):</strong> Tambahan barang properti atau barang perlengkapan acara yang tidak ada di dalam paket, dapat dilakukan request oleh pemangku hajat sesuai dengan keinginan konsep acara, dengan penambahan biaya sesuai dengan harga properti yang diminta.
            </p>
            <p>
              <strong>Ketentuan Pembayaran &amp; Booking Tanggal:</strong> Uang muka (DP) booking tanggal pernikahan, termin lanjutan saat Technical Meeting, dan pelunasan menjelang hari-H acara. Hubungi kami melalui WhatsApp untuk konfirmasi ketersediaan tanggal dan jadwal temu muka.
            </p>
          </div>
        </section>

        {/* SECTION 3: ALUR KERJA 4 TAHAP */}
        <section className="w-section" id="alur-kerja">
          <div className="w-section-header">
            <span className="w-kicker">
              <CalendarCheck2 size={13} />
              <span>Manajemen Terstruktur</span>
            </span>
            <h2 className="w-title">
              Alur Kerja Profesional <em>WD Sky Wedding</em>
            </h2>
            <p className="w-subtitle">
              Sistem koordinasi 4 tahap yang teruji memastikan tidak ada satu detail pun yang terlewatkan dari persiapan hingga hari pernikahan tiba.
            </p>
          </div>

          <div className="w-workflow-grid">
            <div className="w-step-card">
              <div className="w-step-number">01</div>
              <h3 className="w-step-title">Konsultasi & Brainstorming</h3>
              <p className="w-step-desc">
                Sesi diskusi mendalam mengenai impian pernikahan Anda, estimasi jumlah undangan, pemilihan tanggal baik, tradisi adat yang diusung, serta pemetaan alokasi anggaran yang sehat.
              </p>
            </div>

            <div className="w-step-card">
              <div className="w-step-number">02</div>
              <h3 className="w-step-title">Perencanaan & Kurasi Vendor</h3>
              <p className="w-step-desc">
                Penyusunan jadwal kerja terstruktur, perancangan layout penempatan area pesta, serta sinkronisasi teknis antara vendor dekorasi, katering, foto video, rias pengantin, dan gedung.
              </p>
            </div>

            <div className="w-step-card">
              <div className="w-step-number">03</div>
              <h3 className="w-step-title">Technical Meeting (TM)</h3>
              <p className="w-step-desc">
                Pertemuan koordinasi final 1-2 minggu sebelum hari-H yang mempertemukan keluarga inti dan seluruh perwakilan vendor guna mematangkan buku panduan acara (wedding guidebook).
              </p>
            </div>

            <div className="w-step-card">
              <div className="w-step-number">04</div>
              <h3 className="w-step-title">Eksekusi Hari-H & Pengawalan</h3>
              <p className="w-step-desc">
                Tim lapangan bertugas penuh waktu di lokasi acara mengoperasikan alur acara, memastikan kenyamanan pengantin, dan menyelesaikan segala kebutuhan mendadak secara sigap.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: STANDAR KEPERCAYAAN & KOMITMEN */}
        <section className="w-section" id="standar-layanan">
          <div className="w-section-header">
            <span className="w-kicker">
              <Users size={13} />
              <span>Standar Kerja</span>
            </span>
            <h2 className="w-title">
              Mengapa Mempercayakan Pernikahan kepada <em>WD Sky Wedding</em>?
            </h2>
            <p className="w-subtitle">
              Ketenangan pikiran keluarga Anda adalah tolok ukur kesuksesan tertinggi bagi seluruh jajaran kru kami.
            </p>
          </div>

          <div className="w-trust-grid">
            <div className="w-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Pengalaman & Portofolio Nyata</span>
              </h4>
              <p>
                Telah berpengalaman mendampingi calon pengantin di berbagai venue terkemuka Solo Raya. Hubungi kami untuk melihat dokumentasi portofolio lengkap dan konsultasi konsep acara Anda.
              </p>
            </div>

            <div className="w-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Pembagian Tugas Kru yang Jelas</span>
              </h4>
              <p>
                Setiap kru memiliki peran spesifik (Stage Manager, Groom & Bride Assistant, Food Coordinator, Guest Flow Officer) sehingga tidak ada tugas yang tumpang tindih.
              </p>
            </div>

            <div className="w-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Keluwesan Adaptasi Lapangan</span>
              </h4>
              <p>
                Mampu mengatasi kendala tak terduga dengan tenang dan santun, mulai dari pergeseran jam acara, cuaca di area outdoor, hingga penyesuaian porsi katering di saat jam sibuk.
              </p>
            </div>

            <div className="w-trust-card">
              <h4>
                <CheckCircle2 size={17} />
                <span>Jaringan Vendor Pilihan Luas</span>
              </h4>
              <p>
                Siap berkoordinasi langsung dengan 14+ venue gedung dan hotel ternama di Solo, vendor tata boga katering berpengalaman, hingga perias paes pengantin bersertifikat di Solo Raya.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4B: 14 VENUE PILIHAN DI SOLO RAYA */}
        <section className="w-section" id="venue-rekanan">
          <div className="w-section-header">
            <span className="w-kicker">
              <Building2 size={13} />
              <span>Panduan &amp; Rekomendasi Venue</span>
            </span>
            <h2 className="w-title">
              14 Venue Pilihan di Solo Raya <em>Siap Kami Koordinasikan</em>
            </h2>
            <p className="w-subtitle">
              Berikut adalah 14 venue populer di Solo Raya yang siap dikoordinasikan oleh tim WD Sky Wedding. Buka brosur PDF atau pricelist masing-masing venue di bawah ini:
            </p>
          </div>

          <div className="w-venues-grid">
            {partnerVenues.map((v, i) => (
              <a
                key={i}
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-venue-card"
                title={`Lihat Brosur / Pricelist ${v.name}`}
              >
                <div className="w-venue-thumb-wrap">
                  <img
                    src={v.image}
                    alt={`Venue pernikahan ${v.name} Solo`}
                    className="w-venue-thumb"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/portfolio/resepsi/resepsi-1.jpg";
                    }}
                  />
                  <div className="w-venue-overlay" />
                  <span className="w-venue-tag">{v.tag}</span>
                </div>
                <div className="w-venue-content">
                  <div>
                    <h3 className="w-venue-name">{v.name}</h3>
                    <p className="w-venue-desc">{v.desc}</p>
                  </div>
                  <div className="w-venue-footer">
                    <span>Lihat Brosur / Pricelist Venue</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 5: BAGIAN ULASAN KLIEN GOOGLE BUSINESS PROFILE */}
        <section className="w-section" id="ulasan-klien">
          <div className="w-section-header">
            <span className="w-kicker">
              <Sparkles size={13} />
              <span>Transparansi Klien Asli</span>
            </span>
            <h2 className="w-title">
              Ulasan Nyata dari <em>Klien Kami di Google Maps</em>
            </h2>
            <p className="w-subtitle">
              Reputasi kami dibangun atas kepuasan murni para pasangan pengantin dan keluarga besar yang telah mempercayakan momen sakralnya kepada kami.
            </p>
          </div>

          <div className="w-review-box">
            <div className="w-review-stars">★★★★★</div>
            <p className="w-review-text">
              Kami berkomitmen menjaga kejujuran dan etika profesional dalam setiap pelayanan. Seluruh testimoni dan pengalaman pengantin yang menggunakan jasa WD Sky Wedding Organizer dapat Anda baca langsung secara transparan pada profil resmi Google Business Profile kami di Google Maps.
            </p>
            <div className="w-review-actions">
              <a href={reviewProfileUrl} target="_blank" rel="noopener noreferrer" className="w-btn-google">
                <MapPin size={18} color="#ea4335" />
                <span>Lihat Ulasan Kami di Google</span>
                <ArrowUpRight size={15} />
              </a>
              <a href={writeReviewUrl} target="_blank" rel="noopener noreferrer" className="w-btn-review-write">
                <span>Beri Ulasan di Google</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ LENGKAP (MINIMAL 8 PERTANYAAN) */}
        <section className="w-section" id="faq">
          <div className="w-section-header">
            <span className="w-kicker">
              <HelpCircle size={13} />
              <span>Tanya Jawab</span>
            </span>
            <h2 className="w-title">
              Pertanyaan yang Sering Diajukan <em>(FAQ)</em>
            </h2>
            <p className="w-subtitle">
              Informasi lengkap seputar sistem kerja, biaya, dan tata cara booking layanan wedding organizer di wilayah Solo dan Solo Raya.
            </p>
          </div>

          <div className="w-faq-list">
            <details className="w-faq-item" open>
              <summary className="w-faq-summary">
                Berapa biaya jasa wedding organizer WD Sky Wedding di Solo dan Solo Raya?
              </summary>
              <div className="w-faq-answer">
                Bagi calon pengantin yang mencari layanan wedding organizer terjangkau (paket WO murah di Solo Raya) dengan standar eksekusi yang tertib dan elegan, kami menyediakan 3 pilihan paket resmi dengan harga transparan:
                <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.7' }}>
                  <li><strong>Package 1 (Wedding Organizer):</strong> Promo <strong>Rp 5.500.000</strong> (harga normal Rp 6.300.000) untuk Akad Nikah, Temu Manten, dan Resepsi dalam satu acara (maksimal 300 tamu undangan, vendor 85%).</li>
                  <li><strong>Package 2 (Wedding Planner &amp; WO):</strong> Promo <strong>Rp 6.300.000</strong> (harga normal Rp 7.300.000) dengan <strong>12 orang kru bertugas</strong>, unlimited consultation, dan meeting 4 kali.</li>
                  <li><strong>Package 3 (Planner &amp; WO VIP):</strong> Promo <strong>Rp 7.300.000</strong> (harga normal Rp 8.300.000) dengan <strong>14 orang kru bertugas</strong>, technical meeting unlimited, dan paket hospitality/survival kit terlengkap.</li>
                </ul>
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Kapan waktu paling ideal bagi calon pengantin untuk memesan (booking) layanan WO?
              </summary>
              <div className="w-faq-answer">
                Waktu booking yang paling disarankan adalah 3 hingga 6 bulan sebelum hari pernikahan, terutama bagi Anda yang menginginkan pendampingan pemilihan venue gedung dan kurasi vendor utama di Solo Raya. Namun, bagi pasangan yang telah menyiapkan seluruh vendor dan hanya membutuhkan manajemen pengawalan hari-H, booking masih dapat dilakukan minimal 1 sampai 2 bulan sebelum tanggal acara.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Apa saja lingkup tugas dan tanggung jawab kru wedding organizer di hari-H?
              </summary>
              <div className="w-faq-answer">
                Kru kami bertugas mengawal seluruh kelancaran acara: memastikan kedatangan vendor tepat waktu, mendampingi pengantin dan orang tua di ruang rias, mengarahkan jalannya prosesi akad dan upacara adat, mengoordinasikan tamu VIP dan prasmanan katering, memandu kirab pengantin dan foto bersama, hingga memastikan logistik kado dan kotak amplop diserahterimakan dengan aman kepada keluarga.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Apakah WD Sky Wedding melayani acara pernikahan di rumah selain di gedung?
              </summary>
              <div className="w-faq-answer">
                Tentu saja. Kami berpengalaman menangani perhelatan pernikahan di convention hall, ballroom hotel, maupun perhelatan syukuran di halaman rumah pribadi (hajatan tenda). Tim kami akan membantu merancang denah sirkulasi tamu, penataan meja prasmanan, dan tata letak pelaminan agar acara di rumah tetap bernuansa anggun, nyaman, dan tidak terasa padat.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Bagaimana mekanisme pembayaran dan berapa besaran uang muka (DP)?
              </summary>
              <div className="w-faq-answer">
                Sistem pembayaran kami bagi dalam tahapan yang memudahkan pasangan: uang muka (DP) awal untuk mengunci tanggal acara, pembayaran termin kedua setelah Technical Meeting terpadu terselenggara, dan pelunasan menjelang hari-H. Rincian perjanjian dituangkan secara tertulis demi kenyamanan kedua belah pihak.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Apakah tim WD Sky Wedding berpengalaman memandu prosesi pernikahan adat Jawa klasik?
              </summary>
              <div className="w-faq-answer">
                Ya, tim kami memahami pakem dan filosofi upacara adat Jawa gaya Surakarta Hadiningrat, termasuk tata urutan pasang tarub, siraman, midodareni, akad nikah, upacara panggih, balangan suruh/gantal, kacar-kucur, dulangan, hingga sungkeman. Kami berkolaborasi harmonis bersama pemandu adat (pranata cara) dan perias pengantin keluarga Anda.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Wilayah mana saja di Solo Raya yang dijangkau oleh layanan WD Sky Wedding?
              </summary>
              <div className="w-faq-answer">
                Area operasional utama kami mencakup 7 kabupaten/kota di Solo Raya: Kota Surakarta (Solo), Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri. Karena kantor pusat kami berada di Mojolaban Sukoharjo yang berbatasan langsung dengan pusat Kota Solo, mobilitas tim ke seluruh penjuru Solo Raya berlangsung cepat dan efisien.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Apakah kami diperkenankan menggunakan vendor keluarga sendiri?
              </summary>
              <div className="w-faq-answer">
                Tentu diperbolehkan. Kami menyambut baik kerja sama dengan vendor-vendor rekanan pilihan keluarga Anda, seperti katering langganan, dekorasi kerabat, maupun perias keluarga. Tugas utama WD Sky Wedding adalah bertindak sebagai konduktor yang menyelaraskan seluruh vendor agar bekerja kompak di bawah satu rundown yang terkoordinasi.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Bagaimana langkah tim mengatasi potensi kendala teknis atau perubahan cuaca?
              </summary>
              <div className="w-faq-answer">
                Setiap pernikahan selalu kami lengkapi dengan rencana mitigasi (contingency plan). Kami menyediakan kru standby dengan alat komunikasi radio (HT) untuk merespons dinamika panggung, lonjakan antrean prasmanan, pergeseran durasi sesi foto, maupun antisipasi cuaca hujan pada venue outdoor secara sigap dan tenang.
              </div>
            </details>

            <details className="w-faq-item">
              <summary className="w-faq-summary">
                Venue mana saja di Solo Raya yang siap dikoordinasikan oleh WD Sky Wedding?
              </summary>
              <div className="w-faq-answer">
                Kami siap mendampingi dan mengoordinasikan acara Anda di <strong>14 venue favorit di Solo Raya</strong>:
                <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.7' }}>
                  <li><strong>Hotel &amp; Ballroom Mewah:</strong> Hotel Alila Solo, The Alana Hotel Solo, UNS Hotel &amp; Convention.</li>
                  <li><strong>Grand Ballroom &amp; Heritage Hall:</strong> Masjid Raya Sheikh Zayed, Convention Hall Tirtonadi, Gedung Wisma Batari Solo, TBJT (Taman Budaya Jawa Tengah).</li>
                  <li><strong>Outdoor Garden &amp; Rustic Barn:</strong> Grandis Barn Solo (Colomadu), Anasera Solo, Gubug Makan Mang Engking.</li>
                  <li><strong>Heritage &amp; Intimate Space:</strong> Happy Tuty Solo, Beams Cafe Solo, Arja Cafe Solo, Wastra Bumbu Solo.</li>
                </ul>
                Brosur PDF dan estimasi pricelist masing-masing venue dapat Anda buka langsung melalui daftar kartu venue di atas atau dikonsultasikan bersama tim WD Sky Wedding.
              </div>
            </details>
          </div>
        </section>

        {/* SECTION 7: PANDUAN LAYANAN PER KABUPATEN DI SOLO RAYA */}
        <section className="w-section" id="wilayah-solo-raya">
          <div className="w-section-header">
            <span className="w-kicker">
              <MapPin size={13} />
              <span>Jangkauan Wilayah</span>
            </span>
            <h2 className="w-title">
              Layanan Wedding Organizer di Seluruh <em>Solo Raya</em>
            </h2>
            <p className="w-subtitle">
              Temukan informasi spesifik, rekomendasi venue populer, dan keunikan tata cara pernikahan untuk masing-masing kabupaten di wilayah Solo Raya:
            </p>
          </div>

          <div className="w-region-grid">
            <Link to="/wedding/sukoharjo" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Sukoharjo</span>
                  <span className="w-region-tag">Pusat Kantor</span>
                </div>
                <p className="w-region-desc">
                  Layanan wedding organizer di kawasan Solo Baru, Mojolaban, Kartasura, dan sekitarnya. Dekat dengan berbagai convention hall dan venue modern.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Sukoharjo</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>

            <Link to="/wedding/karanganyar" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Karanganyar</span>
                  <span className="w-region-tag">Heritage & Alam</span>
                </div>
                <p className="w-region-desc">
                  Spesialisasi pernikahan konsep outdoor, intimate villa Tawangmangu, hingga venue heritage legendaris seperti De Tjolomadoe.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Karanganyar</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>

            <Link to="/wedding/klaten" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Klaten</span>
                  <span className="w-region-tag">Tradisi & Gedung</span>
                </div>
                <p className="w-region-desc">
                  Koordinasi pernikahan tradisi piring terbang maupun prasmanan modern di gedung Graha Bung Karno dan venue pernikahan Klaten.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Klaten</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>

            <Link to="/wedding/boyolali" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Boyolali</span>
                  <span className="w-region-tag">Sejuk & Lapang</span>
                </div>
                <p className="w-region-desc">
                  Pengawalan acara pernikahan di Boyolali Convention Center, gedung pertemuan, hingga syukuran asri berlatar pemandangan pegunungan.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Boyolali</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>

            <Link to="/wedding/sragen" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Sragen</span>
                  <span className="w-region-tag">Khidmat & Meriah</span>
                </div>
                <p className="w-region-desc">
                  Manajemen acara pernikahan di Sasana Manggala Sukowati maupun perhelatan hajatan rumah di seluruh kecamatan Kabupaten Sragen.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Sragen</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>

            <Link to="/wedding/wonogiri" className="w-region-card">
              <div>
                <div className="w-region-name">
                  <span>Wonogiri</span>
                  <span className="w-region-tag">Hangat & Sakral</span>
                </div>
                <p className="w-region-desc">
                  Pendampingan hari bahagia pernikahan gedung dan syukuran kekeluargaan di Wonogiri dengan pengawalan tata waktu yang disiplin.
                </p>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#c89f67', fontSize: 13, fontWeight: 700 }}>
                <span>Buka Panduan Wonogiri</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>
          </div>
        </section>

        {/* SECTION 8: KONTAK RESMI, ALAMAT PASTI & EMBED GOOGLE MAPS */}
        <section className="w-section" id="kontak-lokasi">
          <div className="w-section-header">
            <span className="w-kicker">
              <Building2 size={13} />
              <span>Kantor & Kunjungan</span>
            </span>
            <h2 className="w-title">
              Hubungi Kami & <em>Kunjungi Kantor WD Group</em>
            </h2>
            <p className="w-subtitle">
              Kami menyambut hangat calon pengantin dan keluarga untuk berdiskusi langsung seputar rencana pernikahan Anda di kantor kami.
            </p>
          </div>

          <div className="w-contact-grid">
            <div className="w-contact-info">
              <h3>WD Group Company (WD GROUP SOLO)</h3>
              <p>
                Divisi <strong>WD Sky Wedding Organizer</strong> melayani konsultasi pernikahan untuk area Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri.
              </p>

              <div className="w-nap-item">
                <MapPin className="w-nap-icon" />
                <div className="w-nap-text">
                  <strong>Alamat Kantor & Operasional:</strong>
                  <span>Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</span>
                </div>
              </div>

              <div className="w-nap-item">
                <Phone className="w-nap-icon" />
                <div className="w-nap-text">
                  <strong>Telepon / WhatsApp Resmi:</strong>
                  <a href={bookingHref} target="_blank" rel="noopener noreferrer">
                    0857-0790-9415 (Klik untuk Chat Konsultasi)
                  </a>
                </div>
              </div>

              <div className="w-nap-item">
                <Clock className="w-nap-icon" />
                <div className="w-nap-text">
                  <strong>Jam Pelayanan Konsultasi:</strong>
                  <span>Senin – Sabtu: 09.00 – 17.00 WIB (Konsultasi via WhatsApp responsif setiap hari)</span>
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="w-package-btn" style={{ width: 'auto', display: 'inline-flex' }}>
                  <MessageCircle size={16} />
                  <span>Chat WhatsApp Sekarang</span>
                </a>
                <a href={reviewProfileUrl} target="_blank" rel="noopener noreferrer" className="w-btn-google" style={{ width: 'auto', padding: '12px 20px' }}>
                  <MapPin size={16} color="#ea4335" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>

            <div className="w-map-wrapper">
              <iframe
                title="Peta Lokasi Kantor WD Group Company Sukoharjo Solo"
                src="https://maps.google.com/maps?q=-7.593558,110.883616&hl=id&z=16&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

      </div>

      {/* FLOATING WHATSAPP BUTTON (MOBILE & DESKTOP) */}
      <a
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-floating-wa"
        title="Konsultasi Wedding Organizer Solo Raya via WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Konsultasi Wedding</span>
      </a>
    </DivisionLayout>
  );
}
