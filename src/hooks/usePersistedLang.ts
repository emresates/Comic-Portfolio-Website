"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/content";
import {
  resolveInitialLang,
  syncLangToUrl,
  writeStoredLang,
} from "@/lib/lang";

export function usePersistedLang(defaultLang: Lang = "tr") {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const resolved = resolveInitialLang(defaultLang);
    setLangState(resolved);
    document.documentElement.lang = resolved;
    syncLangToUrl(resolved);
    writeStoredLang(resolved);
    setHydrated(true);
  }, [defaultLang]);

  const setLang = useCallback((next: Lang | ((prev: Lang) => Lang)) => {
    setLangState((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      writeStoredLang(value);
      syncLangToUrl(value);
      document.documentElement.lang = value;
      return value;
    });
  }, []);

  return { lang, setLang, hydrated };
}
