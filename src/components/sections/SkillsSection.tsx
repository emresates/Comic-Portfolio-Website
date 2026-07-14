"use client";

import { useTranslations } from "next-intl";
import { sectionTitleBase, type Skill } from "./shared";

export function SkillsSection() {
  const tSkills = useTranslations("skills");
  const skills = tSkills.raw("items") as Skill[];

  return (
    <section id="yetenekler" className="mx-auto max-w-[1100px] px-4 py-20">
      <h2
        className={`${sectionTitleBase} text-comic-teal [text-shadow:4px_4px_0_#d62828]`}
      >
        {tSkills("title")}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((sk) => (
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
  );
}
