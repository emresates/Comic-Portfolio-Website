import type { Lang, TimelineContent } from "./types";

export const timelineByLang: Record<Lang, TimelineContent> = {
  tr: {
    timelineTitle: "MACERA GÜNLÜĞÜ",
    timeline: [
      {
        year: "2024 — BUGÜN",
        title: "KIDEMLİ FRONTEND DEV — TECHCO",
        text: "Tasarım sistemi liderliği, 8 kişilik ekiple ürün arayüzünün yeniden yazımı.",
        dotBg: "#D62828",
        rot: -0.6,
      },
      {
        year: "2021 — 2024",
        title: "FRONTEND DEVELOPER — STARTUPX",
        text: "MVP'den 1M kullanıcıya: performans optimizasyonu ve komponent mimarisi.",
        dotBg: "#FFD23F",
        rot: 0.6,
      },
      {
        year: "2019 — 2021",
        title: "JR. DEVELOPER — AJANS",
        text: "Onlarca kampanya sitesi, ilk büyük animasyon projeleri ve bolca kahve.",
        dotBg: "#4CB5AE",
        rot: -0.4,
      },
      {
        year: "2019",
        title: "ORİJİN HİKAYESİ",
        text: "Bilgisayar Mühendisliği mezuniyeti. Radyoaktif bir klavye tarafından ısırıldım.",
        dotBg: "#FF9F5A",
        rot: 0.5,
      },
    ],
  },
  en: {
    timelineTitle: "ADVENTURE LOG",
    timeline: [
      {
        year: "2024 — NOW",
        title: "SENIOR FRONTEND DEV — TECHCO",
        text: "Leading the design system, rebuilding the product UI with a team of 8.",
        dotBg: "#D62828",
        rot: -0.6,
      },
      {
        year: "2021 — 2024",
        title: "FRONTEND DEVELOPER — STARTUPX",
        text: "From MVP to 1M users: performance work and component architecture.",
        dotBg: "#FFD23F",
        rot: 0.6,
      },
      {
        year: "2019 — 2021",
        title: "JR. DEVELOPER — AGENCY",
        text: "Dozens of campaign sites, first big animation projects and lots of coffee.",
        dotBg: "#4CB5AE",
        rot: -0.4,
      },
      {
        year: "2019",
        title: "ORIGIN STORY",
        text: "Computer Engineering graduation. Bitten by a radioactive keyboard.",
        dotBg: "#FF9F5A",
        rot: 0.5,
      },
    ],
  },
};
