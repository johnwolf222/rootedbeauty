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
      { property: "og:title", content: "Rooted Beauty — Luxury Hair Salon" },
      { property: "og:description", content: "Luxury braids, box braids, silk press, waves and locs. Jonesboro, GA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
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
