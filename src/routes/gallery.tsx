import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { styles } from "@/lib/styles-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Rooted Beauty Hair Studio" },
      {
        name: "description",
        content:
          "Browse our gallery of braids, box braids, straight silk press, wavy styles and luxury locs.",
      },
      { property: "og:title", content: "Gallery — Rooted Beauty" },
      { property: "og:description", content: "Editorial hair styling moments from Rooted Beauty." },
    ],
  }),
  component: GalleryPage,
});

const FILTERS = ["All", "Braids", "Silk Press", "Locs", "Waves", "Bridal", "Event Glam"] as const;

// Repeat the styles into a richer lookbook
const lookbook = [...styles, ...styles, ...styles].map((s, i) => ({
  ...s,
  uid: `${s.id}-${i}`,
}));

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<null | (typeof lookbook)[number]>(null);

  const items = useMemo(
    () => (filter === "All" ? lookbook : lookbook.filter((s) => s.category === filter)),
    [filter],
  );

  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Lookbook</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            The <span className="text-gradient-glam">gallery</span>
          </h1>
          <p className="mt-6 text-muted-foreground">
            A curated archive of our most-loved hair moments. Tap any image to inspire your next visit.
          </p>
        </div>

        {/* Filter pills */}
        <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300",
                    active
                      ? "border-gold bg-gradient-gold text-gold-foreground shadow-gold"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:border-gold/60 hover:text-gold",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinterest-style masonry */}
        <div className="mt-10 columns-2 gap-4 lg:columns-3 [column-fill:_balance]">
          {items.map((s, i) => {
            // varied heights for editorial feel
            const heights = ["h-72", "h-96", "h-[28rem]", "h-80", "h-[22rem]"];
            const h = heights[i % heights.length];
            return (
              <figure
                key={s.uid}
                onClick={() => setOpen(s)}
                className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-luxe transition-shadow hover:shadow-gold break-inside-avoid"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className={cn(
                    "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                    h,
                  )}
                />
                <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{s.category}</div>
                  <div className="mt-1 font-display text-xl">{s.name}</div>
                  <Button
                    asChild
                    variant="glam"
                    size="sm"
                    className="pointer-events-auto mt-3 w-fit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to="/booking" search={{ style: s.id }}>
                      <Calendar /> Book This Look
                    </Link>
                  </Button>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-gold/40 bg-card p-0">
          {open && (
            <div className="grid gap-0 sm:grid-cols-[1.2fr_1fr]">
              <img src={open.image} alt={open.name} className="h-full max-h-[70vh] w-full object-cover" />
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">{open.category}</p>
                <DialogTitle className="mt-2 font-display text-3xl">{open.name}</DialogTitle>
                <p className="mt-3 text-sm text-muted-foreground">{open.description}</p>
                <p className="mt-4 font-display text-2xl text-gradient-gold">{open.price}</p>
                <Button asChild variant="glam" size="lg" className="mt-6 w-full">
                  <Link to="/booking" search={{ style: open.id }}>
                    <Calendar /> Book This Look
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}