"use client";

import Link from "next/link";
import { ComicStrip } from "./ComicStrip";
import { SiteNav } from "./SiteNav";
import { getContent, type Lang, type Project } from "@/lib/content";
import { getCaseStudy, PROJECT_SLUGS } from "@/lib/projects";
import { usePersistedLang } from "@/hooks/usePersistedLang";

type ProjectCaseStudyProps = {
  project: Project;
  defaultLang?: Lang;
};

const linkBase =
  "font-display inline-block rounded-[10px] border-[3px] border-ink tracking-wide no-underline transition-[transform,box-shadow,background,color] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 max-[860px]:px-3.5 max-[860px]:py-2.5 max-[860px]:text-[15px]";

const issueNavLink =
  "font-display text-base tracking-wide no-underline text-ink bg-white border-[3px] border-ink rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0_#1a1a2e] transition-[transform,box-shadow,background] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-comic-yellow hover:text-ink hover:shadow-[5px_5px_0_#1a1a2e] max-[760px]:w-full max-[760px]:text-center";

const issueNavDisabled =
  "font-display text-base tracking-wide text-ink bg-white border-[3px] border-ink rounded-lg px-3.5 py-1.5 opacity-40 pointer-events-none shadow-none max-[760px]:w-full max-[760px]:text-center";

