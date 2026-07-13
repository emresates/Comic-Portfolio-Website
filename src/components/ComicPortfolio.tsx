"use client";

import { useEffect, useState } from "react";
import { CharacterAvatar } from "./CharacterAvatar";
import { ProjectModal } from "./ProjectModal";
import {
  MODAL_BANGS,
  getContent,
  type Lang,
  type Project,
} from "@/lib/content";
import { usePersistedLang } from "@/hooks/usePersistedLang";
import {
  PORTFOLIO_SECTION_IDS,
  useScrollSpy,
} from "@/hooks/useScrollSpy";
import { useSfx } from "@/hooks/useSfx";

type LoaderPhase = "in" | "out" | "done";
type WipePhase = "idle" | "cover" | "reveal";

type ComicPortfolioProps = {
  defaultLang?: Lang;
};

export function ComicPortfolio({ defaultLang = "tr" }: ComicPortfolioProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const { muted, toggleMute, play } = useSfx();
  const [modalIndex, setModalIndex] = useState(-1);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>("in");
  const [wipePhase, setWipePhase] = useState<WipePhase>("idle");
  const activeSection = useScrollSpy(PORTFOLIO_SECTION_IDS);

  const content = getContent(lang);

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

  const marqueeWords = [...content.marqueeWords, ...content.marqueeWords];

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
      {wipePhase !== "idle" && (
        <div
          className={wipePhase === "cover" ? "anim-wipe-in" : "anim-wipe-out"}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            background:
              "radial-gradient(circle, rgba(26,26,46,0.25) 2.4px, transparent 2.4px) 0 0 / 20px 20px, #D62828",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "8px solid #1A1A2E",
            borderLeft: "8px solid #1A1A2E",
          }}
          aria-hidden
        >
          <div
            className="font-bangers anim-bang-in"
            style={{
              fontSize: "clamp(60px, 12vw, 120px)",
              letterSpacing: 4,
              color: "#FFD23F",
              WebkitTextStroke: "4px #1A1A2E",
              textShadow: "8px 8px 0 #1A1A2E",
            }}
          >
            {lang === "tr" ? "FLIP!" : "HOP!"}
          </div>
        </div>
      )}

      {loaderPhase !== "done" && (
        <div
          className={loaderPhase === "out" ? "anim-loader-out" : undefined}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background:
              "radial-gradient(circle, rgba(26,26,46,0.25) 2.4px, transparent 2.4px) 0 0 / 20px 20px, #FFD23F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 18,
          }}
          aria-hidden
        >
          <div
            className="font-bangers anim-loader-pop"
            style={{
              fontSize: "clamp(64px, 14vw, 140px)",
              letterSpacing: 4,
              color: "#D62828",
              WebkitTextStroke: "4px #1A1A2E",
              textShadow: "8px 8px 0 #1A1A2E",
              transform: "rotate(-4deg)",
            }}
          >
            POW!
          </div>
          <div
            className="font-luckiest"
            style={{
              fontSize: 20,
              color: "#1A1A2E",
              background: "#fff",
              border: "4px solid #1A1A2E",
              borderRadius: 12,
              padding: "8px 20px",
              boxShadow: "4px 4px 0 #1A1A2E",
              transform: "rotate(2deg)",
            }}
          >
            {content.loaderText}
          </div>
        </div>
      )}

      <div className={loaderPhase === "done" ? undefined : "anim-page-in"}>
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
          <div
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
            }}
          >
            EMRE!
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {content.navItems.map((nv) => {
              const sectionId = nv.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={nv.href}
                  href={nv.href}
                  className={`nav-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {nv.label}
                </a>
              );
            })}
            <button
              type="button"
              className={`sfx-btn${muted ? " is-muted" : ""}`}
              onClick={toggleMute}
              aria-pressed={muted}
              title={muted ? content.soundOffLabel : content.soundOnLabel}
            >
              {muted ? "🔇" : "🔊"} {muted ? content.soundOffLabel : content.soundOnLabel}
            </button>
            <button type="button" onClick={toggleLang} className="lang-btn">
              {content.langButton}
            </button>
          </div>
        </nav>

        <header
          id="hero"
          style={{
            position: "relative",
            padding: "70px 24px 90px",
            background:
              "radial-gradient(circle, #1A1A2E 1.6px, transparent 1.6px) 0 0 / 18px 18px, #4CB5AE",
            borderBottom: "6px solid #1A1A2E",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CharacterAvatar />
            <div style={{ maxWidth: 560, textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "#fff",
                  border: "4px solid #1A1A2E",
                  borderRadius: 16,
                  padding: "10px 22px",
                  fontWeight: 700,
                  fontSize: 18,
                  boxShadow: "5px 5px 0 #1A1A2E",
                  position: "relative",
                  marginBottom: 18,
                }}
              >
                {content.heroBubble}
                <div
                  style={{
                    position: "absolute",
                    bottom: -16,
                    left: 40,
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "16px solid #1A1A2E",
                  }}
                />
              </div>
              <h1
                className="font-bangers"
                style={{
                  fontSize: "clamp(52px, 9vw, 104px)",
                  lineHeight: 0.95,
                  margin: 0,
                  color: "#FFD23F",
                  WebkitTextStroke: "3px #1A1A2E",
                  textShadow: "6px 6px 0 #D62828, 8px 8px 0 #1A1A2E",
                  letterSpacing: 3,
                }}
              >
                EMRE
              </h1>
              <h2
                className="font-luckiest"
                style={{
                  fontSize: "clamp(22px, 4vw, 36px)",
                  margin: "14px 0 0",
                  color: "#fff",
                  background: "#1A1A2E",
                  display: "inline-block",
                  padding: "6px 20px",
                  transform: "rotate(-1.5deg)",
                  borderRadius: 6,
                }}
              >
                {content.heroRole}
              </h2>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "22px auto 28px",
                  maxWidth: 440,
                }}
              >
                {content.heroText}
              </p>
              <a href="#projeler" className="hero-cta">
                {content.heroCta} →
              </a>
            </div>
          </div>
        </header>

        <div
          style={{
            background: "#1A1A2E",
            borderBottom: "6px solid #1A1A2E",
            overflow: "hidden",
            padding: "10px 0",
          }}
        >
          <div
            className="anim-marquee"
            style={{
              display: "flex",
              gap: 40,
              whiteSpace: "nowrap",
              width: "max-content",
            }}
          >
            {marqueeWords.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="font-bangers"
                style={{
                  fontSize: 22,
                  letterSpacing: 3,
                  color: "#FFD23F",
                }}
              >
                {w} ✦
              </span>
            ))}
          </div>
        </div>

        <section
          id="hakkimda"
          style={{
            padding: "80px 24px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <h2
            className="font-bangers"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: 3,
              color: "#D62828",
              WebkitTextStroke: "2px #1A1A2E",
              textShadow: "4px 4px 0 #FFD23F",
              margin: "0 0 36px",
              transform: "rotate(-1deg)",
            }}
          >
            {content.aboutTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {content.aboutPanels.map((p) => (
              <div
                key={p.title}
                className="about-card"
                style={{
                  background: p.bg,
                  transform: `rotate(${p.rot}deg)`,
                }}
              >
                <div
                  className="font-luckiest"
                  style={{ fontSize: 40, marginBottom: 8 }}
                >
                  {p.icon}
                </div>
                <h3
                  className="font-bangers"
                  style={{
                    fontSize: 26,
                    letterSpacing: 2,
                    margin: "0 0 10px",
                    color: "#1A1A2E",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projeler"
          style={{
            padding: "80px 24px",
            background:
              "radial-gradient(circle, rgba(214,40,40,0.18) 2px, transparent 2px) 0 0 / 22px 22px, #FFD23F",
            borderTop: "6px solid #1A1A2E",
            borderBottom: "6px solid #1A1A2E",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2
              className="font-bangers"
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                letterSpacing: 3,
                color: "#fff",
                WebkitTextStroke: "2px #1A1A2E",
                textShadow: "5px 5px 0 #D62828",
                margin: "0 0 12px",
                transform: "rotate(-1deg)",
              }}
            >
              {content.projectsTitle}
            </h2>
            <p style={{ fontWeight: 700, fontSize: 18, margin: "0 0 36px" }}>
              {content.projectsSub}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 26,
              }}
            >
              {content.projects.map((pr, i) => (
                <button
                  key={pr.title}
                  type="button"
                  className="project-card"
                  onClick={() => openProject(i)}
                  onMouseEnter={() => play("thwip")}
                  onFocus={() => play("thwip")}
                >
                  <span className="card-bang">
                    {MODAL_BANGS[i % MODAL_BANGS.length]}
                  </span>
                  <div
                    style={{
                      height: 150,
                      background: pr.bg,
                      borderBottom: "4px solid #1A1A2E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      className="font-bangers"
                      style={{
                        fontSize: 54,
                        color: "#fff",
                        WebkitTextStroke: "2px #1A1A2E",
                        textShadow: "4px 4px 0 rgba(26,26,46,0.5)",
                      }}
                    >
                      {pr.emoji}
                    </span>
                    <span
                      className="font-bangers"
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontSize: 15,
                        letterSpacing: 1,
                        background: "#1A1A2E",
                        color: "#FFD23F",
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <h3
                      className="font-bangers"
                      style={{
                        fontSize: 24,
                        letterSpacing: 1.5,
                        margin: "0 0 8px",
                        color: "#D62828",
                      }}
                    >
                      {pr.title}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontWeight: 700,
                        fontSize: 15,
                        lineHeight: 1.45,
                      }}
                    >
                      {pr.blurb}
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {pr.tags.map((tg) => (
                        <span
                          key={tg}
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            background: "#FFD23F",
                            border: "2px solid #1A1A2E",
                            borderRadius: 20,
                            padding: "2px 10px",
                          }}
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
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

        <section
          id="yetenekler"
          style={{
            padding: "80px 24px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <h2
            className="font-bangers"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: 3,
              color: "#4CB5AE",
              WebkitTextStroke: "2px #1A1A2E",
              textShadow: "4px 4px 0 #D62828",
              margin: "0 0 36px",
              transform: "rotate(-1deg)",
            }}
          >
            {content.skillsTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {content.skills.map((sk) => (
              <div key={sk.name} className="skill-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    className="font-bangers"
                    style={{ fontSize: 21, letterSpacing: 1 }}
                  >
                    {sk.name}
                  </span>
                  <span
                    className="font-luckiest"
                    style={{ fontSize: 15, color: "#D62828" }}
                  >
                    {sk.level}
                  </span>
                </div>
                <div
                  style={{
                    height: 18,
                    background: "#F9E9C8",
                    border: "3px solid #1A1A2E",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <div className="skill-fill" style={{ width: sk.pct }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="deneyim"
          style={{
            padding: "80px 24px",
            background:
              "radial-gradient(circle, rgba(26,26,46,0.12) 2px, transparent 2px) 0 0 / 20px 20px, #F9E9C8",
            borderTop: "6px solid #1A1A2E",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2
              className="font-bangers"
              style={{
                fontSize: "clamp(40px, 6vw, 64px)",
                letterSpacing: 3,
                color: "#D62828",
                WebkitTextStroke: "2px #1A1A2E",
                textShadow: "4px 4px 0 #4CB5AE",
                margin: "0 0 44px",
                transform: "rotate(-1deg)",
              }}
            >
              {content.timelineTitle}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                position: "relative",
                paddingLeft: 34,
                borderLeft: "5px dashed #1A1A2E",
              }}
            >
              {content.timeline.map((tl) => (
                <div
                  key={tl.title}
                  style={{ position: "relative", paddingBottom: 36 }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: -52,
                      top: 0,
                      width: 30,
                      height: 30,
                      background: tl.dotBg,
                      border: "4px solid #1A1A2E",
                      borderRadius: "50%",
                      boxShadow: "3px 3px 0 #1A1A2E",
                    }}
                  />
                  <div
                    className="timeline-card"
                    style={{ transform: `rotate(${tl.rot}deg)` }}
                  >
                    <span
                      className="font-bangers"
                      style={{
                        fontSize: 16,
                        letterSpacing: 1,
                        background: "#1A1A2E",
                        color: "#FFD23F",
                        padding: "3px 12px",
                        borderRadius: 20,
                      }}
                    >
                      {tl.year}
                    </span>
                    <h3
                      className="font-bangers"
                      style={{
                        fontSize: 24,
                        letterSpacing: 1.5,
                        margin: "10px 0 6px",
                        color: "#D62828",
                      }}
                    >
                      {tl.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      {tl.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="iletisim"
          style={{
            padding: "90px 24px 100px",
            background:
              "radial-gradient(circle, rgba(255,210,63,0.35) 2px, transparent 2px) 0 0 / 20px 20px, #D62828",
            borderTop: "6px solid #1A1A2E",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div
              className="font-luckiest anim-wiggle-slow"
              style={{
                display: "inline-block",
                fontSize: 30,
                color: "#D62828",
                background: "#FFD23F",
                border: "4px solid #1A1A2E",
                padding: "10px 24px",
                borderRadius: 14,
                transform: "rotate(-3deg)",
                boxShadow: "5px 5px 0 #1A1A2E",
                marginBottom: 20,
              }}
            >
              {content.contactBang}
            </div>
            <h2
              className="font-bangers"
              style={{
                fontSize: "clamp(42px, 7vw, 72px)",
                letterSpacing: 3,
                color: "#fff",
                WebkitTextStroke: "2px #1A1A2E",
                textShadow: "5px 5px 0 #1A1A2E",
                margin: "0 0 16px",
              }}
            >
              {content.contactTitle}
            </h2>
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                margin: "0 0 32px",
              }}
            >
              {content.contactText}
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:emre@example.com"
                className="contact-btn contact-email"
              >
                ✉ E-POSTA
              </a>
              <a href="#" className="contact-btn contact-github">
                GITHUB
              </a>
              <a href="#" className="contact-btn contact-linkedin">
                LINKEDIN
              </a>
            </div>
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
    </div>
  );
}
