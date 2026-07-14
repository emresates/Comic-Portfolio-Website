import type { GameContent, Lang } from "./types";

export const gameByLang: Record<Lang, GameContent> = {
  tr: {
    gameTitle: "BUG SQUASHER!",
    gameSub:
      "10 saniyede mümkün olduğunca çok bug ez! Yüksek skor kaydedilir. 💥",
    gameStart: "BAŞLA →",
    gameAgain: "TEKRAR!",
    gameScore: "SKOR",
    gameHigh: "REKOR",
    gameTime: "SÜRE",
    gameResult: "OYUN BİTTİ!",
  },
  en: {
    gameTitle: "BUG SQUASHER!",
    gameSub:
      "Squash as many bugs as you can in 10 seconds! High score is saved. 💥",
    gameStart: "START →",
    gameAgain: "AGAIN!",
    gameScore: "SCORE",
    gameHigh: "BEST",
    gameTime: "TIME",
    gameResult: "GAME OVER!",
  },
};
