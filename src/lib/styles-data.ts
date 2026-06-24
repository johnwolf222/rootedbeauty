import braids from "@/assets/style-braids.jpg";
import boxBraids from "@/assets/style-box-braids.jpg";
import straight from "@/assets/style-straight.jpg";
import wavy from "@/assets/style-wavy.jpg";
import locs from "@/assets/style-locs.jpg";

export type Style = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  category: string;
};

export const styles: Style[] = [
  {
    id: "braids",
    name: "Goddess Braids",
    tagline: "Sculpted. Sacred. Statement.",
    description:
      "Knotless and goddess braid techniques that honor your edges and protect your length.",
    price: "from $220",
    duration: "5–7 hrs",
    image: braids,
    category: "Braids",
  },
  {
    id: "box-braids",
    name: "Box Braids",
    tagline: "Timeless. Tailored. Total glam.",
    description: "Classic box braids in any length, finished with optional gold cuffs and beads.",
    price: "from $260",
    duration: "6–8 hrs",
    image: boxBraids,
    category: "Braids",
  },
  {
    id: "straight",
    name: "Silk Press",
    tagline: "Glass-smooth. Gravity defying.",
    description:
      "Healthy heat silk press that delivers mirror shine without sacrificing your curl pattern.",
    price: "from $120",
    duration: "2–3 hrs",
    image: straight,
    category: "Silk Press",
  },
  {
    id: "wavy",
    name: "Hollywood Waves",
    tagline: "Old money. New crown.",
    description: "Voluminous bouncy waves styled for galas, weddings, or your everyday red carpet.",
    price: "from $150",
    duration: "2 hrs",
    image: wavy,
    category: "Waves",
  },
  {
    id: "locs",
    name: "Luxury Locs",
    tagline: "Rooted. Refined. Reigning.",
    description: "Loc maintenance, retwists, styling and adornment with gold cuffs.",
    price: "from $180",
    duration: "3–5 hrs",
    image: locs,
    category: "Locs",
  },
  {
    id: "event-glam",
    name: "Event Glam",
    tagline: "Camera-ready in minutes.",
    description:
      "On-location or in-studio glam for galas, photoshoots, music videos and red-carpet nights.",
    price: "from $200",
    duration: "1.5–3 hrs",
    image: wavy,
    category: "Event Glam",
  },
  {
    id: "bridal",
    name: "Bridal Hair",
    tagline: "Your forever crown.",
    description:
      "Trial + day-of bridal styling with veil placement, hand-set waves and lasting hold.",
    price: "from $350",
    duration: "3–4 hrs",
    image: straight,
    category: "Bridal",
  },
  {
    id: "protective",
    name: "Protective Styles",
    tagline: "Grow. Guard. Glow.",
    description:
      "Low-tension protective styling designed around your hair goals and lifestyle.",
    price: "from $180",
    duration: "4–6 hrs",
    image: braids,
    category: "Braids",
  },
];

export type Category = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string; // lucide icon name
};

export const categories: Category[] = [
  { id: "braids", name: "Braids", description: "Goddess, knotless, box braids and custom lengths.", price: "from $180", icon: "Sparkles" },
  { id: "silk-press", name: "Silk Press", description: "Healthy heat press with mirror-shine finish.", price: "from $120", icon: "Wand2" },
  { id: "locs", name: "Loc Services", description: "Retwists, styling, repair and gold adornment.", price: "from $90", icon: "Flame" },
  { id: "waves", name: "Waves & Curls", description: "Hollywood waves, bouncy curls, soft glam sets.", price: "from $130", icon: "Waves" },
  { id: "bridal", name: "Bridal", description: "Trials, day-of styling and bridal party packages.", price: "from $350", icon: "Crown" },
  { id: "event", name: "Event Glam", description: "On-location glam for galas, shoots, and parties.", price: "from $200", icon: "Star" },
  { id: "addons", name: "Add-ons", description: "Treatments, color refresh, scalp therapy & more.", price: "from $25", icon: "Plus" },
  { id: "consult", name: "Consultations", description: "Hair-health and style planning sessions.", price: "from $45", icon: "MessageCircle" },
];

export const eventTypes = [
  "Wedding Party",
  "Bridal Trial",
  "Photo Shoot",
  "Music Video",
  "Birthday / Glam Day",
  "Prom / Homecoming",
  "Corporate Event",
  "Other",
] as const;

export const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "6:00 PM",
] as const;