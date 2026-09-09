type StickyChapterProps = {
  scene: React.ReactNode;
  surface: React.ReactNode;
  surfaceClassName?: string;
  surfaceStyle?: React.CSSProperties;
};

/**
 * A pinned background "scene" that stays fixed under the header while the
 * next section (the "surface") slides up over it. `scene` must carry the
 * `sticky-scene` class itself (e.g. via MediaSection's className prop) so
 * the pinned element also owns the layered background — that keeps the
 * min-height/position:sticky box the same element the background fills.
 * Falls back to normal document flow on mobile and under reduced-motion via CSS.
 */
export default function StickyChapter({
  scene,
  surface,
  surfaceClassName = '',
  surfaceStyle,
}: StickyChapterProps) {
  return (
    <div className="sticky-sequence">
      {scene}
      <section className={`slide-over-surface ${surfaceClassName}`} style={surfaceStyle}>
        {surface}
      </section>
    </div>
  );
}
