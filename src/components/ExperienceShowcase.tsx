"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export default function ExperienceShowcase({ experiences }: { experiences: Experience[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
      <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--border)] sm:left-[11px]" />
      <motion.div
        style={{ scaleY: reduce ? 1 : height }}
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[var(--accent)] shadow-[0_0_14px_var(--accent)] sm:left-[11px]"
      />
      <div className="space-y-16">
        {experiences.map((exp) => (
          <motion.article
            key={exp.role}
            className="relative"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] sm:-left-12 sm:h-6 sm:w-6" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
              {exp.period}
            </p>
            <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {exp.role}
            </h3>
            <p className="mt-1 text-muted">{exp.company}</p>
            <ul className="mt-6 max-w-2xl space-y-3">
              {exp.highlights.map((h) => (
                <li key={h} className="flex gap-4 text-base leading-relaxed text-muted-strong">
                  <span className="mt-3 h-px w-5 shrink-0 bg-[var(--accent)]" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
