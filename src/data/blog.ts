import type { BlogContent, Lang } from "./types";

export const blogByLang: Record<Lang, BlogContent> = {
  tr: {
    blogTitle: "BLOG SAYILARI",
    blogSub: "Her yazı bir kapak, her kapak bir macera.",
    blogBang: "NEW ISSUE!",
    blogBack: "← TÜM SAYILAR",
    blogNav: "BLOG",
  },
  en: {
    blogTitle: "BLOG ISSUES",
    blogSub: "Every post is a cover. Every cover is an adventure.",
    blogBang: "NEW ISSUE!",
    blogBack: "← ALL ISSUES",
    blogNav: "BLOG",
  },
};
