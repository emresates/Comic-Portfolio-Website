"use client";

import { useEffect, useId, useRef } from "react";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/content";

type ProjectModalProps = {
  project: Project;
  bang: string;
  labels: {
    demoBtn: string;
    githubBtn: string;
    caseStudyBtn: string;
  };
  onClose: () => void;
  onCloseSound?: () => void;
};

const linkBase =
  "font-display inline-block rounded-[10px] border-[3px] border-ink px-4 py-2 text-base tracking-wide no-underline transition-[transform,box-shadow,background,color] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 max-[860px]:px-3.5 max-[860px]:py-2.5 max-[860px]:text-[15px]";

export function ProjectModal({
  project,
  bang,
  labels,
  onClose,
  onCloseSound,
}: ProjectModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onCloseSoundRef = useRef(onCloseSound);

  useEffect(() => {
    closeRef.current?.focus();

    const close = () => {
      onCloseSoundRef.current?.();
      onCloseRef.current();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    onCloseSoundRef.current?.();
    onCloseRef.current();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex animate-modal-fade items-center justify-center bg-[rgba(26,26,46,0.78)] p-6 max-[860px]:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleClose}
    >
      <div
        className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden"
        aria-hidden
      >
        <div className="size-[min(90vw,720px)] animate-speed-burst rounded-full bg-speed-lines max-[860px]:size-[140vw]" />
      </div>
      <div
        ref={panelRef}
        className="relative z-1 w-full max-w-[560px] animate-pow-pop overflow-hidden rounded-[18px] border-[5px] border-ink bg-white p-0 shadow-[12px_12px_0_#1a1a2e] max-[860px]:m-auto max-[860px]:max-h-[min(85dvh,900px)] max-[860px]:overflow-y-auto max-[860px]:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative flex h-[150px] items-center justify-center overflow-hidden border-b-4 border-ink"
          style={{ background: project.bg }}
        >
          <div
            className="absolute inset-[-30%] animate-hero-lines [background:repeating-linear-gradient(-18deg,transparent,transparent_10px,rgba(26,26,46,0.12)_10px,rgba(26,26,46,0.12)_14px)]"
            aria-hidden
          />
          <span className="relative z-1 font-display text-[64px] text-white text-stroke-ink drop-shadow-[4px_4px_0_rgba(26,26,46,0.35)]">
            {project.emoji}
          </span>
          <span className="absolute bottom-3 right-[18px] z-2 rotate-[-8deg] animate-bang-in rounded-[10px] border-[3px] border-ink bg-comic-yellow px-3 py-1 font-stamp text-[22px] text-comic-red shadow-[3px_3px_0_#1a1a2e] max-[860px]:bottom-2.5 max-[860px]:right-3 max-[860px]:text-base">
            {bang}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="absolute right-3 top-3 z-3 size-[42px] cursor-pointer rounded-full border-[3px] border-ink bg-comic-red font-display text-xl text-white shadow-[3px_3px_0_#1a1a2e] transition-[transform,background] duration-150 hover:rotate-90 hover:bg-comic-red-dark hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-comic-yellow"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="px-[30px] pb-[30px] pt-[26px]">
          <h3
            id={titleId}
            className="mb-3 font-display text-[34px] tracking-[2px] text-ink"
          >
            {project.title}
          </h3>
          <p className="mb-4 text-base font-bold leading-[1.55]">
            {project.detail}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tg) => (
              <span
                key={tg}
                className="rounded-[20px] border-2 border-ink bg-comic-yellow px-3 py-[3px] text-[13px] font-bold"
              >
                {tg}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} bg-comic-red text-white shadow-[3px_3px_0_#1a1a2e] hover:bg-comic-red-dark hover:text-white hover:shadow-[5px_5px_0_#1a1a2e]`}
            >
              {labels.demoBtn}
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} bg-ink text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.45)] hover:text-white hover:shadow-[5px_5px_0_rgba(26,26,46,0.45)]`}
            >
              {labels.githubBtn}
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className={`${linkBase} bg-comic-yellow text-ink shadow-[3px_3px_0_#1a1a2e] hover:bg-white hover:text-comic-red hover:shadow-[5px_5px_0_#1a1a2e]`}
              onClick={handleClose}
            >
              {labels.caseStudyBtn} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
