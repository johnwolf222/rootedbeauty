import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Lock,
  LogOut,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/rooted-owner-control")({
  head: () => ({
    meta: [
      { title: "Owner Portal — Rooted Beauty" },
      {
        name: "description",
        content:
          "Private Rooted Beauty owner portal for blocking unavailable calendar dates and managing bookings.",
      },
    ],
  }),
  component: AdminPage,
});

type BlockedDate = {
  id: string;
  blocked_date: string;
  reason: string | null;
  created_at: string;
  updated_at: string;
};

type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  service_name: string | null;
  style: string | null;
  preferred_date: string;
  preferred_time: string;
  status: string;
  payment_status: string;
  booking_mode: string | null;
  booking_slot_id: string | null;
  hair_length: string | null;
  hair_condition: string | null;
  add_ons: string[] | null;
  notes: string | null;
  owner_notes: string | null;
  created_at: string;
};

const OWNER_CODE_STORAGE_KEY = "rooted_beauty_owner_access_code";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function AdminPage() {
  const [booting, setBooting] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [savingCalendar, setSavingCalendar] = useState(false);

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [draftBlockedDates, setDraftBlockedDates] = useState<string[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [viewMonth, setViewMonth] = useState(() => firstDayOfMonth(new Date()));

  const monthStartKey = useMemo(() => toDateKey(viewMonth), [viewMonth]);
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(viewMonth),
    [viewMonth],
  );

  const calendarDays = useMemo(() => buildCalendarDays(viewMonth), [viewMonth]);

  const blockedDateSet = useMemo(
    () => new Set(draftBlockedDates),
    [draftBlockedDates],
  );

  const bookedDateSet = useMemo(() => {
    return new Set(
      bookings
        .filter((booking) =>
          ["deposit_paid_confirmed", "confirmed", "completed"].includes(
            booking.status,
          ) || booking.payment_status === "paid",
        )
        .map((booking) => booking.preferred_date),
    );
  }, [bookings]);

  const stats = useMemo(() => {
    const pendingRequests = bookings.filter((booking) =>
      ["pending_review", "approved_awaiting_deposit"].includes(booking.status),
    ).length;

    const blockedThisMonth = draftBlockedDates.length;

    const confirmedBookings = bookings.filter((booking) =>
      ["deposit_paid_confirmed", "confirmed"].includes(booking.status) ||
      booking.payment_status === "paid",
    ).length;

    return {
      pendingRequests,
      blockedThisMonth,
      confirmedBookings,
    };
  }, [bookings, draftBlockedDates]);

  useEffect(() => {
    const savedCode = window.sessionStorage.getItem(OWNER_CODE_STORAGE_KEY);

    if (!savedCode) {
      setBooting(false);
      return;
    }

    setAccessCode(savedCode);
    verifyAndLoad(savedCode, true);
  }, []);

  useEffect(() => {
    const nextDraft = blockedDates
      .map((item) => item.blocked_date)
      .filter((date) => date.startsWith(monthStartKey.slice(0, 7)));

    setDraftBlockedDates(nextDraft);
  }, [blockedDates, monthStartKey]);

  async function ownerAction<T = any>(body: Record<string, unknown>) {
    const response = await fetch(
      "https://phzantrwicmjmwqjrmrs.supabase.co/functions/v1/owner-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
          `Owner admin request failed with status ${response.status}.`,
      );
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    return data as T;
  }

  async function verifyAndLoad(code: string, silent = false) {
    setUnlocking(!silent);
    setDataLoading(true);

    try {
      const data = await ownerAction<{
        success: boolean;
        blocked_dates: BlockedDate[];
        bookings: BookingRow[];
      }>({
        action: "dashboard",
        access_code: code,
      });

      setBlockedDates(data.blocked_dates ?? []);
      setBookings(data.bookings ?? []);
      setAccessCode(code);
      setUnlocked(true);
      window.sessionStorage.setItem(OWNER_CODE_STORAGE_KEY, code);

      if (!silent) {
        toast.success("Owner portal unlocked.");
      }
    } catch (error) {
      console.error("Unlock failed:", error);
      setUnlocked(false);
      setAccessCode("");
      window.sessionStorage.removeItem(OWNER_CODE_STORAGE_KEY);

      if (!silent) {
        toast.error(error instanceof Error ? error.message : "Invalid owner access code.");
      }
    } finally {
      setBooting(false);
      setUnlocking(false);
      setDataLoading(false);
    }
  }

  async function unlockPortal(e: FormEvent) {
    e.preventDefault();

    if (!codeInput.trim()) {
      toast.error("Enter the owner access code.");
      return;
    }

    await verifyAndLoad(codeInput.trim());
  }

  async function loadDashboard() {
    if (!accessCode) return;

    setDataLoading(true);

    try {
      const data = await ownerAction<{
        success: boolean;
        blocked_dates: BlockedDate[];
        bookings: BookingRow[];
      }>({
        action: "dashboard",
        access_code: accessCode,
      });

      setBlockedDates(data.blocked_dates ?? []);
      setBookings(data.bookings ?? []);
    } catch (error) {
      console.error("Dashboard load failed:", error);
      toast.error(error instanceof Error ? error.message : "Could not load dashboard.");
    } finally {
      setDataLoading(false);
    }
  }

  function lockPortal() {
    setUnlocked(false);
    setAccessCode("");
    setCodeInput("");
    setBlockedDates([]);
    setDraftBlockedDates([]);
    setBookings([]);
    window.sessionStorage.removeItem(OWNER_CODE_STORAGE_KEY);
    toast.success("Owner portal locked.");
  }

  function changeMonth(amount: number) {
    setViewMonth((current) => {
      return new Date(current.getFullYear(), current.getMonth() + amount, 1);
    });
  }

  function toggleBlockedDate(dateKey: string) {
    setDraftBlockedDates((current) => {
      if (current.includes(dateKey)) {
        return current.filter((date) => date !== dateKey);
      }

      return [...current, dateKey].sort();
    });
  }

  async function saveBlockedDates() {
    setSavingCalendar(true);

    try {
      const data = await ownerAction<{
        success: boolean;
        blocked_dates: BlockedDate[];
      }>({
        action: "save_blocked_dates_month",
        access_code: accessCode,
        month_start: monthStartKey,
        blocked_dates: draftBlockedDates,
      });

      setBlockedDates(data.blocked_dates ?? []);
      toast.success("Unavailable dates saved.");
    } catch (error) {
      console.error("Save blocked dates failed:", error);
      toast.error(error instanceof Error ? error.message : "Could not save calendar.");
    } finally {
      setSavingCalendar(false);
    }
  }

  async function updateBookingStatus(
    bookingId: string,
    action:
      | "capture_booking_deposit"
      | "release_booking_authorization"
      | "complete_booking",
  ) {
    try {
      await ownerAction({
        action,
        access_code: accessCode,
        booking_id: bookingId,
      });

      toast.success("Booking updated.");
      await loadDashboard();
    } catch (error) {
      console.error("Booking update failed:", error);
      toast.error(error instanceof Error ? error.message : "Could not update booking.");
    }
  }

  if (booting) {
    return (
      <AdminShell>
        <CenteredCard
          icon={<RefreshCw className="h-10 w-10 animate-spin text-gold" />}
          title="Opening owner portal"
          body="Checking whether this device already has owner access."
        />
      </AdminShell>
    );
  }

  if (!unlocked) {
    return (
      <AdminShell>
        <section className="mx-auto flex min-h-screen max-w-md items-center px-6 py-20">
          <div className="w-full rounded-3xl border border-border/60 bg-card/70 p-6 shadow-luxe backdrop-blur sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10">
                <KeyRound className="h-8 w-8 text-gold" />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
                Rooted Beauty
              </p>

              <h1 className="mt-3 font-display text-4xl">Owner Access</h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Enter the private owner code to unlock calendar control and booking requests.
              </p>
            </div>

            <form onSubmit={unlockPortal} className="space-y-5">
              <Field label="Owner access code">
                <Input
                  type="password"
                  value={codeInput}
                  onChange={(event) => setCodeInput(event.target.value)}
                  placeholder="Enter private code"
                  autoComplete="off"
                  required
                />
              </Field>

              <Button
                type="submit"
                variant="glam"
                size="xl"
                className="w-full"
                disabled={unlocking}
              >
                <Lock />
                {unlocking ? "Unlocking..." : "Unlock Owner Portal"}
              </Button>
            </form>
          </div>
        </section>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <section className="container mx-auto px-6 py-10">
        <div className="flex flex-col gap-6 border-b border-border/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Private Owner Portal
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">
              Calendar <span className="text-gradient-glam">Control</span>
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              All future dates are available by default. Tap the dates the owner is unavailable, then save.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="luxe" onClick={loadDashboard} disabled={dataLoading}>
              <RefreshCw className={dataLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button variant="outline" onClick={lockPortal}>
              <LogOut />
              Lock portal
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard
            title="Blocked this month"
            value={stats.blockedThisMonth}
            body="Dates clients cannot book."
          />
          <StatCard
            title="Pending review"
            value={stats.pendingRequests}
            body="Requests needing owner action."
          />
          <StatCard
            title="Confirmed"
            value={stats.confirmedBookings}
            body="Paid or confirmed appointments."
          />
        </div>

        <section className="mt-10 rounded-3xl border border-border/60 bg-card/50 p-5 shadow-luxe backdrop-blur sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-gold" />
              <div>
                <h2 className="font-display text-3xl">Unavailable Dates</h2>
                <p className="text-sm text-muted-foreground">
                  Tap a date to block it. Tap again to make it available.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="outline" size="sm" onClick={() => changeMonth(-1)}>
                <ChevronLeft />
                Previous
              </Button>

              <div className="min-w-44 text-center font-display text-2xl">
                {monthLabel}
              </div>

              <Button type="button" variant="outline" size="sm" onClick={() => changeMonth(1)}>
                Next
                <ChevronRight />
              </Button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {weekDays.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const isBlocked = blockedDateSet.has(day.dateKey);
              const isBooked = bookedDateSet.has(day.dateKey);
              const isPast = isPastDate(day.dateKey);
              const disabled = !day.isCurrentMonth || isPast || isBooked;

              return (
                <button
                  key={day.dateKey}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleBlockedDate(day.dateKey)}
                  className={[
                    "min-h-20 rounded-2xl border p-2 text-left transition-all sm:min-h-24",
                    !day.isCurrentMonth
                      ? "border-transparent opacity-20"
                      : "border-border/60 bg-background/40 hover:border-gold/60",
                    isBlocked ? "border-pink/70 bg-pink/15 text-pink" : "",
                    isBooked ? "border-gold/60 bg-gold/15 text-gold" : "",
                    isPast ? "cursor-not-allowed opacity-35" : "",
                  ].join(" ")}
                >
                  <div className="flex h-full flex-col justify-between">
                    <span className="font-display text-2xl">
                      {day.dayNumber}
                    </span>

                    {day.isCurrentMonth && (
                      <span className="text-[10px] uppercase tracking-[0.18em]">
                        {isBooked
                          ? "Booked"
                          : isBlocked
                            ? "Blocked"
                            : isPast
                              ? "Past"
                              : "Open"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Open dates are bookable by default. Only blocked or booked dates become unavailable.
            </p>

            <Button
              type="button"
              variant="glam"
              size="xl"
              onClick={saveBlockedDates}
              disabled={savingCalendar}
            >
              <CheckCircle2 />
              {savingCalendar ? "Saving calendar..." : "Save Unavailable Dates"}
            </Button>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-border/60 bg-card/50 p-5 shadow-luxe backdrop-blur sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl">Booking Requests</h2>
              <p className="text-sm text-muted-foreground">
                Client requests and paid bookings appear here.
              </p>
            </div>
            <ShieldCheck className="h-6 w-6 text-gold" />
          </div>

          <div className="mt-6 space-y-4">
            {bookings.length === 0 ? (
              <EmptyState title="No bookings yet" body="Client requests will appear here." />
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-border/60 bg-background/40 p-4"
                >
                  <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge status={booking.status}>{booking.status}</Badge>
                        <Badge status={booking.payment_status}>{booking.payment_status}</Badge>
                      </div>

                      <h3 className="mt-3 font-display text-2xl">{booking.name}</h3>

                      <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <p>Email: {booking.email}</p>
                        <p>Phone: {booking.phone}</p>
                        <p>Service: {booking.service_name ?? booking.service}</p>
                        <p>
                          Date: {formatReadableDate(booking.preferred_date)} at {booking.preferred_time}
                        </p>
                      </div>

                      {booking.style && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Style detail: {booking.style}
                        </p>
                      )}

                      {booking.notes && (
                        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border/60 bg-card/40 p-3 text-xs text-muted-foreground">
                          {booking.notes}
                        </pre>
                      )}
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div className="rounded-2xl border border-border/60 bg-card/30 p-4 text-sm text-muted-foreground">
                        <p>Booking ID:</p>
                        <p className="mt-1 break-all text-xs text-foreground">
                          {booking.id}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        <Button
                          type="button"
                          variant="gold"
                          size="sm"
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "capture_booking_deposit",
                            )
                          }
                          disabled={
                            booking.deposit_capture_status === "captured" ||
                            booking.status === "confirmed" ||
                            booking.status === "completed" ||
                            booking.status !== "authorized_pending_capture"
                          }
                        >
                          <CheckCircle2 />
                          Approve & Accept Deposit
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            updateBookingStatus(
                              booking.id,
                              "release_booking_authorization",
                            )
                          }
                          disabled={
                            booking.deposit_capture_status === "captured" ||
                            booking.deposit_capture_status === "released" ||
                            booking.status === "confirmed" ||
                            booking.status === "completed" ||
                            booking.status === "declined_released" ||
                            booking.status === "declined"
                          }
                        >
                          <XCircle />
                          Decline & Release Hold
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateBookingStatus(booking.id, "complete_booking")
                          }
                          disabled={
                            booking.status === "completed" ||
                            booking.status !== "confirmed"
                          }
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-gradient-noir text-foreground">{children}</main>;
}

function CenteredCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <section className="container mx-auto flex min-h-screen items-center justify-center px-6 py-20">
      <div className="max-w-lg rounded-3xl border border-border/60 bg-card/60 p-8 text-center shadow-luxe backdrop-blur">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10">
          {icon}
        </div>
        <h1 className="mt-6 font-display text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{body}</p>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function StatCard({
  title,
  value,
  body,
}: {
  title: string;
  value: number;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/50 p-5 shadow-luxe backdrop-blur">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{title}</p>
      <div className="mt-3 font-display text-5xl">{value}</div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-background/30 p-8 text-center">
      <p className="font-display text-2xl">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Badge({
  status,
  children,
}: {
  status: string;
  children: ReactNode;
}) {
  const normalized = status.toLowerCase();

  const className =
    normalized.includes("available") ||
    normalized.includes("paid") ||
    normalized.includes("confirmed") ||
    normalized.includes("approved")
      ? "border-gold/50 bg-gold/10 text-gold"
      : normalized.includes("declined") ||
          normalized.includes("cancelled") ||
          normalized.includes("blocked")
        ? "border-pink/50 bg-pink/10 text-pink"
        : "border-border/70 bg-muted/40 text-muted-foreground";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${className}`}
    >
      {children}
    </span>
  );
}

function firstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildCalendarDays(monthDate: Date) {
  const first = firstDayOfMonth(monthDate);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const days: Array<{
    dateKey: string;
    dayNumber: number;
    isCurrentMonth: boolean;
  }> = [];

  for (let index = 0; index < 42; index += 1) {
    const current = new Date(start);
    current.setDate(start.getDate() + index);

    days.push({
      dateKey: toDateKey(current),
      dayNumber: current.getDate(),
      isCurrentMonth: current.getMonth() === monthDate.getMonth(),
    });
  }

  return days;
}

function isPastDate(dateKey: string) {
  const today = new Date();
  const todayKey = toDateKey(today);

  return dateKey < todayKey;
}

function formatReadableDate(value: string) {
  if (!value) return "No date";

  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
