import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Sky%20Wedding%2C%20saya%20ingin%20booking%20layanan%20wedding%20organizer.";

const weddingConfig = {
  category: "wedding",
  brand: "WD Sky Wedding Organizer",
  logoText: "WD",
  logoAccent: "Sky",
  logoSuffix: "Wedding",
  badge: "Wedding Organizer",
  kicker: "WD Sky Wedding Organizer",
  title: "Elegant wedding,",
  titleAccent: "beautifully directed.",
  description:
    "WD Sky Wedding Organizer membantu pasangan merancang hari pernikahan yang tenang, rapi, dan berkesan. Dari alur acara, koordinasi vendor, hingga detail visual, setiap momen diarahkan agar berjalan teratur tanpa menghilangkan rasa personal dari cerita cinta Anda.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "Wedding inquiry noted",
  savedMessage: "Wedding reference saved",
  galleryTitle: "Wedding Portfolio",
  mark: "SKY",
  tabs: ["All Projects", "Akad", "Resepsi", "Pricelist"],
  stats: [
    { value: "End-to-end", label: "Planning" },
    { value: "Vendor", label: "Coordination" },
    { value: "Detail", label: "Execution" },
  ],
  accent: "#c89f67",
  accentSoft: "rgba(200,159,103,0.15)",
  accentBorder: "rgba(200,159,103,0.30)",
  bg: "#100c09",
  muted: "#b7a79b",
};

export default function Wedding() {
  return <DivisionLayout config={weddingConfig} />;
}
