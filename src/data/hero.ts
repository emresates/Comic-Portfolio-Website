import type { HeroContent, Lang } from "./types";

export const heroByLang: Record<Lang, HeroContent> = {
  tr: {
    heroBubble: "Merhaba! Ben Emre 👋",
    heroRole: "FRONTEND DEVELOPER",
    heroText:
      "Piksel piksel arayüz döven, kod bloklarından süper güçler çıkaran bir geliştirici. Web'i daha eğlenceli bir yer yapmak için buradayım!",
    heroCta: "İŞLERİME BAK",
  },
  en: {
    heroBubble: "Hi! I'm Emre 👋",
    heroRole: "FRONTEND DEVELOPER",
    heroText:
      "A developer forging interfaces pixel by pixel, pulling superpowers out of code blocks. Here to make the web a more fun place!",
    heroCta: "SEE MY WORK",
  },
};
