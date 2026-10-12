import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")
const distDir = path.resolve(rootDir, "dist")

const SITE_URL = "https://www.wdgroupcompany.biz.id"

const routes = [
  {
    path: "wedding",
    canonical: `${SITE_URL}/wedding`,
    title: "Wedding Organizer Solo & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Solo dan Solo Raya dari WD Sky Wedding. Layanan paket pernikahan elegan, terjangkau, koordinasi akad hingga resepsi.",
    ogTitle: "Wedding Organizer Solo & Solo Raya – WD Sky Wedding",
    ogDescription: "Jasa wedding organizer profesional dan paket pernikahan elegan terjangkau di Solo dan Solo Raya.",
    schema: {
      "@context": "https://schema.org",
      "@type": ["EventPlanner", "LocalBusiness"],
      "@id": `${SITE_URL}/wedding#business`,
      "name": "WD Sky Wedding Organizer Solo Raya",
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
      "description": "Layanan jasa wedding organizer profesional dan wedding planner elegan terjangkau di Solo dan Solo Raya.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "WD Group Company",
        "url": `${SITE_URL}/`
      }
    },
    noscript: `
      <div style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; color: #f1f5f9; background: #0b0c10;">
        <h1>WD Sky Wedding Organizer – Wedding Organizer Solo & Solo Raya</h1>
        <p><strong>WD Sky Wedding Organizer</strong> adalah penyedia jasa wedding planner dan organizer profesional di Solo dan Solo Raya (Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, Wonogiri). Kami mengusung positioning terjangkau dengan mutu elegan untuk prosesi akad nikah dan resepsi pernikahan.</p>
        
        <h2>Pilihan Paket Pernikahan Solo Raya</h2>
        <ul>
          <li><strong>Package 1 (Wedding Organizer):</strong> Promo Rp 5.500.000 (Normal Rp 6.300.000) – Akad Nikah, Temu Manten, dan Resepsi dalam satu acara (maks. 300 tamu, vendor 85%).</li>
          <li><strong>Package 2 (Wedding Planner &amp; WO):</strong> Promo Rp 6.300.000 (Normal Rp 7.300.000) – 12 Kru bertugas, unlimited consultation, kurasi vendor, seating &amp; flow planning.</li>
          <li><strong>Package 3 (Planner &amp; WO VIP):</strong> Promo Rp 7.300.000 (Normal Rp 8.300.000) – 14 Kru bertugas, unlimited technical meeting, VIP survival &amp; hospitality kit terlengkap.</li>
        </ul>

        <h2>Wilayah Jangkauan Layanan</h2>
        <p>Melayani seluruh area Solo Raya: Kota Surakarta, Kabupaten Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen, dan Wonogiri.</p>

        <h2>Kontak & Alamat Kantor</h2>
        <p>Alamat: Griya Edelweis No.12a, Dusun V, Joho, Kec. Mojolaban, Kabupaten Sukoharjo, Jawa Tengah 57554</p>
        <p>WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20konsultasi%20paket%20wedding%20organizer%20di%20Solo%20Raya." style="color: #60a5fa;">0857-0790-9415</a></p>
      </div>
    `
  },
  {
    path: "wedding/sukoharjo",
    canonical: `${SITE_URL}/wedding/sukoharjo`,
    title: "Wedding Organizer Sukoharjo & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Sukoharjo dan Solo Raya dari WD Sky Wedding. Layanan paket pernikahan elegan dan terjangkau di Solo Baru, Kartasura, dan Mojolaban.",
    ogTitle: "Wedding Organizer Sukoharjo – WD Sky Wedding",
    ogDescription: "Paket pernikahan profesional dan wedding organizer terjangkau di Solo Baru dan Sukoharjo.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Sukoharjo & Solo Raya</h1>
        <p>Layanan wedding organizer dan planner di Sukoharjo, Solo Baru, Kartasura, dan Mojolaban. Koordinasi gedung, hotel, dan pesta rumah adat Jawa.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "wedding/karanganyar",
    canonical: `${SITE_URL}/wedding/karanganyar`,
    title: "Wedding Organizer Karanganyar & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Karanganyar dan Solo Raya dari WD Sky Wedding. Paket pernikahan outdoor Tawangmangu, Colomadu, dan heritage Karanganyar.",
    ogTitle: "Wedding Organizer Karanganyar – WD Sky Wedding",
    ogDescription: "Paket pernikahan alam Tawangmangu dan heritage De Tjolomadoe Karanganyar.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Karanganyar & Solo Raya</h1>
        <p>Layanan wedding organizer Karanganyar, Tawangmangu, dan Colomadu. Spesialis intimate wedding dan konsep outdoor bernuansa alam sejuk.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "wedding/klaten",
    canonical: `${SITE_URL}/wedding/klaten`,
    title: "Wedding Organizer Klaten & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Klaten dan Solo Raya dari WD Sky Wedding. Layanan paket pernikahan Graha Bung Karno, gedung, dan jamuan piring terbang Klaten.",
    ogTitle: "Wedding Organizer Klaten – WD Sky Wedding",
    ogDescription: "Paket wedding organizer Klaten terjangkau dan koordinasi jamuan piring terbang maupun prasmanan.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Klaten & Solo Raya</h1>
        <p>Layanan wedding organizer Klaten untuk Graha Bung Karno, gedung pertemuan, dan hajatan rumah. Ahli alur piring terbang dan prasmanan modern.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "wedding/boyolali",
    canonical: `${SITE_URL}/wedding/boyolali`,
    title: "Wedding Organizer Boyolali & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Boyolali dan Solo Raya dari WD Sky Wedding. Paket pernikahan Boyolali Convention Center, Tlatar, dan hajatan rumah Boyolali.",
    ogTitle: "Wedding Organizer Boyolali – WD Sky Wedding",
    ogDescription: "Paket pernikahan Boyolali Convention Center dan wedding organizer terjangkau Boyolali.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Boyolali & Solo Raya</h1>
        <p>Layanan wedding organizer Boyolali Convention Center (BCC) dan pesta kekeluargaan asri Boyolali dengan koordinasi profesional.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "wedding/sragen",
    canonical: `${SITE_URL}/wedding/sragen`,
    title: "Wedding Organizer Sragen & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Sragen dan Solo Raya dari WD Sky Wedding. Paket pernikahan Sasana Manggala Sukowati, gedung Kartini, dan hajatan Sragen.",
    ogTitle: "Wedding Organizer Sragen – WD Sky Wedding",
    ogDescription: "Paket pernikahan Gedung Sasana Manggala Sukowati dan wedding organizer Sragen.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Sragen & Solo Raya</h1>
        <p>Layanan wedding organizer Gedung Sasana Manggala Sukowati dan hajatan keluarga di Sragen dengan manajemen alur yang tertib.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "wedding/wonogiri",
    canonical: `${SITE_URL}/wedding/wonogiri`,
    title: "Wedding Organizer Wonogiri & Solo Raya | WD Sky Wedding",
    description: "Jasa wedding organizer Wonogiri dan Solo Raya dari WD Sky Wedding. Paket pernikahan Giri Cahaya, Waduk Gajah Mungkur, dan pesta keluarga Wonogiri.",
    ogTitle: "Wedding Organizer Wonogiri – WD Sky Wedding",
    ogDescription: "Paket pernikahan gedung Giri Cahaya dan pendampingan pengantin perantau di Wonogiri.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #f1f5f9; background: #0b0c10;">
        <h1>Wedding Organizer Wonogiri & Solo Raya</h1>
        <p>Layanan wedding organizer Wonogiri. Pendampingan persiapan jarak jauh bagi pasangan perantau untuk acara sakral di kampung halaman.</p>
        <p><a href="/wedding">&larr; Kembali ke Halaman Utama Wedding Organizer Solo Raya</a></p>
      </div>
    `
  },
  {
    path: "event",
    canonical: `${SITE_URL}/event`,
    title: "Event Organizer Solo & EO Solo Raya | WD Event Organizer",
    description: "Jasa event organizer Solo dan EO Solo Raya dari WD Event. Layanan corporate gathering, seminar, pameran, dan konser musik terencana dan profesional.",
    keywords: "Event Organizer Solo, EO Solo, Jasa Event Organizer Solo Raya, EO Konser Solo, Corporate Event Organizer Solo",
    ogTitle: "Event Organizer Solo & EO Solo Raya | WD Event Organizer",
    ogDescription: "Perencanaan dan manajemen acara korporat, gathering, pameran, dan konser musik di Solo Raya.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #080914;">
        <h1>Event Organizer Solo & EO Solo Raya – WD Event</h1>
        <p>WD Event Organizer membantu merancang dan menjalankan acara dengan konsep yang jelas, koordinasi vendor yang rapi, serta eksekusi lapangan yang tertib di Surakarta dan sekitarnya.</p>
        <h2>Layanan Event Management</h2>
        <ul>
          <li>Corporate Gathering & Gala Dinner</li>
          <li>Konser Musik & Festival Seni</li>
          <li>Pameran / Expo & Bazaar</li>
          <li>Seminar & Konferensi Profesional</li>
        </ul>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Event%20Organizer%2C%20saya%20ingin%20konsultasi%20untuk%20acara%20kami.">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "production",
    canonical: `${SITE_URL}/production`,
    title: "Jasa Foto & Video Sinematik Solo | WD Production",
    description: "Jasa video shooting sinematik Solo, fotografer wedding Solo, dan visual branding Solo Raya dari WD Production. Dokumentasi profesional hasil berkelas.",
    keywords: "Jasa Video Solo, Fotografer Solo, Jasa Foto Video Sinematik Solo Raya, Video Wedding Solo, Commercial Video Solo",
    ogTitle: "Jasa Foto & Video Sinematik Solo | WD Production",
    ogDescription: "Dokumentasi foto, video shooting sinematik, commercial branding, dan profil perusahaan di Solo Raya.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #100c05;">
        <h1>Jasa Foto & Video Sinematik Solo – WD Production</h1>
        <p>WD Production menghadirkan layanan dokumentasi video shooting sinematik, fotografi acara, video profil komersial, dan foto produk dengan gear standar industri di Solo Raya.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Production%2C%20saya%20ingin%20konsultasi%20jasa%20foto%20dan%20video.">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "music",
    canonical: `${SITE_URL}/music`,
    title: "Wedding Band Solo & Live Music Event | WD Music",
    description: "Jasa live music wedding band Solo dan studio musik Solo dari WD Music. Layanan pengisi acara pernikahan, rental studio recording, dan kelas musik kursus.",
    keywords: "Wedding Band Solo, Live Music Solo, Jasa Band Pernikahan Solo Raya, Studio Musik Solo, Kursus Musik Solo",
    ogTitle: "Wedding Band Solo & Live Music Event | WD Music",
    ogDescription: "Layanan live music wedding band, pengisi acara gathering, rental studio rekaman, dan kelas musik di Solo Raya.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #0d0714;">
        <h1>Wedding Band Solo & Live Music Event – WD Music</h1>
        <p>WD Music Entertainment menghadirkan penampilan live band untuk pernikahan dan acara, penyewaan studio, kelas musik, dan manajemen talent panggung di Solo Raya.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Music%2C%20saya%20ingin%20tanya%20layanan%20live%20music%20atau%20kelas%20musik.">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "workshop",
    canonical: `${SITE_URL}/workshop`,
    title: "Workshop Solo & Pelatihan Keterampilan Solo | WD Jaya Workshop",
    description: "Jasa workshop Solo, pelatihan keterampilan Solo, dan bootcamp intensif dari WD Jaya Workshop. Kelas praktis, seminar korporat, bimbingan mentor, dan sertifikat resmi.",
    keywords: "Workshop Solo, Pelatihan Keterampilan Solo, Bootcamp Solo, Kursus Keterampilan Solo Raya, Pelatihan Kerja Solo",
    ogTitle: "Workshop Solo & Pelatihan Keterampilan Solo | WD Jaya Workshop",
    ogDescription: "Pelatihan keterampilan praktis, bootcamp intensif, in-house corporate training, dan workshop edukatif di Solo Raya.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #07110c;">
        <h1>Workshop Solo & Pelatihan Keterampilan Solo – WD Jaya Workshop</h1>
        <p>WD Jaya Workshop merancang kelas pelatihan praktis, bootcamp vokasi, dan in-house corporate training dengan fokus praktik nyata dan portofolio di Solo Raya.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Jaya%20Workshop%2C%20saya%20ingin%20tanya%20program%20pelatihan.">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "it",
    canonical: `${SITE_URL}/it`,
    title: "Jasa Pembuatan Website Solo & Web Developer Solo | WD IT",
    description: "Jasa pembuatan website Solo, web developer Solo Raya, toko online e-commerce, dan undangan digital dari WD IT. Desain responsif, SEO-friendly, dan bergaransi.",
    keywords: "Jasa Pembuatan Website Solo, Web Developer Solo, Jasa Aplikasi Web Solo Raya, Bikin Website Solo, Undangan Digital Solo",
    ogTitle: "Jasa Pembuatan Website Solo & Web Developer Solo | WD IT",
    ogDescription: "Pembuatan website profil perusahaan, toko online responsif, sistem informasi bisnis, dan undangan digital di Solo Raya.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #020b16;">
        <h1>Jasa Pembuatan Website Solo & Web Developer – WD IT</h1>
        <p>WD IT melayani pembuatan website profil perusahaan, toko online WhatsApp, sistem internal bisnis, dan undangan digital pernikahan modern di Solo Raya.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20IT%2C%20saya%20ingin%20konsultasi%20pembuatan%20website%20atau%20aplikasi.">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "works",
    canonical: `${SITE_URL}/works`,
    title: "Portofolio & Showcase Karya – WD Group Company",
    description: "Koleksi portofolio proyek wedding organizer, event organizer, produksi foto/video sinematik, musik, workshop, dan solusi IT WD Group Company.",
    keywords: "Portofolio WD Group, Showcase Karya WD, Hasil Acara WD Group",
    ogTitle: "Portofolio & Showcase Karya – WD Group Company",
    ogDescription: "Koleksi portofolio proyek dan karya dari seluruh divisi WD Group Company.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #000;">
        <h1>Portofolio & Showcase Karya – WD Group Company</h1>
        <p>Jelajahi karya-karya terbaik dari divisi Wedding Organizer, Event Organizer, Multimedia Production, Musik, Workshop, dan Solusi Digital.</p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
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

    // 4. Replace meta keywords
    if (route.keywords) {
      html = html.replace(
        /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="keywords" content="${route.keywords}">`
      )
    }

    // 5. Replace Open Graph tags
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

    // 6. Inject route-specific Schema if provided
    if (route.schema) {
      const schemaScript = `\n  <script type="application/ld+json">\n  ${JSON.stringify(route.schema, null, 2)}\n  </script>`
      html = html.replace("</head>", `${schemaScript}\n</head>`)
    }

    // 7. Replace noscript content
    if (route.noscript) {
      html = html.replace(
        /<noscript>.*?<\/noscript>/is,
        `<noscript>${route.noscript}</noscript>`
      )
    }

    // Write to dist/[path]/index.html
    const targetDir = path.resolve(distDir, route.path)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    const targetIndexPath = path.resolve(targetDir, "index.html")
    fs.writeFileSync(targetIndexPath, html, "utf-8")

    // Also write to dist/[path].html for cleanUrls support
    const targetCleanPath = path.resolve(distDir, `${route.path}.html`)
    const cleanDir = path.dirname(targetCleanPath)
    if (!fs.existsSync(cleanDir)) {
      fs.mkdirSync(cleanDir, { recursive: true })
    }
    fs.writeFileSync(targetCleanPath, html, "utf-8")

    console.log(`Generated: ${route.path}/index.html and ${route.path}.html (Canonical: ${route.canonical})`)
  }

  console.log("All route static pages generated successfully!")
}

generateRoutePages()
