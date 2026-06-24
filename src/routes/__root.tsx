import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-noir px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-glam">404</h1>
        <h2 className="mt-4 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This chair is empty. Let’s get you back to the salon.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-glam px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground shadow-glam"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rooted Beauty — Luxury Hair Salon · Jonesboro, GA" },
      {
        name: "description",
        content:
          "Luxury hair styling in Jonesboro, GA. Braids, box braids, silk press, waves, and locs. Book your appointment or event glam team at Rooted Beauty.",
      },
      { name: "author", content: "Rooted Beauty" },
      { property: "og:title", content: "Rooted Beauty — Luxury Hair Salon · Jonesboro, GA" },
      { property: "og:description", content: "Glam Hair Studio is a luxury salon website for booking hair services and events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Rooted Beauty — Luxury Hair Salon · Jonesboro, GA" },
      { name: "description", content: "Glam Hair Studio is a luxury salon website for booking hair services and events." },
      { name: "twitter:description", content: "Glam Hair Studio is a luxury salon website for booking hair services and events." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa9a315c-8835-414c-87ea-3f010a970354/id-preview-b5027769--9149a680-70a1-48ac-bde9-b39af702d4e4.lovable.app-1777303106265.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa9a315c-8835-414c-87ea-3f010a970354/id-preview-b5027769--9149a680-70a1-48ac-bde9-b39af702d4e4.lovable.app-1777303106265.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cabin:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
