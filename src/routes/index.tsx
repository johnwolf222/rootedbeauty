import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Crown, Calendar, ArrowRight, Star, MapPin, Phone, Mail, Quote } from "lucide-react";
import { CalendarCheck, TrendingUp, Target } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { styles } from "@/lib/styles-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rooted Beauty | Luxury Braids & Silk Press in Jonesboro / Ellenwood, GA" },
      {
        name: "description",
        content:
          "Luxury protective styles, knotless braids, silk press, Hollywood waves & loc artistry in Jonesboro / Ellenwood, GA. 500+ five-star reviews. Book your experience.",
      },
      { property: "og:title", content: "Rooted Beauty — Luxury Protective Styles & Silk Press" },
      { property: "og:description", content: "Where every crown is created with intention. Jonesboro / Ellenwood, GA." },
    ],
  }),
  component: Index,
});

const testimonials = [
  {
    quote:
      "My silk press lasted 3 weeks with zero frizz — even in Atlanta humidity. The attention to hair health is unmatched.",
    name: "Jasmine T.",
    location: "Ellenwood",
  },
  {
    quote:
      "Goddess Braids that felt weightless and looked expensive. Best braiding experience I've ever had.",
    name: "Aisha R.",
    location: "Jonesboro",
  },
  {
    quote:
      "Booked a bridal party of 5 and they handled everything flawlessly. We felt like royalty.",
    name: "Morgan K.",
    location: "Stockbridge",
  },
  {
    quote:
      "Finally found a stylist who actually listens and protects my edges. 10/10.",
    name: "Brianna M.",
    location: "Atlanta",
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-noir" />
        <div className="container mx-auto grid items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Jonesboro / Ellenwood · GA
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl animate-fade-in">
              Rooted Beauty — <span className="text-gradient-glam">Luxury Protective Styles</span> & Silk Press
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/90">
              Jonesboro / Ellenwood, GA · Where every crown is created with intention.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Luxury braids, knotless, silk press, Hollywood waves & loc artistry by master
              stylists with 15+ years experience. 500+ five-star reviews.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="glam" size="xl">
                <Link to="/booking">
                  <Calendar /> Book Your Experience
                </Link>
              </Button>
              <Button asChild variant="luxe" size="xl">
                <Link to="/services">
                  View Services <ArrowRight />
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span>500+ five-star reviews</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-glam opacity-40 blur-3xl" />
            <div className="overflow-hidden rounded-[1.5rem] border border-gold/30 shadow-luxe">
              <img
                src={heroImg}
                alt="Glamorous editorial portrait of a woman with luxe styled hair"
                width={1080}
                height={1920}
                className="h-[600px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-gold/40 bg-card/90 p-5 backdrop-blur-md sm:block">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-gold" />
                <div>
                  <div className="font-display text-xl">Master Stylists</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">15+ years experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="border-y border-border/40 bg-card/30 py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">The Menu</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Signature <span className="text-gradient-gold">styles</span>
              </h2>
            </div>
            <Link to="/services" className="hidden text-sm uppercase tracking-widest text-gold hover:opacity-80 sm:inline">
              View all →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.slice(0, 3).map((style) => (
              <Link
                key={style.id}
                to="/services"
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:scale-[1.03] hover:border-gold/60 hover:shadow-gold animate-fade-in"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-6">
                  <h3 className="font-display text-2xl">{style.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{style.tagline}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-gold">{style.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Event glam CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-noir" />
        <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Event Glam Team</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Bridal parties, photo shoots & <span className="text-gradient-glam">red carpet moments.</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Book multiple stylings for your event — weddings, birthdays, music
              videos, corporate brand days. We bring the salon to you, or open
              the studio after-hours just for your party.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/events">Plan Event Glam</Link>
              </Button>
              <Button asChild variant="luxe" size="xl">
                <Link to="/gallery">See the Gallery</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {styles.slice(2, 6).map((s) => (
              <div key={s.id} className="overflow-hidden rounded-xl border border-border/60 shadow-luxe">
                <img
                  src={s.image}
                  alt={s.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Goals */}
      <section className="border-t border-border/40 bg-card/30 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Growth Goals</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Our <span className="text-gradient-gold">Booking Goals</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              We're building something intentional at Rooted Beauty — a space where
              quality, care, and consistency come first. Here's what we're aiming for this year.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, label: "Short-term · Next 3 months", value: "45–55", suffix: "appointments / month" },
              { icon: TrendingUp, label: "Mid-term · Next 6 months", value: "70–85", suffix: "appointments / month" },
              { icon: CalendarCheck, label: "Long-term · 12 months", value: "100+", suffix: "appointments / month" },
            ].map(({ icon: Icon, label, value, suffix }) => (
              <div
                key={label}
                className="rounded-2xl border border-gold/30 bg-background/40 p-8 shadow-luxe transition-all hover:border-gold/60 hover:shadow-glam"
              >
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
                <div className="mt-4 font-display text-6xl sm:text-7xl text-gradient-glam">{value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{suffix}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-8">
              <h3 className="font-display text-2xl">What this means for you</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-gold">✦</span> More availability for your preferred times</li>
                <li className="flex gap-3"><span className="text-gold">✦</span> Faster booking for popular styles — Goddess Braids, Silk Press, Knotless</li>
                <li className="flex gap-3"><span className="text-gold">✦</span> Dedicated slots for Event Glam &amp; Bridal Parties</li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                We track these targets weekly so we can open more spots as demand grows —
                without ever rushing your experience.
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-gradient-noir p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Limited slots each month</p>
                <h3 className="mt-3 font-display text-3xl">
                  Reserve your spot to protect the quality you deserve.
                </h3>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="glam" size="xl">
                  <Link to="/booking">Book Your Experience</Link>
                </Button>
                <Button asChild variant="luxe" size="xl">
                  <Link to="/booking">See Current Availability</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
