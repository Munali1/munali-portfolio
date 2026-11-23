"use client";

import { motion, useReducedMotion } from "framer-motion";

type Project = {
  name: string;
  type: string;
  description: string;
  stack: string[];
  url?: string;
};

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="mt-16 border-b border-[var(--border)]">
      {projects.map((project, index) => {
        const Row = project.url ? motion.a : motion.div;
        return (
          <Row
            key={project.name}
            {...(project.url
              ? { href: project.url, target: "_blank", rel: "noreferrer" }
              : {})}
            aria-label={project.url ? `${project.name} on GitHub` : undefined}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative grid gap-4 border-t border-[var(--border)] py-10 md:grid-cols-[3rem_1.1fr_1fr_2rem] md:gap-8 md:py-12"
          >
            <span className="font-mono text-sm text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-display text-3xl font-bold tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)] sm:text-4xl lg:text-5xl">
                {project.name}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                {project.type}
              </p>
            </div>

            <div>
              <p className="text-base leading-relaxed text-muted-strong">
                {project.description}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {project.stack.join(" / ")}
              </p>
            </div>

            <span
              aria-hidden="true"
              className={`hidden self-start text-2xl text-[var(--accent)] transition-all duration-300 md:block ${
                project.url
                  ? "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  : "opacity-0"
              }`}
            >
              ↗
            </span>
          </Row>
        );
      })}
    </div>
  );
}
