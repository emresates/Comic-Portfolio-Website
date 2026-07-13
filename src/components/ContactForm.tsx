"use client";

import { useState, type FormEvent } from "react";
import { useSfx } from "@/hooks/useSfx";

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  namePh: string;
  emailPh: string;
  messagePh: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ labels }: ContactFormProps) {
  const { play } = useSfx();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    play("click");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: honeypot }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      play("pow");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      play("zap");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto mt-8 max-w-[480px] rounded-[18px] border-[5px] border-ink bg-white p-5 text-left shadow-[8px_8px_0_#1a1a2e] sm:p-6"
      noValidate
    >
      <label className="mb-4 block">
        <span className="mb-1.5 block font-display text-lg tracking-wide text-ink">
          {labels.name}
        </span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={labels.namePh}
          className="w-full rounded-xl border-[3px] border-ink bg-cream px-3.5 py-3 font-body text-base font-bold text-ink outline-none transition-[box-shadow] focus:shadow-[3px_3px_0_#1a1a2e]"
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block font-display text-lg tracking-wide text-ink">
          {labels.email}
        </span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPh}
          className="w-full rounded-xl border-[3px] border-ink bg-cream px-3.5 py-3 font-body text-base font-bold text-ink outline-none transition-[box-shadow] focus:shadow-[3px_3px_0_#1a1a2e]"
        />
      </label>

      <label className="mb-4 block">
        <span className="mb-1.5 block font-display text-lg tracking-wide text-ink">
          {labels.message}
        </span>
        <textarea
          required
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={labels.messagePh}
          className="w-full resize-y rounded-xl border-[3px] border-ink bg-cream px-3.5 py-3 font-body text-base font-bold text-ink outline-none transition-[box-shadow] focus:shadow-[3px_3px_0_#1a1a2e]"
        />
      </label>

      {/* honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl border-4 border-ink bg-comic-red px-5 py-3 font-display text-xl tracking-[2px] text-white shadow-[4px_4px_0_#1a1a2e] transition-[transform,box-shadow,background] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-comic-red-dark hover:shadow-[6px_6px_0_#1a1a2e] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? labels.sending : `${labels.send} →`}
      </button>

      {status === "success" && (
        <p
          className="mt-4 animate-bang-in rounded-xl border-[3px] border-ink bg-comic-yellow px-3 py-2 text-center font-stamp text-lg text-ink"
          role="status"
        >
          {labels.success}
        </p>
      )}
      {status === "error" && (
        <p
          className="mt-4 rounded-xl border-[3px] border-ink bg-comic-orange px-3 py-2 text-center font-stamp text-lg text-ink"
          role="alert"
        >
          {labels.error}
        </p>
      )}
    </form>
  );
}
