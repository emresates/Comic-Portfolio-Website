import type { Lang, ProjectsContent } from "./types";

export const projectsByLang: Record<Lang, ProjectsContent> = {
  tr: {
    projectsTitle: "PROJELER!",
    projectsSub: "Bir panele tıkla, hikayenin devamını gör! 💥",
    demoBtn: "DEMO",
    githubBtn: "GITHUB",
    caseStudyBtn: "HİKAYEYİ OKU",
    backBtn: "← ANA SAYFA",
    stripTitle: "HİKAYE ŞERİDİ",
    issueLabel: "SAYI",
    prevIssue: "← ÖNCEKİ SAYI",
    nextIssue: "SONRAKİ SAYI →",
    sequelCta: "Devamını yaşamak ister misin?",
    filterAll: "HEPSİ",
    filterAction: "ACTION",
    filterTech: "TECH",
    filterFun: "FUN",
    projects: [
      {
        title: "HIZLI MARKET",
        emoji: "🛒",
        bg: "#D62828",
        blurb: "Anlık stok takipli e-ticaret arayüzü.",
        detail:
          "React + TypeScript ile kurulan, 60fps mikro animasyonlara sahip e-ticaret deneyimi. Sepet akışı yeniden tasarlandıktan sonra dönüşüm %23 arttı. KAPOW!",
        tags: ["React", "TypeScript", "Zustand"],
      },
      {
        title: "PANELİX",
        emoji: "📊",
        bg: "#4CB5AE",
        blurb: "Gerçek zamanlı veri panosu.",
        detail:
          "WebSocket ile canlı akan veriler, sürükle-bırak widget sistemi ve karanlık mod. 10.000+ satırlık tabloları ter dökmeden render eder. ZOOM!",
        tags: ["Next.js", "WebSocket", "D3"],
      },
      {
        title: "KOMİK-UI",
        emoji: "🎨",
        bg: "#FF9F5A",
        blurb: "Açık kaynak komponent kütüphanesi.",
        detail:
          "40+ erişilebilir komponent, tema desteği ve tam klavye navigasyonu. GitHub'da 2k yıldız topladı. WHAM!",
        tags: ["React", "Storybook", "a11y"],
      },
      {
        title: "ROTACI",
        emoji: "🗺️",
        bg: "#7B4CB5",
        blurb: "Seyahat planlama uygulaması.",
        detail:
          "Harita üzerinde sürükle-bırak rota kurgusu, çevrimdışı destek ve PWA kurulumu. App-store hissi veren web deneyimi. VROOM!",
        tags: ["PWA", "Mapbox", "Vite"],
      },
      {
        title: "SES DALGASI",
        emoji: "🎧",
        bg: "#1A6FB5",
        blurb: "Podcast oynatıcı arayüzü.",
        detail:
          "Web Audio API ile dalga formu görselleştirme, bölüm notları senkronizasyonu ve hız kontrolü. Kulaklara ve gözlere bayram. BOOM!",
        tags: ["Web Audio", "Svelte", "CSS"],
      },
      {
        title: "PİKSEL DÖVÜŞÜ",
        emoji: "👾",
        bg: "#B53A5E",
        blurb: "Tarayıcıda retro mini oyun.",
        detail:
          "Canvas tabanlı, 60fps platform oyunu. Skor tablosu, gamepad desteği ve 8-bit ses efektleri. Saf eğlence projesi. ZAP!",
        tags: ["Canvas", "JS", "Aseprite"],
      },
    ],
  },
  en: {
    projectsTitle: "PROJECTS!",
    projectsSub: "Click a panel to see the rest of the story! 💥",
    demoBtn: "DEMO",
    githubBtn: "GITHUB",
    caseStudyBtn: "READ THE STORY",
    backBtn: "← HOME",
    stripTitle: "STORY STRIP",
    issueLabel: "ISSUE",
    prevIssue: "← PREV ISSUE",
    nextIssue: "NEXT ISSUE →",
    sequelCta: "Want to live the sequel?",
    filterAll: "ALL",
    filterAction: "ACTION",
    filterTech: "TECH",
    filterFun: "FUN",
    projects: [
      {
        title: "SPEEDY MARKET",
        emoji: "🛒",
        bg: "#D62828",
        blurb: "E-commerce UI with live stock tracking.",
        detail:
          "An e-commerce experience built with React + TypeScript, packed with 60fps micro-animations. Conversion rose 23% after the cart flow redesign. KAPOW!",
        tags: ["React", "TypeScript", "Zustand"],
      },
      {
        title: "PANELIX",
        emoji: "📊",
        bg: "#4CB5AE",
        blurb: "Real-time data dashboard.",
        detail:
          "Live-streaming data over WebSocket, drag-and-drop widgets and dark mode. Renders 10,000+ row tables without breaking a sweat. ZOOM!",
        tags: ["Next.js", "WebSocket", "D3"],
      },
      {
        title: "COMIC-UI",
        emoji: "🎨",
        bg: "#FF9F5A",
        blurb: "Open-source component library.",
        detail:
          "40+ accessible components, theming support and full keyboard navigation. Earned 2k stars on GitHub. WHAM!",
        tags: ["React", "Storybook", "a11y"],
      },
      {
        title: "WAYFINDER",
        emoji: "🗺️",
        bg: "#7B4CB5",
        blurb: "Travel planning app.",
        detail:
          "Drag-and-drop route building on a map, offline support and PWA install. A web experience that feels app-store native. VROOM!",
        tags: ["PWA", "Mapbox", "Vite"],
      },
      {
        title: "SOUNDWAVE",
        emoji: "🎧",
        bg: "#1A6FB5",
        blurb: "Podcast player interface.",
        detail:
          "Waveform visualization with Web Audio API, chapter note sync and speed control. A feast for ears and eyes. BOOM!",
        tags: ["Web Audio", "Svelte", "CSS"],
      },
      {
        title: "PIXEL BRAWL",
        emoji: "👾",
        bg: "#B53A5E",
        blurb: "Retro mini game in the browser.",
        detail:
          "Canvas-based 60fps platformer. Leaderboard, gamepad support and 8-bit sound effects. A pure fun project. ZAP!",
        tags: ["Canvas", "JS", "Aseprite"],
      },
    ],
  },
};
