import { createFileRoute } from "@tanstack/react-router";
import { type TouchEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Home,
  LockKeyhole,
  Scissors,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import styleBraids from "@/assets/style-braids.jpg";
import styleBoxBraids from "@/assets/style-box-braids.jpg";
import styleStraight from "@/assets/style-straight.jpg";
import styleWavy from "@/assets/style-wavy.jpg";
import styleLocs from "@/assets/style-locs.jpg";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Secure Booking — Rooted Beauty" },
      {
        name: "description",
        content:
          "Secure a Rooted Beauty appointment through a guided booking and deposit flow.",
      },
    ],
  }),
  component: BookingPage,
});

type ServiceOption = {
  id: string;
  category: string;
  name: string;
  description: string;
  priceLabel: string;
  durationLabel: string;
  basePriceCents: number;
  image: string;
};

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  style: string;
  preferred_date: string;
  preferred_time: string;
  hair_length: string;
  hair_condition: string;
  add_ons: string[];
  notes: string;
  policyAgreed: boolean;
};

const services: ServiceOption[] = [
  {
    id: "braids",
    category: "Braids",
    name: "Goddess Braids",
    description: "Knotless and goddess braid techniques with a soft luxury finish.",
    priceLabel: "from $220",
    durationLabel: "5–7 hrs",
    basePriceCents: 22000,
    image: styleBraids,
  },
  {
    id: "box-braids",
    category: "Braids",
    name: "Box Braids",
    description: "Classic box braids in any length with a clean, finished look.",
    priceLabel: "from $260",
    durationLabel: "6–8 hrs",
    basePriceCents: 26000,
    image: styleBoxBraids,
  },
  {
    id: "straight",
    category: "Silk Press",
    name: "Silk Press",
    description: "Healthy heat silk press with shine, movement, and polish.",
    priceLabel: "from $120",
    durationLabel: "2–3 hrs",
    basePriceCents: 12000,
    image: styleStraight,
  },
  {
    id: "wavy",
    category: "Waves",
    name: "Hollywood Waves",
    description: "Soft glam waves for events, photos, and elevated occasions.",
    priceLabel: "from $150",
    durationLabel: "2 hrs",
    basePriceCents: 15000,
    image: styleWavy,
  },
  {
    id: "locs",
    category: "Locs",
    name: "Luxury Locs",
    description: "Loc maintenance, retwists, styling, and luxury loc care.",
    priceLabel: "from $180",
    durationLabel: "3–5 hrs",
    basePriceCents: 18000,
    image: styleLocs,
  },
  {
    id: "event-glam",
    category: "Event Glam",
    name: "Event Glam",
    description: "Special event styling for camera-ready hair and polished looks.",
    priceLabel: "from $200",
    durationLabel: "1.5–3 hrs",
    basePriceCents: 20000,
    image: styleWavy,
  },
  {
    id: "bridal",
    category: "Bridal",
    name: "Bridal Hair",
    description: "Trial and day-of bridal styling with a timeless finish.",
    priceLabel: "from $350",
    durationLabel: "3–4 hrs",
    basePriceCents: 35000,
    image: styleStraight,
  },
  {
    id: "protective",
    category: "Protective",
    name: "Protective Styles",
    description: "Low-tension protective styling focused on healthy hair.",
    priceLabel: "from $180",
    durationLabel: "4–6 hrs",
    basePriceCents: 18000,
    image: styleBraids,
  },
];

const steps = [
  { label: "Service", icon: Scissors },
  { label: "Client", icon: UserRound },
  { label: "Schedule", icon: CalendarDays },
  { label: "Hair", icon: Sparkles },
  { label: "Secure", icon: ShieldCheck },
];

const timeOptions = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];

const hairLengths = [
  "Ear length",
  "Shoulder length",
  "Mid-back",
  "Waist length",
  "Extra long",
];

const hairConditions = [
  "Detangled",
  "Natural / stretched",
  "Blow-dried",
  "Previously styled",
  "Needs take-down",
];

const addOnOptions = [
  "Scalp therapy",
  "Deep conditioning",
  "Hair included",
  "Take-down help",
  "Trim",
  "Gold cuffs / beads",
];

function BookingPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [inspirationFile, setInspirationFile] = useState<File | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );

  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    email: "",
    service: "",
    style: "",
    preferred_date: "",
    preferred_time: "",
    hair_length: "",
    hair_condition: "",
    add_ons: [],
    notes: "",
    policyAgreed: false,
  });

  const selectedService = useMemo(
    () => services.find((service) => service.id === form.service) ?? null,
    [form.service],
  );

  const depositAmount = selectedService
    ? Math.round(selectedService.basePriceCents * 0.3) / 100
    : null;

  const minDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  function updateField<K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleAddOn(value: string) {
    setForm((current) => ({
      ...current,
      add_ons: current.add_ons.includes(value)
        ? current.add_ons.filter((item) => item !== value)
        : [...current.add_ons, value],
    }));
  }

  function validateStep(targetStep: number) {
    if (targetStep === 0 && !form.service) {
      toast.error("Choose a service first.");
      return false;
    }

    if (targetStep === 1) {
      if (!form.name.trim()) {
        toast.error("Enter the client name.");
        return false;
      }

      if (!form.phone.trim()) {
        toast.error("Enter the phone number.");
        return false;
      }

      if (!form.email.trim()) {
        toast.error("Enter the email address.");
        return false;
      }
    }

    if (targetStep === 2) {
      if (!form.preferred_date) {
        toast.error("Choose a preferred date.");
        return false;
      }

      if (!form.preferred_time) {
        toast.error("Choose a preferred time.");
        return false;
      }
    }

    if (targetStep === 4 && !form.policyAgreed) {
      toast.error("Agree to the booking policy before securing the appointment.");
      return false;
    }

    return true;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function cancelBooking() {
    const confirmed = window.confirm("Cancel this booking and return to the site?");

    if (confirmed) {
      window.location.href = "/";
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];

    if (!touch) return;

    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!touchStart) return;

    const touch = event.changedTouches[0];

    if (!touch) return;

    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    setTouchStart(null);

    const horizontal = Math.abs(deltaX);
    const vertical = Math.abs(deltaY);

    if (horizontal < 80) return;
    if (horizontal < vertical * 1.25) return;

    if (deltaX < 0 && step < steps.length - 1) {
      nextStep();
    }

    if (deltaX > 0 && step > 0) {
      previousStep();
    }
  }

  async function secureBooking() {
    if (!validateStep(4)) return;

    if (!selectedService) {
      toast.error("Choose a service before payment.");
      return;
    }

    setSubmitting(true);

    try {
      const detailedNotes = [
        form.style ? `Style detail: ${form.style}` : "",
        form.hair_length ? `Hair length: ${form.hair_length}` : "",
        form.hair_condition ? `Hair condition: ${form.hair_condition}` : "",
        form.add_ons.length ? `Requested add-ons: ${form.add_ons.join(", ")}` : "",
        inspirationFile ? `Inspiration image selected: ${inspirationFile.name}` : "",
        form.notes ? `Client notes: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch(
        "https://phzantrwicmjmwqjrmrs.supabase.co/functions/v1/create-booking-authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            service: form.service,
            style: form.style.trim() || null,
            preferred_date: form.preferred_date,
            preferred_time: form.preferred_time,
            hair_length: form.hair_length || null,
            hair_condition: form.hair_condition || null,
            add_ons: form.add_ons,
            notes: detailedNotes || null,
            inspiration_image_path: null,
            policy_agreed: form.policyAgreed,
          }),
        },
      );

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            `Could not open secure payment. Status ${response.status}.`,
        );
      }

      if (!data?.checkout_url) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      toast.success("Opening secure Stripe checkout...");
      window.location.href = data.checkout_url;
    } catch (error) {
      console.error("Secure booking failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Could not open secure payment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="min-h-screen bg-gradient-noir text-foreground"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <section className="border-b border-border/50 bg-black/70 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="font-display text-2xl"
          >
            Rooted<span className="text-gold">Beauty</span>
          </button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={cancelBooking}>
              <X className="h-4 w-4" />
              Cancel
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Home className="h-4 w-4" />
              View Site
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex min-h-[calc(100vh-73px)] items-center px-5 py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 rounded-3xl border border-border/60 bg-card/40 p-4 shadow-luxe backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const active = index === step;
                const done = index < step;

                return (
                  <div
                    key={item.label}
                    className={[
                      "flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-3 transition",
                      active ? "bg-gold/10" : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                        active
                          ? "border-gold text-gold"
                          : done
                            ? "border-pink/70 text-pink"
                            : "border-border/70 text-muted-foreground",
                      ].join(" ")}
                    >
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>

                    <div className="hidden min-w-0 sm:block">
                      <p className="truncate text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        Step {index + 1}
                      </p>
                      <p
                        className={[
                          "truncate text-sm font-medium",
                          active ? "text-gold" : "text-foreground",
                        ].join(" ")}
                      >
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/60 shadow-luxe backdrop-blur">
            <div className="grid min-h-[580px] lg:grid-cols-[0.9fr_1.15fr]">
              <aside className="relative hidden overflow-hidden border-r border-border/60 lg:block">
                <div className="absolute inset-0">
                  <img
                    src={selectedService?.image ?? styleBraids}
                    alt={selectedService?.name ?? "Rooted Beauty"}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                </div>

                <div className="relative flex h-full flex-col justify-end p-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-gold">
                    Secure Booking
                  </p>

                  <h1 className="mt-4 font-display text-6xl leading-none">
                    Book your <span className="text-gradient-glam">seat</span>
                  </h1>

                  <p className="mt-5 text-muted-foreground">
                    One focused step at a time. Swipe left or tap continue to move forward.
                  </p>

                  <div className="mt-8 grid gap-3">
                    <QuickInfo title="Deposit" body="30% deposit authorization through Stripe." />
                    <QuickInfo title="Approval" body="Owner reviews before accepting the deposit." />
                    <QuickInfo title="Confirmation" body="Client receives confirmation after approval." />
                  </div>
                </div>
              </aside>

              <section className="p-5 sm:p-8">
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-gold">
                    {String(step + 1).padStart(2, "0")} / 05
                  </p>

                  <h2 className="mt-3 font-display text-5xl leading-none">
                    {step === 0 && "Choose your service"}
                    {step === 1 && "Client details"}
                    {step === 2 && "Date & time"}
                    {step === 3 && "Hair details"}
                    {step === 4 && "Review & secure"}
                  </h2>

                  <p className="mt-4 max-w-2xl text-muted-foreground">
                    {step === 0 && "Pick the service you want. Pricing and timing are shown before payment."}
                    {step === 1 && "Add the client information Rooted Beauty will use for confirmation."}
                    {step === 2 && "Choose your preferred open date and time. Blocked dates are rejected before checkout."}
                    {step === 3 && "Share hair details so the owner can prepare properly."}
                    {step === 4 && "Review everything, accept the policy, and open secure Stripe checkout."}
                  </p>
                </div>

                {step === 0 && (
                  <div className="grid max-h-[430px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
                    {services.map((service) => {
                      const active = form.service === service.id;

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => updateField("service", service.id)}
                          className={[
                            "rounded-3xl border p-3 text-left transition",
                            active
                              ? "border-gold bg-gold/10"
                              : "border-border/60 bg-background/30 hover:border-gold/50",
                          ].join(" ")}
                        >
                          <div className="grid grid-cols-[88px_1fr] gap-4">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-24 w-full rounded-2xl object-cover"
                            />

                            <div>
                              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
                                {service.category}
                              </p>
                              <h3 className="mt-1 font-display text-2xl leading-none">
                                {service.name}
                              </h3>
                              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                                {service.description}
                              </p>

                              <div className="mt-3 flex items-center justify-between gap-2">
                                <p className="font-display text-xl text-gold">
                                  {service.priceLabel}
                                </p>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock3 className="h-3 w-3 text-gold" />
                                  {service.durationLabel}
                                </p>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-5">
                    <Field label="Full name *">
                      <Input
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="Client full name"
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone *">
                        <Input
                          value={form.phone}
                          onChange={(event) => updateField("phone", event.target.value)}
                          placeholder="4706984059"
                        />
                      </Field>

                      <Field label="Email *">
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          placeholder="client@email.com"
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-5">
                    <div className="rounded-3xl border border-border/60 bg-background/30 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">
                        Selected Service
                      </p>
                      <h3 className="mt-2 font-display text-3xl">
                        {selectedService?.name ?? "No service selected"}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {selectedService
                          ? `${selectedService.priceLabel} • ${selectedService.durationLabel}`
                          : "Go back and choose a service."}
                      </p>
                    </div>

                    <Field label="Style detail">
                      <Input
                        value={form.style}
                        onChange={(event) => updateField("style", event.target.value)}
                        placeholder="Knotless, mid-back, side part..."
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Preferred date *">
                        <Input
                          type="date"
                          min={minDate}
                          value={form.preferred_date}
                          onChange={(event) =>
                            updateField("preferred_date", event.target.value)
                          }
                        />
                      </Field>

                      <Field label="Preferred time *">
                        <select
                          value={form.preferred_time}
                          onChange={(event) =>
                            updateField("preferred_time", event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground outline-none"
                        >
                          <option value="">Pick a time</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Hair length">
                        <select
                          value={form.hair_length}
                          onChange={(event) =>
                            updateField("hair_length", event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground outline-none"
                        >
                          <option value="">Choose length</option>
                          {hairLengths.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Hair condition">
                        <select
                          value={form.hair_condition}
                          onChange={(event) =>
                            updateField("hair_condition", event.target.value)
                          }
                          className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground outline-none"
                        >
                          <option value="">Choose condition</option>
                          {hairConditions.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <label className="cursor-pointer rounded-3xl border border-dashed border-gold/50 bg-gold/5 p-5 transition hover:bg-gold/10">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black">
                          <Upload className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-display text-2xl">
                            Upload inspiration image
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Add a photo so Rooted Beauty can see the look.
                          </p>
                        </div>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          setInspirationFile(event.target.files?.[0] ?? null);
                        }}
                      />

                      {inspirationFile && (
                        <p className="mt-4 rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm">
                          Selected: {inspirationFile.name}
                        </p>
                      )}
                    </label>

                    <div>
                      <Label className="mb-3 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Requested add-ons
                      </Label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {addOnOptions.map((item) => {
                          const active = form.add_ons.includes(item);

                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleAddOn(item)}
                              className={[
                                "rounded-2xl border px-4 py-3 text-sm transition",
                                active
                                  ? "border-gold bg-gold/10 text-gold"
                                  : "border-border/60 bg-background/30 hover:border-gold/40",
                              ].join(" ")}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Field label="Notes">
                      <Textarea
                        rows={4}
                        value={form.notes}
                        onChange={(event) => updateField("notes", event.target.value)}
                        placeholder="Allergies, scalp sensitivity, special requests..."
                      />
                    </Field>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-5">
                    <div className="rounded-3xl border border-border/60 bg-background/30 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">
                        Booking Summary
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <SummaryItem label="Client" value={form.name || "—"} />
                        <SummaryItem label="Phone" value={form.phone || "—"} />
                        <SummaryItem label="Email" value={form.email || "—"} />
                        <SummaryItem
                          label="Service"
                          value={selectedService?.name ?? "—"}
                        />
                        <SummaryItem
                          label="Date"
                          value={form.preferred_date || "—"}
                        />
                        <SummaryItem
                          label="Time"
                          value={form.preferred_time || "—"}
                        />
                      </div>
                    </div>

                    <div className="rounded-3xl border border-gold/40 bg-gold/5 p-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full border border-gold/50 p-3 text-gold">
                          <LockKeyhole className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-display text-3xl">
                            Secure booking
                          </h3>

                          <p className="mt-3 text-sm text-muted-foreground">
                            A 30% deposit authorization is collected through Stripe.
                            The owner reviews the request before accepting the deposit
                            and confirming the appointment.
                          </p>

                          <div className="mt-5 rounded-2xl border border-border/60 bg-background/40 p-4">
                            <p className="text-xs uppercase tracking-[0.24em] text-gold">
                              Deposit authorization
                            </p>

                            <p className="mt-2 font-display text-5xl">
                              {depositAmount !== null ? `$${depositAmount}` : "—"}
                            </p>
                          </div>

                          <label className="mt-5 flex items-start gap-3 text-sm">
                            <input
                              type="checkbox"
                              checked={form.policyAgreed}
                              onChange={(event) =>
                                updateField("policyAgreed", event.target.checked)
                              }
                              className="mt-1 h-4 w-4 rounded border-border"
                            />

                            <span>
                              I understand the deposit, cancellation, late arrival,
                              privacy, and appointment prep policy.
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/60 pt-5">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={previousStep}
                    disabled={step === 0}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>

                  <div className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Swipe or tap
                  </div>

                  {step < steps.length - 1 ? (
                    <Button variant="glam" size="lg" onClick={nextStep}>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="glam"
                      size="lg"
                      onClick={secureBooking}
                      disabled={submitting}
                    >
                      <CreditCard className="h-4 w-4" />
                      {submitting ? "Opening Stripe..." : "Book & Pay"}
                    </Button>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function QuickInfo({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-l-2 border-gold pl-4">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">{label}</p>
      <p className="mt-2 text-sm text-foreground">{value}</p>
    </div>
  );
}

