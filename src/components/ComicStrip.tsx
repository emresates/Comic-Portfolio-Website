import type { CaseStudyPanel } from "@/lib/projects";
import { PanelArt } from "./PanelArt";

type ComicStripProps = {
  panels: CaseStudyPanel[];
  bang: string;
  stripTitle: string;
};

export function ComicStrip({ panels, bang, stripTitle }: ComicStripProps) {
  const [problem, solution, result] = panels;

  return (
    <section className="comic-page-wrap">
      <div className="comic-page-masthead">
        <h2 className="font-bangers comic-page-title">{stripTitle}</h2>
        <span className="font-luckiest comic-page-bang">{bang}</span>
      </div>

      <div className="comic-page" role="list">
        {problem && (
          <article className="comic-panel comic-panel--top-left" role="listitem">
            <div className="comic-caption font-bangers">
              <span className="comic-caption__num">1</span>
              {problem.label}
            </div>
            <PanelArt index={0} />
            <div className="speech-bubble">
              <h3 className="font-bangers speech-bubble__title">{problem.title}</h3>
              <p className="speech-bubble__text">{problem.text}</p>
            </div>
          </article>
        )}

        {solution && (
          <article className="comic-panel comic-panel--top-right" role="listitem">
            <div className="comic-caption font-bangers">
              <span className="comic-caption__num">2</span>
              {solution.label}
            </div>
            <PanelArt index={1} />
            <div className="speech-bubble speech-bubble--right">
              <h3 className="font-bangers speech-bubble__title">{solution.title}</h3>
              <p className="speech-bubble__text">{solution.text}</p>
            </div>
          </article>
        )}

        <div className="comic-gutter-arrow font-bangers" aria-hidden>
          ↓
        </div>

        {result && (
          <article className="comic-panel comic-panel--climax" role="listitem">
            <div className="comic-caption font-bangers">
              <span className="comic-caption__num">3</span>
              {result.label}
            </div>
            <div className="comic-panel__climax-grid">
              <PanelArt index={2} />
              <div className="speech-bubble speech-bubble--wide">
                <h3 className="font-bangers speech-bubble__title">{result.title}</h3>
                <p className="speech-bubble__text">{result.text}</p>
              </div>
            </div>
            <span className="climax-stamp font-luckiest anim-bang-in">{bang}</span>
          </article>
        )}
      </div>
    </section>
  );
}
