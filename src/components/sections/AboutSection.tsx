"use client";

import { useTranslations } from "next-intl";
import { comicCardBase, sectionTitleBase, type AboutPanel } from "./shared";

export function AboutSection() {
  const tAbout = useTranslations("about");
  const aboutPanels = tAbout.raw("panels") as AboutPanel[];

  return (
    <section id="hakkimda" className="mx-auto max-w-[1100px] px-4 py-20">
      <h2
        className={`${sectionTitleBase} mb-9 text-comic-red [text-shadow:4px_4px_0_#ffd23f]`}
      >
        {tAbout("title")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aboutPanels.map((p) => (
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
            <p className="m-0 text-base font-bold leading-normal">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
