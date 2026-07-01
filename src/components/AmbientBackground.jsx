const SPARKLE_COUNT = 16;

export default function AmbientBackground() {
  return (
    <div className="tvl-bg" aria-hidden="true">
      <div className="tvl-bg__spotlight tvl-bg__spotlight--primary"></div>
      <div className="tvl-bg__spotlight tvl-bg__spotlight--secondary"></div>
      <div className="tvl-bg__ambient"></div>

      <div className="tvl-bg__sparkles">
        {Array.from({ length: SPARKLE_COUNT }, (_, i) => (
          <span key={i + 1} className={`tvl-bg__sparkle tvl-bg__sparkle--${i + 1}`}></span>
        ))}
      </div>

      <div className="tvl-bg__vignette"></div>
    </div>
  );
}
