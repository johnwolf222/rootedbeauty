import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { styles, timeSlots } from "@/lib/styles-data";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, CheckCircle2 } from "lucide-react";

const bookingSearchSchema = z.object({
  style: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Rooted Beauty" },
      {
        name: "description",
        content: "Reserve your seat at Rooted Beauty. Choose your service, date and time.",
      },
      { property: "og:title", content: "Book at Rooted Beauty" },
      { property: "og:description", content: "Reserve a luxury styling appointment." },
    ],
  }),
  validateSearch: bookingSearchSchema,
  component: BookingPage,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  service: z.string().min(1, "Select a service"),
  style: z.string().max(120).optional(),
  preferred_date: z.string().min(1, "Pick a date"),
  preferred_time: z.string().min(1, "Pick a time"),
  notes: z.string().max(800).optional(),
});

function BookingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: search.style ?? "",
    style: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      service: parsed.data.service,
      style: parsed.data.style || null,
      preferred_date: parsed.data.preferred_date,
      preferred_time: parsed.data.preferred_time,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit booking. Please try again.");
      return;
    }
    setSuccess(true);
    toast.success("Booking received — we'll confirm shortly!");
  }

  if (success) {
    return (
      <div className="bg-gradient-noir">
        <section className="container mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
          <CheckCircle2 className="h-16 w-16 text-gold" />
          <h1 className="mt-6 font-display text-5xl">You're on the list.</h1>
          <p className="mt-4 text-muted-foreground">
            We'll text and email you within 24 hours to confirm your appointment.
          </p>
          <div className="mt-10 flex gap-4">
            <Button variant="luxe" size="lg" onClick={() => navigate({ to: "/" })}>
              Back to Home
            </Button>
            <Button variant="glam" size="lg" onClick={() => { setSuccess(false); setForm({ ...form, notes: "" }); }}>
              Book another
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Reserve</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">
              Book your <span className="text-gradient-glam">seat</span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Tell us about the look you're after. We'll respond within 24 hours
              with your confirmation, prep tips, and a calendar invite.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <Detail title="Cancellation" body="Free up to 48 hours before." />
              <Detail title="Deposit" body="A 30% deposit secures your slot." />
              <Detail title="Late policy" body="15-minute grace, then rescheduled." />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={80} />
              </Field>
              <Field label="Phone" required>
                <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required maxLength={30} />
              </Field>
              <Field label="Email" required className="sm:col-span-2">
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={255} />
              </Field>
              <Field label="Service" required>
                <Select value={form.service} onValueChange={(v) => update("service", v)}>
                  <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Style detail (optional)">
                <Input value={form.style} onChange={(e) => update("style", e.target.value)} placeholder="e.g. Knotless, mid-back length" maxLength={120} />
              </Field>
              <Field label="Date" required>
                <Input
                  type="date"
                  min={today}
                  value={form.preferred_date}
                  onChange={(e) => update("preferred_date", e.target.value)}
                  required
                />
              </Field>
              <Field label="Time" required>
                <Select value={form.preferred_time} onValueChange={(v) => update("preferred_time", v)}>
                  <SelectTrigger><SelectValue placeholder="Pick a time" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Notes (optional)" className="sm:col-span-2">
                <Textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={4}
                  maxLength={800}
                  placeholder="Allergies, inspiration links, special requests..."
                />
              </Field>
            </div>

            <Button type="submit" variant="glam" size="xl" className="mt-8 w-full" disabled={submitting}>
              <Sparkles /> {submitting ? "Reserving..." : "Reserve my seat"}
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

function Detail({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-gold/60 pl-4">
      <div className="text-xs uppercase tracking-widest text-gold">{title}</div>
      <div className="text-sm text-muted-foreground">{body}</div>
    </div>
  );
}