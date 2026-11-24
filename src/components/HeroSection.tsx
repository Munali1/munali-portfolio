"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Magnetic from "./Magnetic";

type SystemEvent = {
  id: string;
  label: string;
  detail: string;
  tone: "accent" | "muted" | "normal" | "error";
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

const CHAOS_SCRIPT: Array<{ at: number; event: Omit<SystemEvent, "id"> }> = [
  { at: 0, event: { label: "POST /api/payments", detail: "-> 503 (timeout)", tone: "error" } },
  { at: 900, event: { label: "Queue depth spiking", detail: "depth: 4,812", tone: "error" } },
  { at: 1800, event: { label: "Circuit breaker opened", detail: "stripe-gateway", tone: "error" } },
  { at: 2700, event: { label: "Retry with backoff", detail: "attempt 3/5", tone: "accent" } },
  { at: 3600, event: { label: "Autoscaler +6 replicas", detail: "warming up", tone: "accent" } },
  { at: 4500, event: { label: "Temporal replayed 4,812 jobs", detail: "0 lost", tone: "normal" } },
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
  const latest = feed[feed.length - 1];
  const [status, setStatus] = useState<"healthy" | "degraded">("healthy");
  const chaosRef = useRef(false);
  const timers = useRef<number[]>([]);

  const injectFailure = useCallback(() => {
    if (chaosRef.current) return;
    chaosRef.current = true;
    setStatus("degraded");
    CHAOS_SCRIPT.forEach(({ at, event }, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setFeed((cur) => [...cur.slice(-4), { ...event, id: `chaos-${Date.now()}-${i}` }]);
          if (i === CHAOS_SCRIPT.length - 1) {
            setStatus("healthy");
            chaosRef.current = false;
          }
        }, at),
      );
    });
  }, []);

  useEffect(() => {
    const handler = () => injectFailure();
    window.addEventListener("portfolio:chaos", handler);
    const pending = timers.current;
    return () => {
      window.removeEventListener("portfolio:chaos", handler);
      pending.forEach(window.clearTimeout);
    };
  }, [injectFailure]);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    let cursor = initialFeed.length;
    const interval = window.setInterval(() => {
      if (chaosRef.current) return;
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
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-14 pt-32">
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          className="relative z-10 text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-strong backdrop-blur-xl"
          >
            Munali Shakya / Backend engineer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-8 text-[clamp(3.2rem,11.5vw,10.5rem)] font-extrabold leading-[0.86] tracking-tighter text-foreground [text-shadow:0_2px_40px_rgba(255,255,255,0.15)]"
          >
            I build the
            <span className="relative block h-[1.02em] overflow-hidden">
              <RotatingWord />
            </span>
            that keep
            <span className="block text-outline">products running.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-strong sm:text-xl"
          >
            I&apos;m a backend engineer. I work with C#, ASP.NET Core, AWS and
            Terraform, and I like code that&apos;s easy to run in production.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-bold text-[var(--on-accent)] shadow-[var(--shadow)] transition hover:scale-105"
              >
                See selected work <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Munali_Shakya-CV.pdf"
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-8 py-4 text-base font-semibold text-foreground backdrop-blur-xl transition hover:border-[var(--accent)]"
              >
                Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-3 rounded-3xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-left font-mono text-xs backdrop-blur-xl sm:rounded-full"
          >
            <span className="flex shrink-0 items-center gap-2 uppercase tracking-[0.2em] text-muted-strong">
              {status === "healthy" ? "Healthy" : "Incident"}
            </span>
            <span className="relative min-w-0 flex-1 basis-48 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={latest.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={`block truncate ${
                    latest.tone === "error" ? "text-red-500" : "text-foreground"
                  }`}
                >
                  {latest.label} <span className="text-muted">{latest.detail}</span>
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              type="button"
              onClick={injectFailure}
              disabled={status === "degraded"}
              className="shrink-0 rounded-full border border-red-500/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "healthy" ? "Break production" : "Recovering..."}
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

const WORDS = ["APIs", "pipelines", "workflows", "infra"];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => window.clearInterval(t);
  }, [reduce]);
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={WORDS[i]}
        className="text-gradient block pb-2"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
      >
        {WORDS[i]}
      </motion.span>
    </AnimatePresence>
  );
}
