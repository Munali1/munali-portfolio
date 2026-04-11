"use client";

import { motion, useReducedMotion } from "framer-motion";

type Project = {
  name: string;
  type: string;
  description: string;
  stack: string[];
  outcome: string;
  url: string;
};

type ProjectsShowcaseProps = {
  projects: Project[];
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-12 space-y-10"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={reduceMotion ? undefined : { once: true, amount: 0.2 }}
      variants={reduceMotion ? undefined : listVariants}
    >
      {projects.map((project, index) => (
        <motion.a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name} on GitHub`}
          className="group grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
          variants={reduceMotion ? undefined : itemVariants}
          whileHover={reduceMotion ? undefined : { y: -3 }}
        >
          <div className="lg:pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {project.type}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-foreground font-display sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {project.outcome}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition group-hover:translate-x-1">
              View repository
              <span aria-hidden="true">-&gt;</span>
            </div>
          </div>

          {index < projects.length - 1 ? (
            <div className="lg:col-span-2 h-px bg-[var(--border)]/70" aria-hidden="true" />
          ) : null}
        </motion.a>
      ))}
    </motion.div>
  );
}
