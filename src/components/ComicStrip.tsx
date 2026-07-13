import type { CaseStudyPanel } from "@/lib/projects";
import { PanelArt } from "./PanelArt";

type ComicStripProps = {
  panels: CaseStudyPanel[];
  bang: string;
  stripTitle: string;
};

const speechBubbleBase =
  "relative z-[2] mx-3.5 mb-4 mt-auto rounded-[18px] border-[3px] border-ink bg-white px-4 py-3.5 shadow-[4px_4px_0_rgba(26,26,46,0.25)] before:absolute before:left-[30px] before:-top-2 before:z-[1] before:size-0 before:border-b-[10px] before:border-l-[10px] before:border-r-4 before:border-b-white before:border-l-transparent before:border-r-transparent before:content-[''] after:absolute after:left-7 after:-top-3 after:size-0 after:border-b-[12px] after:border-l-[12px] after:border-r-[6px] after:border-b-ink after:border-l-transparent after:border-r-transparent after:content-['']";

const speechBubbleRight =
  "before:left-auto before:right-[30px] before:border-l-4 before:border-r-[10px] after:left-auto after:right-7 after:border-l-[6px] after:border-r-[12px]";

const speechBubbleWide =
  "m-0 before:left-10 after:left-10";

export function ComicStrip({ panels, bang, stripTitle }: ComicStripProps) {
  const [problem, solution, result] = panels;

  return (
    <section className="mx-auto max-w-[960px] px-5 py-12 pb-16 max-[860px]:px-3 max-[860px]:py-8 max-[860px]:pb-12">
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 rotate-[-1deg] font-display text-[clamp(32px,5vw,52px)] tracking-[3px] text-comic-red text-stroke-ink [text-shadow:4px_4px_0_#ffd23f]">
          {stripTitle}
        </h2>
        <span className="rotate-[3deg] rounded-[10px] border-[3px] border-ink bg-comic-red px-3.5 py-1.5 font-stamp text-[22px] text-white shadow-[3px_3px_0_#1a1a2e]">
          {bang}
        </span>
      </div>

      <div
        className="relative grid grid-cols-2 gap-3.5 rounded-md border-[6px] border-ink bg-white p-3.5 shadow-[10px_10px_0_#1a1a2e] max-[760px]:grid-cols-1 max-[860px]:gap-2.5 max-[860px]:p-2.5 max-[860px]:shadow-[6px_6px_0_#1a1a2e]"
        role="list"
      >
        {problem && (
          <article
            className="relative flex min-h-[280px] flex-col overflow-hidden border-4 border-ink bg-[linear-gradient(160deg,#ff9f5a_0%,#f9e9c8_55%)] max-[860px]:min-h-[240px]"
            role="listitem"
          >
            <div className="absolute left-2.5 top-2.5 z-[3] inline-flex items-center gap-2 border-[3px] border-ink bg-ink py-1 pl-1.5 pr-3 font-display text-sm tracking-wider text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.35)]">
              <span className="grid size-[22px] place-items-center rounded-full bg-comic-yellow text-[13px] text-ink">
                1
              </span>
              {problem.label}
            </div>
            <PanelArt index={0} />
            <div className={speechBubbleBase}>
              <h3 className="mb-2 font-display text-[22px] tracking-wide text-comic-red max-[860px]:text-xl">
                {problem.title}
              </h3>
              <p className="m-0 text-[15px] font-bold leading-[1.45] text-ink max-[860px]:text-sm">
                {problem.text}
              </p>
            </div>
          </article>
        )}

        {solution && (
          <article
            className="relative flex min-h-[280px] flex-col overflow-hidden border-4 border-ink bg-[linear-gradient(200deg,#ffd23f_0%,#f9e9c8_55%)] max-[860px]:min-h-[240px]"
            role="listitem"
          >
            <div className="absolute left-2.5 top-2.5 z-[3] inline-flex items-center gap-2 border-[3px] border-ink bg-ink py-1 pl-1.5 pr-3 font-display text-sm tracking-wider text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.35)]">
              <span className="grid size-[22px] place-items-center rounded-full bg-comic-yellow text-[13px] text-ink">
                2
              </span>
              {solution.label}
            </div>
            <PanelArt index={1} />
            <div className={`${speechBubbleBase} ${speechBubbleRight}`}>
              <h3 className="mb-2 font-display text-[22px] tracking-wide text-comic-red max-[860px]:text-xl">
                {solution.title}
              </h3>
              <p className="m-0 text-[15px] font-bold leading-[1.45] text-ink max-[860px]:text-sm">
                {solution.text}
              </p>
            </div>
          </article>
        )}

        <div
          className="col-span-2 -my-1 text-center font-display text-[28px] leading-none text-ink [text-shadow:2px_2px_0_#ffd23f] max-[760px]:hidden"
          aria-hidden
        >
          ↓
        </div>

        {result && (
          <article
            className="relative col-span-2 flex min-h-[260px] flex-col overflow-hidden border-4 border-ink bg-[linear-gradient(180deg,#4cb5ae_0%,#f9e9c8_48%,#ffd23f_100%)] max-[760px]:col-span-1"
            role="listitem"
          >
            <div className="absolute left-2.5 top-2.5 z-[3] inline-flex items-center gap-2 border-[3px] border-ink bg-ink py-1 pl-1.5 pr-3 font-display text-sm tracking-wider text-comic-yellow shadow-[3px_3px_0_rgba(26,26,46,0.35)]">
              <span className="grid size-[22px] place-items-center rounded-full bg-comic-yellow text-[13px] text-ink">
                3
              </span>
              {result.label}
            </div>
            <div className="grid flex-1 grid-cols-[minmax(140px,220px)_1fr] items-center gap-3 px-3.5 pb-[18px] pt-3 max-[760px]:grid-cols-1">
              <PanelArt index={2} />
              <div className={`${speechBubbleBase} ${speechBubbleWide}`}>
                <h3 className="mb-2 font-display text-[22px] tracking-wide text-comic-red max-[860px]:text-xl">
                  {result.title}
                </h3>
                <p className="m-0 text-[15px] font-bold leading-[1.45] text-ink max-[860px]:text-sm">
                  {result.text}
                </p>
              </div>
            </div>
            <span className="absolute right-4 top-12 z-[4] rotate-[8deg] animate-bang-in rounded-xl border-4 border-ink bg-comic-yellow px-3.5 py-1.5 font-stamp text-[clamp(28px,5vw,42px)] text-comic-red shadow-[4px_4px_0_#1a1a2e] max-[760px]:right-3 max-[760px]:top-3 max-[760px]:text-[22px]">
              {bang}
            </span>
          </article>
        )}
      </div>
    </section>
  );
}
