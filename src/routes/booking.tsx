import { createFileRoute } from "@tanstack/react-router";
import { type TouchEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CreditCard,
  Home,
  Scissors,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";

export const Route = createFileRoute("/booking-preview")({
  component: BookingPreviewPage,
});

const steps = [
  {
    title: "Choose Your Service",
    subtitle: "Select the style you want to book.",
    icon: Scissors,
  },
  {
    title: "Your Information",
    subtitle: "Add the client details for confirmation.",
    icon: UserRound,
  },
  {
    title: "Pick Date & Time",
    subtitle: "Choose an available appointment day and time.",
    icon: CalendarDays,
  },
  {
    title: "Hair Details",
    subtitle: "Tell us about your hair and upload inspiration.",
    icon: Sparkles,
  },
  {
    title: "Review & Pay",
    subtitle: "Secure the booking with a 30% deposit.",
    icon: CreditCard,
  },
];

const services = [
  "Goddess Braids",
  "Box Braids",
  "Silk Press",
  "Hollywood Waves",
  "Luxury Locs",
  "Protective Style",
];

const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

function BookingPreviewPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const CurrentIcon = steps[step].icon;

  function next() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function back() {
    setStep((current) => Math.max(current - 1, 0));
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

    if (Math.abs(deltaX) < 70) return;
    if (Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    if (deltaX < 0) next();
    if (deltaX > 0) back();
  }

  return (
    <main
      className="min-h-screen bg-gradient-noir text-foreground"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header className="border-b border-border/50 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="font-display text-2xl"
          >
            Rooted<span className="text-gold">Beauty</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm text-muted-foreground"
            >
              <Home className="h-4 w-4" />
              View Site
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center px-4 py-8">
        <div className="w-full">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Step {step + 1} of {steps.length}
              </p>

              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Swipe or tap
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    "h-2 rounded-full transition-all",
                    index <= step ? "bg-gradient-glam" : "bg-muted/60",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-luxe backdrop-blur sm:p-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-gold/50 bg-gold/10 text-gold">
                  <CurrentIcon className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="font-display text-5xl leading-none sm:text-6xl">
                    {steps[step].title}
                  </h1>
                  <p className="mt-4 text-muted-foreground">{steps[step].subtitle}</p>
                </div>
              </div>

              <div className="min-h-[320px]">
                {step === 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        className={[
                          "rounded-3xl border p-5 text-left transition",
                          service === item
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border/60 bg-background/40 hover:border-gold/50",
                        ].join(" ")}
                      >
                        <p className="font-display text-3xl">{item}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Tap to select this service.
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-4">
                    <input
                      className="h-12 rounded-2xl border border-border/60 bg-background px-4"
                      placeholder="Full name"
                    />
                    <input
                      className="h-12 rounded-2xl border border-border/60 bg-background px-4"
                      placeholder="Phone number"
                    />
                    <input
                      className="h-12 rounded-2xl border border-border/60 bg-background px-4"
                      placeholder="Email address"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-5">
                    <input
                      type="date"
                      className="h-12 rounded-2xl border border-border/60 bg-background px-4"
                    />

                    <div className="grid gap-3 sm:grid-cols-3">
                      {times.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setTime(item)}
                          className={[
                            "rounded-2xl border px-4 py-4 text-sm transition",
                            time === item
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border/60 bg-background/40 hover:border-gold/50",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-4">
                    <select className="h-12 rounded-2xl border border-border/60 bg-background px-4">
                      <option>Choose hair length</option>
                      <option>Shoulder length</option>
                      <option>Mid-back</option>
                      <option>Waist length</option>
                    </select>

                    <label className="rounded-3xl border border-dashed border-gold/50 bg-gold/5 p-6">
                      <div className="flex items-center gap-4">
                        <Upload className="h-7 w-7 text-gold" />
                        <div>
                          <p className="font-display text-3xl">Upload inspiration</p>
                          <p className="text-sm text-muted-foreground">
                            Add a photo of the look you want.
                          </p>
                        </div>
                      </div>
                      <input type="file" className="hidden" />
                    </label>

                    <textarea
                      className="min-h-28 rounded-2xl border border-border/60 bg-background p-4"
                      placeholder="Notes, allergies, scalp sensitivity, special requests..."
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-5">
                    <div className="rounded-3xl border border-border/60 bg-background/40 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-gold">
                        Booking Summary
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Summary label="Service" value={service || "Not selected"} />
                        <Summary label="Time" value={time || "Not selected"} />
                        <Summary label="Deposit" value="$66 authorization" />
                        <Summary label="Status" value="Owner approval required" />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/5 p-4 text-sm">
                      <input type="checkbox" className="mt-1" />
                      <span>
                        I understand the booking, deposit, cancellation, late arrival, and prep policy.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-3 text-sm disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-glam px-6 py-3 text-sm font-semibold text-black"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-glam px-6 py-3 text-sm font-semibold text-black"
                  >
                    <CreditCard className="h-4 w-4" />
                    Book & Pay
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{label}</p>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}
