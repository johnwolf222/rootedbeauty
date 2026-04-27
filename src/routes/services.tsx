import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";
import { styles } from "@/lib/styles-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Rooted Beauty" },
      {
        name: "description",
        content:
          "Explore our luxury hair menu — braids, box braids, silk press, Hollywood waves and loc artistry. Pricing & duration.",
      },
      { property: "og:title", content: "Services & Pricing — Rooted Beauty" },
      { property: "og:description", content: "Our full luxury hair styling menu in Jonesboro, GA." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">The Menu</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            Crafted <span className="text-gradient-glam">services</span>
          </h1>
          <p className="mt-6 text-muted-foreground">
            Every service includes a hair-health consultation, scalp cleanse,
            and finishing touch with our signature gold oil.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {styles.map((style, i) => (
            <article
              key={style.id}
              className="grid items-center gap-8 rounded-3xl border border-border/60 bg-card/40 p-6 lg:grid-cols-[1.1fr_1fr] lg:p-10"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-2xl border border-gold/20">
                  <img
                    src={style.image}
                    alt={style.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-[480px] w-full object-cover"
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">{style.tagline}</p>
                <h2 className="mt-3 font-display text-4xl">{style.name}</h2>
                <p className="mt-4 text-muted-foreground">{style.description}</p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gold" />
                    <span className="text-gradient-gold font-display text-2xl">{style.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-gold" /> {style.duration}
                  </div>
                </div>
                <Button asChild variant="glam" size="lg" className="mt-8">
                  <Link to="/booking" search={{ style: style.id }}>
                    Book {style.name}
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}