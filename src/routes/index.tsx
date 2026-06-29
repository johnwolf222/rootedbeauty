import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Crown, Calendar, ArrowRight, Star, MapPin, Phone, Mail, Quote,
  Wand2, Flame, Waves, Plus, MessageCircle, Clock,
} from "lucide-react";
import { CalendarCheck, TrendingUp, Target } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { styles, categories } from "@/lib/styles-data";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";

const iconMap = {
  Sparkles, Wand2, Flame, Waves, Crown, Star, Plus, MessageCircle,
} as const;

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
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = heroImgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        // Parallax: gentler on mobile for smoother feel, more pronounced on desktop
        const isMobile = window.innerWidth < 768;
        const speed = isMobile ? 0.15 : 0.3;
        setOffset(window.scrollY * speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
                ref={heroImgRef}
                src={heroImg}
                alt="Glamorous editorial portrait of a woman with luxe styled hair"
                width={1080}
                height={1920}
                className="h-[600px] w-full object-cover will-change-transform"
                style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
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

      {/* Signature Styles — Carousel */}
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

          <Carousel
            opts={{ align: "start", dragFree: true, loop: false }}
            className="mt-12"
          >
            <CarouselContent className="-ml-4">
              {styles.map((style) => (
                <CarouselItem
                  key={style.id}
                  className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-luxe transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={style.image}
                        alt={style.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur">
                        {style.category}
                      </span>
                      <div className="absolute inset-x-4 bottom-4 h-px bg-gradient-gold opacity-80" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-2xl">{style.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{style.description}</p>
                      <div className="mt-5 flex items-center justify-between text-sm">
                        <span className="font-display text-xl text-gradient-gold">{style.price}</span>
                        <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-gold" /> {style.duration}
                        </span>
                      </div>
                      <Button asChild variant="glam" size="lg" className="mt-6 w-full">
                        <Link to="/booking" search={{ style: style.id }}>Book This Style</Link>
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 hidden justify-end gap-3 md:flex">
              <CarouselPrevious className="static h-11 w-11 translate-y-0 border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground" />
              <CarouselNext className="static h-11 w-11 translate-y-0 border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground" />
            </div>
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:hidden">
              Swipe to explore →
            </p>
          </Carousel>
        </div>
      </section>

      {/* Menu Categories — Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Browse By Service</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Find your <span className="text-gradient-glam">category</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Not sure where to start? Tap a category to see the styles inside.
            </p>
          </div>

          <Carousel opts={{ align: "start", dragFree: true }} className="mt-10">
            <CarouselContent className="-ml-4">
              {categories.map((c) => {
                const Icon = iconMap[c.icon as keyof typeof iconMap] ?? Sparkles;
                return (
                  <CarouselItem
                    key={c.id}
                    className="pl-4 basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <Link
                      to="/services"
                      className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl">{c.name}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
                      <div className="mt-4 text-xs uppercase tracking-widest text-gold">{c.price}</div>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/80 group-hover:text-gold">
                        View {c.name} <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="mt-8 hidden justify-end gap-3 md:flex">
              <CarouselPrevious className="static h-11 w-11 translate-y-0 border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground" />
              <CarouselNext className="static h-11 w-11 translate-y-0 border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Homepage gallery preview — masonry lookbook */}
      <section className="border-y border-border/40 bg-card/30 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">The Lookbook</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Real <span className="text-gradient-gold">crowns</span> in the wild
              </h2>
            </div>
            <Button asChild variant="luxe" size="lg">
              <Link to="/gallery">View Full Gallery <ArrowRight /></Link>
            </Button>
          </div>

          <div className="mt-10 columns-2 gap-4 lg:columns-3 [column-fill:_balance]">
            {[...styles, ...styles.slice(0, 4)].slice(0, 9).map((s, i) => {
              const heights = ["h-56", "h-80", "h-72", "h-96", "h-60"];
              return (
                <Link
                  key={`${s.id}-${i}`}
                  to="/gallery"
                  className={`group mb-4 block overflow-hidden rounded-2xl border border-border/60 shadow-luxe ${heights[i % heights.length]} break-inside-avoid`}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              );
            })}
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
                <Link to="/booking">Book Appointment</Link>
              </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gold/30 shadow-luxe">
              <iframe
                title="Rooted Beauty location — Jonesboro / Ellenwood, GA"
                src="https://www.google.com/maps?q=Jonesboro,GA&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0"
              />
            </div>
          </div>

          <p className="mt-12 text-center text-sm uppercase tracking-widest text-muted-foreground">
            Intentionally growing toward 70–85 appointments per month — book early for best availability.
          </p>
      </section>
    </>
  );
}
