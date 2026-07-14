export type BlogPost = {
  slug: string;
  issue: number;
  date: string;
  coverBg: string;
  emoji: string;
  tags: string[];
  title: string;
  blurb: string;
  bang: string;
  body: string[];
};

const postsTr: BlogPost[] = [
  {
    slug: "css-orumbercek-hissi",
    issue: 12,
    date: "2026-03-04",
    coverBg: "#D62828",
    emoji: "🕷️",
    tags: ["CSS", "Animasyon"],
    title: "CSS Örümcek Hissi",
    blurb: "Layout kaymadan önce hisseden geliştirici olmak.",
    bang: "THWIP!",
    body: [
      "İyi bir CSS hissi, süper güç gibidir: bir pixel kayınca sezersin.",
      "Bu sayıda: container query'ler, view transitions ve 'neden bu margin 17px?' vakaları.",
      "Son panelde küçük bir kural: önce kısıtları çiz, sonra süsle. POW!",
    ],
  },
  {
    slug: "erisilebilir-kahramanlar",
    issue: 11,
    date: "2026-02-12",
    coverBg: "#4CB5AE",
    emoji: "🦸",
    tags: ["a11y", "UI"],
    title: "Erişilebilir Kahramanlar",
    blurb: "Klavye ile de uçabilen arayüzler.",
    bang: "WHAM!",
    body: [
      "Erişilebilirlik yan görev değil, ana hikâye.",
      "Focus ring'leri gizleme, modal tuzaklarını doğru kur, alternatif metinleri yaz.",
      "Kullanıcı 'vay be' demeli — hem fare hem klavye ile. BAM!",
    ],
  },
  {
    slug: "performans-zaman-makinesi",
    issue: 10,
    date: "2026-01-20",
    coverBg: "#FF9F5A",
    emoji: "⏱️",
    tags: ["Perf", "Next.js"],
    title: "Performans Zaman Makinesi",
    blurb: "LCP'yi geçmişe gönderen üç hamle.",
    bang: "ZOOM!",
    body: [
      "Yavaş bir site, kötü adamın yavaş lateni gibidir.",
      "Kritik CSS, lazy image'ler ve sunucu bileşenleriyle ilk boyamayı hızlandır.",
      "Skor tablosunda yeşil ışık yandığında: KAPOW!",
    ],
  },
];

const postsEn: BlogPost[] = [
  {
    slug: "css-spider-sense",
    issue: 12,
    date: "2026-03-04",
    coverBg: "#D62828",
    emoji: "🕷️",
    tags: ["CSS", "Animation"],
    title: "CSS Spider-Sense",
    blurb: "Feeling layout shifts before they strike.",
    bang: "THWIP!",
    body: [
      "Great CSS sense is a superpower: you feel a pixel shift coming.",
      "This issue: container queries, view transitions, and the case of the mysterious 17px margin.",
      "Final panel rule: draw the constraints first, decorate later. POW!",
    ],
  },
  {
    slug: "accessible-heroes",
    issue: 11,
    date: "2026-02-12",
    coverBg: "#4CB5AE",
    emoji: "🦸",
    tags: ["a11y", "UI"],
    title: "Accessible Heroes",
    blurb: "Interfaces that can fly with a keyboard too.",
    bang: "WHAM!",
    body: [
      "Accessibility isn't a side quest — it's the main plot.",
      "Keep focus rings, trap modals correctly, write the alt text.",
      "Users should say 'whoa' — mouse or keyboard. BAM!",
    ],
  },
  {
    slug: "performance-time-machine",
    issue: 10,
    date: "2026-01-20",
    coverBg: "#FF9F5A",
    emoji: "⏱️",
    tags: ["Perf", "Next.js"],
    title: "Performance Time Machine",
    blurb: "Three moves that send LCP back in time.",
    bang: "ZOOM!",
    body: [
      "A slow site is the villain's lazy henchman.",
      "Critical CSS, lazy images, and server components to paint faster.",
      "When the scoreboard goes green: KAPOW!",
    ],
  },
];

/** TR/EN slug pairs share the same issue number for cross-lang links. */
const SLUG_PAIRS: [string, string][] = [
  ["css-orumbercek-hissi", "css-spider-sense"],
  ["erisilebilir-kahramanlar", "accessible-heroes"],
  ["performans-zaman-makinesi", "performance-time-machine"],
];

export function getBlogPosts(lang: "tr" | "en"): BlogPost[] {
  return lang === "tr" ? postsTr : postsEn;
}

export function getBlogPost(
  slug: string,
  lang: "tr" | "en",
): BlogPost | null {
  return getBlogPosts(lang).find((p) => p.slug === slug) ?? null;
}

export function getAllBlogSlugs(): string[] {
  return [...postsTr, ...postsEn].map((p) => p.slug);
}

export function getAltLangSlug(
  slug: string,
  targetLang: "tr" | "en",
): string | null {
  for (const [tr, en] of SLUG_PAIRS) {
    if (slug === tr || slug === en) {
      return targetLang === "tr" ? tr : en;
    }
  }
  return null;
}
