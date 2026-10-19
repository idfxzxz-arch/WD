import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { weddingRegions } from "../src/pages/weddingRegionData.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")
const distDir = path.resolve(rootDir, "dist")

const SITE_URL = "https://www.wdgroupcompany.biz.id"

// 15 Venue Rekomendasi WD Sky Wedding
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
  },
  {
    name: "Hotel Nirwana Sarangan",
    tag: "Resort & Mountain View",
    image: "/venues/hotel-nirwana-sarangan.webp",
    desc: "Hotel Nirwana Sarangan · Suasana sejuk lereng Gunung Lawu & Telaga Sarangan untuk perhelatan intimate berkesan.",
    link: "https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20konsultasi%20paket%20wedding%20di%20Hotel%20Nirwana%20Sarangan."
  }
];

// 10 FAQ Wedding
const weddingFaqs = [
  {
    q: "Berapa biaya / harga paket wedding organizer (WO murah Solo) di Solo dan Solo Raya?",
    a: "Bagi Anda yang mencari paket WO murah di Solo dan Solo Raya dengan standar mutu eksekusi elegan dan rapi, kami menyediakan 3 pilihan paket resmi dengan harga transparan mulai dari promo Rp 5.500.000 (di bawah 10 juta). Alokasi anggaran efisien tanpa mengurangi kekhidmatan acara pernikahan. Hubungi kami untuk rincian paket dan proposal resmi."
  },
  {
    q: "Kapan waktu paling ideal untuk memesan (booking) layanan wedding organizer?",
    a: "Waktu ideal adalah 3 hingga 6 bulan sebelum hari pernikahan, terutama bagi pasangan yang membutuhkan pendampingan pemilihan vendor gedung, katering, dan dekorasi di Solo Raya. Bagi pasangan yang sudah memiliki vendor lengkap dan hanya memerlukan koordinasi hari-H (day-of coordinator), pemesanan dapat dilakukan 1 hingga 2 bulan sebelum acara."
  },
  {
    q: "Apa saja tugas dan tanggung jawab kru wedding organizer pada hari-H?",
    a: "Pada hari-H, tim WD Sky Wedding mengelola seluruh operasional acara: memandu timeline persiapan rias pengantin, mengawal kesiapan vendor, memimpin prosesi akad dan temu pengantin, mengatur alur kirab, mengoordinasikan tamu kehormatan dan prasmanan, hingga mengamankan mahar dan kotak amplop."
  },
  {
    q: "Apakah WD Sky Wedding melayani acara pernikahan hajatan di rumah selain di gedung?",
    a: "Ya, kami terbiasa menangani pesta pernikahan baik di gedung pertemuan, ballroom hotel, maupun halaman rumah pribadi (hajatan tenda) di wilayah Solo dan Solo Raya. Pernikahan di rumah memiliki dinamika alur tamu dan ruang tersendiri, dan kru kami siap mengatur tata sirkulasi agar tetap tertib dan nyaman."
  },
  {
    q: "Bagaimana sistem pembayaran dan ketentuan uang muka (DP)?",
    a: "Sistem pembayaran dilakukan secara bertahap dan transparan. Calon pengantin mengamankan tanggal dengan pembayaran uang muka (DP), dilanjutkan termin kedua saat technical meeting, dan pelunasan sebelum hari-H sesuai kesepakatan kontrak kerja sama."
  },
  {
    q: "Apakah tim WD Sky Wedding berpengalaman menangani pernikahan adat Jawa di Solo?",
    a: "Ya, tim kami memahami tata urutan upacara adat Jawa khas Surakarta Hadiningrat, seperti pasang tarub, siraman, midodareni, akad nikah, upacara panggih, balangan gantal, kacar-kucur, dulang-dulangan, hingga sungkeman kepada orang tua."
  },
  {
    q: "Wilayah mana saja di Solo Raya yang dilayani oleh WD Sky Wedding?",
    a: "Kami melayani seluruh 7 wilayah Solo Raya: Kota Surakarta (Solo), kawasan Solo Baru, Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri, dengan basis kantor operasional di pusat konektivitas Solo Raya."
  },
  {
    q: "Apakah klien diperbolehkan membawa vendor rekanan sendiri?",
    a: "Tentu saja. Anda bebas membawa vendor katering, dekorasi, rias, atau dokumentasi pilihan keluarga. Peran utama kami adalah menyatukan seluruh vendor tersebut dalam satu komando rundown agar bekerja selaras tanpa hambatan komunikasi."
  },
  {
    q: "Bagaimana tim menangani kemungkinan kendala teknis atau cuaca saat acara berlangsung?",
    a: "Setiap perhelatan dilengkapi dengan rencana cadangan (contingency plan) yang disusun saat technical meeting. Tim dilengkapi alat komunikasi radio (HT) dan checklist darurat untuk mengantisipasi keterlambatan vendor, genset, cuaca hujan, maupun penyesuaian rundown mendadak."
  },
  {
    q: "Venue mana saja di Solo Raya yang sudah pernah ditangani oleh WD Sky Wedding?",
    a: "WD Group Company memiliki pengalaman menangani acara di berbagai venue favorit di Solo Raya: Hotel Alila Solo, The Alana Hotel Solo, Masjid Raya Zayed Solo, Convention Hall Tirtonadi, Wisma Batari Solo, Hotel UNS Solo, TBJT (Taman Budaya Jawa Tengah), Grandis Barn Solo, Anasera Solo, Gubug Makan Mang Engking, Happy Tuty Solo, Beams Cafe Solo, Arja Cafe Solo, Wastra Bumbu Solo, dan Hotel Nirwana Sarangan."
  }
]

