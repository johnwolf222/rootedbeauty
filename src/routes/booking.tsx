import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import {
  Calendar,
  CheckCircle2,
  Clock,
  ImagePlus,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const bookingSearchSchema = z.object({
  style: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Rooted Beauty" },
      {
        name: "description",
        content:
          "Reserve your seat at Rooted Beauty. Choose your service, date and time.",
      },
      { property: "og:title", content: "Book at Rooted Beauty" },
      {
        property: "og:description",
        content: "Reserve a luxury styling appointment.",
      },
    ],
  }),
  validateSearch: bookingSearchSchema,
  component: BookingPage,
});

const addOnOptions = [
  "Scalp therapy",
  "Deep conditioning",
  "Hair included",
  "Take-down help",
  "Trim",
  "Gold cuffs / beads",
] as const;

const hairLengthOptions = [
  "Short / above shoulders",
  "Shoulder length",
  "Mid-back",
  "Waist length",
  "Not sure",
] as const;

const hairConditionOptions = [
  "Freshly washed",
  "Needs wash",
  "Detangled",
  "Needs detangling",
  "Sensitive scalp",
  "Recent color / chemical service",
] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  service: z.string().min(1, "Select a service"),
  style: z.string().max(120).optional(),
  preferred_date: z.string().min(1, "Pick a date"),
  preferred_time: z.string().min(1, "Pick a time"),
  hair_length: z.string().optional(),
  hair_condition: z.string().optional(),
  add_ons: z.array(z.string()).optional(),
  inspiration: z.string().max(300).optional(),
  notes: z.string().max(800).optional(),
  policyAgreed: z
    .boolean()
    .refine((value) => value === true, "Please agree to the booking policy"),
});

type BookingConfirmation = {
  status: "sent" | "local";
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string;
  time: string;
};

function BookingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: search.style ?? "",
    style: "",
    preferred_date: "",
    preferred_time: "",
    hair_length: "",
    hair_condition: "",
    add_ons: [] as string[],
    inspiration: "",
    notes: "",
    policyAgreed: false,
  });

  const selectedStyle = useMemo(
    () => styles.find((style) => style.id === form.service) ?? null,
    [form.service],
  );

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleAddOn = (addOn: string) => {
    setForm((current) => {
      const exists = current.add_ons.includes(addOn);
      return {
        ...current,
        add_ons: exists
          ? current.add_ons.filter((item) => item !== addOn)
          : [...current.add_ons, addOn],
      };
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = formSchema.safeParse(form);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    const chosenStyle = styles.find((style) => style.id === parsed.data.service);

    if (!chosenStyle) {
      toast.error("Please choose a valid service.");
      return;
    }

    const detailedNotes = [
      parsed.data.style ? `Style detail: ${parsed.data.style}` : "",
      parsed.data.hair_length ? `Hair length: ${parsed.data.hair_length}` : "",
      parsed.data.hair_condition ? `Hair condition: ${parsed.data.hair_condition}` : "",
      parsed.data.add_ons?.length ? `Requested add-ons: ${parsed.data.add_ons.join(", ")}` : "",
      parsed.data.inspiration ? `Inspiration: ${parsed.data.inspiration}` : "",
      parsed.data.notes ? `Client notes: ${parsed.data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        style: parsed.data.style || null,
        preferred_date: parsed.data.preferred_date,
        preferred_time: parsed.data.preferred_time,
        notes: detailedNotes || null,
      });

      if (error) {
        throw error;
      }

      setConfirmation({
        status: "sent",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        serviceName: chosenStyle.name,
        servicePrice: chosenStyle.price,
        serviceDuration: chosenStyle.duration,
        date: parsed.data.preferred_date,
        time: parsed.data.preferred_time,
      });

      toast.success("Booking received — we'll confirm shortly!");
    } catch (error) {
      console.error("Booking submit failed:", error);

      const fallbackBooking = {
        ...parsed.data,
        serviceName: chosenStyle.name,
        servicePrice: chosenStyle.price,
        serviceDuration: chosenStyle.duration,
        receivedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "rootedbeauty-last-booking",
          JSON.stringify(fallbackBooking),
        );
      }

      setConfirmation({
        status: "local",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        serviceName: chosenStyle.name,
        servicePrice: chosenStyle.price,
        serviceDuration: chosenStyle.duration,
        date: parsed.data.preferred_date,
        time: parsed.data.preferred_time,
      });

      toast.warning("Booking saved locally. Connect Supabase to receive live requests.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="bg-gradient-noir">
        <section className="container mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-card/70 shadow-gold">
            <CheckCircle2 className="h-11 w-11 text-gold" />
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">
            {confirmation.status === "sent" ? "Request Received" : "Demo Request Saved"}
          </p>

          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            {confirmation.status === "sent"
              ? "Your seat is almost reserved."
              : "Your request is saved locally."}
          </h1>

          <p className="mt-5 max-w-xl text-muted-foreground">
            {confirmation.status === "sent"
              ? "Thank you for booking with Rooted Beauty. We’ll review your request and respond within 24 hours with confirmation, prep tips, and next steps."
              : "The form is working visually, but Supabase still needs to be connected for real live booking submissions."}
          </p>

          <div className="mt-10 w-full rounded-3xl border border-border/60 bg-card/50 p-6 text-left shadow-luxe backdrop-blur-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <SummaryItem label="Client" value={confirmation.name} />
              <SummaryItem label="Contact" value={confirmation.phone} />
              <SummaryItem label="Email" value={confirmation.email} className="sm:col-span-2" />
              <SummaryItem label="Service" value={confirmation.serviceName} />
              <SummaryItem label="Starting Price" value={confirmation.servicePrice} />
              <SummaryItem label="Date" value={confirmation.date} />
              <SummaryItem label="Time" value={confirmation.time} />
              <SummaryItem label="Duration" value={confirmation.serviceDuration} />
              <SummaryItem label="Next Step" value="Confirmation text/email within 24 hours" />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="luxe" size="lg" onClick={() => navigate({ to: "/" })}>
              Back to Home
            </Button>
            <Button
              variant="glam"
              size="lg"
              onClick={() => {
                setConfirmation(null);
                setForm((current) => ({
                  ...current,
                  preferred_date: "",
                  preferred_time: "",
                  style: "",
                  notes: "",
                  inspiration: "",
                  add_ons: [],
                  policyAgreed: false,
                }));
              }}
            >
              Book Another
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-noir">
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Reserve</p>

            <h1 className="mt-3 font-display text-5xl sm:text-6xl">
              Book your <span className="text-gradient-glam">seat</span>
            </h1>

            <p className="mt-6 text-muted-foreground">
              Choose your service, share your hair details, and request your preferred date.
              We’ll respond with confirmation, prep notes, and next steps.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <Detail title="Deposit" body="A 30% deposit secures your slot after approval." />
              <Detail title="Cancellation" body="Free cancellation up to 48 hours before." />
              <Detail title="Late Policy" body="15-minute grace period before rescheduling." />
              <Detail title="Privacy" body="Exact address is provided after booking confirmation." />
            </div>

            <SelectedServiceCard style={selectedStyle} />
          </aside>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border/60 bg-card/50 p-5 shadow-luxe backdrop-blur-sm sm:p-8"
          >
            <BookingStep
              number="01"
              title="Choose your service"
              description="Select the look you want. Prices and timing are shown before you submit."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {styles.map((style) => {
                const active = form.service === style.id;

                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => update("service", style.id)}
                    className={cn(
                      "group overflow-hidden rounded-2xl border bg-background/35 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-gold",
                      active
                        ? "border-gold shadow-gold"
                        : "border-border/60",
                    )}
                  >
                    <div className="flex gap-4 p-3">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="h-24 w-20 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
                          {style.category}
                        </div>
                        <h3 className="mt-1 font-display text-xl leading-tight">{style.name}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {style.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs">
                          <span className="text-gradient-gold font-display text-base">
                            {style.price}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3 text-gold" />
                            {style.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 h-px bg-border/60" />

            <BookingStep
              number="02"
              title="Client details"
              description="Tell us who the appointment is for and how to confirm it."
              className="mt-10"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  maxLength={80}
                  placeholder="Your full name"
                />
              </Field>

              <Field label="Phone" required>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                  maxLength={30}
                  placeholder="Best number to text"
                />
              </Field>

              <Field label="Email" required className="sm:col-span-2">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  maxLength={255}
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <div className="mt-10 h-px bg-border/60" />

            <BookingStep
              number="03"
              title="Appointment request"
              description="Pick your preferred date and time. Final availability is confirmed by Rooted Beauty."
              className="mt-10"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Service" required>
                <Select value={form.service} onValueChange={(value) => update("service", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Style detail">
                <Input
                  value={form.style}
                  onChange={(e) => update("style", e.target.value)}
                  placeholder="Knotless, mid-back, side part..."
                  maxLength={120}
                />
              </Field>

              <Field label="Preferred date" required>
                <Input
                  type="date"
                  min={today}
                  value={form.preferred_date}
                  onChange={(e) => update("preferred_date", e.target.value)}
                  required
                />
              </Field>

              <Field label="Preferred time" required>
                <Select
                  value={form.preferred_time}
                  onValueChange={(value) => update("preferred_time", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="mt-10 h-px bg-border/60" />

            <BookingStep
              number="04"
              title="Hair details"
              description="These details help us prepare the right timing, products, and styling plan."
              className="mt-10"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Hair length">
                <Select
                  value={form.hair_length}
                  onValueChange={(value) => update("hair_length", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose length" />
                  </SelectTrigger>
                  <SelectContent>
                    {hairLengthOptions.map((length) => (
                      <SelectItem key={length} value={length}>
                        {length}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Hair condition">
                <Select
                  value={form.hair_condition}
                  onValueChange={(value) => update("hair_condition", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {hairConditionOptions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Inspiration photo or link" className="sm:col-span-2">
                <div className="relative">
                  <ImagePlus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <Input
                    value={form.inspiration}
                    onChange={(e) => update("inspiration", e.target.value)}
                    placeholder="Paste image link, Instagram link, or describe the look"
                    maxLength={300}
                    className="pl-10"
                  />
                </div>
              </Field>

              <Field label="Requested add-ons" className="sm:col-span-2">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {addOnOptions.map((addOn) => {
                    const active = form.add_ons.includes(addOn);

                    return (
                      <button
                        key={addOn}
                        type="button"
                        onClick={() => toggleAddOn(addOn)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300",
                          active
                            ? "border-gold bg-gold/10 text-gold shadow-gold"
                            : "border-border/60 bg-background/30 text-muted-foreground hover:border-gold/50 hover:text-gold",
                        )}
                      >
                        {addOn}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Notes" className="sm:col-span-2">
                <Textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={4}
                  maxLength={800}
                  placeholder="Allergies, scalp sensitivity, special requests, event details..."
                />
              </Field>
            </div>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-background/35 p-5">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-2xl">Booking policy</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• A 30% deposit secures your appointment after approval.</li>
                    <li>• Free cancellation up to 48 hours before your appointment.</li>
                    <li>• There is a 15-minute grace period for late arrivals.</li>
                    <li>• Exact address is provided after confirmation for privacy.</li>
                    <li>• Arrive detangled unless detangling or take-down is added.</li>
                  </ul>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={form.policyAgreed}
                      onChange={(e) => update("policyAgreed", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gold/50 accent-pink"
                    />
                    <span className="text-muted-foreground">
                      I understand the booking, deposit, cancellation, late arrival,
                      and prep policy.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="glam"
              size="xl"
              className="mt-8 w-full"
              disabled={submitting}
            >
              <Sparkles />
              {submitting ? "Reserving..." : "Reserve My Seat"}
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              This request does not guarantee the appointment until Rooted Beauty confirms it.
            </p>
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
        {label}
        {required && <span className="ml-1 text-pink">*</span>}
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

function BookingStep({
  number,
  title,
  description,
  className = "",
}: {
  number: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-background/50 font-display text-lg text-gold">
        {number}
      </div>
      <div>
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function SelectedServiceCard({ style }: { style: (typeof styles)[number] | null }) {
  if (!style) {
    return (
      <div className="mt-10 rounded-3xl border border-border/60 bg-card/40 p-6 shadow-luxe">
        <div className="flex items-center gap-3 text-gold">
          <Scissors className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.3em]">Selected Service</span>
        </div>
        <h2 className="mt-4 font-display text-3xl">Choose your crown</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Pick a service to see price, timing, and booking details before submitting.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-gold/30 bg-card/50 shadow-luxe">
      <img src={style.image} alt={style.name} className="h-64 w-full object-cover" />

      <div className="p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">
          Selected Service
        </div>
        <h2 className="mt-2 font-display text-3xl">{style.name}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{style.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/60 bg-background/35 p-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Starting At
            </div>
            <div className="mt-1 font-display text-2xl text-gradient-gold">
              {style.price}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/35 p-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Duration
            </div>
            <div className="mt-1 flex items-center gap-2 font-display text-2xl">
              <Clock className="h-4 w-4 text-gold" />
              {style.duration}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-muted-foreground">
          A 30% deposit is requested after your appointment is approved and confirmed.
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-background/35 p-4", className)}>
      <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}
