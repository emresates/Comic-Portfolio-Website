import type { Lang } from "@/lib/content";

export const LANG_STORAGE_KEY = "emre-portfolio-lang";

export function parseLang(value: string | null | undefined): Lang | null {
  if (value === "tr" || value === "en") return value;
  return null;
}

export function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    return parseLang(localStorage.getItem(LANG_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeStoredLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // ignore quota / private mode
  }
}

export function readUrlLang(): Lang | null {
  if (typeof window === "undefined") return null;
  return parseLang(new URLSearchParams(window.location.search).get("lang"));
}

export function syncLangToUrl(lang: Lang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState(window.history.state, "", url.toString());
}

export function resolveInitialLang(fallback: Lang = "tr"): Lang {
  return readUrlLang() ?? readStoredLang() ?? fallback;
}
