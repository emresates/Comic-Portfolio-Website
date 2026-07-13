type PanelArtKind = "chaos" | "build" | "victory";

const KIND_BY_INDEX: PanelArtKind[] = ["chaos", "build", "victory"];

export function PanelArt({ index }: { index: number }) {
  const kind = KIND_BY_INDEX[index] ?? "build";
  const isClimax = index === 2;

  return (
    <div
      className={`relative flex-1 ${isClimax ? "mt-0 min-h-[160px]" : "mt-11 min-h-[120px]"}`}
      aria-hidden
    >
      {kind === "chaos" && (
        <>
          <span className="absolute left-[18%] top-[36%] h-2.5 w-[70px] -rotate-[35deg] bg-ink shadow-[14px_18px_0_#d62828]" />
          <span className="absolute left-[42%] top-[48%] h-2.5 w-[70px] rotate-[28deg] bg-ink shadow-[-10px_14px_0_#ffd23f]" />
          <span className="absolute right-[12%] top-[22%] -rotate-[8deg] font-display text-[28px] text-comic-red text-stroke-ink">
            CRASH
          </span>
          <span className="absolute bottom-[18%] left-[30%] size-[18px] rounded-full bg-ink" />
          <span className="absolute bottom-[28%] left-[48%] size-3 rounded-full bg-comic-red" />
        </>
      )}
      {kind === "build" && (
        <>
          <span className="absolute bottom-[22%] left-[16%] h-9 w-[54px] border-[3px] border-ink bg-white shadow-[3px_3px_0_#1a1a2e]" />
          <span className="absolute bottom-[34%] left-[34%] size-10 border-[3px] border-ink bg-comic-teal shadow-[3px_3px_0_#1a1a2e]" />
          <span className="absolute bottom-[20%] left-[52%] h-7 w-12 border-[3px] border-ink bg-comic-yellow shadow-[3px_3px_0_#1a1a2e]" />
          <span className="absolute right-[18%] top-[18%] size-[42px] animate-[burst-spin_8s_linear_infinite] rounded-full border-4 border-ink bg-comic-orange shadow-[inset_0_0_0_8px_#f9e9c8] motion-reduce:animate-none" />
          <span className="absolute left-[22%] top-[20%] -rotate-[6deg] border-[3px] border-ink bg-white px-2 py-0.5 font-display text-[26px] text-ink">
            {"</>"}
          </span>
        </>
      )}
      {kind === "victory" && (
        <>
          <span className="absolute inset-x-[8%] inset-y-[10%] rounded-full border-4 border-ink bg-[repeating-conic-gradient(from_0deg,#ffd23f_0deg_12deg,#fff_12deg_24deg)] opacity-85" />
          <span className="absolute inset-0 z-[1] grid place-items-center font-stamp text-[64px] text-comic-red [text-shadow:3px_3px_0_#1a1a2e]">
            ★
          </span>
          <span className="absolute bottom-[18%] right-[8%] z-[2] rotate-[6deg] font-display text-[28px] text-comic-yellow text-stroke-ink">
            WIN
          </span>
          <span className="absolute left-[18%] top-[16%] z-[2] size-2.5 rotate-45 bg-ink" />
          <span className="absolute right-[16%] top-[24%] z-[2] size-2.5 rotate-45 bg-comic-red" />
        </>
      )}
    </div>
  );
}
