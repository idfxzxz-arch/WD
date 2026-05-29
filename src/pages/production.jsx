import DivisionPage from "./DivisionPage";

const productionConfig = {
  category: "production",
  brand: "WD Production",
  logoHtml: "WD <span>Production</span>",
  badge: "Creative Production",
  kicker: "WD Production",
  title: "Production that,",
  titleAccent: "looks intentional.",
  description:
    "WD Production menangani kebutuhan visual, dokumentasi, dan produksi konten dengan alur kerja yang rapi. Dari konsep, pengambilan gambar, hingga hasil akhir, setiap detail diarahkan untuk mendukung pesan brand dan acara.",
  primaryCta: "Start Production",
  primaryToast: "Production inquiry noted",
  savedMessage: "Production reference saved",
  galleryTitle: "Production Portfolio",
  mark: "PR",
  tabs: ["All Projects", "Planning", "Crew & Team", "Decoration", "Live Execution"],
  stats: [
    { value: "Concept", label: "Direction" },
    { value: "Crew", label: "Ready" },
    { value: "Polished", label: "Output" },
  ],
  accent: "#f59e0b",
  accentSoft: "rgba(245,158,11,0.14)",
  accentBorder: "rgba(245,158,11,0.28)",
  bg: "#100c05",
  muted: "#aa9b87",
};

export default function ProductionOrganizer() {
  return <DivisionPage config={productionConfig} />;
}
