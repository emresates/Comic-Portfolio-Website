"use client";

import { useEffect, useState } from "react";

export const PORTFOLIO_SECTION_IDS = [
  "hakkimda",
  "projeler",
  "yetenekler",
  "deneyim",
  "oyun",
  "iletisim",
] as const;

export function useScrollSpy(
  sectionIds: readonly string[],
  offsetPx = 120,
) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const update = () => {
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offsetPx <= 0) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds, offsetPx]);

  return activeId;
}
