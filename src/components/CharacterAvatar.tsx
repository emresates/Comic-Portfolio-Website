"use client";

import { useEffect, useRef, useState } from "react";
import { useSfx } from "@/hooks/useSfx";

type CharacterAvatarProps = {
  hiText?: string;
};

type Look = { x: number; y: number };

const IDLE: Look = { x: 0, y: 0 };

export function CharacterAvatar({ hiText = "Hi!" }: CharacterAvatarProps) {
  const { play } = useSfx();
  const rootRef = useRef<HTMLButtonElement>(null);
  const [showHi, setShowHi] = useState(false);
  const [look, setLook] = useState<Look>(IDLE);
  const lookRef = useRef<Look>(IDLE);
  const targetRef = useRef<Look>(IDLE);
  const rafRef = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    if (!showHi) return;
    const t = window.setTimeout(() => setShowHi(false), 2200);
    return () => window.clearTimeout(t);
  }, [showHi]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tick = () => {
      const cur = lookRef.current;
      const tgt = targetRef.current;
      const next = {
        x: cur.x + (tgt.x - cur.x) * 0.12,
        y: cur.y + (tgt.y - cur.y) * 0.12,
      };
      lookRef.current = next;
      setLook(next);
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (reduceMotion.current) return;
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth * 0.45);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.45);
      targetRef.current = {
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      };
    };

    const onLeave = () => {
      targetRef.current = IDLE;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const onClick = () => {
    play("thwip");
    setShowHi(true);
  };

  const pupilX = look.x * 3.5;
  const pupilY = look.y * 3;
  const bodyX = look.x * 10;
  const bodyY = look.y * 6;
  const bodyRot = look.x * 5;

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={onClick}
      aria-label={hiText}
      className="relative mx-3 my-3 cursor-pointer border-0 bg-transparent p-0 animate-float-bob max-[860px]:mx-4 max-[860px]:mb-5 max-[860px]:origin-top max-[860px]:scale-[0.82] max-[540px]:scale-[0.72]"
    >
      <div
        className="relative will-change-transform"
        style={{
          transform: `translate3d(${bodyX}px, ${bodyY}px, 0) rotate(${bodyRot}deg)`,
        }}
      >
        <div className="relative flex h-[260px] w-[260px] items-end justify-center overflow-hidden rounded-full border-[5px] border-ink bg-comic-yellow shadow-[8px_8px_0_#1a1a2e]">
          <div className="absolute inset-[-60px] animate-burst-spin bg-sunburst" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(214,40,40,0.22)_1.8px,transparent_1.8px)_0_0/14px_14px]" />
          <div className="relative h-[230px] w-[190px]">
            <div className="absolute bottom-[-18px] left-[25px] h-[78px] w-[140px] rounded-t-[40px] border-4 border-ink bg-comic-red" />
            <div className="absolute bottom-2 left-[76px] flex size-[38px] items-center justify-center rounded-full border-[3px] border-ink bg-comic-yellow font-display text-2xl text-ink">
              E
            </div>
            <div className="absolute bottom-[52px] left-[66px] h-4 w-[58px] rounded-lg border-[3px] border-ink bg-white" />
            <div className="absolute bottom-[62px] left-[78px] h-6 w-[34px] border-x-[3px] border-ink bg-comic-skin" />
            <div className="absolute left-[42px] top-[26px] h-[118px] w-[106px] rounded-[48px_48px_42px_42px] border-4 border-ink bg-comic-skin" />
            <div className="absolute left-[34px] top-[78px] h-6 w-4 rounded-full border-[3px] border-ink bg-comic-skin" />
            <div className="absolute left-[140px] top-[78px] h-6 w-4 rounded-full border-[3px] border-ink bg-comic-skin" />
            <div className="absolute left-9 top-2 h-[52px] w-[118px] rotate-[-4deg] rounded-[60px_70px_10px_30px] bg-ink" />
            <div className="absolute left-[30px] top-6 h-[46px] w-[34px] rounded-[20px_0_10px_24px] bg-ink" />
            <div className="absolute left-24 top-1 h-[34px] w-14 rotate-[8deg] rounded-[10px_40px_40px_6px] bg-ink" />
            <div className="absolute left-[62px] top-4 h-2 w-[30px] rotate-[-8deg] rounded-lg bg-comic-teal" />
            <div className="absolute left-[62px] top-16 h-1.5 w-6 -rotate-6 animate-brow rounded bg-ink" />
            <div className="absolute left-[104px] top-[62px] h-1.5 w-6 rotate-10 animate-brow-delay rounded bg-ink" />

            {/* Eyes — pupils follow cursor */}
            <div className="absolute left-16 top-[76px] size-5 animate-blink overflow-hidden rounded-full border-[3px] border-ink bg-white">
              <div
                className="absolute left-1.5 top-1.5 size-[9px] rounded-full bg-ink will-change-transform"
                style={{
                  transform: `translate3d(${pupilX}px, ${pupilY}px, 0)`,
                }}
              />
            </div>
            <div className="absolute left-[106px] top-[76px] size-5 animate-blink overflow-hidden rounded-full border-[3px] border-ink bg-white">
              <div
                className="absolute left-[5px] top-1.5 size-[9px] rounded-full bg-ink will-change-transform"
                style={{
                  transform: `translate3d(${pupilX}px, ${pupilY}px, 0)`,
                }}
              />
            </div>

            <div className="absolute left-[92px] top-24 h-3.5 w-2.5 rounded-br-[10px] border-b-[3px] border-r-[3px] border-ink" />
            <div className="absolute left-[76px] top-[114px] h-[18px] w-[42px] rotate-3 overflow-hidden rounded-[4px_4px_22px_22px] border-[3px] border-ink bg-white">
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-comic-red" />
            </div>
            <div className="absolute left-14 top-[102px] h-2 w-3.5 rounded-full bg-[rgba(214,40,40,0.35)]" />
            <div className="absolute left-[124px] top-[100px] h-2 w-3.5 rounded-full bg-[rgba(214,40,40,0.35)]" />
          </div>
        </div>
        <div className="pointer-events-none absolute right-[-30px] top-[-18px] rotate-8 animate-wiggle rounded-xl border-4 border-ink bg-comic-red px-3.5 py-2 font-stamp text-[26px] text-white shadow-[4px_4px_0_#1a1a2e] max-[860px]:right-[-2px] max-[860px]:top-[-2px] max-[860px]:px-2.5 max-[860px]:py-1.5 max-[860px]:text-xl">
          POW!
        </div>
        <div className="pointer-events-none absolute bottom-[-1.5px] left-[-34px] rotate-[-8deg] animate-wiggle-delay rounded-[10px] border-4 border-ink bg-comic-teal px-3 py-1.5 font-stamp text-lg text-ink shadow-[4px_4px_0_#1a1a2e] max-[860px]:bottom-0 max-[860px]:left-[-2px] max-[860px]:text-sm">
          {"</kod>"}
        </div>
      </div>

      {showHi && (
        <div
          className="absolute -right-2 top-[40%] z-10 animate-bang-in rounded-2xl border-4 border-ink bg-white px-4 py-2 font-stamp text-xl text-comic-red shadow-[4px_4px_0_#1a1a2e]"
          aria-live="polite"
        >
          {hiText}
          <span
            className="absolute -left-3 top-1/2 size-0 -translate-y-1/2 border-y-8 border-r-12 border-y-transparent border-r-ink"
            aria-hidden
          />
          <span
            className="absolute left-[-7px] top-1/2 size-0 -translate-y-1/2 border-y-[6px] border-r-[9px] border-y-transparent border-r-white"
            aria-hidden
          />
        </div>
      )}
    </button>
  );
}
