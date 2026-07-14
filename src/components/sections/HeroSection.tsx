"use client";

import { useTranslations } from "next-intl";
import { CharacterAvatar } from "../CharacterAvatar";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const tCommon = useTranslations("common");
  const tHero = useTranslations("hero");

  return (
    <header
      id="hero"
      className="border-b-[6px] border-ink bg-halftone-soft bg-cream px-4 py-20"
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-10">
        <CharacterAvatar hiText={tCommon("avatarHi")} />
        <div className="max-w-[560px] text-center">
          <div className="relative mb-[18px] inline-block rounded-2xl border-4 border-ink bg-white px-[22px] py-2.5 text-lg font-bold shadow-[5px_5px_0_#1a1a2e]">
            {tHero("bubble", { name: siteConfig.brand })}
            <div
              className="absolute -bottom-4 left-10 size-0 border-t-16 border-r border-l-[14px] border-t-ink border-r-transparent border-l-transparent"
              aria-hidden
            />
            <div
              className="absolute bottom-[-11px] left-[43px] size-0 border-t-12 border-r border-l-[10px] border-t-white border-r-transparent border-l-transparent"
              aria-hidden
            />
          </div>
          <h1 className="m-0 font-display text-[clamp(52px,9vw,104px)] leading-[0.95] tracking-[3px] text-comic-yellow text-stroke-ink-lg [text-shadow:6px_6px_0_#d62828,8px_8px_0_#1a1a2e]">
            {siteConfig.brand}
          </h1>
          <h2 className="mt-3.5 inline-block -rotate-[1.5deg] rounded-md bg-ink px-5 py-1.5 font-stamp text-[clamp(22px,4vw,36px)] text-white">
            {siteConfig.role}
          </h2>
          <p className="mx-auto mb-7 mt-[22px] max-w-[440px] text-lg font-bold">
            {tHero("text")}
          </p>
          <a
            href="#projeler"
            className="inline-block rounded-xl border-4 border-ink bg-comic-red px-6 py-3 font-display text-lg tracking-wide text-white no-underline shadow-[5px_5px_0_#1a1a2e] transition-[transform,box-shadow,background,color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-comic-red-dark hover:text-white hover:shadow-[7px_7px_0_#1a1a2e]"
          >
            {tHero("cta")} →
          </a>
        </div>
      </div>
    </header>
  );
}
