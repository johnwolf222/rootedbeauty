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
  },
  {
    id: "box-braids",
    name: "Box Braids",
    tagline: "Timeless. Tailored. Total glam.",
    description: "Classic box braids in any length, finished with optional gold cuffs and beads.",
    price: "from $260",
    duration: "6–8 hrs",
    image: boxBraids,
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
  },
  {
    id: "wavy",
    name: "Hollywood Waves",
    tagline: "Old money. New crown.",
    description: "Voluminous bouncy waves styled for galas, weddings, or your everyday red carpet.",
    price: "from $150",
    duration: "2 hrs",
    image: wavy,
  },
  {
    id: "locs",
    name: "Luxury Locs",
    tagline: "Rooted. Refined. Reigning.",
    description: "Loc maintenance, retwists, styling and adornment with gold cuffs.",
    price: "from $180",
    duration: "3–5 hrs",
    image: locs,
  },
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