// HTML Builder untuk Wedding Page Utama (/wedding)
function buildWeddingHtml() {
  const venuesHtml = partnerVenues.map(v => `
    <div class="card venue-card">
      <h3>${v.name}</h3>
      <p><em>${v.tag}</em></p>
      <p>${v.desc}</p>
      <p><a href="${v.link}" target="_blank" rel="noopener noreferrer">Buka Katalog Pricelist Google Drive &rarr;</a></p>
    </div>
  `).join("")

  const faqsHtml = weddingFaqs.map(f => `
    <div class="card faq-item">
      <h3>${f.q}</h3>
      <p>${f.a}</p>
    </div>
  `).join("")

  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Wedding Organizer Solo Raya</strong></p>
      </nav>

      <header>
        <h1>WD Sky Wedding – Jasa Wedding Organizer Solo, WO Murah &amp; Elegan di Solo Raya</h1>
        <p>Layanan jasa wedding organizer dan wedding planner profesional (WO Solo &amp; WO murah Solo) di Solo dan Solo Raya (Surakarta, Solo Baru, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri). Kami mengusung konsep pernikahan yang rapi, tertib, dan elegan, disesuaikan dengan kebutuhan dan budget Anda mulai promo Rp 5.500.000 untuk resepsi gedung maupun hajatan rumah.</p>
      </header>

      <section>
        <h2>Solusi Paket Wedding Organizer Solo Murah &amp; Kualitas Elegan</h2>
        <p>Merencanakan sebuah pernikahan di Solo dan Solo Raya adalah perpaduan antara merawat nilai-nilai tradisi yang luhur dan menyelaraskan preferensi modern yang dinamis. WD Sky Wedding Organizer (layanan WO Solo dari ekosistem kreatif WD Group Company) hadir mendampingi setiap pasangan yang mendambakan perhelatan pernikahan yang tertata rapi, berkelas, dan memiliki alokasi anggaran yang jelas melalui paket wedding organizer Solo murah dan terjangkau.</p>
        <p>Bagi kami, pernikahan adalah peristiwa sakral ketika dua keluarga besar bersatu. Oleh karena itu, pendekatan kerja kami bertumpu pada paket wedding planner yang disesuaikan dengan kebutuhan dan budget Anda, dengan konsep yang elegan. Setiap rincian teknis—mulai dari prosesi ijab qobul akad nikah, upacara adat Jawa Surakarta (panggih, balangan gantal, kacar-kucur), koordinasi katering, hingga pengaturan panggung hiburan—dikelola dengan disiplin waktu dan kepekaan rasa yang tinggi.</p>
        <p>Wilayah layanan kami menjangkau seluruh kawasan Solo Raya: Kota Surakarta (Solo), Solo Baru, Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, hingga Wonogiri. Baik di gedung pertemuan, ballroom hotel (seperti Alila dan The Alana), intimate outdoor garden (Grandis Barn Colomadu dan Anasera), gedung heritage (Wisma Batari dan Convention Hall Tirtonadi), maupun hajatan rumah pribadi, tim profesional WD Sky Wedding Organizer siap mengawal hari bahagia Anda.</p>
      </section>

      <section id="paket-pernikahan">
        <h2>Pilihan Paket Wedding Organizer Solo Murah &amp; Elegan (Mulai Rp 5,5 Juta)</h2>
        <p>Berikut adalah pilihan paket wedding organizer yang tersedia untuk kebutuhan prosesi akad nikah, resepsi gedung, dan hajatan rumah Anda:</p>
        
        <div class="package-grid">
          <div class="card package-card">
            <h3>Package 1 (Wedding Organizer)</h3>
            <p><strong>Akad Nikah, Temu Manten, dan Resepsi</strong> dalam satu rangkaian acara terpadu. Cocok untuk pasangan dengan vendor sudah 85% siap dan kapasitas maksimal 300 tamu undangan.</p>
            <p class="price">Harga: Rp 5.500.000 <small style="color:#94a3b8; text-decoration:line-through;">Rp 6.300.000</small></p>
            <ul>
              <li>8-10 Kru WO profesional berseragam formal bertugas di hari-H</li>
              <li>Penyusunan rundown detail acara akad nikah, temu adat Jawa, dan resepsi</li>
              <li>1x Technical Meeting bersama keluarga dan seluruh vendor</li>
              <li>Koordinasi katering, dekorasi, tata rias (MUA), fotografer, MC, dan sound system</li>
              <li>Pengawalan seserahan, mahar, dan kotak amplop tamu</li>
            </ul>
          </div>

          <div class="card package-card">
            <h3>Package 2 (Wedding Planner & WO)</h3>
            <p><strong>Perencanaan Menyeluruh & Pendampingan Vendor</strong>. Pilihan tepat bagi pasangan yang membutuhkan asistensi dari awal perencanaan hingga pelaksanaan hari-H.</p>
            <p class="price">Harga: Rp 6.300.000 <small style="color:#94a3b8; text-decoration:line-through;">Rp 7.300.000</small></p>
            <ul>
              <li>12 Kru bertugas di hari-H</li>
              <li>Unlimited konsultasi daring/tatap muka mengenai konsep pernikahan</li>
              <li>Kurasi, rekomendasi, dan koordinasi vendor pilihan sesuai anggaran</li>
              <li>Penyusunan konsep tema, moodboard visual, dan tata letak venue</li>
              <li>Manajemen seating chart dan alur sirkulasi tamu</li>
              <li>Pendampingan gladi bersih (rehearsal) sebelum hari pelaksanaan</li>
            </ul>
          </div>

          <div class="card package-card">
            <h3>Package 3 (Planner & WO VIP)</h3>
            <p><strong>Layanan VIP Eksklusif & Show Director Panggung</strong>. Layanan terlengkap untuk pernikahan berskala besar dengan koordinasi detail tingkat tinggi.</p>
            <p class="price">Harga: Rp 7.300.000 <small style="color:#94a3b8; text-decoration:line-through;">Rp 8.300.000</small></p>
            <ul>
              <li>14 Kru bertugas di hari-H</li>
              <li>Show Director berdedikasi memimpin alur panggung dan rundown menit demi menit</li>
              <li>VIP Butler & Hospitality service mendampingi pengantin dan orang tua</li>
              <li>VIP Survival Kit lengkap (touch-up, perlengkapan darurat, konsumsi pengantin)</li>
              <li>Unlimited technical meeting koordinasi lintas vendor</li>
              <li>Sinergi terintegrasi bersama divisi WD Production dan WD Music Entertainment</li>
            </ul>
          </div>
        </div>

        <div class="card payment-note" style="margin-top: 1.5rem; background: #1a1815; border: 1px solid #332d24; padding: 1rem; border-radius: 8px;">
          <p><strong>Syarat &amp; Ketentuan Promo 2026:</strong> Potongan harga khusus (promo hemat Rp 800.000 s/d Rp 1.000.000) berlaku untuk pemesanan paket pernikahan periode tahun 2026 selama kuota bulanan masih tersedia. Hubungi admin WhatsApp kami untuk konfirmasi ketersediaan tanggal dan slot promo.</p>
          <p style="margin-top: 0.5rem;"><strong>NB (Request Tambahan Properti):</strong> Tambahan barang properti atau perlengkapan acara di luar paket dapat direquest sesuai konsep acara dengan penyesuaian biaya.</p>
        </div>
      </section>

      <section id="venue-rekanan">
        <h2>15 Venue Pilihan di Solo Raya &amp; Sekitarnya Siap Kami Koordinasikan</h2>
        <p>Berikut adalah 15 venue populer di kawasan Solo Raya dan sekitarnya yang siap dikoordinasikan oleh tim WD Sky Wedding Organizer, lengkap dengan katalog pricelist:</p>
        <div class="venue-grid">
          ${venuesHtml}
        </div>
      </section>

      <section id="wilayah-layanan">
        <h2>Layanan Wedding Organizer per Wilayah Solo Raya</h2>
        <p>Kami menyediakan panduan pernikahan khusus serta koordinasi intensif di seluruh 6 kabupaten Solo Raya:</p>
        <ul>
          <li><a href="/wedding/sukoharjo"><strong>Wedding Organizer Sukoharjo & Solo Baru</strong></a> – Layanan gedung, hotel, dan pesta rumah di Mojolaban, Grogol, Kartasura, Baki.</li>
          <li><a href="/wedding/karanganyar"><strong>Wedding Organizer Karanganyar & Tawangmangu</strong></a> – Spesialis intimate outdoor garden di lereng Lawu dan venue heritage Colomadu.</li>
          <li><a href="/wedding/klaten"><strong>Wedding Organizer Klaten & Graha Bung Karno</strong></a> – Ahli manajemen alur jamuan piring terbang dan prasmanan modern Klaten.</li>
          <li><a href="/wedding/boyolali"><strong>Wedding Organizer Boyolali & BCC</strong></a> – Koordinasi Boyolali Convention Center dan pesta kekeluargaan asri Boyolali.</li>
          <li><a href="/wedding/sragen"><strong>Wedding Organizer Sragen & Gedung SMS</strong></a> – Penanganan Gedung Sasana Manggala Sukowati dan resepsi keluarga Sragen.</li>
          <li><a href="/wedding/wonogiri"><strong>Wedding Organizer Wonogiri & Giri Cahaya</strong></a> – Pendampingan persiapan jarak jauh bagi pasangan perantau (kaum boro) Wonogiri.</li>
        </ul>
      </section>

      <section id="faq">
        <h2>Pertanyaan yang Sering Diajukan (FAQ) seputar Wedding Organizer di Solo</h2>
        <div class="faq-list">
          ${faqsHtml}
        </div>
      </section>

      <section id="kontak">
        <h2>Kontak & Kantor Operasional</h2>
        <p><strong>WD Group Company (WD Sky Wedding Organizer)</strong></p>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20konsultasi%20paket%20wedding%20organizer%20di%20Solo%20Raya.">0857-0790-9415</a></p>
        <p>Email: groupcompanywd@gmail.com</p>
      </section>
      <footer>
        <p>@2026 PT WD GROUP SOLO</p>
      </footer>
    </article>
  `
}

// HTML Builder untuk Halaman Wilayah Wedding (/wedding/:regionKey)
function buildRegionHtml(reg) {
  const venuesHtml = reg.popularVenues.map(v => `
    <div class="card venue-card">
      <h3>${v.name}</h3>
      <p>${v.desc}</p>
    </div>
  `).join("")

  const faqsHtml = reg.faqs.map(f => `
    <div class="card faq-item">
      <h3>${f.q}</h3>
      <p>${f.a}</p>
    </div>
  `).join("")

  const otherRegions = Object.values(weddingRegions)
    .filter(r => r.key !== reg.key)
    .map(r => `<li><a href="/wedding/${r.key}">Wedding Organizer ${r.name} & Solo Raya</a></li>`)
    .join("")

  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <a href="/wedding">Wedding Organizer Solo Raya</a> / <strong>${reg.name}</strong></p>
      </nav>

      <header>
        <h1>${reg.h1}</h1>
        <p class="lead">${reg.introLead}</p>
      </header>

      <section>
        <h2>Profil & Karakteristik Pernikahan di ${reg.name}</h2>
        ${reg.overviewParagraphs.map(p => `<p>${p}</p>`).join("")}
      </section>

      <section>
        <h2>Rekomendasi Venue Pernikahan di ${reg.name}</h2>
        <p>Pilihan lokasi gedung pertemuan, hotel, dan venue outdoor yang sering menjadi rujukan pernikahan di ${reg.name}:</p>
        <div class="venue-grid">
          ${venuesHtml}
        </div>
      </section>

      <section>
        <h2>Tradisi & Adat Pernikahan Lokal ${reg.name}</h2>
        <p>${reg.localTraditions}</p>
      </section>

      <section>
        <h2>Pilihan Paket Pernikahan WD Sky Wedding di ${reg.name}</h2>
        <p>Kami menghadirkan paket wedding yang disesuaikan dengan kebutuhan dan budget Anda di ${reg.name}:</p>
        <ul>
          <li><strong>Package 1 (Wedding Organizer):</strong> Promo Rp 5.500.000 – Akad Nikah, Temu Manten, dan Resepsi (maks. 300 tamu, 8-10 kru).</li>
          <li><strong>Package 2 (Wedding Planner & WO):</strong> Promo Rp 6.300.000 – Pendampingan lengkap, kurasi vendor, 12 kru bertugas.</li>
          <li><strong>Package 3 (Planner & WO VIP):</strong> Promo Rp 7.300.000 – Layanan VIP Show Director, 14 kru bertugas, survival kit lengkap.</li>
        </ul>
        <p><a href="/wedding#paket-pernikahan">Lihat rincian lengkap paket dan fasilitas di Halaman Utama Wedding Organizer &rarr;</a></p>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Wedding Organizer ${reg.name}</h2>
        <div class="faq-list">
          ${faqsHtml}
        </div>
      </section>

      <section>
        <h2>Panduan Wilayah Lain di Solo Raya</h2>
        <p>WD Sky Wedding Organizer juga melayani seluruh kabupaten lain di Solo Raya:</p>
        <ul>
          ${otherRegions}
        </ul>
      </section>

      <section>
        <h2>Kontak & Kantor Operasional</h2>
        <p>Alamat Kantor: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20konsultasi%20layanan%20wedding%20organizer%20untuk%20wilayah%20${encodeURIComponent(reg.name)}.">0857-0790-9415</a></p>
      </section>
      <footer>
        <p>@2026 PT WD GROUP SOLO</p>
      </footer>
    </article>
  `
}

