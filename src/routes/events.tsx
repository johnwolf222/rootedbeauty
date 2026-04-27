import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { styles, eventTypes } from "@/lib/styles-data";
import { supabase } from "@/integrations/supabase/client";
import { Crown, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Event Glam Booking — Rooted Beauty" },
      {
        name: "description",
        content:
          "Book multiple stylings for weddings, photo shoots, music videos and more. Our event glam team brings the salon to you.",
      },
      { property: "og:title", content: "Event Glam Booking — Rooted Beauty" },
      { property: "og:description", content: "Plan multi-style event glam in Jonesboro, GA." },
    ],
  }),
  component: EventsPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  event_type: z.string().min(1),
  event_date: z.string().min(1),
  guest_count: z.number().min(1).max(50),
  services: z.array(z.string()).min(1, "Pick at least one styling"),
  location: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
});

function EventsPage() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    event_date: "",
    guest_count: 4,
    services: [] as string[],
    location: "",
    notes: "",
  });

  const toggleService = (id: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("event_bookings").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.event_type,
      event_date: parsed.data.event_date,
      guest_count: parsed.data.guest_count,
      services: parsed.data.services,
      location: parsed.data.location || null,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setSuccess(true);
    toast.success("Event request received — we'll be in touch within 48 hours!");
  }

  if (success) {
    return (
      <div className="bg-gradient-noir">
        <section className="container mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
          <CheckCircle2 className="h-16 w-16 text-gold" />
          <h1 className="mt-6 font-display text-5xl">Event request received.</h1>
          <p className="mt-4 text-muted-foreground">
            Our event coordinator will reach out within 48 hours with a custom
            quote and timeline.
          </p>
          <Button variant="luxe" size="lg" className="mt-10" onClick={() => navigate({ to: "/" })}>
            Back to Home
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Event Glam</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">
              The <span className="text-gradient-gold">full-team</span> experience
            </h1>
            <p className="mt-6 text-muted-foreground">
              Multi-stylist bookings for bridal parties, photo shoots, music
              videos, brand campaigns, and milestone celebrations. We handle
              every head — choose as many styles as your guests need.
            </p>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-card/40 p-6">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-gold" />
                <div className="font-display text-xl">What's included</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>· On-site or in-studio after-hours service</li>
                <li>· Lead stylist + assistants based on guest count</li>
                <li>· Touch-up kit & finishing oil for every guest</li>
                <li>· Optional bridal trial 2–4 weeks before event</li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={80} />
              </Field>
              <Field label="Phone" required>
                <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required maxLength={30} />
              </Field>
              <Field label="Email" required className="sm:col-span-2">
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
              </Field>
              <Field label="Event type" required>
                <Select value={form.event_type} onValueChange={(v) => setForm({ ...form, event_type: v })}>
                  <SelectTrigger><SelectValue placeholder="Choose event" /></SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Event date" required>
                <Input
                  type="date"
                  min={today}
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  required
                />
              </Field>
              <Field label="Number of guests" required>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={form.guest_count}
                  onChange={(e) => setForm({ ...form, guest_count: Number(e.target.value) })}
                  required
                />
              </Field>
              <Field label="Location (optional)">
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="On-site address or 'Studio'"
                  maxLength={200}
                />
              </Field>

              <div className="sm:col-span-2">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Stylings needed <span className="text-pink">*</span>
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select every style your guests want — mix and match freely.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {styles.map((s) => {
                    const checked = form.services.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          checked
                            ? "border-gold bg-gold/10"
                            : "border-border/60 hover:border-gold/50"
                        }`}
                      >
                        <Checkbox checked={checked} onCheckedChange={() => toggleService(s.id)} />
                        <img src={s.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                        <div>
                          <div className="font-display text-base leading-tight">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.price}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Field label="Tell us about your event" className="sm:col-span-2">
                <Textarea
                  rows={5}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  maxLength={1000}
                  placeholder="Vision, color palette, inspiration links, getting-ready timeline..."
                />
              </Field>
            </div>

            <Button type="submit" variant="glam" size="xl" className="mt-8 w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Request event glam"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}{required && <span className="ml-1 text-pink">*</span>}
      </Label>
      {children}
    </div>
  );
}