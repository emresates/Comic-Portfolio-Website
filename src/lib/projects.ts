export type CaseStudyPanel = {
  label: string;
  title: string;
  text: string;
  bg: string;
  rot: number;
};

export type CaseStudy = {
  bang: string;
  role: string;
  year: string;
  summary: string;
  panels: CaseStudyPanel[];
};

export type ProjectLinks = {
  slug: string;
  demoUrl: string;
  githubUrl: string;
};

/** Shared across languages — index matches projects in content. */
export const PROJECT_LINKS: ProjectLinks[] = [
  {
    slug: "hizli-market",
    demoUrl: "https://example.com/hizli-market",
    githubUrl: "https://github.com/emre/hizli-market",
  },
  {
    slug: "panelix",
    demoUrl: "https://example.com/panelix",
    githubUrl: "https://github.com/emre/panelix",
  },
  {
    slug: "komik-ui",
    demoUrl: "https://example.com/komik-ui",
    githubUrl: "https://github.com/emre/komik-ui",
  },
  {
    slug: "rotaci",
    demoUrl: "https://example.com/rotaci",
    githubUrl: "https://github.com/emre/rotaci",
  },
  {
    slug: "ses-dalgasi",
    demoUrl: "https://example.com/ses-dalgasi",
    githubUrl: "https://github.com/emre/ses-dalgasi",
  },
  {
    slug: "piksel-dovusu",
    demoUrl: "https://example.com/piksel-dovusu",
    githubUrl: "https://github.com/emre/piksel-dovusu",
  },
];

export const PROJECT_SLUGS = PROJECT_LINKS.map((p) => p.slug);

