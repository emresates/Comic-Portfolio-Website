"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { InfiniteMarquee } from "./InfiniteMarquee";
import { BugSquasher } from "./BugSquasher";
import { SiteNav } from "./SiteNav";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { useToggleLocale } from "@/hooks/useToggleLocale";
import { PORTFOLIO_SECTION_IDS, useScrollSpy } from "@/hooks/useScrollSpy";
import { useSfx } from "@/hooks/useSfx";

type LoaderPhase = "in" | "out" | "done";
type WipePhase = "idle" | "cover" | "reveal";

/** Once the intro loader has played, it must not replay on locale remount. */
let hasCompletedLoader = false;
/** Carries the lang wipe across the locale remount so it can finish smoothly. */
let langWipePending = false;

type NavItem = { label: string; href: string };

export function ComicPortfolio() {
  const toggleLocale = useToggleLocale();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const tGame = useTranslations("game");

  const { muted, toggleMute, play } = useSfx();
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>(() =>
    hasCompletedLoader ? "done" : "in",
  );
  const [wipePhase, setWipePhase] = useState<WipePhase>(() =>
    langWipePending ? "reveal" : "idle",
  );
  const activeSection = useScrollSpy(PORTFOLIO_SECTION_IDS);

  const navItems = tNav.raw("items") as NavItem[];
  const marqueeWords = tNav.raw("marqueeWords") as string[];

  useEffect(() => {
    // Clear the carry flag only after the fresh mount has consumed it.
    langWipePending = false;
  }, []);

  useEffect(() => {
    if (wipePhase !== "reveal") return;
    const t = window.setTimeout(() => {
      langWipePending = false;
      setWipePhase("idle");
    }, 450);
    return () => window.clearTimeout(t);
  }, [wipePhase]);

  useEffect(() => {
    if (loaderPhase === "done") return;
    const outTimer = window.setTimeout(() => setLoaderPhase("out"), 1100);
    const doneTimer = window.setTimeout(() => {
      hasCompletedLoader = true;
      setLoaderPhase("done");
    }, 1700);
    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
    };
    // Only run the first-load sequence once per mount when loader is active.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLang = () => {
    if (wipePhase !== "idle") return;
    hasCompletedLoader = true;
    play("whoosh");
    setWipePhase("cover");
    // Let the cover wipe (0.45s) fully hide the screen before switching locale.
    window.setTimeout(() => {
      // Flag lets the fresh mount (if a remount happens) resume at "reveal";
      // the wipePhase effect drives reveal -> idle in either case.
      langWipePending = true;
      toggleLocale();
      setWipePhase("reveal");
    }, 500);
  };

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
            {tCommon("flipLabel")}
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
            {tCommon("loaderText")}
          </div>
        </div>
      )}

      <div className={loaderPhase === "done" ? undefined : "animate-page-in"}>
        <SiteNav
          brandHref="/"
          langButton={tCommon("langButton")}
          onToggleLang={toggleLang}
          sound={{
            muted,
            onToggle: toggleMute,
            onLabel: tCommon("soundOnLabel"),
            offLabel: tCommon("soundOffLabel"),
          }}
          items={navItems.map((nv) => {
            const isRoute = nv.href.startsWith("/");
            const sectionId = nv.href.replace("#", "");
            return {
              label: nv.label,
              href: nv.href,
              isActive: !isRoute && activeSection === sectionId,
            };
          })}
        />

        <HeroSection />

        <InfiniteMarquee words={marqueeWords} duration={28} />

        <AboutSection />

        <ProjectsSection play={play} />

        <SkillsSection />

        <ExperienceSection />

        <BugSquasher
          title={tGame("title")}
          sub={tGame("sub")}
          startLabel={tGame("start")}
          againLabel={tGame("again")}
          scoreLabel={tGame("score")}
          highLabel={tGame("high")}
          timeLabel={tGame("time")}
          resultLabel={tGame("result")}
        />

        <ContactSection />

        <footer className="bg-ink p-5 text-center font-display text-lg tracking-[2px] text-comic-yellow">
          {tCommon("footerText")}
        </footer>
      </div>
    </div>
  );
}
