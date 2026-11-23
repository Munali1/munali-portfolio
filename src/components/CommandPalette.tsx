"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

const EMAIL = "munali.shakya@gmail.com";

function jumpTo(frac: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: frac * max, behavior: "smooth" });
}

function confetti() {
  const colors = ["#6aa2ff", "#a855f7", "#f472b6", "#34d399", "#fbbf24"];
  for (let i = 0; i < 70; i++) {
    const el = document.createElement("span");
    const size = 6 + Math.random() * 6;
    Object.assign(el.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      background: colors[i % colors.length],
      zIndex: "100",
      pointerEvents: "none",
    });
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 160 + Math.random() * 380;
    el.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${
            Math.sin(angle) * dist + 220
          }px) rotate(${Math.random() * 720}deg) scale(.6)`,
          opacity: 0,
        },
      ],
      { duration: 1400 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.3,1)" },
    ).onfinish = () => el.remove();
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const go = useCallback(
    (id: string) => () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    [],
  );

  const commands = useMemo<Command[]>(
    () => [
      { id: "top", label: "Go to top", hint: "Navigate", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { id: "exp", label: "Go to Experience", hint: "Navigate", run: go("experience") },
      { id: "proj", label: "Go to Projects", hint: "Navigate", run: go("projects") },
      { id: "contact", label: "Go to Contact", hint: "Navigate", run: go("contact") },
      { id: "sunrise", label: "Jump to sunrise", hint: "Time", run: () => jumpTo(0) },
      { id: "midday", label: "Jump to midday", hint: "Time", run: () => jumpTo(0.3) },
      { id: "sunset", label: "Jump to sunset", hint: "Time", run: () => jumpTo(0.64) },
      { id: "night", label: "Jump to night", hint: "Time", run: () => jumpTo(1) },
      {
        id: "chaos",
        label: "Break production",
        hint: "Action",
        run: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.dispatchEvent(new Event("portfolio:chaos"));
        },
      },
      {
        id: "email",
        label: "Copy email address",
        hint: "Action",
        run: () => {
          void navigator.clipboard?.writeText(EMAIL);
          flash("Email copied to clipboard");
        },
      },
      { id: "cv", label: "Download CV", hint: "Action", run: () => window.open("/Munali_Shakya-CV.pdf", "_blank") },
      { id: "gh", label: "Open GitHub", hint: "Link", run: () => window.open("https://github.com/Munali1", "_blank") },
      {
        id: "party",
        label: "Do not press this",
        hint: "Secret",
        run: () => {
          confetti();
          flash("You were warned. Thanks for visiting!");
        },
      },
    ],
    [go, flash],
  );

  const results = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  const exec = (cmd?: Command) => {
    if (!cmd) return;
    close();
    window.setTimeout(cmd.run, 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Konami code easter egg
  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      i = e.key === seq[i] ? i + 1 : e.key === seq[0] ? 1 : 0;
      if (i === seq.length) {
        i = 0;
        confetti();
        flash("Konami code unlocked. Respect.");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flash]);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[16vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-2xl shadow-[var(--shadow)]"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") {
                    exec(results[active]);
                  }
                }}
                placeholder="Type a command or search..."
                className="w-full border-b border-[var(--border)] bg-transparent px-5 py-4 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <ul className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-3 py-6 text-center text-sm text-muted">
                    Nothing found. Try &quot;projects&quot;.
                  </li>
                ) : (
                  results.map((cmd, i) => (
                    <li key={cmd.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => exec(cmd)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          i === active
                            ? "bg-[var(--accent-soft)] text-foreground"
                            : "text-muted-strong"
                        }`}
                      >
                        {cmd.label}
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                          {cmd.hint}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm text-foreground shadow-[var(--shadow)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
