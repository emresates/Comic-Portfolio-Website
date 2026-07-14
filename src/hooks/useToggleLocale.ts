"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { getAltLangSlug } from "@/lib/blog";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Switch locale while keeping the current path; remaps blog slugs when needed. */
export function useToggleLocale() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (nextLocale?: Locale) => {
    const target: Locale =
      nextLocale ?? (locale === "tr" ? "en" : "tr");

    const slug = typeof params.slug === "string" ? params.slug : null;
    if (slug && pathname.startsWith("/blog/")) {
      const alt = getAltLangSlug(slug, target);
      if (alt) {
        router.replace(`/blog/${alt}`, { locale: target });
        return;
      }
    }

    router.replace(pathname, { locale: target });
  };
}
