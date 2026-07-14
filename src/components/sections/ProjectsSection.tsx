"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { ProjectModal } from "../ProjectModal";
import { MODAL_BANGS, getProjects, type Project } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { ProjectCategory } from "@/lib/projects";
import type { SfxName } from "@/lib/sfx";
import { sectionTitleBase } from "./shared";

type ProjectFilter = "ALL" | ProjectCategory;

type ProjectsSectionProps = {
  play: (name: SfxName) => void;
};

export function ProjectsSection({ play }: ProjectsSectionProps) {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations("common");
  const tProjects = useTranslations("projects");

  const [modalIndex, setModalIndex] = useState(-1);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("ALL");

  const projects = useMemo(() => getProjects(locale), [locale]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "ALL") return projects;
    return projects.filter((p) => p.category === projectFilter);
  }, [projects, projectFilter]);

  const filterButtons: { id: ProjectFilter; label: string }[] = [
    { id: "ALL", label: tProjects("filters.all") },
    { id: "ACTION", label: tProjects("filters.action") },
    { id: "TECH", label: tProjects("filters.tech") },
    { id: "FUN", label: tProjects("filters.fun") },
  ];

  const openProject = (index: number) => {
    play("pow");
    setModalIndex(index);
  };

  const modalProject: Project | null =
    modalIndex >= 0 ? projects[modalIndex] : null;
  const modalBang =
    modalIndex >= 0 ? MODAL_BANGS[modalIndex % MODAL_BANGS.length] : "";

  return (
    <>
      <section
        id="projeler"
        className="border-y-[6px] border-ink bg-halftone-red bg-comic-yellow px-4 py-20"
      >
        <div className="mx-auto max-w-[1100px]">
          <h2
            className={`${sectionTitleBase} mb-3 text-white [text-shadow:5px_5px_0_#d62828]`}
          >
            {tProjects("title")}
          </h2>
          <p className="mb-6 text-lg font-bold">{tProjects("sub")}</p>
          <div
            className="mb-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Project filters"
          >
            {filterButtons.map((btn) => {
              const active = projectFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => {
                    play("click");
                    setProjectFilter(btn.id);
                  }}
                  className={`rounded-xl border-[3px] border-ink px-3.5 py-2 font-display text-base tracking-wide shadow-[3px_3px_0_#1a1a2e] transition-[transform,background,color] ${
                    active
                      ? "bg-ink text-comic-yellow"
                      : "bg-white text-ink hover:-translate-x-px hover:-translate-y-px hover:bg-comic-cream-hot"
                  }`}
                  aria-pressed={active}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((pr) => {
              const i = projects.findIndex((p) => p.slug === pr.slug);
              return (
                <button
                  key={pr.slug}
                  type="button"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-ink bg-white text-left shadow-[6px_6px_0_#1a1a2e] transition-[transform,box-shadow] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#1a1a2e] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-comic-yellow"
                  onClick={() => openProject(i)}
                  onMouseEnter={() => play("thwip")}
                  onFocus={() => play("thwip")}
                >
                  <span className="absolute left-1 top-2 z-10 rotate-[-8deg] rounded-[10px] border-2 border-ink bg-comic-yellow px-2.5 py-0.5 font-display text-[15px] tracking-wide text-comic-red opacity-0 shadow-[2px_2px_0_#1a1a2e] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {MODAL_BANGS[i % MODAL_BANGS.length]}
                  </span>
                  <div
                    className="relative flex h-[150px] items-center justify-center border-b-4 border-ink"
                    style={{ background: pr.bg }}
                  >
                    <span className="absolute bottom-2 left-2.5 z-10 rounded-[20px] border-2 border-ink bg-white px-2.5 py-0.5 font-display text-xs tracking-wide text-ink">
                      {pr.category}
                    </span>
                    <span className="font-display text-[54px] text-white text-stroke-ink [text-shadow:4px_4px_0_rgba(26,26,46,0.5)]">
                      {pr.emoji}
                    </span>
                    <span className="absolute right-2.5 top-2.5 rounded-[20px] bg-ink px-2.5 py-[3px] font-display text-[15px] tracking-wide text-comic-yellow">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="px-5 py-[18px]">
                    <h3 className="mb-2 font-display text-2xl tracking-[1.5px] text-comic-red">
                      {pr.title}
                    </h3>
                    <p className="mb-3 text-[15px] font-bold leading-snug">
                      {pr.blurb}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {pr.tags.map((tg) => (
                        <span
                          key={tg}
                          className="rounded-[20px] border-2 border-ink bg-comic-yellow px-2.5 py-0.5 text-xs font-bold"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {filteredProjects.length === 0 && (
            <p className="rounded-xl border-4 border-ink bg-white p-6 text-center font-stamp text-xl text-ink shadow-[5px_5px_0_#1a1a2e]">
              ZAP! {tCommon("emptyFilter")}
            </p>
          )}
        </div>
      </section>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          bang={modalBang}
          labels={{
            demoBtn: tProjects("demoBtn"),
            githubBtn: tProjects("githubBtn"),
            caseStudyBtn: tProjects("caseStudyBtn"),
          }}
          onClose={() => setModalIndex(-1)}
          onCloseSound={() => play("zap")}
        />
      )}
    </>
  );
}
