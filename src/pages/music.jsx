import DivisionPage from "./DivisionPage";

const musicConfig = {
  category: "music",
  brand: "WD Music Entertaiment and Music Class",
  logoHtml: "WD <span>Music</span>",
  badge: "Entertainment & Class",
  kicker: "WD Music Entertaiment and Music Class",
  title: "Music programs,",
  titleAccent: "stage ready.",
  description:
    "WD Music Entertaiment and Music Class mengelola pertunjukan, kelas musik, dan kebutuhan talent dengan pendekatan profesional. Kami menggabungkan energi panggung, pengembangan skill, dan koordinasi acara agar pengalaman musik terasa hidup.",
  primaryCta: "Plan Music Program",
  primaryToast: "Music inquiry noted",
  savedMessage: "Music reference saved",
  galleryTitle: "Music Portfolio",
  mark: "MU",
  tabs: ["All Music", "Performance", "Recording", "Concert", "Behind The Scene"],
  stats: [
    { value: "Live", label: "Performance" },
    { value: "Class", label: "Program" },
    { value: "Talent", label: "Support" },
  ],
  accent: "#a855f7",
  accentSoft: "rgba(168,85,247,0.15)",
  accentBorder: "rgba(168,85,247,0.30)",
  bg: "#0d0714",
  muted: "#a99ab6",
};

export default function MusicLayout() {
  return <DivisionPage config={musicConfig} />;
}
