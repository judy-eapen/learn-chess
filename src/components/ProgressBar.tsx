interface ProgressBarProps {
  solved: number;
  total: number;
  streak: number;
  consecutiveAtLevel: number;
  currentDifficulty: 1 | 2 | 3;
}

const LEVEL_NAMES: Record<1 | 2 | 3, string> = {
  1: 'Beginner',
  2: 'Explorer',
  3: 'Champion',
};

const LEVEL_COLORS: Record<1 | 2 | 3, string> = {
  1: '#22c55e',
  2: '#f59e0b',
  3: '#a855f7',
};

export default function ProgressBar({
  solved,
  total,
  streak,
  consecutiveAtLevel,
  currentDifficulty,
}: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;
  const levelColor = LEVEL_COLORS[currentDifficulty];
  // How many correct in a row before advancing (3)
  const NEEDED = 3;
  const levelDots = Math.min(consecutiveAtLevel, NEEDED);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    borderRadius: 'var(--border-radius)',
    padding: '1rem 1.25rem',
    boxShadow: 'var(--shadow)',
    border: '2px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.4rem',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: 700,
  };

  const trackStyle: React.CSSProperties = {
    width: '100%',
    height: '14px',
    background: '#f3f4f6',
    borderRadius: '999px',
    overflow: 'hidden',
  };

  const fillStyle: React.CSSProperties = {
    height: '100%',
    width: `${pct}%`,
    background: `linear-gradient(90deg, ${levelColor} 0%, #4ecdc4 100%)`,
    borderRadius: '999px',
    transition: 'width 0.5s ease',
  };

  const bottomRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.4rem',
  };

  return (
    <div style={containerStyle} role="region" aria-label="Progress">
      <div style={topRowStyle}>
        {/* Solved count */}
        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text)' }}>
          🧩 {solved} / {total} puzzles solved
        </span>

        {/* Streak */}
        <span
          style={{
            ...badgeStyle,
            background: streak > 0 ? '#fff7ed' : '#f9fafb',
            color: streak > 0 ? '#ea580c' : '#9ca3af',
            border: `1px solid ${streak > 0 ? '#fed7aa' : '#e5e7eb'}`,
          }}
        >
          🔥 {streak} streak
        </span>
      </div>

      {/* Progress bar */}
      <div style={trackStyle} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div style={fillStyle} />
      </div>

      <div style={bottomRowStyle}>
        {/* Current level badge */}
        <span
          style={{
            ...badgeStyle,
            background: `${levelColor}22`,
            color: levelColor,
            border: `1px solid ${levelColor}55`,
          }}
        >
          Level: {LEVEL_NAMES[currentDifficulty]}
        </span>

        {/* Level-up dots */}
        {currentDifficulty < 3 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              color: 'var(--color-text-light)',
            }}
          >
            <span>Level up:</span>
            {Array.from({ length: NEEDED }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: i < levelDots ? levelColor : '#e5e7eb',
                  display: 'inline-block',
                  transition: 'background 0.3s',
                  boxShadow: i < levelDots ? `0 0 6px ${levelColor}88` : 'none',
                }}
              />
            ))}
          </div>
        )}
        {currentDifficulty === 3 && (
          <span style={{ fontSize: '0.85rem', color: '#a855f7', fontWeight: 700 }}>
            🏆 Champion level!
          </span>
        )}
      </div>
    </div>
  );
}
