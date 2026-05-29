import DivisionPage from "./DivisionPage";

const workshopConfig = {
  category: "workshop",
  brand: "WD Jaya Workshop",
  logoHtml: "WD <span>Jaya</span> Workshop",
  badge: "Workshop",
  kicker: "WD Jaya Workshop",
  title: "Practical sessions,",
  titleAccent: "built with purpose.",
  description:
    "WD Jaya Workshop menghadirkan program belajar, pelatihan, dan sesi praktik yang terstruktur. Setiap agenda dirancang agar peserta tidak hanya memahami materi, tetapi juga mampu menerapkannya secara nyata.",
  primaryCta: "Discuss Program",
  primaryToast: "Workshop inquiry noted",
  savedMessage: "Workshop reference saved",
  galleryTitle: "Workshop Portfolio",
  mark: "WS",
  tabs: ["All Programs", "Class", "Seminar", "Training", "Bootcamp"],
  stats: [
    { value: "Hands-on", label: "Method" },
    { value: "Structured", label: "Learning" },
    { value: "Practical", label: "Output" },
  ],
  accent: "#22c55e",
  accentSoft: "rgba(34,197,94,0.14)",
  accentBorder: "rgba(34,197,94,0.28)",
  bg: "#07110c",
  muted: "#9aa89f",
};

export default function WorkshopLayout() {
  return <DivisionPage config={workshopConfig} />;
}