// HTML Builder untuk Divisi Event (/event)
function buildEventHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Event Organizer Solo</strong></p>
      </nav>

      <header>
        <h1>WD Event Organizer Solo – Manajemen Acara Korporat & Konser Solo Raya</h1>
        <p>WD Event Organizer membantu merancang dan menjalankan acara perusahaan, gathering, pameran expo, seminar, dan konser musik dengan konsep yang jelas, koordinasi vendor yang rapi, serta eksekusi lapangan yang tertib di Solo Raya.</p>
      </header>

      <section>
        <h2>Manajemen Acara Terencana di Solo dan Solo Raya</h2>
        <p>Menyelenggarakan sebuah acara berskala besar maupun menengah di Solo dan Solo Raya menuntut integrasi manajemen yang matang. Di tengah pesatnya pertumbuhan industri kreatif, pariwisata, dan bisnis di kawasan Surakarta, WD Event Organizer (divisi dari WD Group Company) hadir memberikan solusi manajemen acara komprehensif, mulai dari konseptualisasi kreatif, perancangan tata panggung, manajemen artis/talent, hingga pengawasan teknis di lapangan.</p>
        <p>Kami memastikan setiap menit rundown dikawal secara ketat agar tidak terjadi kekosongan panggung atau kepanikan teknis. Jangkauan layanan kami meliputi 7 wilayah Solo Raya: Kota Surakarta (Solo), Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri.</p>
      </section>

      <section>
        <h2>Ruang Lingkup Layanan Event Management</h2>
        <ul>
          <li><strong>Corporate Event & Family Gathering:</strong> Perencanaan outing perusahaan, gala dinner tahunan, employee gathering, dan malam apresiasi karyawan.</li>
          <li><strong>Konser Musik & Festival Seni:</strong> Tata panggung konser, tata suara (sound system), pencahayaan (lighting), perizinan acara, dan manajemen panggung.</li>
          <li><strong>Pameran / Expo & Bazaar:</strong> Penataan stan pameran, alur sirkulasi pengunjung, panggung hiburan, dan manajemen tenan.</li>
          <li><strong>Seminar & Konferensi Profesional:</strong> Manajemen registrasi peserta, audiovisual presentasi, hospitality pembicara, dan dokumentasi rapat kerja.</li>
        </ul>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Event Organizer Solo</h2>
        <div class="card faq-item">
          <h3>Acara apa saja yang dapat ditangani oleh WD Event Organizer di Solo Raya?</h3>
          <p>Kami menangani corporate gathering, konser musik, festival, pameran (exhibition & expo), seminar, product launching, gala dinner, hingga perhelatan private gathering di seluruh wilayah Solo dan Solo Raya.</p>
        </div>
        <div class="card faq-item">
          <h3>Apakah WD Event menyediakan peralatan panggung dan sound system?</h3>
          <p>Ya, kami bermitra dengan penyedia vendor rigging panggung, sound system konser, lighting panggung, dan LED videotron berpengalaman di Solo Raya untuk menghadirkan paket produksi terintegrasi.</p>
        </div>
      </section>

      <section>
        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Event%20Organizer%2C%20saya%20ingin%20konsultasi%20untuk%20acara%20kami.">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// HTML Builder untuk Divisi Production (/production)
function buildProductionHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Foto & Video Sinematik Solo</strong></p>
      </nav>

      <header>
        <h1>WD Production Solo – Jasa Foto & Video Sinematik Solo Raya</h1>
        <p>WD Production menghadirkan layanan dokumentasi video shooting sinematik, video profile perusahaan, fotografi komersial, dan liputan acara dengan standar visual berkualitas di Solo dan Solo Raya.</p>
      </header>

      <section>
        <h2>Layanan Dokumentasi Visual & Multimedia Kreatif Solo</h2>
        <p>Di era digital, kekuatan visual menjadi penentu persepsi publik terhadap sebuah acara maupun merek bisnis. WD Production menghadirkan tim fotografer dan videografer profesional dengan gear standar industri di Solo Raya untuk menangkap momen berharga secara tajam dan berkarakter.</p>
        <p>Kami melayani berbagai kebutuhan dokumentasi, mulai dari liputan multi-kamera untuk konser dan resepsi pernikahan, pembuatan video profil komersial, hingga sesi foto produk katalog untuk UMKM dan jenama lokal.</p>
      </section>

      <section>
        <h2>Ruang Lingkup Layanan Visual</h2>
        <ul>
          <li><strong>Video Sinematik Wedding & Event:</strong> Pengabadian prosesi sakral dan kemeriahan perhelatan dengan konsep sinematik modern serta color grading elegan.</li>
          <li><strong>Video Company Profile:</strong> Representasi visual profil institusi, rekam jejak perusahaan, fasilitas kantor, dan wawancara pimpinan secara berwibawa.</li>
          <li><strong>Commercial Video & Campaign:</strong> Pembuatan video promosi produk, materi iklan media sosial, dan kampanye jenama berdaya pikat tinggi.</li>
          <li><strong>Fotografi Komersial & Produk:</strong> Foto katalog produk, arsitektur interior venue, dan dokumentasi portofolio profesional.</li>
          <li><strong>Liputan Multi-Kamera & Drone Aerial:</strong> Pengambilan gambar udara lanskap acara dan live video feeding untuk layar LED videotron.</li>
        </ul>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Foto & Video Solo</h2>
        <div class="card faq-item">
          <h3>Layanan foto dan video apa saja yang disediakan oleh WD Production di Solo?</h3>
          <p>Kami menyediakan jasa dokumentasi video sinematik, video company profile perusahaan, video iklan komersial, fotografi produk, dokumentasi event dan wedding, hingga aerial drone video di Solo dan Solo Raya.</p>
        </div>
        <div class="card faq-item">
          <h3>Berapa lama estimasi proses editing video dan penyerahan hasil foto?</h3>
          <p>Highlight teaser 1 menit biasanya selesai dalam 3-5 hari kerja. Paket lengkap dokumentasi foto teredit dan video full documentation selesai dalam 14 hingga 30 hari kerja tergantung kompleksitas proyek.</p>
        </div>
      </section>

      <section>
        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Production%2C%20saya%20ingin%20konsultasi%20jasa%20foto%20dan%20video.">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// HTML Builder untuk Divisi Music (/music)
function buildMusicHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Wedding Band & Live Music Solo</strong></p>
      </nav>

      <header>
        <h1>WD Music Entertainment – Wedding Band & Live Music Solo Raya</h1>
        <p>WD Music Entertainment menghadirkan penampilan live band untuk pernikahan dan acara, penyewaan studio rekaman, dan bimbingan kelas musik di Solo dan Solo Raya.</p>
      </header>

      <section>
        <h2>Layanan Hiburan Musik Panggung di Solo Raya</h2>
        <p>Kehadiran tata musik yang tepat mampu membangun suasana hangat, haru, dan semarak dalam setiap perhelatan. WD Music Entertainment menyediakan musisi dan penyanyi profesional dengan aransemen musik yang disesuaikan dengan konsep acara Anda.</p>
        <p>Mulai dari format akustik intim untuk jamuan makan malam dan resepsi intimate, hingga formasi full band pop/jazz yang energetik untuk memeriahkan festival dan pesta perusahaan di Solo Raya.</p>
      </section>

      <section>
        <h2>Pilihan Layanan Musik</h2>
        <ul>
          <li><strong>Wedding Band Akustik:</strong> Formasi vokal, piano/keyboard, gitar akustik, dan kajon untuk nuansa syahdu dan romantis.</li>
          <li><strong>Full Band Event & Gathering:</strong> Aransemen lengkap drum, bass, keyboard, gitar elektrik, dan vokal untuk menyemarakkan pesta perhelatan akbar.</li>
          <li><strong>Kamar Musik Klasik (String Section):</strong> Gesekan biola dan cello untuk mengiringi prosesi sakral akad nikah dan kirab pengantin adat/internasional.</li>
          <li><strong>Rental Studio Musik & Rekaman:</strong> Fasilitas ruang latihan musik kedap suara dengan instrumen dan tata rekam audio berkualitas.</li>
          <li><strong>Kursus & Kelas Musik:</strong> Bimbingan belajar instrumen vokal, gitar, piano, dan drum untuk berbagai tingkatan usia.</li>
        </ul>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Live Music Solo</h2>
        <div class="card faq-item">
          <h3>Format live band apa saja yang tersedia untuk pernikahan dan event di Solo?</h3>
          <p>Kami menyediakan format Acoustic Trio/Quartet (vokal, gitar/piano, kajon/bass), Full Band Pop/Jazz, Kamar Musik Klasik (string chamber), hingga pengiring acara perhelatan akbar di Solo Raya.</p>
        </div>
        <div class="card faq-item">
          <h3>Apakah pengantin atau penyelenggara dapat meminta daftar lagu khusus (song request)?</h3>
          <p>Tentu saja. Klien dapat menyusun daftar lagu favorit dan lagu wajib (special requested songs) saat prosesi kirab atau first dance paling lambat 2 minggu sebelum hari-H.</p>
        </div>
      </section>

      <section>
        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Music%2C%20saya%20ingin%20tanya%20layanan%20live%20music%20atau%20kelas%20musik.">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// HTML Builder untuk Divisi Workshop (/workshop)
function buildWorkshopHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Workshop & Pelatihan Solo</strong></p>
      </nav>

      <header>
        <h1>WD Jaya Workshop – Pelatihan Keterampilan & Bootcamp Solo</h1>
        <p>WD Jaya Workshop merancang kelas pelatihan praktis, bootcamp vokasi, seminar keterampilan, dan program in-house corporate training di Solo dan Solo Raya.</p>
      </header>

      <section>
        <h2>Pusat Pengembangan Keterampilan Praktis di Solo Raya</h2>
        <p>Menghadapi tuntutan industri yang dinamis, WD Jaya Workshop hadir memfasilitasi program pelatihan dengan kurikulum aplikatif yang berorientasi pada praktik nyata dan pembentukan portofolio kerja.</p>
        <p>Kami bekerja sama dengan praktisi berpengalaman untuk memberikan bimbingan intensif bagi individu, mahasiswa, maupun staf korporasi yang ingin meningkatkan kompetensi di bidang multimedia, digital skill, dan manajemen acara.</p>
      </section>

      <section>
        <h2>Program Pelatihan Utama</h2>
        <ul>
          <li><strong>Bootcamp Multimedia & Kreatif:</strong> Pelatihan pengoperasian kamera, teknik sinematografi dasar hingga lanjutan, tata pencahayaan, dan editing video.</li>
          <li><strong>Workshop Digital Marketing:</strong> Pengelolaan konten media sosial, strategi branding UMKM, dan perancangan kampanye promosi digital.</li>
          <li><strong>Pelatihan Manajemen Acara (Event & Wedding):</strong> Tata kelola kepanitiaan, penyusunan rundown, manajemen risiko panggung, dan koordinasi vendor lapangan.</li>
          <li><strong>In-House Corporate Training:</strong> Program pelatihan khusus yang disesuaikan dengan kebutuhan internal perusahaan atau instansi pemerintah di Solo Raya.</li>
        </ul>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Workshop Solo</h2>
        <div class="card faq-item">
          <h3>Apakah peserta bootcamp mendapatkan sertifikat dan bimbingan portofolio?</h3>
          <p>Ya, seluruh peserta yang menyelesaikan kurikulum dan tugas proyek akhir mendapatkan sertifikat resmi serta modul portofolio yang siap digunakan untuk melamar pekerjaan atau membuka jasa mandiri.</p>
        </div>
        <div class="card faq-item">
          <h3>Apakah pelatihan melayani kelas privat atau rombongan instansi?</h3>
          <p>Kami melayani kelas publik reguler, kelas privat satu lawan satu, maupun in-house training kelompok untuk instansi sekolah, kampus, dan perusahaan.</p>
        </div>
      </section>

      <section>
        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Jaya%20Workshop%2C%20saya%20ingin%20tanya%20program%20pelatihan.">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// HTML Builder untuk Divisi IT (/it)
function buildItHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Jasa Pembuatan Website Solo</strong></p>
      </nav>

      <header>
        <h1>WD IT & Digital Solution – Jasa Pembuatan Website Solo & Web Developer</h1>
        <p>WD IT melayani pembuatan website profil perusahaan, toko online, sistem informasi bisnis, dan undangan digital pernikahan modern di Solo dan Solo Raya.</p>
      </header>

      <section>
        <h2>Solusi Pembuatan Website & Pengembangan Digital Solo Raya</h2>
        <p>Website adalah etalase digital utama bagi bisnis untuk membangun reputasi profesional dan menjangkau pelanggan baru secara berkelanjutan. WD IT menghadirkan layanan perancangan dan pengembangan website dengan performa cepat, tampilan responsif di layar ponsel, serta struktur ramah mesin pencari (SEO-friendly).</p>
        <p>Kami mendampingi pelaku bisnis, UMKM, institusi pendidikan, dan calon pengantin di kawasan Solo Raya dalam menghadirkan solusi digital yang fungsional dan mudah dikelola.</p>
      </section>

      <section>
        <h2>Ruang Lingkup Layanan IT</h2>
        <ul>
          <li><strong>Website Company Profile:</strong> Situs web profil perusahaan elegan yang memuat informasi profil usaha, katalog produk/layanan, portofolio, dan integrasi WhatsApp.</li>
          <li><strong>Toko Online (E-Commerce):</strong> Website katalog produk interaktif dengan integrasi checkout pemesanan langsung ke WhatsApp atau gateway pembayaran otomatis.</li>
          <li><strong>Sistem Informasi & Aplikasi Web Kustom:</strong> Pengembangan aplikasi berbasis web untuk pencatatan inventaris, sistem manajemen operasional, dan dashboard laporan.</li>
          <li><strong>Undangan Digital Pernikahan:</strong> Undangan online interaktif dengan fitur RSVP, navigasi peta Google Maps, galeri foto, kisah cinta, dan amplop digital.</li>
        </ul>
      </section>

      <section>
        <h2>Pertanyaan yang Sering Diajukan (FAQ) – Jasa Website Solo</h2>
        <div class="card faq-item">
          <h3>Berapa lama proses pengerjaan website company profile di WD IT?</h3>
          <p>Waktu pengerjaan standar berkisar antara 7 hingga 14 hari kerja setelah materi konten (teks, foto, logo) diterima lengkap oleh tim kami.</p>
        </div>
        <div class="card faq-item">
          <h3>Apakah website yang dibuat sudah termasuk nama domain dan hosting?</h3>
          <p>Ya, seluruh paket pembuatan website di WD IT sudah mencakup pendaftaran domain resmi (.com / .id), konfigurasi cloud hosting berkecepatan tinggi, sertifikat keamanan SSL (HTTPS), dan panduan pengelolaan.</p>
        </div>
      </section>

      <section>
        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20IT%2C%20saya%20ingin%20konsultasi%20pembuatan%20website%20atau%20aplikasi.">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// HTML Builder untuk Halaman Works (/works)
