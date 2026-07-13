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
    <section id="oyun" className="bug-section">
      <div className="bug-section__inner">
        <h2 className="font-bangers bug-section__title">{title}</h2>
        <p className="bug-section__sub">{sub}</p>

        <div className="bug-hud font-bangers">
          <span>
            {scoreLabel}: {score}
          </span>
          <span>
            {timeLabel}: {timeLeft}s
          </span>
          <span>
            {highLabel}: {highScore}
          </span>
        </div>

        <div className="bug-arena" role="application" aria-label={title}>
          {phase === "idle" && (
            <div className="bug-overlay">
              <p className="font-luckiest bug-overlay__bang">BUG SQUASHER</p>
              <button type="button" className="bug-start" onClick={start}>
                {startLabel}
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="bug-overlay">
              <p className="font-luckiest bug-overlay__bang">{resultLabel}</p>
              <p className="font-bangers bug-overlay__score">
                {scoreLabel}: {score}
              </p>
              <button type="button" className="bug-start" onClick={start}>
                {againLabel}
              </button>
            </div>
          )}

          {bugs.map((bug) => (
            <button
              key={bug.id}
              type="button"
              className="bug-critter"
              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
              onClick={() => squash(bug)}
              aria-label="bug"
            >
              🐛
            </button>
          ))}

          {pop && (
            <span
              className="bug-pop font-luckiest"
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
