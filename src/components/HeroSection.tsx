"use client";

import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type SystemEvent = {
  id: string;
  label: string;
  detail: string;
  tone: "accent" | "muted" | "normal";
};

type TechChip = {
  label: string;
  Icon: (props: { className?: string }) => ReactElement;
};

const SYSTEM_EVENTS: Array<Omit<SystemEvent, "id">> = [
  { label: "GET /api/orders", detail: "-> 200 (84ms)", tone: "normal" },
  { label: "Worker processed job #1842", detail: "queue lag 1.2s", tone: "accent" },
  { label: "Cache hit (Redis)", detail: "hit ratio 97.8%", tone: "muted" },
  { label: "Queue stable", detail: "depth: 2", tone: "normal" },
  { label: "POST /api/webhooks", detail: "-> 202 (41ms)", tone: "normal" },
  { label: "Database write committed", detail: "p95 19ms", tone: "accent" },
  { label: "Retry budget unchanged", detail: "no backoff pressure", tone: "muted" },
  { label: "Autoscaler idle", detail: "2 warm replicas", tone: "normal" },
];

const TECH_CHIPS: TechChip[] = [
  { label: "APIs", Icon: ApiIcon },
  { label: "AWS", Icon: CloudIcon },
  { label: "Terraform", Icon: InfraIcon },
  { label: "Temporal", Icon: FlowIcon },
  { label: "CI/CD", Icon: PipelineIcon },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const initialFeed = useMemo(
    () =>
      SYSTEM_EVENTS.slice(0, 4).map((event, index) => ({
        ...event,
        id: `seed-${index}`,
      })),
    [],
  );
  const [feed, setFeed] = useState<SystemEvent[]>(initialFeed);
  const visibleFeed = reduceMotion ? initialFeed : feed;

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    let cursor = initialFeed.length;
    const interval = window.setInterval(() => {
      const template = SYSTEM_EVENTS[cursor % SYSTEM_EVENTS.length];
      const nextEvent: SystemEvent = {
        ...template,
        id: `event-${cursor}`,
      };

      setFeed((current) => [...current.slice(-4), nextEvent]);
      cursor += 1;
    }, 2200);

    return () => window.clearInterval(interval);
  }, [initialFeed, reduceMotion]);

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: 0.08,
      },
    },
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,transparent_35%,rgba(15,23,42,0.1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.08),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(168,85,247,0.08),transparent_24%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.04),transparent_42%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.78fr] lg:gap-10">
          <motion.div
            className="relative z-10 max-w-[40rem]"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)] shadow-[var(--shadow)]"
            >
              Backend engineer for durable cloud systems
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display"
            >
              I design and build backend platforms that stay reliable under
              real operational pressure.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              My work sits at the intersection of API engineering, AWS
              infrastructure, delivery automation, and workflow reliability.
              The goal is simple: ship systems that are easier to operate,
              scale, and trust.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow)] transition hover:bg-[var(--accent-strong)]"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                See selected work
              </motion.a>
              <motion.a
                href="/Munali_Shakya-CV.pdf"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-[var(--accent)]"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 min-h-[28rem] lg:min-h-[30rem]"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="absolute inset-0 rounded-[1.75rem] border border-[color:rgba(148,163,184,0.12)] bg-[var(--card)]/66 shadow-[var(--shadow)]" />

            <div className="relative flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(148,163,184,0.12)] bg-[var(--background)]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  System healthy
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                  Live signal
                </span>
              </div>

              <div className="relative mt-6 rounded-[1.35rem] border border-[color:rgba(148,163,184,0.08)] bg-[var(--background)]/38 px-4 py-4">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-4 h-16 w-[calc(100%-2rem)] opacity-70"
                  viewBox="0 0 520 80"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="signal-line" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(148,163,184,0.02)" />
                      <stop offset="50%" stopColor="rgba(99,102,241,0.26)" />
                      <stop offset="100%" stopColor="rgba(148,163,184,0.02)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M56 40H224M224 40H360M360 40H464"
                    stroke="url(#signal-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="56" cy="40" r="4" fill="rgba(99,102,241,0.95)" />
                  <circle cx="224" cy="40" r="4" fill="rgba(148,163,184,0.6)" />
                  <circle cx="360" cy="40" r="4" fill="rgba(148,163,184,0.55)" />
                  <circle cx="464" cy="40" r="4" fill="rgba(168,85,247,0.55)" />
                  {!reduceMotion ? (
                    <motion.circle
                      cx="56"
                      cy="40"
                      r="3.25"
                      fill="rgba(99,102,241,0.95)"
                      animate={{ cx: [56, 224, 360, 464], opacity: [0.9, 1, 1, 0.9] }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  ) : null}
                </svg>

                <div className="relative z-10 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-strong">
                  <span>API</span>
                  <span className="text-[color:rgba(148,163,184,0.55)]">-&gt;</span>
                  <span>Queue</span>
                  <span className="text-[color:rgba(148,163,184,0.55)]">-&gt;</span>
                  <span>Worker</span>
                  <span className="text-[color:rgba(148,163,184,0.55)]">-&gt;</span>
                  <span>DB</span>
                </div>

                <div className="mt-4 space-y-2 font-mono text-[11px] leading-5 text-muted-strong sm:text-[12px]">
                  <AnimatePresence initial={false}>
                    {visibleFeed.map((event, index) => (
                      <motion.div
                        key={event.id}
                        layout
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={[
                          "flex items-start gap-3 rounded-xl px-3 py-2.5",
                          index === visibleFeed.length - 1
                            ? "bg-[var(--card)]/55"
                            : "bg-transparent",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mt-1 h-1.5 w-1.5 rounded-full",
                            event.tone === "accent"
                              ? "bg-[var(--accent)]"
                              : event.tone === "muted"
                                ? "bg-slate-400/70"
                                : "bg-emerald-400/70",
                          ].join(" ")}
                        />
                        <span className="min-w-0 flex-1 truncate text-foreground/92">
                          {event.label}
                        </span>
                        <span className="shrink-0 text-muted-strong">{event.detail}</span>
                        <span className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-8">
          <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]/18 px-4 py-2.5 sm:px-5 sm:py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--background)] to-transparent" />

            {reduceMotion ? (
              <div className="flex flex-wrap gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-strong sm:text-[11px]">
                {TECH_CHIPS.map(({ label, Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/65 px-3 py-2"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            ) : (
              <motion.div
                className="flex w-max items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-strong sm:text-[11px]"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 24,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="flex items-center gap-2.5 pr-2.5">
                  {TECH_CHIPS.map(({ label, Icon }) => (
                    <span
                      key={`first-${label}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/65 px-3 py-2"
                    >
                      <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5 pr-2.5" aria-hidden="true">
                  {TECH_CHIPS.map(({ label, Icon }) => (
                    <span
                      key={`second-${label}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/65 px-3 py-2"
                    >
                      <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ApiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 8.5h16M4 15.5h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 5.5 3.5 12 7 18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m17 5.5 3.5 6.5L17 18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.5 17.5h9.2a4 4 0 0 0 .5-7.98A5.5 5.5 0 0 0 6.4 7.7a3.8 3.8 0 0 0 1.1 9.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 4.5 7.2V16.8L12 21l7.5-4.2V7.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v8M8 10.3l4-2.3 4 2.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 7h6a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M19 10.5 21 13l-2 2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17h6a3 3 0 0 0 3-3v0a3 3 0 0 1 3-3h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PipelineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.7" />
      <rect x="14" y="5" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.7" />
      <rect x="9" y="13" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M10 8h4M12 11v2M12 19v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
