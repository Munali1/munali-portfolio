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
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="flex items-center gap-3 text-sm font-medium text-muted-strong">
          <span className="h-px w-6 bg-[var(--accent)]" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-[32px] font-medium leading-[1.15] text-foreground sm:text-[40px] lg:text-[44px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-strong">
          {description}
        </p>
      ) : null}
    </div>
  );
}
