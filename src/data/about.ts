import type { AboutContent, Lang } from "./types";

export const aboutByLang: Record<Lang, AboutContent> = {
  tr: {
    aboutTitle: "HAKKIMDA",
    aboutPanels: [
      {
        icon: "⚡",
        title: "SÜPER GÜÇ",
        text: "Karmaşık tasarımları piksel-mükemmel, akıcı arayüzlere dönüştürmek. CSS benim örümcek hissim.",
        bg: "#FFD23F",
        rot: -1.5,
      },
      {
        icon: "🎯",
        title: "GÖREV",
        text: 'Kullanıcıların "vay be!" dediği, hızlı ve erişilebilir web deneyimleri inşa etmek.',
        bg: "#4CB5AE",
        rot: 1,
      },
      {
        icon: "🕹️",
        title: "GİZLİ KİMLİK",
        text: "Gündüz geliştirici, gece retro oyun koleksiyoncusu ve çizgi roman kurdu.",
        bg: "#FF9F5A",
        rot: -0.5,
      },
    ],
  },
  en: {
    aboutTitle: "ABOUT ME",
    aboutPanels: [
      {
        icon: "⚡",
        title: "SUPERPOWER",
        text: "Turning complex designs into pixel-perfect, buttery-smooth interfaces. CSS is my spider-sense.",
        bg: "#FFD23F",
        rot: -1.5,
      },
      {
        icon: "🎯",
        title: "MISSION",
        text: 'Building fast, accessible web experiences that make users go "whoa!"',
        bg: "#4CB5AE",
        rot: 1,
      },
      {
        icon: "🕹️",
        title: "SECRET IDENTITY",
        text: "Developer by day, retro game collector and comic book nerd by night.",
        bg: "#FF9F5A",
        rot: -0.5,
      },
    ],
  },
};
