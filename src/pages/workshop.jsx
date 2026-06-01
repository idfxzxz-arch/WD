import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20booking%20layanan%20WD%20Jaya%20Workshop.";

const workshopConfig = {
  category: "workshop",
  brand: "WD Jaya Workshop",
  logoText: "WD",
  logoAccent: "Jaya",
  logoSuffix: "Workshop",
  badge: "Workshop",
  kicker: "WD Jaya Workshop",
  title: "Skill programs,",
  titleAccent: "built for real use.",
  description:
    "WD Jaya Workshop merancang kelas, seminar, training, dan bootcamp dengan alur belajar yang jelas, praktik yang relevan, serta output yang bisa langsung digunakan. Setiap program disusun agar peserta memahami materi, percaya diri mencoba, dan membawa hasil nyata setelah sesi selesai.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "Workshop inquiry noted",
  savedMessage: "Workshop reference saved",
  galleryTitle: "Workshop Portfolio",
  mark: "WS",
  tabs: ["All Programs", "Workshop"],
  stats: [
    { value: "Hands-on", label: "Practice" },
    { value: "Guided", label: "Learning" },
    { value: "Useful", label: "Output" },
  ],
  accent: "#22c55e",
  accentSoft: "rgba(34,197,94,0.14)",
  accentBorder: "rgba(34,197,94,0.28)",
  bg: "#07110c",
  muted: "#9aa89f",
};

export default function WorkshopLayout() {
  return <DivisionLayout config={workshopConfig} />;
}
