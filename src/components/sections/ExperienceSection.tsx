"use client";

import { useTranslations } from "next-intl";
import { comicCardBase, sectionTitleBase, type TimelineItem } from "./shared";

export function ExperienceSection() {
  const tTimeline = useTranslations("timeline");
  const timeline = tTimeline.raw("items") as TimelineItem[];

  return (
    <section
      id="deneyim"
      className="border-t-[6px] border-ink bg-halftone-soft bg-cream px-4 py-20"
    >
      <div className="mx-auto max-w-[800px]">
        <h2
          className={`${sectionTitleBase} mb-11 text-comic-red [text-shadow:4px_4px_0_#4cb5ae]`}
        >
          {tTimeline("title")}
        </h2>
        <div className="relative flex flex-col pl-[34px]">
          <div
            className="absolute bottom-[15px] left-[11px] top-[15px] w-0 border-l-[5px] border-dashed border-ink"
            aria-hidden
          />
          {timeline.map((tl, index) => (
            <div
              key={tl.title}
              className={`relative ${index === timeline.length - 1 ? "pb-0" : "pb-9"}`}
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
  );
}
