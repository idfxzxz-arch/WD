import DivisionPage from "./DivisionPage";

const eventConfig = {
  category: "event",
  brand: "WD Event Organizer",
  logoHtml: "WD <span>Event</span> Organizer",
  badge: "Event Organizer",
  kicker: "WD Event Organizer",
  title: "Events managed,",
  titleAccent: "without the noise.",
  description:
    "WD Event Organizer merancang dan menjalankan acara dengan koordinasi yang detail, komunikasi yang jelas, dan eksekusi lapangan yang tenang. Dari corporate event hingga konser dan private gathering, setiap momen dibuat terukur dan berkesan.",
  primaryCta: "Build Your Event",
  primaryToast: "Event inquiry noted",
  savedMessage: "Event reference saved",
  galleryTitle: "Event Portfolio",
  mark: "EO",
  tabs: ["All Events", "Corporate", "Concert", "Exhibition", "Private Party"],
  stats: [
    { value: "Concept", label: "Planning" },
    { value: "Stage", label: "Execution" },
    { value: "Crew", label: "Control" },
  ],
  accent: "#6366f1",
  accentSoft: "rgba(99,102,241,0.15)",
  accentBorder: "rgba(99,102,241,0.30)",
  bg: "#080914",
  muted: "#9b9db6",
};

export default function EventOrganizer() {
  return <DivisionPage config={eventConfig} />;
}