function buildWorksHtml() {
  return `
    <article>
      <nav aria-label="Breadcrumb">
        <p><a href="/">&larr; Beranda</a> / <strong>Portofolio & Showcase Karya</strong></p>
      </nav>

      <header>
        <h1>Portofolio & Showcase Karya – WD Group Company</h1>
        <p>Koleksi dokumentasi proyek dan rekam jejak pelaksanaan karya dari seluruh divisi WD Group Company di Solo dan Solo Raya: Wedding Organizer, Event Organizer, Visual Production, Musik, Workshop, dan Solusi Digital IT.</p>
      </header>

      <section>
        <h2>Dokumentasi Acara & Kolaborasi Lintas Divisi</h2>
        <p>Sebagai ekosistem kreatif terintegrasi di Solo Raya, WD Group Company memadukan keahlian antar divisi untuk mewujudkan perhelatan acara yang rapi, megah, dan berkesan mendalam. Setiap karya yang kami hadirkan merupakan komitmen nyata terhadap kualitas estetika, manajemen waktu, dan kepuasan klien.</p>
      </section>

      <section>
        <h2>Kategori Portofolio Layanan</h2>
        <ul>
          <li>
            <strong><a href="/wedding">WD Sky Wedding Organizer:</a></strong>
            Dokumentasi prosesi akad nikah khidmat, kirab temu manten adat Jawa Surakarta, resepsi ballroom hotel berbintang, dan pesta intimate garden wedding di Solo Raya.
          </li>
          <li>
            <strong><a href="/event">WD Event Organizer:</a></strong>
            Dokumentasi corporate gathering tahunan, konser musik panggung terbuka, pameran expo, dan seminar konferensi profesional.
          </li>
          <li>
            <strong><a href="/production">WD Production:</a></strong>
            Karya video shooting sinematik, video profil perusahaan, materi iklan komersial, dan foto produk katalog bernilai seni tinggi.
          </li>
          <li>
            <strong><a href="/music">WD Music Entertainment:</a></strong>
            Penampilan panggung live band akustik, full band pengisi resepsi pernikahan, tata suara panggung, dan rekaman audio studio.
          </li>
          <li>
            <strong><a href="/workshop">WD Jaya Workshop:</a></strong>
            Dokumentasi pelaksanaan kelas pelatihan multimedia, bootcamp digital marketing, dan program in-house training instansi.
          </li>
          <li>
            <strong><a href="/it">WD IT & Digital Solution:</a></strong>
            Showcase peluncuran website company profile responsif, platform e-commerce katalog, dan undangan digital pernikahan interaktif.
          </li>
        </ul>
      </section>

      <section>
        <h2>Konsultasi & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
      </section>
    </article>
  `
}

