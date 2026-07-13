"use client";

import { useEffect, useMemo, useState } from "react";
import { InfiniteMarquee } from "./InfiniteMarquee";
import { CharacterAvatar } from "./CharacterAvatar";
import { ProjectModal } from "./ProjectModal";
import { BugSquasher, HIGH_SCORE_KEY } from "./BugSquasher";
import { SiteNav } from "./SiteNav";
import { ContactForm } from "./ContactForm";
import {
  MODAL_BANGS,
  getContent,
  type Lang,
  type Project,
} from "@/lib/content";
import type { ProjectCategory } from "@/lib/projects";
import { usePersistedLang } from "@/hooks/usePersistedLang";
import { PORTFOLIO_SECTION_IDS, useScrollSpy } from "@/hooks/useScrollSpy";
import { useSfx } from "@/hooks/useSfx";

type LoaderPhase = "in" | "out" | "done";
type WipePhase = "idle" | "cover" | "reveal";
type ProjectFilter = "ALL" | ProjectCategory;

type ComicPortfolioProps = {
  defaultLang?: Lang;
};

const sectionTitleBase =
  "font-display text-[clamp(40px,6vw,64px)] tracking-[3px] text-stroke-ink -rotate-1 mb-9";

const comicCardBase =
  "border-4 border-ink rounded-2xl bg-white shadow-[6px_6px_0_#1a1a2e] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#1a1a2e]";

const contactBtnBase =
  "font-display inline-block rounded-xl border-4 border-ink px-6 py-3 text-base tracking-[2px] no-underline shadow-[4px_4px_0_#1a1a2e] transition-[transform,box-shadow,background,color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1a1a2e]";

