"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSfx } from "@/hooks/useSfx";

type Phase = "idle" | "cover" | "reveal";

export function PageTurn() {
  const pathname = usePathname();
  const router = useRouter();
  const { play } = useSfx();
  const [phase, setPhase] = useState<Phase>("idle");
  const navigating = useRef(false);
  const firstMount = useRef(true);
  const phaseRef = useRef<Phase>("idle");

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    if (!navigating.current) return;
    navigating.current = false;
    setPhase("reveal");
    const t = window.setTimeout(() => setPhase("idle"), 520);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (phaseRef.current !== "idle" || navigating.current) return;

      const el = (e.target as HTMLElement | null)?.closest?.("a");
      if (!el) return;

      const href = el.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }
      if (
        el.getAttribute("target") === "_blank" ||
        el.hasAttribute("download")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const next = `${url.pathname}${url.search}${url.hash}`;
      const curr = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next === curr) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      navigating.current = true;
      play("whoosh");
      setPhase("cover");
      window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, 420);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router, play]);

  if (phase === "idle") return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-180 flex items-center justify-center overflow-hidden ${
        phase === "cover"
          ? "animate-page-turn-cover"
          : "animate-page-turn-reveal"
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-dots-loader bg-comic-yellow" />
      <div className="absolute inset-y-0 left-0 w-3 bg-ink" />
      <div className="absolute inset-y-0 right-0 w-3 bg-ink" />
      <div className="relative z-10 rotate-[-4deg] animate-bang-in font-display text-[clamp(48px,10vw,100px)] tracking-[4px] text-comic-red text-stroke-ink-xl [text-shadow:8px_8px_0_#1a1a2e]">
        FLIP!
      </div>
    </div>
  );
}
