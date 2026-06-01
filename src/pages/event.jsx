import DivisionLayout from "../components/DivisionLayout";

const bookingHref = "https://wa.me/6285707909415?text=Halo%20WD%20Group%2C%20saya%20ingin%20booking%20layanan%20WD%20Event.";

const eventConfig = {
  category: "event",
  brand: "WD Event Organizer",
  logoText: "WD",
  logoAccent: "Event",
  logoSuffix: "Organizer",
  badge: "Event Organizer",
  kicker: "WD Event Organizer",
  title: "Events planned,",
  titleAccent: "executed with control.",
  description:
    "WD Event Organizer membantu merancang dan menjalankan acara dengan konsep yang jelas, koordinasi vendor yang rapi, serta eksekusi lapangan yang tenang. Dari corporate event, konser, exhibition, hingga private gathering, setiap detail diarahkan agar acara berjalan tertib, berkesan, dan sesuai tujuan.",
  primaryCta: "Booking Now",
  primaryHref: bookingHref,
  primaryToast: "Event inquiry noted",
  savedMessage: "Event reference saved",
  galleryTitle: "Event Portfolio",
  mark: "EO",
  tabs: ["All Projects", "Corporate", "Concert", "Exhibition", "Private"],
  stats: [
    { value: "Concept", label: "Planning" },
    { value: "Vendor", label: "Coordination" },
    { value: "Field", label: "Control" },
  ],
  accent: "#6366f1",
  accentSoft: "rgba(99,102,241,0.15)",
  accentBorder: "rgba(99,102,241,0.30)",
  bg: "#080914",
  muted: "#9b9db6",
};

export default function EventOrganizer() {
  return <DivisionLayout config={eventConfig} />;
}