const caseStudiesTr: Record<string, CaseStudy> = {
  "hizli-market": {
    bang: "KAPOW!",
    role: "Lead Frontend",
    year: "2023",
    summary:
      "Stok anlık değişirken sepetin kilitlenmesi — klasik e-ticaret kabusu. Yeniden tasarlanan akış dönüşümü %23 yükseltti.",
    panels: [
      {
        label: "SORUN",
        title: "Sepet kilitleniyor!",
        text: "Stok güncellemeleri UI'yi donduruyor, kullanıcılar ödeme adımında vazgeçiyordu. Dönüşüm düşüktü, destek bileti yağıyordu.",
        bg: "#FF9F5A",
        rot: -1.2,
      },
      {
        label: "ÇÖZÜM",
        title: "60fps mikro animasyonlar",
        text: "React + Zustand ile iyimser sepet, iskelet yüklemeler ve anlık stok rozetleri. Kritik path yeniden çizildi.",
        bg: "#FFD23F",
        rot: 1,
      },
      {
        label: "SONUÇ",
        title: "+%23 dönüşüm",
        text: "Sepetten ödemeye geçiş süresi kısaldı. Kullanıcılar 'kayboldum' demeyi bıraktı. KAPOW!",
        bg: "#4CB5AE",
        rot: -0.6,
      },
    ],
  },
  panelix: {
    bang: "ZOOM!",
    role: "Frontend Architect",
    year: "2024",
    summary:
      "On binlerce satırlık tablolar ve canlı WebSocket verisi — ter dökmeden render eden bir pano hikayesi.",
    panels: [
      {
        label: "SORUN",
        title: "Veri tsunamisi",
        text: "Canlı akış her saniye UI'yi yeniden boyuyordu. Büyük tablolar kilitleniyor, widget'lar birbirini eziyordu.",
        bg: "#D62828",
        rot: -1,
      },
      {
        label: "ÇÖZÜM",
        title: "Sürükle-bırak + sanal liste",
        text: "Next.js, D3 ve pencereleme ile canlı paneller. Karanlık mod ve özelleştirilebilir grid.",
        bg: "#FFD23F",
        rot: 0.8,
      },
      {
        label: "SONUÇ",
        title: "10k+ satır, sıfır ter",
        text: "Operasyon ekibi panoyu kendi sahnesi gibi kuruyor. ZOOM!",
        bg: "#4CB5AE",
        rot: -0.5,
      },
    ],
  },
  "komik-ui": {
    bang: "WHAM!",
    role: "Open Source Maintainer",
    year: "2022–",
    summary:
      "40+ erişilebilir komponent, tema motoru ve tam klavye navigasyonu. Topluluk 2k yıldız verdi.",
    panels: [
      {
        label: "SORUN",
        title: "Her projede yeniden icat",
        text: "Aynı buton, aynı modal, aynı a11y hataları. Ekipler tekerleği yeniden keşfediyordu.",
        bg: "#7B4CB5",
        rot: -0.8,
      },
      {
        label: "ÇÖZÜM",
        title: "Storybook + a11y first",
        text: "Tema token'ları, klavye rotaları ve belgelenmiş API. Her komponent bir süper kahraman.",
        bg: "#FFD23F",
        rot: 1.1,
      },
      {
        label: "SONUÇ",
        title: "2k ★ GitHub",
        text: "Takımlar saatler yerine dakikalarda arayüz kuruyor. WHAM!",
        bg: "#FF9F5A",
        rot: -0.4,
      },
    ],
  },
  rotaci: {
    bang: "VROOM!",
    role: "Product Frontend",
    year: "2023",
    summary:
      "Haritada sürükle-bırak rota, çevrimdışı PWA ve app-store hissi veren web deneyimi.",
    panels: [
      {
        label: "SORUN",
        title: "Planlar uçup gidiyor",
        text: "Seyahat listeleri notlarda kayboluyor, harita ile senkron yok, uçak modunda uygulama ölüyor.",
        bg: "#1A6FB5",
        rot: -1,
      },
      {
        label: "ÇÖZÜM",
        title: "Mapbox + PWA",
        text: "Sürükle-bırak pin'ler, offline cache ve kurulabilir web app. Vite ile hafif paket.",
        bg: "#FFD23F",
        rot: 0.7,
      },
      {
        label: "SONUÇ",
        title: "Native hissi",
        text: "Kullanıcılar 'bu uygulama mı site mi?' diye sormaya başladı. VROOM!",
        bg: "#4CB5AE",
        rot: -0.5,
      },
    ],
  },
  "ses-dalgasi": {
    bang: "BOOM!",
    role: "UI Engineer",
    year: "2022",
    summary:
      "Web Audio dalga formu, bölüm notları senkronu ve hız kontrolü — kulaklara ve gözlere bayram.",
    panels: [
      {
        label: "SORUN",
        title: "Sıkıcı oynatıcı",
        text: "Podcast arayüzleri ya çirkin ya da erişilemezdi. Bölüm notları zamanla uyuşmuyordu.",
        bg: "#B53A5E",
        rot: -0.9,
      },
      {
        label: "ÇÖZÜM",
        title: "Dalga + senkron",
        text: "Web Audio API görselleştirme, tıklanabilir timeline ve hız kaydırıcısı. Svelte ile akıcı UI.",
        bg: "#FFD23F",
        rot: 1,
      },
      {
        label: "SONUÇ",
        title: "Dinleme keyfi",
        text: "Ortalama oturum süresi uzadı, bölüm notları gerçekten işe yaradı. BOOM!",
        bg: "#4CB5AE",
        rot: -0.4,
      },
    ],
  },
  "piksel-dovusu": {
    bang: "ZAP!",
    role: "Solo Dev / Fun",
    year: "2021",
    summary:
      "Canvas'ta 60fps platformer, skor tablosu, gamepad ve 8-bit ses — saf eğlence projesi.",
    panels: [
      {
        label: "SORUN",
        title: "Sıkıcı portföy demosu",
        text: "Başka bir todo app kimseyi etkilemiyor. Biraz kaos lazımdı.",
        bg: "#D62828",
        rot: -1.2,
      },
      {
        label: "ÇÖZÜM",
        title: "Canvas arena",
        text: "Fizik, sprite'lar (Aseprite) ve Web Audio ile 8-bit efektler. Gamepad desteği bonusu.",
        bg: "#FFD23F",
        rot: 0.9,
      },
      {
        label: "SONUÇ",
        title: "High score!",
        text: "Mülakatlarda buz kırıcı oldu. İnsanlar oynamadan gitmiyor. ZAP!",
        bg: "#7B4CB5",
        rot: -0.5,
      },
    ],
  },
};

