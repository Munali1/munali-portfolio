"use client";

export default function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("portfolio:palette"))}
      aria-label="Open command palette"
      className="hidden font-mono items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/90 px-3 py-2 text-xs text-muted transition hover:border-[var(--accent)] hover:text-foreground md:inline-flex"
    >
      Search or jump
      <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px]">
        Ctrl K
      </kbd>
    </button>
  );
}