// Definisi Rute Lengkap
const routes = [
  {
    path: "wedding",
    canonical: `${SITE_URL}/wedding`,
    title: "Wedding Organizer Solo Murah & Elegan | WD Sky Wedding",
    description: "Jasa wedding organizer Solo & wedding planner terjangkau di Solo Raya. Paket WO murah mulai promo Rp 5,5 jt, resepsi gedung, hajatan rumah & adat Jawa.",
    ogTitle: "Wedding Organizer Solo Murah & Elegan | WD Sky Wedding",
    ogDescription: "Jasa wedding organizer Solo & wedding planner terjangkau di Solo Raya. Paket WO murah mulai promo Rp 5,5 jt, resepsi gedung, hajatan rumah & adat Jawa.",
    image: `${SITE_URL}/portfolio/resepsi/resepsi-8.jpg`,
    imageAlt: "Dekorasi pelaminan resepsi pernikahan elegan Solo Raya oleh WD Sky Wedding",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/wedding#business`,
      "name": "WD Sky Wedding Organizer Solo Raya",
      "alternateName": [
        "WD Sky Wedding",
        "WO Solo",
        "Wedding Organizer Solo",
        "WO Murah Solo",
        "Wedding Organizer Solo Murah",
        "Paket Wedding Organizer Solo Murah",
        "Paket Pernikahan Murah Solo",
        "Jasa Wedding Organizer Solo",
        "Wedding Planner Solo",
        "WO Solo Baru",
        "WO Sukoharjo",
        "WO Karanganyar",
        "Wedding Organizer Hajatan Rumah Solo",
        "Wedding Organizer Adat Jawa Solo",
        "Day of Coordinator Solo",
        "WD GROUP SOLO Wedding",
        "WD Group Company"
      ],
      "knowsAbout": [
        "Wedding Organizer Solo",
        "WO Murah Solo",
        "Paket Pernikahan Murah Solo",
        "Wedding Planner Solo",
        "Pernikahan Adat Jawa Surakarta",
        "Intimate Wedding Solo",
        "Pernikahan Gedung dan Rumah di Solo Raya",
        "Day of Coordinator Solo",
        "Venue Wedding Solo"
      ],
      "image": `${SITE_URL}/portfolio/resepsi/resepsi-8.jpg`,
      "url": `${SITE_URL}/wedding`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "areaServed": [
        "Surakarta", "Sukoharjo", "Karanganyar", "Klaten", "Boyolali", "Sragen", "Wonogiri"
      ],
      "sameAs": [
        "https://instagram.com/wdgroupcompany",
        "https://maps.google.com/?cid=423251003407914670"
      ],
      "description": "Layanan jasa wedding organizer profesional dan wedding planner murah elegan di Solo dan Solo Raya. Paket WO murah mulai promo Rp 5,5 jt untuk resepsi gedung, hajatan rumah, intimate wedding, dan adat Jawa Surakarta.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "WD Group Company",
        "url": `${SITE_URL}/`
      }
    },
    fullHtml: buildWeddingHtml()
  },
  // 6 Halaman Wilayah
  ...Object.keys(weddingRegions).map(key => {
    const reg = weddingRegions[key]
    const regionImages = {
      sukoharjo: `${SITE_URL}/portfolio/resepsi/resepsi-4.jpg`,
      karanganyar: `${SITE_URL}/portfolio/resepsi/resepsi-5.jpg`,
      klaten: `${SITE_URL}/portfolio/resepsi/resepsi-10.jpg`,
      boyolali: `${SITE_URL}/portfolio/resepsi/resepsi-11.jpg`,
      sragen: `${SITE_URL}/portfolio/resepsi/resepsi-12.jpg`,
      wonogiri: `${SITE_URL}/portfolio/resepsi/resepsi-13.jpg`
    }
    const regionPlacenames = {
      sukoharjo: "Sukoharjo, Solo Baru, Kartasura, Mojolaban, Jawa Tengah, Indonesia",
      karanganyar: "Karanganyar, Colomadu, Tawangmangu, Jawa Tengah, Indonesia",
      klaten: "Klaten, Delanggu, Prambanan, Jawa Tengah, Indonesia",
      boyolali: "Boyolali, Banyudono, Selo, Jawa Tengah, Indonesia",
      sragen: "Sragen, Gemolong, Sukowati, Jawa Tengah, Indonesia",
      wonogiri: "Wonogiri, Selogiri, Gajah Mungkur, Jawa Tengah, Indonesia"
    }
    const regionImage = regionImages[key] || `${SITE_URL}/portfolio/resepsi/resepsi-8.jpg`

    return {
      path: `wedding/${key}`,
      canonical: `${SITE_URL}/wedding/${key}`,
      title: reg.title,
      description: reg.seoDescription,
      ogTitle: reg.title,
      ogDescription: reg.seoDescription,
      geoPlacename: regionPlacenames[key] || "Solo Raya, Jawa Tengah, Indonesia",
      image: regionImage,
      imageAlt: `Dokumentasi Wedding Organizer ${reg.name} Solo Raya - WD Sky Wedding`,
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/wedding/${key}#business`,
        "name": `WD Sky Wedding Organizer ${reg.name}`,
        "image": regionImage,
        "url": `${SITE_URL}/wedding/${key}`,
        "telephone": "+6285707909415",
        "priceRange": "$$",
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
          "latitude": "-7.593558",
          "longitude": "110.883616"
        },
        "areaServed": reg.name,
        "description": reg.seoDescription
      },
      fullHtml: buildRegionHtml(reg)
    }
  }),
  // 5 Divisi
  {
    path: "event",
    canonical: `${SITE_URL}/event`,
    title: "Event Organizer Solo & EO Solo Raya | WD Event Organizer",
    description: "Jasa event organizer Solo dan EO Solo Raya dari WD Event. Layanan corporate gathering, seminar, pameran, dan konser musik terencana dan profesional.",
    ogTitle: "Event Organizer Solo & EO Solo Raya | WD Event Organizer",
    ogDescription: "Perencanaan dan manajemen acara korporat, gathering, pameran, dan konser musik di Solo Raya.",
    image: `${SITE_URL}/resources/Event_Organizer/Event2.webp`,
    imageAlt: "Pelaksanaan event panggung dan lighting di Solo Raya oleh WD Event Organizer",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/event#business`,
      "name": "WD Event Organizer Solo Raya",
      "image": `${SITE_URL}/resources/Event_Organizer/Event2.webp`,
      "url": `${SITE_URL}/event`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "description": "Jasa event organizer corporate gathering, konser, dan seminar di Solo Raya."
    },
    fullHtml: buildEventHtml()
  },
  {
    path: "production",
    canonical: `${SITE_URL}/production`,
    title: "Jasa Foto & Video Sinematik Solo | WD Production",
    description: "Jasa video shooting sinematik Solo, fotografer wedding Solo, dan visual branding Solo Raya dari WD Production. Dokumentasi profesional hasil berkelas.",
    ogTitle: "Jasa Foto & Video Sinematik Solo | WD Production",
    ogDescription: "Dokumentasi foto, video shooting sinematik, commercial branding, dan profil perusahaan di Solo Raya.",
    image: `${SITE_URL}/resources/Production/Production2.webp`,
    imageAlt: "Peralatan kamera dan video shooting sinematik oleh WD Production Solo",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/production#business`,
      "name": "WD Production Solo Raya",
      "image": `${SITE_URL}/resources/Production/Production2.webp`,
      "url": `${SITE_URL}/production`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "description": "Layanan jasa foto video sinematik, liputan event, dan company profile di Solo Raya."
    },
    fullHtml: buildProductionHtml()
  },
  {
    path: "music",
    canonical: `${SITE_URL}/music`,
    title: "Wedding Band Solo & Live Music Event | WD Music",
    description: "Jasa live music wedding band Solo dan studio musik Solo dari WD Music. Layanan pengisi acara pernikahan, rental studio recording, dan kelas musik kursus.",
    ogTitle: "Wedding Band Solo & Live Music Event | WD Music",
    ogDescription: "Layanan live music wedding band, pengisi acara gathering, rental studio rekaman, dan kelas musik di Solo Raya.",
    image: `${SITE_URL}/resources/Music_ENT/wm8.webp`,
    imageAlt: "Penampilan live band wedding dan gathering panggung oleh WD Music Entertainment",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/music#business`,
      "name": "WD Music Entertainment Solo Raya",
      "image": `${SITE_URL}/resources/Music_ENT/wm8.webp`,
      "url": `${SITE_URL}/music`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "description": "Layanan live music band pengisi acara pernikahan, panggung event, dan kelas musik."
    },
    fullHtml: buildMusicHtml()
  },
  {
    path: "workshop",
    canonical: `${SITE_URL}/workshop`,
    title: "Workshop Solo & Pelatihan Keterampilan Solo | WD Jaya Workshop",
    description: "Jasa workshop Solo, pelatihan keterampilan Solo, dan bootcamp intensif dari WD Jaya Workshop. Kelas praktis, seminar korporat, bimbingan mentor, dan sertifikat resmi.",
    ogTitle: "Workshop Solo & Pelatihan Keterampilan Solo | WD Jaya Workshop",
    ogDescription: "Pelatihan keterampilan praktis, bootcamp intensif, in-house corporate training, dan workshop edukatif di Solo Raya.",
    image: `${SITE_URL}/resources/Workshop/workshop2.webp`,
    imageAlt: "Suasana pelatihan vokasi dan workshop keterampilan praktis oleh WD Jaya Workshop",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/workshop#business`,
      "name": "WD Jaya Workshop Solo Raya",
      "image": `${SITE_URL}/resources/Workshop/workshop2.webp`,
      "url": `${SITE_URL}/workshop`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "description": "Lembaga pelatihan keterampilan kerja, bootcamp multimedia, dan in-house training di Solo."
    },
    fullHtml: buildWorkshopHtml()
  },
  {
    path: "it",
    canonical: `${SITE_URL}/it`,
    title: "Jasa Pembuatan Website Solo & Web Developer Solo | WD IT",
    description: "Jasa pembuatan website Solo, web developer Solo Raya, toko online e-commerce, dan undangan digital dari WD IT. Desain responsif, SEO-friendly, dan bergaransi.",
    ogTitle: "Jasa Pembuatan Website Solo & Web Developer Solo | WD IT",
    ogDescription: "Pembuatan website profil perusahaan, toko online responsif, sistem informasi bisnis, dan undangan digital di Solo Raya.",
    image: `${SITE_URL}/resources/Store/Store.webp`,
    imageAlt: "Pengembangan web dan aplikasi digital bisnis oleh tim pengembang WD IT Solo",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/it#business`,
      "name": "WD IT - Web Developer Solo",
      "image": `${SITE_URL}/resources/Store/Store.webp`,
      "url": `${SITE_URL}/it`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
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
        "latitude": "-7.593558",
        "longitude": "110.883616"
      },
      "description": "Layanan pembuatan website company profile, aplikasi web, dan undangan digital."
    },
    fullHtml: buildItHtml()
  },
  {
    path: "works",
    canonical: `${SITE_URL}/works`,
    title: "Portofolio & Showcase Karya – WD Group Company",
    description: "Koleksi portofolio proyek wedding organizer, event organizer, produksi foto/video sinematik, musik, workshop, dan solusi IT WD Group Company.",
    ogTitle: "Portofolio & Showcase Karya – WD Group Company",
    ogDescription: "Koleksi portofolio proyek dan karya dari seluruh divisi WD Group Company di Solo Raya.",
    image: `${SITE_URL}/resources/Event_Organizer/Event.webp`,
    imageAlt: "Showcase portofolio panggung acara dan dokumentasi WD Group Company",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/works#business`,
      "name": "Portofolio WD Group Company",
      "image": `${SITE_URL}/resources/Event_Organizer/Event.webp`,
      "url": `${SITE_URL}/works`,
      "telephone": "+6285707909415",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Griya Edelweis No.12a, Dusun V, Joho",
        "addressLocality": "Mojolaban",
        "addressRegion": "Kabupaten Sukoharjo",
        "postalCode": "57554",
        "addressCountry": "ID"
      },
      "description": "Galeri portofolio wedding, event, foto video sinematik, musik, dan IT."
    },
    fullHtml: buildWorksHtml()
  }
]

