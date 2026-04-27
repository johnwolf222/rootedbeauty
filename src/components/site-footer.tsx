import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.55a8.16 8.16 0 0 0 5 1.6V6.69h-2.07Z" />
    </svg>
  );
}

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://www.tiktok.com", label: "TikTok", Icon: TikTokIcon },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-gradient-noir">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-display text-3xl">
              Rooted <span className="text-gradient-gold">Beauty</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Luxury hair styling rooted in artistry. Where every crown is created with intention.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition-all hover:bg-gradient-glam hover:border-transparent hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

           <div>
             <h4 className="text-xs uppercase tracking-[0.3em] text-gold font-bold">VISIT</h4>
             <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <span>247 Main Street, Suite 4<br />Jonesboro, GA 30236</span>
              </li>
               <li className="flex items-center gap-2">
                 <Phone className="h-4 w-4 text-gold" />
                 <span>(470) 698-4059</span>
               </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span>hello@rootedbeauty.co</span>
              </li>
            </ul>
          </div>

           <div>
             <h4 className="text-xs uppercase tracking-[0.3em] text-gold font-bold">HOURS</h4>
             <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Tue – Fri</span><span>9am – 8pm</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>8am – 7pm</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>10am – 5pm</span></li>
              <li className="flex justify-between text-pink"><span>Monday</span><span>Closed</span></li>
            </ul>
             <Link
               to="/booking"
               className="mt-6 inline-block text-sm uppercase tracking-widest text-gold underline underline-offset-4 hover:opacity-80 font-bold"
             >
               RESERVE YOUR SEAT →
             </Link>
          </div>
        </div>

         <div className="mt-14 border-t border-border/40 pt-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
           © {new Date().getFullYear()} ROOTED BEAUTY · DESIGNED BY JOHN WOLF
         </div>
      </div>
    </footer>
  );
}