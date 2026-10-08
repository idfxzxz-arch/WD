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
    title: "Wedding Organizer Murah Solo Raya | Paket Pernikahan Terbaik – WD Sky Wedding",
    description: "Jasa Wedding Organizer Solo Raya dan paket pernikahan murah Solo. WD Sky Wedding Planner menyediakan paket wedding budget hemat terjangkau dengan hasil mewah dan elegan.",
    keywords: "Wedding Organizer Solo Raya, Wedding Organizer Murah Solo Raya, Wedding Organizer Solo, WO Solo Raya, WO Murah Solo Raya, Wedding Organizer Murah Solo, WO Murah Solo, Jasa Wedding Organizer Solo Raya, Wedding Planner Solo Raya, Paket Wedding Murah Solo Raya, paket wedding murah solo, paket pernikahan murah solo, paket wedding solo raya, paket pernikahan solo raya, wedding murah solo raya, wedding budget murah solo, wedding organizer harga terjangkau solo, wedding organizer budget solo, paket wedding hemat solo",
    ogTitle: "WD Sky Wedding Organizer – Paket Pernikahan Murah & Mewah Solo Raya",
    ogDescription: "Jasa Wedding Organizer Solo Raya dan paket pernikahan murah Solo. Solusi pernikahan rapi, elegan, dan terjangkau.",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/wedding#business`,
      "name": "WD Sky Wedding Organizer Solo Raya",
      "image": `${SITE_URL}/wd-group-logo.webp`,
      "url": `${SITE_URL}/wedding`,
      "telephone": "+6285707909415",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surakarta",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-7.5755",
        "longitude": "110.8243"
      },
      "areaServed": [
        "Surakarta", "Solo", "Sukoharjo", "Karanganyar", "Klaten", "Boyolali", "Sragen", "Solo Raya"
      ],
      "description": "WD Sky Wedding Organizer melayani jasa paket pernikahan murah Solo Raya dengan hasil premium. Kami membantu pasangan merancang hari pernikahan yang tenang, rapi, dan elegan.",
      "parentOrganization": {
        "@type": "Organization",
        "name": "WD Group Company",
        "url": `${SITE_URL}/`
      }
    },
    noscript: `
      <div style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; color: #f1f5f9; background: #0b0c10;">
        <h1>WD Sky Wedding Organizer – Jasa Paket Pernikahan Murah Solo Raya</h1>
        <p><strong>WD Sky Wedding Organizer</strong> adalah penyedia jasa wedding planner dan organizer terpercaya di Solo Raya (Surakarta, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen). Kami menghadirkan solusi paket pernikahan murah, hemat, dan terjangkau tanpa mengurangi keanggunan serta kesakralan hari bahagia Anda.</p>
        
        <h2>Layanan Paket Pernikahan Kami di Solo Raya</h2>
        <ul>
          <li><strong>Paket Wedding Budget Hemat Solo:</strong> Solusi pernikahan terjangkau dengan manajemen acara profesional bintang lima.</li>
          <li><strong>Perencanaan & Koordinasi Akad Nikah:</strong> Penanganan susunan acara, tata cara adat, hingga teknis pelaksanaan akad nikah.</li>
          <li><strong>Manajemen Resepsi Pernikahan:</strong> Koordinasi seluruh vendor dekorasi, katering, tata rias, dokumentasi, hingga sound system.</li>
          <li><strong>Day-of Coordinator (Pendampingan Hari-H):</strong> Tim lapangan berdedikasi menjaga kelancaran dan ketepatan rundown pernikahan Anda.</li>
        </ul>

        <h2>Mengapa Memilih WD Sky Wedding Organizer?</h2>
        <p>Kami memahami bahwa pernikahan adalah momen sekali seumur hidup. Dengan tim yang berpengalaman, komunikatif, dan tanggap, kami memastikan Anda dan keluarga dapat menikmati pesta pernikahan dengan tenang dan bahagia tanpa rasa cemas.</p>

        <h2>Wilayah Jangkauan Layanan</h2>
        <p>Melayani seluruh area Solo Raya: Surakarta Kota, Sukoharjo, Karanganyar, Klaten, Boyolali, Wonogiri, dan Sragen.</p>

        <h2>Konsultasi & Pemesanan Layanan</h2>
        <p>Hubungi Customer Service kami melalui WhatsApp: <a href="https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20booking%20layanan%20wedding%20organizer." style="color: #60a5fa;">0857-0790-9415</a></p>
        <p><a href="/" style="color: #94a3b8;">&larr; Kembali ke Beranda WD Group Company</a></p>
      </div>
    `
  },
  {
    path: "event",
    canonical: `${SITE_URL}/event`,
    title: "WD Event Organizer – Jasa EO Konser & Corporate Event Solo Raya",
    description: "WD Event Organizer melayani perencanaan dan pelaksanaan corporate event, konser musik, exhibition, dan private gathering dengan koordinasi profesional di Solo Raya.",
    keywords: "Event Organizer Solo Raya, EO Solo, Jasa Event Organizer Solo, EO Konser Solo, Corporate Event Organizer Solo",
    ogTitle: "WD Event Organizer – Manajemen Acara Profesional",
    ogDescription: "Perencanaan dan manajemen acara korporat, konser musik, dan festival berskala besar.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #080914;">
        <h1>WD Event Organizer – Jasa EO Acara & Konser Solo Raya</h1>
        <p>WD Event Organizer membantu merancang dan menjalankan acara dengan konsep yang jelas, koordinasi vendor yang rapi, serta eksekusi lapangan yang tertib. Dari corporate event, konser musik, gathering, pameran, hingga festival berskala besar.</p>
        <h2>Layanan Event Management</h2>
        <ul>
          <li>Corporate Event & Company Gathering</li>
          <li>Konser Musik & Festival</li>
          <li>Pameran / Exhibition & Expo</li>
          <li>Seminar & Product Launching</li>
        </ul>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "production",
    canonical: `${SITE_URL}/production`,
    title: "WD Production – Jasa Foto & Video Sinematik Solo Raya",
    description: "Jasa dokumentasi foto dan video sinematik, visual komersial, company profile, dan dokumentasi event profesional dari WD Production.",
    keywords: "Photo Video Production Solo, Jasa Video Cinematic Solo, Fotografer Solo, Jasa Dokumentasi Event Solo",
    ogTitle: "WD Production – Visual Stories Produced with Purpose",
    ogDescription: "Dokumentasi foto, video sinematik, commercial visual, dan company profile.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #100c05;">
        <h1>WD Production – Jasa Foto & Video Sinematik Solo Raya</h1>
        <p>WD Production menghadirkan layanan dokumentasi foto, video sinematik, video komersial, dan visual branding dengan standar profesional tinggi.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "music",
    canonical: `${SITE_URL}/music`,
    title: "WD Music Entertainment & Music Class Solo",
    description: "Layanan live music performance, wedding band entertainment, kursus musik, dan studio recording WD Music di Solo Raya.",
    keywords: "Music Entertainment Solo, Wedding Band Solo, Live Music Event Solo, Kursus Musik Solo, Studio Musik Solo",
    ogTitle: "WD Music Entertainment & Music Class",
    ogDescription: "Live performance music entertainment, kelas musik, dan studio recording.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #0d0714;">
        <h1>WD Music Entertainment & Music Class Solo</h1>
        <p>WD Music Entertainment menghadirkan penampilan live band untuk pernikahan dan acara, penyewaan studio, kelas musik, dan manajemen talent musik.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "workshop",
    canonical: `${SITE_URL}/workshop`,
    title: "WD Jaya Workshop – Pelatihan & Bootcamp Praktis Solo",
    description: "Program kelas, seminar, pelatihan keterampilan praktis, dan workshop edukasi intensif siap kerja dari WD Jaya Workshop.",
    keywords: "Workshop Solo, Pelatihan Keterampilan Solo, Bootcamp Solo, Kelas Kreatif Solo",
    ogTitle: "WD Jaya Workshop – Skill Programs Built for Real Use",
    ogDescription: "Pelatihan keterampilan praktis, bootcamp, seminar, dan program edukasi terarah.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #07110c;">
        <h1>WD Jaya Workshop – Pelatihan & Bootcamp Praktis</h1>
        <p>WD Jaya Workshop merancang pelatihan intensif dengan fokus keterampilan nyata dan praktik langsung yang dapat diterapkan di dunia industri.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
        <p><a href="/">&larr; Kembali ke Beranda</a></p>
      </div>
    `
  },
  {
    path: "it",
    canonical: `${SITE_URL}/it`,
    title: "WD IT & Digital Solution – Jasa Pembuatan Website & Aplikasi Solo",
    description: "Jasa pembuatan website profesional, aplikasi web modern, sistem manajemen bisnis, dan solusi IT digital terintegrasi dari WD IT.",
    keywords: "Jasa Website Solo, Jasa Pembuatan Website Solo Raya, Web Developer Solo, IT Solution Solo, Jasa Aplikasi Web",
    ogTitle: "WD IT & Digital Solution – Solusi Digital Bisnis Modern",
    ogDescription: "Pengembangan website modern, aplikasi web, dan dukungan sistem bisnis.",
    noscript: `
      <div style="padding: 24px; font-family: sans-serif; color: #fff; background: #020b16;">
        <h1>WD IT & Digital Solution – Jasa Pembuatan Website & Aplikasi Solo</h1>
        <p>WD IT melayani pembuatan website profil perusahaan, toko online, sistem informasi internal, web app modern, serta optimalisasi digital untuk bisnis Anda.</p>
        <p>Hubungi WhatsApp: <a href="https://wa.me/6285707909415">0857-0790-9415</a></p>
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
    fs.writeFileSync(targetCleanPath, html, "utf-8")

    console.log(`Generated: ${route.path}/index.html and ${route.path}.html (Canonical: ${route.canonical})`)
  }

  console.log("All route static pages generated successfully!")
}

generateRoutePages()