function generateRoutePages() {
  const templatePath = path.resolve(distDir, "index.html")
  if (!fs.existsSync(templatePath)) {
    console.error("dist/index.html not found! Run vite build first.")
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8")

  for (const route of routes) {
    let html = baseHtml

    // 1. Replace canonical link
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    )

    // 2. Replace title
    html = html.replace(
      /<title>.*?<\/title>/is,
      `<title>${route.title}</title>`
    )

    // 3. Replace meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    )

    // 4. Hapus meta keywords generik agar tidak membocorkan keyword beranda
    html = html.replace(
      /\s*<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gi,
      ""
    )

    // 5. Open Graph Meta Tags
    html = html.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${route.ogTitle || route.title}" />`
    )
    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${route.ogDescription || route.description}" />`
    )
    html = html.replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    )
    if (route.image) {
      html = html.replace(
        /<meta property="og:image" content="[^"]*"\s*\/?>/i,
        `<meta property="og:image" content="${route.image}" />\n  <meta property="og:image:alt" content="${route.imageAlt || route.title}" />`
      )
    }

    // 6. Twitter Card Meta Tags (Unik per halaman)
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.ogTitle || route.title}" />`
    )
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.ogDescription || route.description}" />`
    )
    if (route.image) {
      html = html.replace(
        /<meta name="twitter:image" content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:image" content="${route.image}" />\n  <meta name="twitter:image:alt" content="${route.imageAlt || route.title}" />`
      )
    }

    // 6b. Route-specific Geo Placename
    if (route.geoPlacename) {
      html = html.replace(
        /<meta name="geo\.placename" content="[^"]*"\s*\/?>/i,
        `<meta name="geo.placename" content="${route.geoPlacename}" />`
      )
    }

    // 7. Inject Route-specific JSON-LD Schema
    if (route.schema) {
      const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(route.schema, null, 2)}\n  </script>`
      html = html.replace("</head>", `${schemaScript}\n</head>`)
    }

    // 8. Noscript tag: fallback notice tanpa H1 duplikat agar tepat 1 H1 per dokumen
    html = html.replace(
      /<noscript>.*?<\/noscript>/is,
      `<noscript><div class="static-noscript"><p>Seluruh informasi layanan disajikan secara lengkap di bawah ini. Aktifkan JavaScript untuk pengalaman interaktif penuh.</p></div></noscript>`
    )

    // 9. Inject FULL semantic static content ke dalam <div id="root">
    // Mengganti isi #root dengan kontainer semantic pre-render, aman untuk React 19 createRoot hydration
    if (route.fullHtml) {
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>\s*<\/body>/i,
        `<div id="root"><main class="static-prerender">${route.fullHtml}</main></div>\n  </body>`
      )
    }

    // Tulis ke dist/[path]/index.html
    const targetDir = path.resolve(distDir, route.path)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    const targetIndexPath = path.resolve(targetDir, "index.html")
    fs.writeFileSync(targetIndexPath, html, "utf-8")

    // Tulis juga ke dist/[path].html untuk Vercel cleanUrls
    const targetCleanPath = path.resolve(distDir, `${route.path}.html`)
    const cleanDir = path.dirname(targetCleanPath)
    if (!fs.existsSync(cleanDir)) {
      fs.mkdirSync(cleanDir, { recursive: true })
    }
    fs.writeFileSync(targetCleanPath, html, "utf-8")

    console.log(`Generated full pre-rendered: ${route.path}/index.html & ${route.path}.html`)
  }

  console.log("All 13 routes static pre-rendered pages generated successfully!")
}

generateRoutePages()
