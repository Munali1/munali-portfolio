"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-foreground outline-none focus:border-[var(--accent)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-foreground outline-none focus:border-[var(--accent)]"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-strong">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-foreground outline-none focus:border-[var(--accent)]"
          placeholder="Share a short note about the role or project."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-[var(--accent)]">
          Thanks! Your message has been sent.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-rose-500">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
