"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Scroll progress bar + cursor spotlight that follows the pointer. */
export default function SiteEffects() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.current?.style.setProperty("--mx", `${e.clientX}px`);
        glow.current?.style.setProperty("--my", `${e.clientY}px`);
        glow.current?.style.setProperty("opacity", "1");
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[var(--accent)] via-purple-400 to-pink-400"
      />
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
    </>
  );
}
