import type { CommonContent, Lang } from "./types";

export const commonByLang: Record<Lang, CommonContent> = {
  tr: {
    langButton: "EN",
    footerText: "© 2026 EMRE Seyfullah Ateş",
    loaderText: "YÜKLENİYOR...",
    soundOnLabel: "SES AÇIK",
    soundOffLabel: "SESSİZ",
    avatarHi: "Merhaba!",
  },
  en: {
    langButton: "TR",
    footerText: "© 2026 EMRE",
    loaderText: "LOADING...",
    soundOnLabel: "SFX ON",
    soundOffLabel: "MUTED",
    avatarHi: "Hi!",
  },
};

export const MODAL_BANGS = [
  "KAPOW!",
  "ZOOM!",
  "WHAM!",
  "VROOM!",
  "BOOM!",
  "ZAP!",
];
