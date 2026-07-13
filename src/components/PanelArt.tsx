type PanelArtKind = "chaos" | "build" | "victory";

const KIND_BY_INDEX: PanelArtKind[] = ["chaos", "build", "victory"];

export function PanelArt({ index }: { index: number }) {
  const kind = KIND_BY_INDEX[index] ?? "build";

  return (
    <div className={`panel-art panel-art--${kind}`} aria-hidden>
      {kind === "chaos" && (
        <>
          <span className="panel-art__bolt" />
          <span className="panel-art__bolt panel-art__bolt--b" />
          <span className="panel-art__crash font-bangers">CRASH</span>
          <span className="panel-art__dot" />
          <span className="panel-art__dot panel-art__dot--b" />
        </>
      )}
      {kind === "build" && (
        <>
          <span className="panel-art__block" />
          <span className="panel-art__block panel-art__block--b" />
          <span className="panel-art__block panel-art__block--c" />
          <span className="panel-art__gear" />
          <span className="panel-art__code font-bangers">{"</>"}</span>
        </>
      )}
      {kind === "victory" && (
        <>
          <span className="panel-art__burst" />
          <span className="panel-art__star font-luckiest">★</span>
          <span className="panel-art__win font-bangers">WIN</span>
          <span className="panel-art__spark" />
          <span className="panel-art__spark panel-art__spark--b" />
        </>
      )}
    </div>
  );
}
