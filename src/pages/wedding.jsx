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
  title: "Wedding Organizer",
  titleAccent: "Solo Raya.",
  description:
    "WD Sky Wedding Organizer melayani jasa paket pernikahan murah Solo Raya dengan hasil premium. Kami membantu pasangan merancang hari pernikahan yang tenang, rapi, dan elegan. Dari WO budget hemat hingga wedding planner eksklusif, setiap momen berjalan teratur dan memukau.",
  seoTitle: "Wedding Organizer Murah Solo Raya | Paket Pernikahan Terbaik",
  seoDescription: "Jasa Wedding Organizer Solo Raya dan paket pernikahan murah Solo. WD Sky Wedding Planner menyediakan paket wedding budget hemat terjangkau dengan hasil mewah dan elegan.",
  keywords: "Wedding Organizer Solo Raya, Wedding Organizer Murah Solo Raya, Wedding Organizer Solo, WO Solo Raya, WO Murah Solo Raya, Wedding Organizer Murah Solo, WO Murah Solo, Jasa Wedding Organizer Solo Raya, Wedding Planner Solo Raya, Paket Wedding Murah Solo Raya, paket wedding murah solo, paket pernikahan murah solo, paket wedding solo raya, paket pernikahan solo raya, wedding murah solo raya, wedding budget murah solo, wedding organizer harga terjangkau solo, wedding organizer budget solo, paket wedding hemat solo",
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
