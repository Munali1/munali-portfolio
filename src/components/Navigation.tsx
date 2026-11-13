"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

type NavigationProps = {
  items: { label: string; href: string }[];
};

export default function Navigation({ items }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const navigation = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOutside(event: PointerEvent) {
      if (!navigation.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <nav
      ref={navigation}
      aria-label="Primary"
      className="relative ml-auto"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="primary-links"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-strong transition-colors duration-150 ease-[var(--ease)] hover:bg-[var(--card-strong)] hover:text-foreground md:hidden"
      >
        {open ? <X size={18} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.5} aria-hidden="true" />}
      </button>
      <ul
        id="primary-links"
        className={`${open ? "flex" : "hidden"} absolute right-0 top-full mt-3 w-52 flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 md:static md:mt-0 md:flex md:w-auto md:flex-row md:gap-2 md:border-0 md:bg-transparent md:p-0`}
      >
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-4 text-sm text-muted-strong transition-colors duration-150 ease-[var(--ease)] hover:bg-[var(--card-strong)] hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
