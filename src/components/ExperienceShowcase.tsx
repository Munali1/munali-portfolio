"use client";

import { motion, useReducedMotion } from "framer-motion";

type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

type ExperienceShowcaseProps = {
  experiences: Experience[];
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function ExperienceShowcase({
  experiences,
}: ExperienceShowcaseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-12 space-y-10"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.2 }}
      variants={reduceMotion ? undefined : listVariants}
    >
      {experiences.map((experience, index) => (
        <motion.article
          key={experience.role}
          className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10"
          variants={reduceMotion ? undefined : itemVariants}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {experience.period}
            </p>
            <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground font-display sm:text-lg">
              {experience.role}
            </h3>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {experience.company}
            </p>
          </div>

          <div>
            <ul className="grid gap-3 text-sm text-muted sm:grid-cols-2">
              {experience.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {index < experiences.length - 1 ? (
            <div className="lg:col-span-2 h-px bg-[var(--border)]/70" aria-hidden="true" />
          ) : null}
        </motion.article>
      ))}
    </motion.div>
  );
}