export function ComicPortfolio({ defaultLang = "tr" }: ComicPortfolioProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const { muted, toggleMute, play } = useSfx();
  const [modalIndex, setModalIndex] = useState(-1);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>("in");
  const [wipePhase, setWipePhase] = useState<WipePhase>("idle");
  const [highScore, setHighScore] = useState(0);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("ALL");
  const activeSection = useScrollSpy(PORTFOLIO_SECTION_IDS);

  const content = getContent(lang);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "ALL") return content.projects;
    return content.projects.filter((p) => p.category === projectFilter);
  }, [content.projects, projectFilter]);

  const filterButtons: { id: ProjectFilter; label: string }[] = [
    { id: "ALL", label: content.filterAll },
    { id: "ACTION", label: content.filterAction },
    { id: "TECH", label: content.filterTech },
    { id: "FUN", label: content.filterFun },
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HIGH_SCORE_KEY);
      setHighScore(raw ? Number(raw) || 0 : 0);
    } catch {
      setHighScore(0);
    }
    const onHigh = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") setHighScore(detail);
    };
    window.addEventListener("bug-highscore", onHigh);
    return () => window.removeEventListener("bug-highscore", onHigh);
  }, []);

  useEffect(() => {
    const outTimer = window.setTimeout(() => setLoaderPhase("out"), 1100);
    const doneTimer = window.setTimeout(() => setLoaderPhase("done"), 1700);
    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  const toggleLang = () => {
    if (wipePhase !== "idle") return;
    play("whoosh");
    setWipePhase("cover");
    window.setTimeout(() => {
      setLang((prev) => (prev === "tr" ? "en" : "tr"));
      setWipePhase("reveal");
    }, 480);
    window.setTimeout(() => setWipePhase("idle"), 950);
  };

  const openProject = (index: number) => {
    play("pow");
    setModalIndex(index);
  };

  const modalProject: Project | null =
    modalIndex >= 0 ? content.projects[modalIndex] : null;
  const modalBang =
    modalIndex >= 0 ? MODAL_BANGS[modalIndex % MODAL_BANGS.length] : "";

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream font-body text-ink">
      {wipePhase !== "idle" && (
        <div
          className={`fixed inset-0 z-[150] flex items-center justify-center border-x-8 border-ink bg-dots-loader bg-comic-red ${
            wipePhase === "cover" ? "animate-wipe-in" : "animate-wipe-out"
          }`}
          aria-hidden
        >
          <div className="animate-bang-in font-display text-[clamp(60px,12vw,120px)] tracking-[4px] text-comic-yellow text-stroke-ink-xl [text-shadow:8px_8px_0_#1a1a2e]">
            {lang === "tr" ? "FLIP!" : "HOP!"}
          </div>
        </div>
      )}

      {loaderPhase !== "done" && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-[18px] bg-dots-loader bg-comic-yellow ${
            loaderPhase === "out" ? "animate-loader-out" : ""
          }`}
          aria-hidden
        >
          <div className="animate-loader-pop -rotate-[4deg] font-display text-[clamp(64px,14vw,140px)] tracking-[4px] text-comic-red text-stroke-ink-xl [text-shadow:8px_8px_0_#1a1a2e]">
            POW!
          </div>
          <div className="rotate-[2deg] rounded-xl border-4 border-ink bg-white px-5 py-2 font-stamp text-xl text-ink shadow-[4px_4px_0_#1a1a2e]">
            {content.loaderText}
          </div>
        </div>
      )}

      <div className={loaderPhase === "done" ? undefined : "animate-page-in"}>
        <SiteNav
          brandHref={`/?lang=${lang}`}
          langButton={content.langButton}
          onToggleLang={toggleLang}
          sound={{
            muted,
            onToggle: toggleMute,
            onLabel: content.soundOnLabel,
            offLabel: content.soundOffLabel,
          }}
          items={content.navItems.map((nv) => {
            const isRoute = nv.href.startsWith("/");
            const sectionId = nv.href.replace("#", "");
            return {
              label: nv.label,
              href: isRoute ? `${nv.href}?lang=${lang}` : nv.href,
              isActive: !isRoute && activeSection === sectionId,
            };
          })}
        />

        <header
          id="hero"
          className="border-b-[6px] border-ink bg-halftone-soft bg-cream px-4 py-20"
        >
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-10">
            <CharacterAvatar hiText={content.avatarHi} />
            <div className="max-w-[560px] text-center">
              <div className="relative mb-[18px] inline-block rounded-2xl border-4 border-ink bg-white px-[22px] py-2.5 text-lg font-bold shadow-[5px_5px_0_#1a1a2e]">
                {content.heroBubble}
                <div
                  className="absolute -bottom-4 left-10 size-0 border-t-16 border-r-1 border-l-[14px] border-t-ink border-r-transparent border-l-transparent"
                  aria-hidden
                />
                <div
                  className="absolute bottom-[-11px] left-[43px] size-0 border-t-12 border-r-1 border-l-[10px] border-t-white border-r-transparent border-l-transparent"
                  aria-hidden
                />
              </div>
              <h1 className="m-0 font-display text-[clamp(52px,9vw,104px)] leading-[0.95] tracking-[3px] text-comic-yellow text-stroke-ink-lg [text-shadow:6px_6px_0_#d62828,8px_8px_0_#1a1a2e]">
                EMRE
              </h1>
              <h2 className="mt-3.5 inline-block -rotate-[1.5deg] rounded-md bg-ink px-5 py-1.5 font-stamp text-[clamp(22px,4vw,36px)] text-white">
                {content.heroRole}
              </h2>
              <p className="mx-auto mb-7 mt-[22px] max-w-[440px] text-lg font-bold">
                {content.heroText}
              </p>
              <a
                href="#projeler"
                className="inline-block rounded-xl border-4 border-ink bg-comic-red px-6 py-3 font-display text-lg tracking-wide text-white no-underline shadow-[5px_5px_0_#1a1a2e] transition-[transform,box-shadow,background,color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-comic-red-dark hover:text-white hover:shadow-[7px_7px_0_#1a1a2e]"
              >
                {content.heroCta} →
              </a>
            </div>
          </div>
        </header>

        <InfiniteMarquee words={content.marqueeWords} duration={28} />

        <section id="hakkimda" className="mx-auto max-w-[1100px] px-4 py-20">
          <h2
            className={`${sectionTitleBase} mb-9 text-comic-red [text-shadow:4px_4px_0_#ffd23f]`}
          >
            {content.aboutTitle}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.aboutPanels.map((p) => (
              <div
                key={p.title}
                className={`${comicCardBase} p-6`}
                style={{
                  background: p.bg,
                  transform: `rotate(${p.rot}deg)`,
                }}
              >
                <div className="mb-2 font-stamp text-[40px]">{p.icon}</div>
                <h3 className="mb-2.5 font-display text-[26px] tracking-[2px] text-ink">
                  {p.title}
                </h3>
                <p className="m-0 text-base font-bold leading-normal">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projeler"
          className="border-y-[6px] border-ink bg-halftone-red bg-comic-yellow px-4 py-20"
        >
          <div className="mx-auto max-w-[1100px]">
            <h2
              className={`${sectionTitleBase} mb-3 text-white [text-shadow:5px_5px_0_#d62828]`}
            >
              {content.projectsTitle}
            </h2>
            <p className="mb-6 text-lg font-bold">{content.projectsSub}</p>
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
                const i = content.projects.findIndex((p) => p.slug === pr.slug);
                return (
                <button
                  key={pr.slug}
                  type="button"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-ink bg-white text-left shadow-[6px_6px_0_#1a1a2e] transition-[transform,box-shadow] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#1a1a2e] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-comic-yellow"
                  onClick={() => openProject(i)}
                  onMouseEnter={() => play("thwip")}
                  onFocus={() => play("thwip")}
                >
                  <span className="absolute left-1 top-2 z-10 -rotate-[8deg] rounded-[10px] border-2 border-ink bg-comic-yellow px-2.5 py-0.5 font-display text-[15px] tracking-wide text-comic-red opacity-0 shadow-[2px_2px_0_#1a1a2e] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
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
                ZAP! {lang === "tr" ? "Bu kategoride proje yok." : "No projects in this category."}
              </p>
            )}
          </div>
        </section>

        {modalProject && (
          <ProjectModal
            project={modalProject}
            bang={modalBang}
            lang={lang}
            labels={{
              demoBtn: content.demoBtn,
              githubBtn: content.githubBtn,
              caseStudyBtn: content.caseStudyBtn,
            }}
            onClose={() => setModalIndex(-1)}
            onCloseSound={() => play("zap")}
          />
        )}

        <section id="yetenekler" className="mx-auto max-w-[1100px] px-4 py-20">
          <h2
            className={`${sectionTitleBase} text-comic-teal [text-shadow:4px_4px_0_#d62828]`}
          >
            {content.skillsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.skills.map((sk) => (
              <div
                key={sk.name}
                className="group relative rounded-xl border-4 border-ink bg-white p-5 shadow-[4px_4px_0_#1a1a2e] transition-[transform,box-shadow,background] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:rotate-1 hover:bg-comic-cream-hot hover:shadow-[8px_8px_0_#1a1a2e]"
              >
                <span className="pointer-events-none absolute -right-2 -top-3 z-10 scale-75 -rotate-[12deg] rounded-lg border-[3px] border-ink bg-comic-red px-2 py-0.5 font-stamp text-sm text-white opacity-0 shadow-[2px_2px_0_#1a1a2e] transition-[opacity,transform] duration-200 group-hover:scale-100 group-hover:opacity-100">
                  POW!
                </span>
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-display text-[21px] tracking-wide">
                    {sk.name}
                  </span>
                  <span className="font-stamp text-[15px] text-comic-red transition-transform duration-200 group-hover:scale-110">
                    {sk.level}
                  </span>
                </div>
                <div className="h-[18px] overflow-hidden rounded-xl border-[3px] border-ink bg-cream">
                  <div
                    className="h-full rounded-lg bg-skill-stripes transition-[width,filter] duration-500 group-hover:brightness-110"
                    style={{ width: sk.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="deneyim"
          className="border-t-[6px] border-ink bg-halftone-soft bg-cream px-4 py-20"
        >
          <div className="mx-auto max-w-[800px]">
            <h2
              className={`${sectionTitleBase} mb-11 text-comic-red [text-shadow:4px_4px_0_#4cb5ae]`}
            >
              {content.timelineTitle}
            </h2>
            <div className="relative flex flex-col pl-[34px]">
              {/* Dashed timeline from first dot to last */}
              <div
                className="absolute bottom-[15px] left-[11px] top-[15px] w-0 border-l-[5px] border-dashed border-ink"
                aria-hidden
              />
              {content.timeline.map((tl, index) => (
                <div
                  key={tl.title}
                  className={`relative ${index === content.timeline.length - 1 ? "pb-0" : "pb-9"}`}
                >
                  <div
                    className="absolute -left-[52px] top-0 z-[1] size-[30px] rounded-full border-4 border-ink shadow-[3px_3px_0_#1a1a2e]"
                    style={{ background: tl.dotBg }}
                  />
                  <div
                    className={`${comicCardBase} p-5 transition-transform duration-150 hover:rotate-0 hover:translate-x-1.5`}
                    style={{ transform: `rotate(${tl.rot}deg)` }}
                  >
                    <span className="inline-block rounded-[20px] bg-ink px-3 py-[3px] font-display text-base tracking-wide text-comic-yellow">
                      {tl.year}
                    </span>
                    <h3 className="my-2.5 mb-1.5 font-display text-2xl tracking-[1.5px] text-comic-red">
                      {tl.title}
                    </h3>
                    <p className="m-0 text-[15px] font-bold leading-normal">
                      {tl.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BugSquasher
          title={content.gameTitle}
          sub={content.gameSub}
          startLabel={content.gameStart}
          againLabel={content.gameAgain}
          scoreLabel={content.gameScore}
          highLabel={content.gameHigh}
          timeLabel={content.gameTime}
          resultLabel={content.gameResult}
        />

        <section
          id="iletisim"
          className="border-t-[6px] border-ink bg-halftone-yellow bg-comic-red px-4 py-[90px] pb-[100px] text-center"
        >
          <div className="mx-auto max-w-[640px]">
            <div className="mb-5 inline-block -rotate-[3deg] animate-wiggle-slow rounded-[14px] border-4 border-ink bg-comic-yellow px-6 py-2.5 font-stamp text-[30px] text-comic-red shadow-[5px_5px_0_#1a1a2e]">
              {content.contactBang}
            </div>
            <h2 className="mb-4 font-display text-[clamp(42px,7vw,72px)] tracking-[3px] text-white text-stroke-ink [text-shadow:5px_5px_0_#1a1a2e]">
              {content.contactTitle}
            </h2>
            <p className="mb-8 text-lg font-bold text-white">
              {content.contactText}
            </p>
            <ContactForm
              labels={{
                name: content.formName,
                email: content.formEmail,
                message: content.formMessage,
                send: content.formSend,
                sending: content.formSending,
                success: content.formSuccess,
                error: content.formError,
                namePh: content.formNamePh,
                emailPh: content.formEmailPh,
                messagePh: content.formMessagePh,
              }}
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:emre@example.com"
                className={`${contactBtnBase} bg-white text-comic-red hover:bg-comic-cream-hot hover:text-comic-red-dark`}
              >
                ✉ E-POSTA
              </a>
              <a
                href="#"
                className={`${contactBtnBase} bg-ink text-comic-yellow hover:bg-comic-red-dark hover:text-white`}
              >
                GITHUB
              </a>
              <a
                href="#"
                className={`${contactBtnBase} bg-comic-teal text-white hover:bg-comic-orange hover:text-ink`}
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-ink p-5 text-center font-display text-lg tracking-[2px] text-comic-yellow">
          {content.footerText}
        </footer>
      </div>
    </div>
  );
}
