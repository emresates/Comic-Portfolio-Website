"use client";

import { useEffect, useRef, useState } from "react";

type InfiniteMarqueeProps = {
  words: string[];
  /** Seconds for one full loop */
  duration?: number;
};

/**
 * Seamless infinite marquee: two identical strips, animate by the
 * measured width of one strip (not -50%, which can jump with gaps).
 */
export function InfiniteMarquee({ words, duration = 28 }: InfiniteMarqueeProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [shiftPx, setShiftPx] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const measure = () => {
      setShiftPx(el.offsetWidth);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [words]);

  const strip = (copy: number, withRef?: boolean) => (
    <div
      ref={withRef ? stripRef : undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={copy === 1 ? true : undefined}
    >
      {words.map((w, i) => (
        <span
          key={`${copy}-${w}-${i}`}
          className="whitespace-nowrap font-display text-[22px] tracking-[3px] text-comic-yellow"
        >
          {w} ✦
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b-[6px] border-ink bg-ink py-2.5">
      <div
        className="flex w-max will-change-transform"
        style={
          shiftPx > 0
            ? {
                animation: `marquee-shift ${duration}s linear infinite`,
                ["--marquee-shift" as string]: `${shiftPx}px`,
              }
            : undefined
        }
      >
        {strip(0, true)}
        {strip(1)}
      </div>
    </div>
  );
}
