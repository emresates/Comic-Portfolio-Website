import type { Lang, SkillsContent } from "./types";

export const skillsByLang: Record<Lang, SkillsContent> = {
  tr: {
    skillsTitle: "YETENEKLER",
    skills: [
      { name: "REACT / NEXT.JS", level: "EFSANE", pct: "95%" },
      { name: "TYPESCRIPT", level: "USTA", pct: "90%" },
      { name: "CSS / ANİMASYON", level: "EFSANE", pct: "95%" },
      { name: "NODE.JS", level: "İYİ", pct: "75%" },
      { name: "ERİŞİLEBİLİRLİK", level: "USTA", pct: "85%" },
      { name: "TEST (VITEST/PW)", level: "İYİ", pct: "78%" },
    ],
  },
  en: {
    skillsTitle: "SKILLS",
    skills: [
      { name: "REACT / NEXT.JS", level: "LEGENDARY", pct: "95%" },
      { name: "TYPESCRIPT", level: "MASTER", pct: "90%" },
      { name: "CSS / ANIMATION", level: "LEGENDARY", pct: "95%" },
      { name: "NODE.JS", level: "SOLID", pct: "75%" },
      { name: "ACCESSIBILITY", level: "MASTER", pct: "85%" },
      { name: "TESTING (VITEST/PW)", level: "SOLID", pct: "78%" },
    ],
  },
};
