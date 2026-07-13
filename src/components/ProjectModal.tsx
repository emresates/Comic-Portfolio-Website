"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import type { Lang, Project } from "@/lib/content";

type ProjectModalProps = {
  project: Project;
  bang: string;
  lang: Lang;
  labels: {
    demoBtn: string;
    githubBtn: string;
    caseStudyBtn: string;
  };
  onClose: () => void;
  onCloseSound?: () => void;
};

export function ProjectModal({
  project,
  bang,
  lang,
  labels,
  onClose,
  onCloseSound,
}: ProjectModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onCloseSoundRef = useRef(onCloseSound);
  onCloseRef.current = onClose;
  onCloseSoundRef.current = onCloseSound;

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
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={handleClose}
    >
      <div className="modal-burst" aria-hidden>
        <div className="modal-speed-lines" />
      </div>
      <div
        ref={panelRef}
        className="modal-panel anim-pow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-hero" style={{ background: project.bg }}>
          <div className="modal-hero-lines" aria-hidden />
          <span className="modal-emoji font-bangers">{project.emoji}</span>
          <span className="modal-bang-stamp font-luckiest anim-bang-in">
            {bang}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div style={{ padding: "26px 30px 30px" }}>
          <h3
            id={titleId}
            className="font-bangers"
            style={{
              fontSize: 34,
              letterSpacing: 2,
              margin: "0 0 12px",
              color: "#1A1A2E",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.55,
              margin: "0 0 16px",
            }}
          >
            {project.detail}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {project.tags.map((tg) => (
              <span
                key={tg}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  background: "#FFD23F",
                  border: "2px solid #1A1A2E",
                  borderRadius: 20,
                  padding: "3px 12px",
                }}
              >
                {tg}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn project-link-demo"
            >
              {labels.demoBtn}
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn project-link-github"
            >
              {labels.githubBtn}
            </a>
            <Link
              href={`/projects/${project.slug}?lang=${lang}`}
              className="project-link-btn project-link-story"
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
