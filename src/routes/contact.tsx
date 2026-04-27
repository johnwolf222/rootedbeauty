import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit & Contact — Rooted Beauty · Jonesboro, GA" },
      {
        name: "description",
        content: "Visit Rooted Beauty at 247 Main Street, Jonesboro, GA. Call (470) 555-0142 or follow us on social.",
      },
      { property: "og:title", content: "Visit Rooted Beauty" },
      { property: "og:description", content: "Find us in Jonesboro, GA. Hours, contact info, and socials." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Visit</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            Find your <span className="text-gradient-glam">crown</span>
          </h1>
          <p className="mt-6 text-muted-foreground">
            Walk-ins welcome on a first-come basis. For guaranteed seating,
            reserve online or give us a call.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card icon={MapPin} label="Studio">
              247 Main Street, Suite 4<br />
              Jonesboro, GA 30236
            </Card>
            <Card icon={Phone} label="Phone" href="tel:+14705550142">(470) 555-0142</Card>
            <Card icon={Mail} label="Email" href="mailto:hello@rootedbeauty.co">hello@rootedbeauty.co</Card>

            <div className="rounded-2xl border border-gold/30 bg-card/40 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Follow the glam</div>
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
            </div>

            <Button asChild variant="glam" size="xl" className="w-full">
              <Link to="/booking">
                <Calendar /> Book your seat
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gold/30 shadow-luxe">
            <iframe
              title="Rooted Beauty location"
              src="https://www.google.com/maps?q=Jonesboro+GA&output=embed"
              className="h-[600px] w-full grayscale-[40%] contrast-110"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const Inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:border-gold/50">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-gold text-gold-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-gold">{label}</div>
        <div className="mt-1 leading-relaxed text-foreground">{children}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
}