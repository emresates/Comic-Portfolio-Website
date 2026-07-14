import type { ProjectLinks } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";
import { PROJECT_LINKS } from "@/lib/projects";
import en from "../../messages/en.json";
import tr from "../../messages/tr.json";

export type Lang = Locale;

export type AboutPanel = {
  icon: string;
  title: string;
  text: string;
  bg: string;
  rot: number;
};

export type ProjectBase = {
  title: string;
  emoji: string;
  bg: string;
  blurb: string;
  detail: string;
  tags: string[];
};

export type Project = ProjectBase & ProjectLinks;

export type Skill = {
  name: string;
  level: string;
  pct: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  text: string;
  dotBg: string;
  rot: number;
};

export type NavItem = {
  label: string;
  href: string;
};

export const MODAL_BANGS = [
  "KAPOW!",
  "ZOOM!",
  "WHAM!",
  "VROOM!",
  "BOOM!",
  "ZAP!",
] as const;

const messagesByLocale = { tr, en } as const;

export function getProjects(locale: Locale): Project[] {
  const items = messagesByLocale[locale].projects.items;
  return items.map((project, index) => ({
    ...project,
    ...PROJECT_LINKS[index],
  }));
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): Project | null {
  return getProjects(locale).find((p) => p.slug === slug) ?? null;
}
