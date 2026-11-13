"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-muted-strong">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          className="contact-field"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-muted-strong">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          className="contact-field"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-muted-strong">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="contact-field min-h-40 resize-y"
          placeholder="Share a short note about the role or project."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="button-primary justify-self-start disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
      {status === "success" ? (
        <p role="status" className="text-sm text-[var(--positive)]">
          Thanks! Your message has been sent.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-[var(--negative)]">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
