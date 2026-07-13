"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSfx } from "@/hooks/useSfx";

export const HIGH_SCORE_KEY = "emre-bug-squasher-high";

type Bug = {
  id: number;
  x: number;
  y: number;
};

type BugSquasherProps = {
  title: string;
  sub: string;
  startLabel: string;
  againLabel: string;
  scoreLabel: string;
  highLabel: string;
  timeLabel: string;
  resultLabel: string;
};

const DURATION = 10;

const hudBadge =
  "bg-comic-yellow text-ink border-[3px] border-ink rounded-lg px-3 py-1.5 font-display text-base tracking-wide shadow-[3px_3px_0_rgba(0,0,0,0.35)] max-[760px]:text-sm max-[760px]:px-2.5 max-[760px]:py-1.5";

const startBtn =
  "font-display text-2xl tracking-wide cursor-pointer bg-comic-red text-white border-4 border-ink rounded-xl px-7 py-3 shadow-[5px_5px_0_#1a1a2e] transition-[transform,box-shadow,background] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#1a1a2e] hover:bg-comic-red-dark";

export function BugSquasher({
  title,
  sub,
  startLabel,
  againLabel,
  scoreLabel,
  highLabel,
  timeLabel,
  resultLabel,
}: BugSquasherProps) {
  const { play } = useSfx();
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [pop, setPop] = useState<{ id: number; x: number; y: number } | null>(
    null,
  );
  const idRef = useRef(0);
  const scoreRef = useRef(0);
  const spawnRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HIGH_SCORE_KEY);
      setHighScore(raw ? Number(raw) || 0 : 0);
    } catch {
      setHighScore(0);
    }
  }, []);

  const clearTimers = () => {
    if (spawnRef.current) window.clearInterval(spawnRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    spawnRef.current = null;
    tickRef.current = null;
  };

  const spawnBug = useCallback(() => {
    idRef.current += 1;
    const id = idRef.current;
    setBugs((prev) => [
      ...prev.slice(-7),
      {
        id,
        x: 8 + Math.random() * 76,
        y: 10 + Math.random() * 68,
      },
    ]);
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    setBugs([]);
    setPhase("done");
    play("pow");
    const finalScore = scoreRef.current;
    setHighScore((prev) => {
      const next = Math.max(prev, finalScore);
      try {
        localStorage.setItem(HIGH_SCORE_KEY, String(next));
        window.dispatchEvent(
          new CustomEvent("bug-highscore", { detail: next }),
        );
      } catch {
        // ignore
      }
      return next;
    });
  }, [play]);

  const start = () => {
    clearTimers();
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(DURATION);
    setBugs([]);
    setPhase("playing");
    play("whoosh");
    spawnBug();
    spawnRef.current = window.setInterval(spawnBug, 520);
    tickRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearTimers(), []);

  const squash = (bug: Bug) => {
    if (phase !== "playing") return;
    play("zap");
    scoreRef.current += 1;
    setScore(scoreRef.current);
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));
    setPop({ id: bug.id, x: bug.x, y: bug.y });
    window.setTimeout(() => setPop((p) => (p?.id === bug.id ? null : p)), 350);
  };

  return (
    <section
      id="oyun"
      className="border-t-[6px] border-ink bg-ink bg-[radial-gradient(circle,rgba(76,181,174,0.25)_2px,transparent_2px)_0_0/20px_20px] px-6 py-20 max-[760px]:px-4 max-[760px]:py-14"
    >
      <div className="mx-auto max-w-[720px]">
        <h2 className="m-0 mb-2.5 -rotate-1 font-display text-[clamp(40px,6vw,64px)] tracking-[3px] text-comic-yellow text-stroke-ink [text-shadow:4px_4px_0_#d62828]">
          {title}
        </h2>
        <p className="m-0 mb-5 text-[17px] font-bold text-white">{sub}</p>

        <div className="mb-3.5 flex flex-wrap gap-3 font-display">
          <span className={hudBadge}>
            {scoreLabel}: {score}
          </span>
          <span className={hudBadge}>
            {timeLabel}: {timeLeft}s
          </span>
          <span className={hudBadge}>
            {highLabel}: {highScore}
          </span>
        </div>

        <div
          className="relative h-[340px] overflow-hidden rounded-[14px] border-[5px] border-ink bg-cream bg-halftone-soft shadow-[8px_8px_0_#d62828] max-[760px]:h-[280px] max-[420px]:h-[240px]"
          role="application"
          aria-label={title}
        >
          {phase === "idle" && (
            <div className="absolute inset-0 z-5 flex flex-col items-center justify-center gap-3.5 bg-[rgba(249,233,200,0.92)]">
              <p className="m-0 -rotate-[3deg] font-stamp text-[clamp(28px,6vw,42px)] text-comic-red">
                BUG SQUASHER
              </p>
              <button type="button" className={startBtn} onClick={start}>
                {startLabel}
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="absolute inset-0 z-5 flex flex-col items-center justify-center gap-3.5 bg-[rgba(249,233,200,0.92)]">
              <p className="m-0 -rotate-[3deg] font-stamp text-[clamp(28px,6vw,42px)] text-comic-red">
                {resultLabel}
              </p>
              <p className="m-0 font-display text-[28px] tracking-wide">
                {scoreLabel}: {score}
              </p>
              <button type="button" className={startBtn} onClick={start}>
                {againLabel}
              </button>
            </div>
          )}

          {bugs.map((bug) => (
            <button
              key={bug.id}
              type="button"
              className="absolute cursor-crosshair border-none bg-transparent p-1 text-[34px] leading-none animate-bug-wiggle drop-shadow-[2px_2px_0_#1a1a2e] transition-transform duration-[120ms] hover:scale-115 max-[760px]:min-h-12 max-[760px]:min-w-12 max-[760px]:text-[40px] [-translate-x-1/2] [-translate-y-1/2]"
              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
              onClick={() => squash(bug)}
              aria-label="bug"
            >
              🐛
            </button>
          ))}

          {pop && (
            <span
              className="pointer-events-none absolute z-4 -rotate-[8deg] animate-bang-in rounded-lg border-[3px] border-ink bg-comic-red px-2 py-0.5 font-stamp text-lg text-white [-translate-x-1/2] [-translate-y-1/2]"
              style={{ left: `${pop.x}%`, top: `${pop.y}%` }}
            >
              ZAP!
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
