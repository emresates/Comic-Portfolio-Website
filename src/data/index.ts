import { PROJECT_LINKS } from "@/lib/projects";
import { aboutByLang } from "./about";
import { blogByLang } from "./blog";
import { commonByLang, MODAL_BANGS } from "./common";
import { contactByLang } from "./contact";
import { gameByLang } from "./game";
import { heroByLang } from "./hero";
import { navByLang } from "./nav";
import { projectsByLang } from "./projects";
import { skillsByLang } from "./skills";
import { timelineByLang } from "./timeline";
import type { Content, Lang, Project, ResolvedContent } from "./types";

export type {
  AboutPanel,
  BlogContent,
  CommonContent,
  ContactContent,
  Content,
  GameContent,
  HeroContent,
  Lang,
  NavContent,
  NavItem,
  Project,
  ProjectBase,
  ProjectsContent,
  ResolvedContent,
  Skill,
  SkillsContent,
  TimelineContent,
  TimelineItem,
} from "./types";

export { MODAL_BANGS };

function buildContent(lang: Lang): Content {
  return {
    ...commonByLang[lang],
    ...heroByLang[lang],
    ...navByLang[lang],
    ...aboutByLang[lang],
    ...projectsByLang[lang],
    ...skillsByLang[lang],
    ...timelineByLang[lang],
    ...contactByLang[lang],
    ...gameByLang[lang],
    ...blogByLang[lang],
  };
}

export const contentByLang: Record<Lang, Content> = {
  tr: buildContent("tr"),
  en: buildContent("en"),
};

export function getContent(lang: Lang): ResolvedContent {
  const base = contentByLang[lang];
  return {
    ...base,
    projects: base.projects.map((project, index) => ({
      ...project,
      ...PROJECT_LINKS[index],
    })),
  };
}

export function getProjectBySlug(slug: string, lang: Lang): Project | null {
  return getContent(lang).projects.find((p) => p.slug === slug) ?? null;
}
