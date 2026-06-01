import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20booking%20layanan%20WD%20IT.";

const itConfig = {
  category: "it",
  brand: "WD IT",
  logoText: "WD",
  logoAccent: "IT",
  badge: "Digital Solution",
  kicker: "WD IT",
  title: "Digital solutions,",
  titleAccent: "built for business.",
  description:
    "WD IT membantu bisnis membangun website, aplikasi, sistem internal, dan dukungan teknis dengan pendekatan yang rapi, mudah digunakan, dan siap dikembangkan. Setiap solusi dibuat agar operasional lebih efisien, brand terlihat profesional, dan kebutuhan digital berjalan lebih terukur.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "WD IT inquiry noted",
  savedMessage: "IT reference saved",
  galleryTitle: "IT Portfolio",
  mark: "IT",
  tabs: ["All Projects", "Website", "App", "System", "Support"],
  stats: [
    { value: "Website", label: "Presence" },
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
  return <DivisionLayout config={itConfig} />;
}