export function ProjectCaseStudy({
  project,
  defaultLang = "tr",
}: ProjectCaseStudyProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const content = getContent(lang);
  const localized =
    content.projects.find((p) => p.slug === project.slug) ?? project;
  const caseStudy = getCaseStudy(project.slug, lang);

  if (!caseStudy) return null;

  const issueIndex = PROJECT_SLUGS.indexOf(project.slug);
  const issueNum = String(Math.max(issueIndex, 0) + 1).padStart(2, "0");
  const prevSlug = issueIndex > 0 ? PROJECT_SLUGS[issueIndex - 1] : null;
  const nextSlug =
    issueIndex >= 0 && issueIndex < PROJECT_SLUGS.length - 1
      ? PROJECT_SLUGS[issueIndex + 1]
      : null;
  const prevProject = prevSlug
    ? content.projects.find((p) => p.slug === prevSlug)
    : null;
  const nextProject = nextSlug
    ? content.projects.find((p) => p.slug === nextSlug)
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream font-body text-ink">
      <SiteNav
        brandHref={`/?lang=${lang}`}
        langButton={content.langButton}
        onToggleLang={() => setLang((prev) => (prev === "tr" ? "en" : "tr"))}
        items={[
          { label: content.backBtn, href: `/?lang=${lang}` },
          { label: content.blogNav, href: `/blog?lang=${lang}` },
        ]}
      />

      <header
        className="relative overflow-hidden border-b-[6px] border-ink px-6 pt-14 pb-12 text-center"
        style={{ background: localized.bg }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-halftone-dark"
          aria-hidden
        />
        <div className="relative z-1">
          <div className="mb-3.5 inline-block -rotate-2 border-[3px] border-ink bg-ink px-3.5 py-1 font-display text-base tracking-[2px] text-comic-yellow">
            {content.issueLabel} #{issueNum}
          </div>
          <div className="mb-4 inline-block -rotate-3 animate-wiggle-slow rounded-xl border-4 border-ink bg-ink px-[18px] py-2 font-stamp text-[28px] text-white shadow-[4px_4px_0_rgba(26,26,46,0.35)]">
            {caseStudy.bang}
          </div>
          <div className="mb-3 text-[72px] leading-none drop-shadow-[4px_4px_0_#1a1a2e]">
            {localized.emoji}
          </div>
          <h1 className="m-0 mb-3 font-display text-[clamp(42px,8vw,80px)] tracking-[3px] text-comic-yellow text-stroke-ink-lg [text-shadow:5px_5px_0_#1a1a2e]">
            {localized.title}
          </h1>
          <p className="mx-auto mb-5 max-w-[640px] text-lg font-bold leading-normal text-white [text-shadow:2px_2px_0_#1a1a2e]">
            {caseStudy.summary}
          </p>
          <div className="mb-[18px] flex flex-wrap justify-center gap-2.5">
            <span className="rounded-[20px] border-[3px] border-ink bg-white px-3.5 py-1 font-display text-[15px] tracking-wide">
              {caseStudy.role}
            </span>
            <span className="rounded-[20px] border-[3px] border-ink bg-ink px-3.5 py-1 font-display text-[15px] tracking-wide text-comic-yellow">
              {caseStudy.year}
            </span>
            {localized.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[20px] border-2 border-ink bg-comic-yellow px-3 py-1 text-[13px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={localized.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} bg-comic-red px-[22px] py-2.5 text-xl text-white shadow-[3px_3px_0_#1a1a2e] hover:bg-comic-red-dark hover:text-white hover:shadow-[5px_5px_0_#1a1a2e]`}
            >
              {content.demoBtn}
            </a>
            <a
              href={localized.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} bg-ink px-[22px] py-2.5 text-xl text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.45)] hover:text-white hover:shadow-[5px_5px_0_rgba(26,26,46,0.45)]`}
            >
              {content.githubBtn}
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-4 flex max-w-[960px] flex-wrap items-center justify-between gap-3 px-5 pb-7 max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:px-3 max-[760px]:pb-5">
        <span className="rounded-lg border-[3px] border-ink bg-ink px-3.5 py-1.5 font-display text-lg tracking-[2px] text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.35)]">
          {content.issueLabel} #{issueNum}
        </span>
        <nav
          className="flex flex-wrap gap-2.5 max-[760px]:flex-col"
          aria-label="Issues"
        >
          {prevSlug && prevProject ? (
            <Link
              href={`/projects/${prevSlug}?lang=${lang}`}
              className={issueNavLink}
            >
              {content.prevIssue}
              <span className="block text-xs opacity-75">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <span className={issueNavDisabled}>{content.prevIssue}</span>
          )}
          {nextSlug && nextProject ? (
            <Link
              href={`/projects/${nextSlug}?lang=${lang}`}
              className={issueNavLink}
            >
              {content.nextIssue}
              <span className="block text-xs opacity-75">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <span className={issueNavDisabled}>{content.nextIssue}</span>
          )}
        </nav>
      </div>

      <ComicStrip
        panels={caseStudy.panels}
        bang={caseStudy.bang}
        stripTitle={content.stripTitle}
      />

      <section className="border-t-[6px] border-ink bg-comic-yellow bg-halftone-red px-6 py-12 pb-[72px] text-center">
        <p className="m-0 mb-[18px] font-stamp text-[22px] text-ink">
          {content.sequelCta}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={localized.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} bg-comic-red px-6 py-3 text-xl text-white shadow-[3px_3px_0_#1a1a2e] hover:bg-comic-red-dark hover:text-white hover:shadow-[5px_5px_0_#1a1a2e]`}
          >
            {content.demoBtn}
          </a>
          <a
            href={localized.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} bg-ink px-6 py-3 text-xl text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.45)] hover:text-white hover:shadow-[5px_5px_0_rgba(26,26,46,0.45)]`}
          >
            {content.githubBtn}
          </a>
          <Link
            href={`/?lang=${lang}#projeler`}
            className={`${linkBase} bg-comic-yellow px-6 py-3 text-xl text-ink shadow-[3px_3px_0_#1a1a2e] hover:bg-white hover:text-comic-red hover:shadow-[5px_5px_0_#1a1a2e]`}
          >
            {content.backBtn}
          </Link>
        </div>
      </section>

      <footer className="bg-ink py-5 text-center font-display text-lg tracking-[2px] text-comic-yellow">
        {content.footerText}
      </footer>
    </div>
  );
}
