"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Experience = {
  role: string;
  company: string;
  period: string;
  meta: string;
  stack: string[];
  highlights: string[];
};

/** Steps through phases, each lasting durations[i] ms, then loops. */
function useCycle(durations: number[], paused: boolean, fixed: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % durations.length), durations[i]);
    return () => window.clearTimeout(t);
  }, [i, paused, durations]);
  return paused ? fixed : i;
}

/* ---------- creatures ---------- */

function CaterpillarSvg({ moving }: { moving: boolean }) {
  return (
    <svg viewBox="0 0 64 34" className="h-[34px] w-16 overflow-visible" aria-hidden="true">
      {[8, 20, 32, 44].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={24}
          r={7}
          fill="var(--accent)"
          fillOpacity={i % 2 ? 0.75 : 1}
          animate={moving ? { y: [0, -4, 0] } : { y: 0 }}
          transition={{ duration: 0.7, repeat: moving ? Infinity : 0, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
      <circle cx={54} cy={22} r={9} fill="var(--accent)" />
      <circle cx={58} cy={19} r={1.6} fill="var(--background)" />
      <path d="M56 13 Q58 5 63 4 M52 13.5 Q51 6 55 3" stroke="var(--accent)" strokeWidth={1.3} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CocoonSvg() {
  return (
    <svg viewBox="0 0 40 64" className="h-16 w-10 overflow-visible" aria-hidden="true">
      <path d="M20 60 C4 48 4 16 20 3 C36 16 36 48 20 60Z" fill="var(--accent)" fillOpacity={0.85} />
      <path d="M9 20 Q20 26 31 20 M7 31 Q20 38 33 31 M9 42 Q20 49 31 42" stroke="var(--background)" strokeOpacity={0.45} strokeWidth={1.2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ButterflySvg({ flap }: { flap: boolean }) {
  return (
    <svg viewBox="-26 -22 52 44" className="h-11 w-[52px] overflow-visible" aria-hidden="true">
      <motion.g
        animate={flap ? { scaleX: [1, 0.25, 1] } : { scaleX: 1 }}
        transition={{ duration: 0.8, repeat: flap ? Infinity : 0, ease: "easeInOut" }}
      >
        <path d="M0 0 C-8-20-24-20-24-6 C-24 3-10 5 0 0Z" fill="var(--accent)" fillOpacity={0.9} />
        <path d="M0 0 C-6 15-17 17-18 9 C-19 3-8 1 0 0Z" fill="var(--accent)" fillOpacity={0.55} />
        <path d="M0 0 C8-20 24-20 24-6 C24 3 10 5 0 0Z" fill="var(--accent)" fillOpacity={0.9} />
        <path d="M0 0 C6 15 17 17 18 9 C19 3 8 1 0 0Z" fill="var(--accent)" fillOpacity={0.55} />
        <circle cx={-14} cy={-8} r={2.6} fill="var(--background)" fillOpacity={0.55} />
        <circle cx={14} cy={-8} r={2.6} fill="var(--background)" fillOpacity={0.55} />
      </motion.g>
      <rect x={-1.2} y={-9} width={2.4} height={18} rx={1.2} fill="var(--foreground)" />
      <path d="M0-9 Q-3-16-7-16 M0-9 Q3-16 7-16" stroke="var(--foreground)" strokeWidth={1} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- the life cycle, played once along the timeline ---------- */

const LEAF_X = [13, 21, 29, 37]; // % along the line
const COCOON_X = 50;
const FLY_TO = 93;

// 0-3 eat a leaf each · 4 finish chewing · 5 spin silk · 6 cocoon rests
// 7 cracks · 8 butterfly unfolds · 9 flies along the line · 10 gone, loop
const STEPS = [1700, 1700, 1700, 1700, 1200, 2600, 2200, 1500, 1500, 5200, 600];

function LeafSvg() {
  return (
    <svg viewBox="0 0 36 40" className="h-10 w-9" aria-hidden="true">
      <defs>
        <linearGradient id="leaf-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7d9a74" />
          <stop offset="0.55" stopColor="#a9b27a" />
          <stop offset="1" stopColor="#f0a35e" />
        </linearGradient>
      </defs>
      <path d="M18 39 C18 34 17 31 18 27" stroke="#6b8560" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* a broad, heart-shaped leaf */}
      <path d="M18 28 C5 28 1 16 8 9 C13 4 18 8 18 13 C18 8 23 4 28 9 C35 16 31 28 18 28Z" fill="url(#leaf-grad)" />
      <path d="M18 28 C5 28 1 16 8 9 C13 4 18 8 18 13Z" fill="#4f6b45" fillOpacity={0.18} />
      <path d="M18 27 V14 M18 22 L11 16 M18 22 L25 16" stroke="#4f6b45" strokeOpacity={0.5} strokeWidth={1} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LifeCycle({ reduce }: { reduce: boolean | null }) {
  const t = useCycle(STEPS, !!reduce, 9);
  const L = LEAF_X.length;
  const eaten = Math.min(t, L);
  const cat = t <= 5; // caterpillar visible until it is wrapped
  const target = Math.min(t, L - 1);
  const catX = t >= 5 ? COCOON_X : LEAF_X[target];
  const cocoonOn = t >= 5 && t <= 7;
  const butterflyOn = t >= 8 && t <= 9;

  return (
    <div aria-hidden="true" className="pointer-events-none relative h-24">
      {/* leaves standing on the line */}
      {LEAF_X.map((x, i) => (
        <motion.div
          key={x}
          className="absolute bottom-px -ml-[18px] origin-bottom"
          style={{ left: `${x}%`, rotate: i % 2 ? 10 : -8 }}
          initial={false}
          animate={i < eaten ? { scale: 0, opacity: 0 } : i === t ? { scale: 0.5, opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: i === t ? 0.7 : 0.5, delay: i === t ? 1 : 0 }}
        >
          <LeafSvg />
        </motion.div>
      ))}

      {/* the caterpillar gets chubbier with every leaf */}
      <motion.div
        className="absolute bottom-px"
        style={{ transformOrigin: "100% 100%" }}
        initial={false}
        animate={{
          // at the cocoon spot the (scaled, right-anchored) caterpillar is centred on it
          left: t >= 5 ? `calc(${COCOON_X}% - 11px)` : `calc(${catX}% - 80px)`,
          scale: cat ? 1 + (0.65 * eaten) / L : 1.65,
          opacity: t >= 5 ? 0 : 1,
        }}
        // slide in first, and only then fade out so it never sits on top of the cocoon
        transition={{
          duration: t >= 5 ? 0.8 : 0.9,
          ease: "easeInOut",
          opacity: { duration: 0.4, delay: t === 5 ? 1.1 : 0 },
        }}
      >
        <CaterpillarSvg moving={t < L && !reduce} />
      </motion.div>

      {/* silk, then the cocoon */}
      <div className="absolute bottom-px -ml-12 h-16 w-24" style={{ left: `${COCOON_X}%` }}>
        <svg viewBox="0 0 96 64" className="absolute inset-0 overflow-visible">
          {["M48 6 C86 18 86 40 48 56", "M48 6 C10 18 10 40 48 56", "M30 14 C70 24 70 46 36 54"].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="var(--foreground)"
              strokeOpacity={0.5}
              strokeWidth={1}
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: t >= 5 ? 1 : 0, opacity: t === 5 || t === 6 ? 1 : 0 }}
              transition={{ duration: 1.1, delay: (t === 5 ? 0.8 : 0) + i * 0.2 }}
            />
          ))}
        </svg>
        <motion.div
          className="absolute bottom-0 left-1/2 -ml-5"
          style={{ transformOrigin: "50% 100%" }}
          initial={false}
          animate={cocoonOn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: t > 7 ? 1.25 : 0.3 }}
          transition={{ duration: 0.6, delay: t === 5 ? 1.6 : 0 }}
        >
          <motion.div
            style={{ transformOrigin: "50% 100%" }}
            animate={reduce ? { rotate: 0 } : t === 6 ? { rotate: [-5, 5, -5] } : t === 7 ? { rotate: [-7, 7, -7, 7, 0] } : { rotate: 0 }}
            transition={{ duration: t === 7 ? 1.4 : 2.2, repeat: t === 6 && !reduce ? Infinity : 0, ease: "easeInOut" }}
          >
            <CocoonSvg />
            {t === 7 && (
              <svg viewBox="0 0 40 64" className="absolute inset-0 h-16 w-10">
                <motion.path
                  d="M20 10 L16 22 L23 30 L17 42"
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.2 }}
                />
              </svg>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* the butterfly flies the rest of the line */}
      <motion.div
        className="absolute bottom-4"
        style={{ x: "-50%" }}
        initial={false}
        animate={
          t === 8
            ? { left: `${COCOON_X}%`, opacity: 1, scale: 1, y: 0 }
            : t === 9
              ? reduce
                ? { left: "70%", opacity: 1, scale: 1, y: -14 }
                : { left: [`${COCOON_X}%`, "62%", "74%", "84%", `${FLY_TO}%`], opacity: 1, scale: 1, y: [0, -22, -8, -26, -12] }
              : { left: `${COCOON_X}%`, opacity: 0, scale: 0.2, y: 0 }
        }
        transition={{ duration: t === 9 ? 5 : 1.2, ease: "easeInOut" }}
      >
        <ButterflySvg flap={butterflyOn && !reduce} />
      </motion.div>

      {/* the line itself */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--accent)]" />
    </div>
  );
}

/* ---------- section ---------- */

export default function ExperienceShowcase({ experiences }: { experiences: Experience[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = experiences.length;
  const exp = experiences[active];

  return (
    <div className="mt-14">
      <div className="relative">
        <div role="tablist" aria-label="Experience" className="grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {experiences.map((e, i) => {
            const on = i === active;
            return (
              <button
                key={`${e.company}-${e.role}`}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center px-2 text-center outline-none"
              >
                <span
                  className={`text-sm font-semibold transition sm:text-lg ${
                    on ? "text-foreground" : "text-muted-strong group-hover:text-foreground"
                  }`}
                >
                  {e.role}
                </span>
                <span className="mt-1 text-xs text-[var(--accent)] sm:text-sm">{e.company}</span>
                <span className="mt-1 text-xs text-muted sm:text-sm">{e.period}</span>
              </button>
            );
          })}
        </div>
      </div>

      <LifeCycle reduce={reduce} />

      <div role="tabpanel" className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 p-2 backdrop-blur-md">
        <div className="rounded-2xl border border-[var(--border)]/60 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {exp.role}
              </h3>
              <p className="mt-3 text-sm font-semibold text-foreground sm:text-base">
                {exp.meta} <span className="text-muted">|</span> {exp.period}
              </p>
              <p className="mt-1 text-sm text-muted">{exp.company}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-3">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-strong sm:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
