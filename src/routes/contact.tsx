import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Calendar, MessageSquare, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Connect — Rooted Beauty · Jonesboro / Ellenwood, GA" },
      {
        name: "description",
        content:
          "Book, ask about a style, or inquire about Event Glam at Rooted Beauty — Jonesboro / Ellenwood, GA. We respond within 24 hours.",
      },
      { property: "og:title", content: "Let's Connect — Rooted Beauty" },
      { property: "og:description", content: "Booking, style questions, and Event Glam inquiries for Rooted Beauty." },
    ],
  }),
  component: ContactPage,
});

const inquiries = [
  "New client consultation",
  "Goddess Braids / Knotless Braids",
  "Silk Press or Hollywood Waves",
  "Bridal / Event Glam (party of 2+)",
  "Custom style or package",
  "General question",
];

function ContactPage() {
  return (
    <div className="bg-gradient-noir">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Let's Connect</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            We'd love to <span className="text-gradient-glam">hear from you</span>
          </h1>
          <p className="mt-6 text-muted-foreground">
            Whether you're ready to book, have questions about a style, or want to
            inquire about Event Glam, we're here.
          </p>
        </div>
      </section>

      {/* Visit + Contact */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Visit the Studio */}
          <div className="rounded-2xl border border-gold/30 bg-card/40 p-8 shadow-luxe">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Visit the Studio</p>
            <h2 className="mt-3 font-display text-3xl">Rooted Beauty</h2>
            <div className="mt-4 flex items-start gap-3 text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-foreground">Jonesboro, GA</p>
                <p className="text-sm">Ellenwood / South Atlanta area</p>
                <p className="mt-3 text-xs italic">
                  Exact address & studio details provided after booking confirmation
                  for privacy and security.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-border/40 pt-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
                <Clock className="h-4 w-4" /> Hours
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between"><span>Tuesday – Saturday</span><span>9:00 AM – 6:00 PM</span></li>
                <li className="flex justify-between text-pink"><span>Monday &amp; Sunday</span><span>By appointment · Event Glam</span></li>
              </ul>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <Card icon={MessageSquare} label="Text or Call" href="tel:+14706984059" hint="Preferred method · fastest response">
              (470) 698-4059
            </Card>
            <Card icon={Mail} label="Email" href="mailto:hello@rootedbeauty.lovable.app">
              hello@rootedbeauty.lovable.app
            </Card>
            <Card icon={Calendar} label="Booking" hint="Best way to secure your spot">
              <Link to="/booking" className="text-gold underline underline-offset-4 hover:opacity-80">
                Book Your Appointment →
              </Link>
            </Card>

            <div className="rounded-2xl border border-gold/30 bg-card/40 p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
                <Sparkles className="h-4 w-4" /> Follow our journey
              </div>
              <div className="mt-4 flex gap-3">
                {[
                  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-all hover:bg-gradient-glam hover:border-transparent hover:text-primary-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">@rootedbeauty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiries */}
      <section className="border-y border-border/40 bg-card/30 py-20">
        <div className="container mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Quick Inquiries</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            What are you <span className="text-gradient-gold">looking for?</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inquiries.map((label) => (
              <Link
                key={label}
                to="/booking"
                className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/40 p-5 text-sm transition-all hover:border-gold/60 hover:shadow-glam"
              >
                <span>{label}</span>
                <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Goals reminder + CTA */}
      <section className="container mx-auto grid gap-10 px-6 py-20 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Booking Goals Reminder</p>
          <h3 className="mt-3 font-display text-3xl">
            Intentionally growing toward <span className="text-gradient-glam">70–85</span> appointments per month
          </h3>
          <p className="mt-4 text-muted-foreground">
            We protect the quality and presence each client receives. Booking in
            advance is recommended for your preferred date and time.
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-gold">
            We respond to all messages within 24 hours — usually much faster.
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-gradient-noir p-8">
          <div>
            <h3 className="font-display text-3xl">Why clients love reaching out</h3>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><span className="text-gold">✦</span> Personalized style recommendations</li>
              <li className="flex gap-3"><span className="text-gold">✦</span> Honest hair health advice</li>
              <li className="flex gap-3"><span className="text-gold">✦</span> Clear pricing with no hidden fees</li>
              <li className="flex gap-3"><span className="text-gold">✦</span> Flexible options for Event Glam &amp; Bridal</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="glam" size="xl">
              <Link to="/booking"><Calendar /> Book Now</Link>
            </Button>
            <Button asChild variant="luxe" size="xl">
              <Link to="/events">Plan Event Glam</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="container mx-auto px-6 pb-20">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          Rooted Beauty is a women-owned, Black-owned luxury hair studio · proudly serving
          Jonesboro · Ellenwood · Stockbridge · Morrow · South Atlanta
        </p>
      </section>
    </div>
  );
}

function Card({
  icon: Icon,
  label,
  href,
  hint,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const Inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:border-gold/50">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-gold text-gold-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">{label}</div>
        <div className="mt-1 leading-relaxed text-foreground">{children}</div>
        {hint && <div className="mt-1 text-xs italic text-muted-foreground">{hint}</div>}
      </div>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : <div>{Inner}</div>;
}
