"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

function serverTheme() {
  return true;
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, serverTheme);

  function toggleTheme() {
    const nextDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label="Toggle color theme"
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-muted-strong transition-colors duration-150 ease-[var(--ease)] hover:bg-[var(--card-strong)] hover:text-foreground"
    >
      <Sun size={18} strokeWidth={1.5} className="dark:hidden" aria-hidden="true" />
      <Moon size={18} strokeWidth={1.5} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
