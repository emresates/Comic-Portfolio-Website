"use client";

import { useCallback, useEffect, useState } from "react";
import {
  playSfx,
  readSfxMuted,
  writeSfxMuted,
  type SfxName,
} from "@/lib/sfx";

export function useSfx() {
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMuted(readSfxMuted());
    setReady(true);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      writeSfxMuted(next);
      if (!next) void playSfx("click", false);
      return next;
    });
  }, []);

  const play = useCallback(
    (name: SfxName) => {
      void playSfx(name, muted);
    },
    [muted],
  );

  return { muted, toggleMute, play, ready };
}
