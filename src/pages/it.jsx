import DivisionPage from "./DivisionPage";

const itConfig = {
  category: "it",
  brand: "WD IT",
  logoHtml: "WD <span>IT</span>",
  badge: "Digital Solution",
  kicker: "WD IT",
  title: "Digital systems,",
  titleAccent: "built to work.",
  description:
    "WD IT membantu bisnis membangun kebutuhan digital yang rapi, cepat, dan mudah digunakan. Mulai dari website company profile, sistem internal, landing page, sampai dukungan teknis, setiap solusi dibuat agar operasional lebih efisien dan brand terlihat profesional.",
  primaryCta: "Start Digital Project",
  primaryToast: "WD IT inquiry noted",
  savedMessage: "IT reference saved",
  galleryTitle: "IT Portfolio",
  mark: "IT",
  tabs: ["All Projects", "Website", "App", "System", "Support"],
  stats: [
    { value: "Website", label: "Build" },
    { value: "System", label: "Workflow" },
    { value: "Support", label: "Care" },
  ],
  accent: "#0ea5e9",
  accentSoft: "rgba(14,165,233,0.15)",
  accentBorder: "rgba(14,165,233,0.30)",
  bg: "#020b16",
  muted: "#9bb6c7",
};

export default function ITPage() {
  return <DivisionPage config={itConfig} />;
}
