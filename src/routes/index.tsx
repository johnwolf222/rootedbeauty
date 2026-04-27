import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Crown, Calendar, ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { styles } from "@/lib/styles-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rooted Beauty — Luxury Hair Salon · Jonesboro, GA" },
      {
        name: "description",
        content:
          "Where every crown is created with intention. Luxury braids, silk press, waves and locs in Jonesboro, GA. Reserve your seat at Rooted Beauty.",
      },
      { property: "og:title", content: "Rooted Beauty — Luxury Hair Salon" },
      { property: "og:description", content: "Luxury hair styling in Jonesboro, GA." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-noir" />
        <div className="container mx-auto grid items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Jonesboro · GA
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Where every <span className="text-gradient-glam">crown</span> is created with intention.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Luxury braids, silk press, Hollywood waves, and loc artistry —
              styled by a team obsessed with healthy hair and high glam.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="glam" size="xl">
                <Link to="/booking">
                  <Calendar /> Book an Appointment
                </Link>
              </Button>
              <Button asChild variant="luxe" size="xl">
                <Link to="/events">
                  Plan an Event <ArrowRight />
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
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-gold/50 hover:shadow-glam"
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
    </>
  );
}
