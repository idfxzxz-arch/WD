import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20booking%20layanan%20WD%20Production.";

const productionConfig = {
  category: "production",
  brand: "WD Production",
  logoText: "WD",
  logoAccent: "Production",
  badge: "Creative Production",
  kicker: "WD Production",
  title: "Visual stories,",
  titleAccent: "produced with purpose.",
  description:
    "WD Production menghadirkan layanan dokumentasi, video, foto, dan produksi komersial dengan standar kerja yang terarah. Dari konsep visual, proses shooting, hingga hasil akhir, setiap karya dibuat untuk memperkuat pesan brand, acara, dan kebutuhan publikasi Anda.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "Production inquiry noted",
  savedMessage: "Production reference saved",
  galleryTitle: "Production Portfolio",
  mark: "PR",
  tabs: ["All Projects", "Film", "Photo", "Video", "Commercial"],
  stats: [
    { value: "Concept", label: "Direction" },
    { value: "Shooting", label: "Production" },
    { value: "Final", label: "Delivery" },
  ],
  accent: "#f59e0b",
  accentSoft: "rgba(245,158,11,0.14)",
  accentBorder: "rgba(245,158,11,0.28)",
  bg: "#100c05",
  muted: "#aa9b87",
};

export default function ProductionOrganizer() {
  return <DivisionLayout config={productionConfig} />;
}
