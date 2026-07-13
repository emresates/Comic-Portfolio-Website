"use client";

import Link from "next/link";
import { getContent, type Lang, type Project } from "@/lib/content";
import { getCaseStudy } from "@/lib/projects";
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
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 20px",
          background: "#FFD23F",
          borderBottom: "4px solid #1A1A2E",
          boxShadow: "0 4px 0 rgba(26,26,46,0.25)",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/?lang=${lang}`}
          className="font-bangers"
          style={{
            fontSize: 28,
            letterSpacing: 2,
            background: "#D62828",
            color: "#fff",
            padding: "4px 14px",
            border: "3px solid #1A1A2E",
            borderRadius: 8,
            transform: "rotate(-2deg)",
            boxShadow: "3px 3px 0 #1A1A2E",
            textDecoration: "none",
          }}
        >
          EMRE!
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Link href={`/?lang=${lang}`} className="nav-link">
            {content.backBtn}
          </Link>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLang((prev) => (prev === "tr" ? "en" : "tr"))}
          >
            {content.langButton}
          </button>
        </div>
      </nav>

      <header
        style={{
          padding: "56px 24px 48px",
          background: `radial-gradient(circle, rgba(26,26,46,0.2) 1.6px, transparent 1.6px) 0 0 / 18px 18px, ${localized.bg}`,
          borderBottom: "6px solid #1A1A2E",
          textAlign: "center",
        }}
      >
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
      </header>

      <section style={{ padding: "64px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <h2
          className="font-bangers"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: 3,
            color: "#D62828",
            WebkitTextStroke: "2px #1A1A2E",
            textShadow: "4px 4px 0 #FFD23F",
            margin: "0 0 28px",
            transform: "rotate(-1deg)",
          }}
        >
          {lang === "tr" ? "HİKAYE ŞERİDİ" : "STORY STRIP"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
          }}
        >
          {caseStudy.panels.map((panel, index) => (
            <article
              key={panel.label}
              className="case-panel"
              style={{
                background: panel.bg,
                transform: `rotate(${panel.rot}deg)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span
                  className="font-bangers"
                  style={{
                    fontSize: 14,
                    letterSpacing: 1,
                    background: "#1A1A2E",
                    color: "#FFD23F",
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {panel.label}
                </span>
                <span
                  className="font-bangers"
                  style={{
                    fontSize: 18,
                    background: "#fff",
                    border: "3px solid #1A1A2E",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "2px 2px 0 #1A1A2E",
                  }}
                >
                  {index + 1}
                </span>
              </div>
              <h3
                className="font-bangers"
                style={{
                  fontSize: 26,
                  letterSpacing: 1.5,
                  margin: "0 0 10px",
                  color: "#1A1A2E",
                }}
              >
                {panel.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                {panel.text}
              </p>
            </article>
          ))}
        </div>
      </section>

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
          {lang === "tr" ? "Devamını yaşamak ister misin?" : "Want to live the sequel?"}
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