const caseStudiesEn: Record<string, CaseStudy> = {
  "hizli-market": {
    bang: "KAPOW!",
    role: "Lead Frontend",
    year: "2023",
    summary:
      "Stock flickering while the cart freezes — classic e-commerce nightmare. The redesigned flow lifted conversion 23%.",
    panels: [
      {
        label: "PROBLEM",
        title: "Cart lockups!",
        text: "Stock updates froze the UI and shoppers abandoned at checkout. Conversion tanked; support tickets poured in.",
        bg: "#FF9F5A",
        rot: -1.2,
      },
      {
        label: "SOLUTION",
        title: "60fps micro-animations",
        text: "Optimistic cart with React + Zustand, skeleton loads and live stock badges. Critical path redrawn.",
        bg: "#FFD23F",
        rot: 1,
      },
      {
        label: "RESULT",
        title: "+23% conversion",
        text: "Time from cart to pay dropped. Users stopped saying 'I'm lost.' KAPOW!",
        bg: "#4CB5AE",
        rot: -0.6,
      },
    ],
  },
  panelix: {
    bang: "ZOOM!",
    role: "Frontend Architect",
    year: "2024",
    summary:
      "Tens of thousands of rows plus live WebSocket data — a dashboard that renders without breaking a sweat.",
    panels: [
      {
        label: "PROBLEM",
        title: "Data tsunami",
        text: "Live streams repainted the UI every second. Huge tables locked up; widgets crushed each other.",
        bg: "#D62828",
        rot: -1,
      },
      {
        label: "SOLUTION",
        title: "Drag-drop + virtual lists",
        text: "Next.js, D3 and windowing for live panels. Dark mode and a customizable grid.",
        bg: "#FFD23F",
        rot: 0.8,
      },
      {
        label: "RESULT",
        title: "10k+ rows, zero sweat",
        text: "Ops teams build their own stage from the dashboard. ZOOM!",
        bg: "#4CB5AE",
        rot: -0.5,
      },
    ],
  },
  "komik-ui": {
    bang: "WHAM!",
    role: "Open Source Maintainer",
    year: "2022–",
    summary:
      "40+ accessible components, a theme engine and full keyboard nav. The community gave it 2k stars.",
    panels: [
      {
        label: "PROBLEM",
        title: "Reinventing every time",
        text: "Same button, same modal, same a11y bugs. Teams kept rediscovering the wheel.",
        bg: "#7B4CB5",
        rot: -0.8,
      },
      {
        label: "SOLUTION",
        title: "Storybook + a11y first",
        text: "Theme tokens, keyboard routes and a documented API. Every component a superhero.",
        bg: "#FFD23F",
        rot: 1.1,
      },
      {
        label: "RESULT",
        title: "2k ★ on GitHub",
        text: "Teams ship UI in minutes, not hours. WHAM!",
        bg: "#FF9F5A",
        rot: -0.4,
      },
    ],
  },
  rotaci: {
    bang: "VROOM!",
    role: "Product Frontend",
    year: "2023",
    summary:
      "Drag-and-drop routes on a map, offline PWA and a web experience that feels app-store native.",
    panels: [
      {
        label: "PROBLEM",
        title: "Plans vanish",
        text: "Trip lists lived in notes, no map sync, and airplane mode killed the app.",
        bg: "#1A6FB5",
        rot: -1,
      },
      {
        label: "SOLUTION",
        title: "Mapbox + PWA",
        text: "Draggable pins, offline cache and an installable web app. Lean bundle via Vite.",
        bg: "#FFD23F",
        rot: 0.7,
      },
      {
        label: "RESULT",
        title: "Feels native",
        text: "Users started asking 'is this an app or a site?' VROOM!",
        bg: "#4CB5AE",
        rot: -0.5,
      },
    ],
  },
  "ses-dalgasi": {
    bang: "BOOM!",
    role: "UI Engineer",
    year: "2022",
    summary:
      "Web Audio waveforms, synced chapter notes and speed control — a feast for ears and eyes.",
    panels: [
      {
        label: "PROBLEM",
        title: "Boring players",
        text: "Podcast UIs were either ugly or inaccessible. Chapter notes drifted off the timeline.",
        bg: "#B53A5E",
        rot: -0.9,
      },
      {
        label: "SOLUTION",
        title: "Wave + sync",
        text: "Web Audio visualization, clickable timeline and a speed scrubber. Smooth UI in Svelte.",
        bg: "#FFD23F",
        rot: 1,
      },
      {
        label: "RESULT",
        title: "Listening joy",
        text: "Session length grew; chapter notes finally earned their keep. BOOM!",
        bg: "#4CB5AE",
        rot: -0.4,
      },
    ],
  },
  "piksel-dovusu": {
    bang: "ZAP!",
    role: "Solo Dev / Fun",
    year: "2021",
    summary:
      "A 60fps Canvas platformer with leaderboard, gamepad and 8-bit SFX — pure fun project.",
    panels: [
      {
        label: "PROBLEM",
        title: "Boring portfolio demos",
        text: "Another todo app impresses no one. A little chaos was due.",
        bg: "#D62828",
        rot: -1.2,
      },
      {
        label: "SOLUTION",
        title: "Canvas arena",
        text: "Physics, Aseprite sprites and Web Audio 8-bit effects. Gamepad support as a bonus.",
        bg: "#FFD23F",
        rot: 0.9,
      },
      {
        label: "RESULT",
        title: "High score!",
        text: "Became an interview icebreaker. People don't leave without playing. ZAP!",
        bg: "#7B4CB5",
        rot: -0.5,
      },
    ],
  },
};

export function getCaseStudy(slug: string, lang: "tr" | "en"): CaseStudy | null {
  const map = lang === "tr" ? caseStudiesTr : caseStudiesEn;
  return map[slug] ?? null;
}

export function getProjectLinks(slug: string): ProjectLinks | null {
  return PROJECT_LINKS.find((p) => p.slug === slug) ?? null;
}
