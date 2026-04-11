import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-[1.15rem] font-semibold tracking-tight text-foreground sm:text-[1.35rem] lg:text-[1.7rem] font-display">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-[0.8rem] leading-relaxed text-muted sm:text-xs">
          {description}
        </p>
      ) : null}
    </div>
  );
}
