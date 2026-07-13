import { PROJECT_LINKS, type ProjectLinks } from "./projects";

export type Lang = "tr" | "en";

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

export type Content = {
  langButton: string;
  heroBubble: string;
  heroRole: string;
  heroText: string;
  heroCta: string;
  navItems: NavItem[];
  marqueeWords: string[];
  aboutTitle: string;
  aboutPanels: AboutPanel[];
  projectsTitle: string;
  projectsSub: string;
  projects: ProjectBase[];
  demoBtn: string;
  githubBtn: string;
  caseStudyBtn: string;
  backBtn: string;
  skillsTitle: string;
  skills: Skill[];
  timelineTitle: string;
  timeline: TimelineItem[];
  contactBang: string;
  contactTitle: string;
  contactText: string;
  footerText: string;
  loaderText: string;
  soundOnLabel: string;
  soundOffLabel: string;
};

const tr: Content = {
  langButton: "EN",
  heroBubble: "Merhaba! Ben Emre 👋",
  heroRole: "FRONTEND DEVELOPER",
  heroText:
    "Piksel piksel arayüz döven, kod bloklarından süper güçler çıkaran bir geliştirici. Web'i daha eğlenceli bir yer yapmak için buradayım!",
  heroCta: "İŞLERİME BAK",
  navItems: [
    { label: "HAKKIMDA", href: "#hakkimda" },
    { label: "PROJELER", href: "#projeler" },
    { label: "YETENEKLER", href: "#yetenekler" },
    { label: "DENEYİM", href: "#deneyim" },
    { label: "İLETİŞİM", href: "#iletisim" },
  ],
  marqueeWords: [
    "REACT",
    "TYPESCRIPT",
    "CSS SİHİRBAZI",
    "POW!",
    "UI/UX",
    "ANİMASYON",
    "BAM!",
    "PERFORMANS",
  ],
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
  projectsTitle: "PROJELER!",
  projectsSub: "Bir panele tıkla, hikayenin devamını gör! 💥",
  demoBtn: "DEMO",
  githubBtn: "GITHUB",
  caseStudyBtn: "HİKAYEYİ OKU",
  backBtn: "← ANA SAYFA",
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
  skillsTitle: "YETENEKLER",
  skills: [
    { name: "REACT / NEXT.JS", level: "EFSANE", pct: "95%" },
    { name: "TYPESCRIPT", level: "USTA", pct: "90%" },
    { name: "CSS / ANİMASYON", level: "EFSANE", pct: "95%" },
    { name: "NODE.JS", level: "İYİ", pct: "75%" },
    { name: "ERİŞİLEBİLİRLİK", level: "USTA", pct: "85%" },
    { name: "TEST (VITEST/PW)", level: "İYİ", pct: "78%" },
  ],
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
  contactBang: "BAM!",
  contactTitle: "BİRLİKTE ÇALIŞALIM",
  contactText:
    "Bir proje mi var? Süper kahraman takviyesi mi lazım? Sinyal gönder, hemen geliyorum!",
  footerText: "© 2026 EMRE — BU SAYFA %100 EL ÇİZİMİ KOD İLE YAPILMIŞTIR ✦",
  loaderText: "YÜKLENİYOR...",
  soundOnLabel: "SES AÇIK",
  soundOffLabel: "SESSİZ",
};

const en: Content = {
  langButton: "TR",
  heroBubble: "Hi! I'm Emre 👋",
  heroRole: "FRONTEND DEVELOPER",
  heroText:
    "A developer forging interfaces pixel by pixel, pulling superpowers out of code blocks. Here to make the web a more fun place!",
  heroCta: "SEE MY WORK",
  navItems: [
    { label: "ABOUT", href: "#hakkimda" },
    { label: "PROJECTS", href: "#projeler" },
    { label: "SKILLS", href: "#yetenekler" },
    { label: "EXPERIENCE", href: "#deneyim" },
    { label: "CONTACT", href: "#iletisim" },
  ],
  marqueeWords: [
    "REACT",
    "TYPESCRIPT",
    "CSS WIZARD",
    "POW!",
    "UI/UX",
    "ANIMATION",
    "BAM!",
    "PERFORMANCE",
  ],
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
  projectsTitle: "PROJECTS!",
  projectsSub: "Click a panel to see the rest of the story! 💥",
  demoBtn: "DEMO",
  githubBtn: "GITHUB",
  caseStudyBtn: "READ THE STORY",
  backBtn: "← HOME",
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
  skillsTitle: "SKILLS",
  skills: [
    { name: "REACT / NEXT.JS", level: "LEGENDARY", pct: "95%" },
    { name: "TYPESCRIPT", level: "MASTER", pct: "90%" },
    { name: "CSS / ANIMATION", level: "LEGENDARY", pct: "95%" },
    { name: "NODE.JS", level: "SOLID", pct: "75%" },
    { name: "ACCESSIBILITY", level: "MASTER", pct: "85%" },
    { name: "TESTING (VITEST/PW)", level: "SOLID", pct: "78%" },
  ],
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
  contactBang: "BAM!",
  contactTitle: "LET'S WORK TOGETHER",
  contactText:
    "Got a project? Need superhero reinforcements? Send the signal, I'll be right there!",
  footerText: "© 2026 EMRE — THIS PAGE IS MADE OF 100% HAND-DRAWN CODE ✦",
  loaderText: "LOADING...",
  soundOnLabel: "SFX ON",
  soundOffLabel: "MUTED",
};

export const contentByLang: Record<Lang, Content> = { tr, en };

export const MODAL_BANGS = ["KAPOW!", "ZOOM!", "WHAM!", "VROOM!", "BOOM!", "ZAP!"];

export type ResolvedContent = Omit<Content, "projects"> & {
  projects: Project[];
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
