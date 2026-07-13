export type SfxName = "pow" | "thwip" | "whoosh" | "click" | "zap";

export const SFX_MUTE_KEY = "emre-portfolio-sfx-muted";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  return audioCtx;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function blip(
  ctx: AudioContext,
  {
    freq,
    type = "square",
    duration = 0.12,
    gain = 0.06,
    slideTo,
  }: {
    freq: number;
    type?: OscillatorType;
    duration?: number;
    gain?: number;
    slideTo?: number;
  },
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), now + duration);
  }
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

const PLAYERS: Record<SfxName, (ctx: AudioContext) => void> = {
  pow(ctx) {
    blip(ctx, { freq: 180, type: "square", duration: 0.1, gain: 0.07, slideTo: 70 });
    blip(ctx, { freq: 90, type: "sawtooth", duration: 0.16, gain: 0.04, slideTo: 40 });
  },
  thwip(ctx) {
    blip(ctx, { freq: 520, type: "triangle", duration: 0.07, gain: 0.035, slideTo: 820 });
  },
  whoosh(ctx) {
    blip(ctx, { freq: 240, type: "sawtooth", duration: 0.2, gain: 0.03, slideTo: 60 });
  },
  click(ctx) {
    blip(ctx, { freq: 660, type: "square", duration: 0.04, gain: 0.03 });
  },
  zap(ctx) {
    blip(ctx, { freq: 880, type: "square", duration: 0.08, gain: 0.045, slideTo: 220 });
    blip(ctx, { freq: 440, type: "triangle", duration: 0.1, gain: 0.03, slideTo: 120 });
  },
};

export function readSfxMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SFX_MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeSfxMuted(muted: boolean) {
  try {
    localStorage.setItem(SFX_MUTE_KEY, muted ? "1" : "0");
  } catch {
    // ignore
  }
}

export async function playSfx(name: SfxName, muted: boolean) {
  if (muted || prefersReducedMotion()) return;
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }
  PLAYERS[name](ctx);
}
