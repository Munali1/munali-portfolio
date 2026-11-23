"use client";

import { transform, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";

/*
 * One day across the page:
 * 0 sunrise -> 0.2 morning -> 0.38 noon -> 0.5 golden hour
 * -> 0.62 sunset -> 0.74 dusk -> 0.88+ night
 */
const P = [0, 0.2, 0.38, 0.5, 0.62, 0.74, 0.88, 1];
const SKY_TOP = ["#9bb8ee", "#4aa3ff", "#2f8cf5", "#5b86d6", "#34245f", "#1b1640", "#05060f", "#05060f"];
const SKY_MID = ["#f6b3a0", "#8fd0ff", "#74c3ff", "#f2b27a", "#c93f6a", "#5a2a73", "#0b1030", "#0b1030"];
const SKY_BOT = ["#ffd9a8", "#d9f1ff", "#cdeeff", "#ffd9a0", "#f26a4a", "#c2476b", "#16204a", "#16204a"];
const SUN = ["#ff9a4a", "#fff1a8", "#fffbe0", "#ffc266", "#ff6a3d", "#ff6a3d", "#ff6a3d", "#ff6a3d"];
const CLOUD = ["#ffe3da", "#ffffff", "#ffffff", "#ffe0c8", "#ff9fa0", "#6a4a8a", "#1c2556", "#1c2556"];
const CLOUD_OPACITY = [0.9, 1, 1, 0.95, 0.8, 0.45, 0.15, 0.15];
const HILL_1 = ["#b9c9a8", "#9ad0a0", "#8cc79a", "#8a9a8a", "#3a1f4d", "#1a1038", "#0a0d1f", "#0a0d1f"];
const HILL_2 = ["#9fb59a", "#7fbf94", "#6fb58a", "#6f8a78", "#2a1640", "#120b2b", "#060818", "#060818"];

// Text/UI colours: [day value, night value]. The mix is driven by how bright
// the sky actually is, so text flips decisively and never sits at mid-grey.
const THEME: Record<string, [string, string]> = {
  "--foreground": ["#0f1b33", "#f6f3ff"],
  "--muted": ["#34435f", "#d6d0ee"],
  "--muted-strong": ["#1f2b46", "#ebe7fb"],
  "--card": ["rgba(255,255,255,0.55)", "rgba(16,14,44,0.55)"],
  "--border": ["rgba(15,27,51,0.16)", "rgba(255,255,255,0.18)"],
  "--background": ["#e8f3ff", "#120e2c"],
  "--accent": ["#c2410c", "#ffd76a"],
  "--on-accent": ["#ffffff", "#1a1530"],
  "--accent-soft": ["rgba(194,65,12,0.12)", "rgba(255,215,106,0.16)"],
  "--ring": ["rgba(194,65,12,0.3)", "rgba(255,215,106,0.35)"],
};

function luminance(color: string) {
  const [r, g, b] = (color.match(/[\d.]+/g) ?? ["0", "0", "0"]).slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function phase(p: number) {
  if (p < 0.12) return "Sunrise";
  if (p < 0.46) return "Daytime";
  if (p < 0.56) return "Golden hour";
  if (p < 0.7) return "Sunset";
  if (p < 0.8) return "Dusk";
  return "Night";
}

function clock(p: number) {
  const mins = Math.round(5 * 60 + 40 + p * 17 * 60);
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function SkyBackground() {
  const { scrollYProgress } = useScroll();
  const root = useRef<HTMLDivElement>(null);
  const sun = useRef<HTMLDivElement>(null);
  const moon = useRef<HTMLDivElement>(null);
  const stars = useRef<HTMLDivElement>(null);
  const clouds = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const time = useRef<HTMLSpanElement>(null);

  const starField = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: 150 }, (_, i) => {
      const big = r() > 0.88;
      return {
        key: i,
        left: `${r() * 100}%`,
        top: `${r() * 80}%`,
        size: big ? 3 : 1 + r() * 1.4,
        dur: `${2 + r() * 4}s`,
        delay: `-${r() * 6}s`,
        big,
      };
    });
  }, []);

  const cloudField = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 7 }, (_, i) => ({
      key: i,
      top: `${6 + r() * 48}%`,
      scale: 0.6 + r() * 1.1,
      dur: `${90 + r() * 90}s`,
      delay: `-${r() * 140}s`,
    }));
  }, []);

  const apply = useCallback((p: number) => {
    const el = root.current;
    if (!el) return;
    const set = (k: string, v: string) => el.style.setProperty(k, v);
    set("--sky-top", transform(p, P, SKY_TOP));
    set("--sky-mid", transform(p, P, SKY_MID));
    set("--sky-bot", transform(p, P, SKY_BOT));
    set("--sun", transform(p, P, SUN));
    set("--cloud", transform(p, P, CLOUD));
    set("--hill-1", transform(p, P, HILL_1));
    set("--hill-2", transform(p, P, HILL_2));
    if (clouds.current) clouds.current.style.opacity = String(transform(p, P, CLOUD_OPACITY));
    if (stars.current) stars.current.style.opacity = String(transform(p, [0.58, 0.8], [0, 1]));

    if (sun.current) {
      const th = Math.PI * Math.min(p / 0.68, 1);
      sun.current.style.left = `${50 - Math.cos(th) * 42}%`;
      sun.current.style.top = `${80 - Math.sin(th) * 68}%`;
      sun.current.style.opacity = String(transform(p, [0.64, 0.7], [1, 0]));
    }
    if (moon.current) {
      const mp = Math.min(Math.max((p - 0.66) / 0.34, 0), 1);
      moon.current.style.left = `${12 + mp * 62}%`;
      moon.current.style.top = `${82 - Math.sin(mp * Math.PI * 0.55) * 66}%`;
      moon.current.style.opacity = String(transform(p, [0.66, 0.78], [0, 1]));
    }

    const lum =
      0.25 * luminance(transform(p, P, SKY_TOP)) +
      0.5 * luminance(transform(p, P, SKY_MID)) +
      0.25 * luminance(transform(p, P, SKY_BOT));
    const night = Math.min(Math.max((0.3 - lum) / 0.05, 0), 1);
    const rootStyle = document.documentElement.style;
    for (const [k, [day, dark]] of Object.entries(THEME)) {
      rootStyle.setProperty(k, transform(night, [0, 1], [day, dark]));
    }
    rootStyle.setProperty("--text-shadow", night > 0.5 ? "0 1px 14px rgba(0,0,0,0.35)" : "none");

    if (label.current) label.current.textContent = phase(p);
    if (time.current) time.current.textContent = clock(p);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", apply);
  useEffect(() => {
    apply(scrollYProgress.get());
    const onResize = () => apply(scrollYProgress.get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [apply, scrollYProgress]);

  return (
    <>
      <div
        ref={root}
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--sky-top, #9bb8ee), var(--sky-mid, #f6b3a0) 55%, var(--sky-bot, #ffd9a8))",
        }}
      >
        <div ref={stars} className="absolute inset-0 opacity-0">
          {starField.map((s) => (
            <span
              key={s.key}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                boxShadow: s.big ? "0 0 8px 2px rgba(255,255,255,0.7)" : undefined,
                ["--d" as string]: s.dur,
                ["--dl" as string]: s.delay,
              }}
            />
          ))}
          <span className="shoot" style={{ left: "15%", top: "8%" }} />
          <span className="shoot" style={{ left: "55%", top: "4%", animationDelay: "-5s", animationDuration: "13s" }} />
        </div>

        <div ref={sun} className="sky-sun" style={{ left: "8%", top: "80%" }} />
        <div ref={moon} className="sky-moon" />

        <div ref={clouds} className="absolute inset-0">
          {cloudField.map((c) => (
            <span
              key={c.key}
              className="cloud"
              style={{
                top: c.top,
                animationDuration: c.dur,
                animationDelay: c.delay,
                ["--s" as string]: c.scale,
              }}
            />
          ))}
        </div>

        <svg
          className="absolute bottom-0 h-[26vh] w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            style={{ fill: "var(--hill-2, #9fb59a)" }}
            d="M0 200 C180 120 340 130 520 190 C700 250 860 120 1060 150 C1220 175 1340 220 1440 180 L1440 320 L0 320Z"
          />
          <path
            style={{ fill: "var(--hill-1, #b9c9a8)" }}
            d="M0 250 C160 200 300 230 480 250 C680 275 800 190 1000 215 C1180 238 1320 270 1440 240 L1440 320 L0 320Z"
          />
        </svg>
      </div>

      <div className="fixed bottom-5 left-5 z-[55] flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-strong shadow-[var(--shadow)] backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        <span ref={label}>Sunrise</span>
        <span ref={time} className="text-muted">05:40</span>
      </div>
    </>
  );
}
