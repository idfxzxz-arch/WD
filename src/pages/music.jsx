import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20booking%20layanan%20WD%20Music.";

const musicConfig = {
  category: "music",
  brand: "WD Music Entertaiment and Music Class",
  logoText: "WD",
  logoAccent: "Music",
  badge: "Entertainment & Class",
  kicker: "WD Music Entertaiment and Music Class",
  title: "Music experiences,",
  titleAccent: "ready for the stage.",
  description:
    "WD Music Entertaiment and Music Class menghadirkan layanan performance, kelas musik, recording, concert support, dan kebutuhan talent dengan koordinasi yang profesional. Kami menggabungkan energi panggung, pengembangan skill, serta detail teknis agar setiap pengalaman musik terdengar hidup dan tampil percaya diri.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "Music inquiry noted",
  savedMessage: "Music reference saved",
  galleryTitle: "Music Portfolio",
  mark: "MU",
  tabs: ["All Projects", "Music", "Music Class"],
  tabAliases: {
    Music: ["music", "performance", "recording", "concert", "behind the scene"],
    "Music Class": ["music class"],
  },
  stats: [
    { value: "Live", label: "Stage" },
    { value: "Class", label: "Learning" },
    { value: "Talent", label: "Support" },
  ],
  accent: "#a855f7",
  accentSoft: "rgba(168,85,247,0.15)",
  accentBorder: "rgba(168,85,247,0.30)",
  bg: "#0d0714",
  muted: "#a99ab6",
};

export default function MusicLayout() {
  return <DivisionLayout config={musicConfig} />;
}
