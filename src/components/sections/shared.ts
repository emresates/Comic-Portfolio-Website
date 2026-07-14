export const sectionTitleBase =
  "font-display text-[clamp(40px,6vw,64px)] tracking-[3px] text-stroke-ink -rotate-1 mb-9";

export const comicCardBase =
  "border-4 border-ink rounded-2xl bg-white shadow-[6px_6px_0_#1a1a2e] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#1a1a2e]";

export const contactBtnBase =
  "font-display inline-flex items-center gap-2 rounded-xl border-4 border-ink px-6 py-3 text-base tracking-[2px] no-underline shadow-[4px_4px_0_#1a1a2e] transition-[transform,box-shadow,background,color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1a1a2e]";

export type AboutPanel = {
  icon: string;
  title: string;
  text: string;
  bg: string;
  rot: number;
};

export type Skill = { name: string; level: string; pct: string };

export type TimelineItem = {
  year: string;
  title: string;
  text: string;
  dotBg: string;
  rot: number;
};
