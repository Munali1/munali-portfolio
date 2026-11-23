import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: string;
};

export default function SectionHeader({ eyebrow, index, title, description }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-end gap-4">
        {index ? (
          <span className="font-display text-7xl font-extrabold leading-none text-outline sm:text-8xl">
            {index}
          </span>
        ) : null}
        {eyebrow ? (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            / {eyebrow}
          </p>
        ) : null}
      </div>
      <h2 className="font-display mt-6 max-w-3xl text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
