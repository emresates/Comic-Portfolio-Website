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
    <div
      className="font-comic"
      style={{
        background: "#F9E9C8",
        color: "#1A1A2E",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
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
        className="comic-cover"
        style={{
          padding: "56px 24px 48px",
          background: `radial-gradient(circle, rgba(26,26,46,0.2) 1.6px, transparent 1.6px) 0 0 / 18px 18px, ${localized.bg}`,
          borderBottom: "6px solid #1A1A2E",
          textAlign: "center",
        }}
      >
        <div className="comic-cover__halftone" aria-hidden />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="font-bangers"
            style={{
              display: "inline-block",
              fontSize: 16,
              letterSpacing: 2,
              color: "#FFD23F",
              background: "#1A1A2E",
              border: "3px solid #1A1A2E",
              padding: "4px 14px",
              marginBottom: 14,
              transform: "rotate(-2deg)",
            }}
          >
            {content.issueLabel} #{issueNum}
          </div>
          <div
            className="font-luckiest anim-wiggle-slow"
            style={{
              display: "inline-block",
              fontSize: 28,
              color: "#fff",
              background: "#1A1A2E",
              border: "4px solid #1A1A2E",
              padding: "8px 18px",
              borderRadius: 12,
              transform: "rotate(-3deg)",
              boxShadow: "4px 4px 0 rgba(26,26,46,0.35)",
              marginBottom: 16,
            }}
          >
            {caseStudy.bang}
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1,
              marginBottom: 12,
              filter: "drop-shadow(4px 4px 0 #1A1A2E)",
            }}
          >
            {localized.emoji}
          </div>
          <h1
            className="font-bangers"
            style={{
              fontSize: "clamp(42px, 8vw, 80px)",
              letterSpacing: 3,
              margin: "0 0 12px",
              color: "#FFD23F",
              WebkitTextStroke: "3px #1A1A2E",
              textShadow: "5px 5px 0 #1A1A2E",
            }}
          >
            {localized.title}
          </h1>
          <p
            style={{
              maxWidth: 640,
              margin: "0 auto 20px",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#fff",
              textShadow: "2px 2px 0 #1A1A2E",
            }}
          >
            {caseStudy.summary}
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <span
              className="font-bangers"
              style={{
                background: "#fff",
                border: "3px solid #1A1A2E",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 15,
                letterSpacing: 1,
              }}
            >
              {caseStudy.role}
            </span>
            <span
              className="font-bangers"
              style={{
                background: "#1A1A2E",
                color: "#FFD23F",
                border: "3px solid #1A1A2E",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 15,
                letterSpacing: 1,
              }}
            >
              {caseStudy.year}
            </span>
            {localized.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  background: "#FFD23F",
                  border: "2px solid #1A1A2E",
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={localized.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn project-link-demo"
              style={{ fontSize: 20, padding: "10px 22px" }}
            >
              {content.demoBtn}
            </a>
            <a
              href={localized.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn project-link-github"
              style={{ fontSize: 20, padding: "10px 22px" }}
            >
              {content.githubBtn}
            </a>
          </div>
        </div>
      </header>

      <div className="issue-bar">
        <span className="issue-chip">
          {content.issueLabel} #{issueNum}
        </span>
        <nav className="issue-nav" aria-label="Issues">
          {prevSlug && prevProject ? (
            <Link href={`/projects/${prevSlug}?lang=${lang}`}>
              {content.prevIssue}
              <span style={{ display: "block", fontSize: 12, opacity: 0.75 }}>
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <span className="is-disabled">{content.prevIssue}</span>
          )}
          {nextSlug && nextProject ? (
            <Link href={`/projects/${nextSlug}?lang=${lang}`}>
              {content.nextIssue}
              <span style={{ display: "block", fontSize: 12, opacity: 0.75 }}>
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <span className="is-disabled">{content.nextIssue}</span>
          )}
        </nav>
      </div>

      <ComicStrip
        panels={caseStudy.panels}
        bang={caseStudy.bang}
        stripTitle={content.stripTitle}
      />

      <section
        style={{
          padding: "48px 24px 72px",
          background:
            "radial-gradient(circle, rgba(214,40,40,0.18) 2px, transparent 2px) 0 0 / 22px 22px, #FFD23F",
          borderTop: "6px solid #1A1A2E",
          textAlign: "center",
        }}
      >
        <p
          className="font-luckiest"
          style={{ fontSize: 22, margin: "0 0 18px", color: "#1A1A2E" }}
        >
          {content.sequelCta}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={localized.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn project-link-demo"
            style={{ fontSize: 20, padding: "12px 24px" }}
          >
            {content.demoBtn}
          </a>
          <a
            href={localized.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn project-link-github"
            style={{ fontSize: 20, padding: "12px 24px" }}
          >
            {content.githubBtn}
          </a>
          <Link
            href={`/?lang=${lang}#projeler`}
            className="project-link-btn project-link-story"
            style={{ fontSize: 20, padding: "12px 24px" }}
          >
            {content.backBtn}
          </Link>
        </div>
      </section>

      <footer
        className="font-bangers"
        style={{
          background: "#1A1A2E",
          color: "#FFD23F",
          textAlign: "center",
          padding: 20,
          fontSize: 18,
          letterSpacing: 2,
        }}
      >
        {content.footerText}
      </footer>
    </div>
  );
}
