import { createFileRoute } from "@tanstack/react-router";
import { styles } from "@/lib/styles-data";

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

function GalleryPage() {
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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...styles, ...styles].map((s, i) => (
            <figure
              key={`${s.id}-${i}`}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 ${
                i % 5 === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <img
                src={s.image}
                alt={s.name}
                width={1024}
                height={1280}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 5 === 0 ? "h-[600px]" : "h-80"
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-5">
                <div className="font-display text-xl">{s.name}</div>
                <div className="text-xs uppercase tracking-widest text-gold">{s.tagline}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}