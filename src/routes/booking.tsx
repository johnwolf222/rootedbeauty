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
      className="relative min-h-screen overflow-hidden bg-black text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[280px] w-[280px] rounded-full bg-orange-400/15 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="font-display text-2xl text-white"
          >
            Rooted<span className="text-yellow-400">Beauty</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/10"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/10"
            >
              <Home className="h-4 w-4" />
              View Site
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center px-4 py-8">
        <div className="w-full">
          {/* progress */}
          <div className="mb-6 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
                Step {step + 1} of {steps.length}
              </p>

              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Swipe or tap
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    index <= step
                      ? "bg-[linear-gradient(90deg,#ff4fa3_0%,#ff8a4d_100%)]"
                      : "bg-white/10",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* main card */}
          <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-5 shadow-[0_20px_80px_rgba(255,60,140,0.12)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,88,160,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,170,80,0.10),transparent_28%)]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mb-8 flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-pink-300/30 bg-[linear-gradient(180deg,rgba(255,82,162,0.22),rgba(255,148,74,0.14))] text-pink-200 shadow-[0_0_24px_rgba(255,82,162,0.18)]">
                  <CurrentIcon className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="font-display text-5xl leading-none text-white sm:text-6xl">
                    {steps[step].title}
                  </h1>
                  <p className="mt-4 max-w-xl text-white/65">{steps[step].subtitle}</p>
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
                          "rounded-[26px] border p-5 text-left transition-all duration-300",
                          service === item
                            ? "border-pink-300/50 bg-[linear-gradient(135deg,rgba(255,78,161,0.20),rgba(255,152,86,0.14))] shadow-[0_8px_30px_rgba(255,82,162,0.16)]"
                            : "border-white/10 bg-white/[0.04] hover:border-pink-300/30 hover:bg-white/[0.07]",
                        ].join(" ")}
                      >
                        <p className="font-display text-3xl text-white">{item}</p>
                        <p className="mt-2 text-sm text-white/55">
                          Tap to select this service.
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-4">
                    <input
                      className={fieldClass}
                      placeholder="Full name"
                    />
                    <input
                      className={fieldClass}
                      placeholder="Phone number"
                    />
                    <input
                      className={fieldClass}
                      placeholder="Email address"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-5">
                    <input
                      type="date"
                      className={fieldClass}
                    />

                    <div className="grid gap-3 sm:grid-cols-3">
                      {times.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setTime(item)}
                          className={[
                            "rounded-[20px] border px-4 py-4 text-sm transition-all duration-300",
                            time === item
                              ? "border-pink-300/50 bg-[linear-gradient(135deg,rgba(255,78,161,0.18),rgba(255,152,86,0.12))] text-white shadow-[0_8px_24px_rgba(255,82,162,0.12)]"
                              : "border-white/10 bg-white/[0.04] text-white/80 hover:border-pink-300/30 hover:bg-white/[0.08]",
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
                    <select className={fieldClass}>
                      <option>Choose hair length</option>
                      <option>Shoulder length</option>
                      <option>Mid-back</option>
                      <option>Waist length</option>
                    </select>

                    <label className="rounded-[28px] border border-dashed border-pink-300/35 bg-[linear-gradient(135deg,rgba(255,82,162,0.10),rgba(255,152,86,0.06))] p-6 transition hover:bg-[linear-gradient(135deg,rgba(255,82,162,0.15),rgba(255,152,86,0.08))]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff4fa3_0%,#ff9b54_100%)] text-black">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-display text-3xl text-white">Upload inspiration</p>
                          <p className="text-sm text-white/60">
                            Add a photo of the look you want.
                          </p>
                        </div>
                      </div>
                      <input type="file" className="hidden" />
                    </label>

                    <textarea
                      className={`${fieldClass} min-h-28 resize-none p-4`}
                      placeholder="Notes, allergies, scalp sensitivity, special requests..."
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-5">
                    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-pink-300">
                        Booking Summary
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Summary label="Service" value={service || "Not selected"} />
                        <Summary label="Time" value={time || "Not selected"} />
                        <Summary label="Deposit" value="$66 authorization" />
                        <Summary label="Status" value="Owner approval required" />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-[22px] border border-pink-300/20 bg-[linear-gradient(135deg,rgba(255,78,161,0.10),rgba(255,152,86,0.06))] p-4 text-sm text-white/80">
                      <input type="checkbox" className="mt-1" />
                      <span>
                        I understand the booking, deposit, cancellation, late arrival,
                        and prep policy.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/85 backdrop-blur-md transition hover:bg-white/[0.08] disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#ff4fa3_0%,#ff9b54_100%)] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(255,82,162,0.24)] transition hover:scale-[1.02]"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#ff4fa3_0%,#ff9b54_100%)] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(255,82,162,0.24)] transition hover:scale-[1.02]"
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

const fieldClass =
  "h-12 w-full rounded-[18px] border border-white/10 bg-white/[0.05] px-4 text-white placeholder:text-white/35 outline-none backdrop-blur-md transition focus:border-pink-300/45 focus:bg-white/[0.08]";

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-pink-300">{label}</p>
      <p className="mt-2 text-sm text-white/85">{value}</p>
    </div>
  );
}
