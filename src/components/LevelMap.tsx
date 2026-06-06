import { LEVELS, ADAPTIVE_LEVEL } from '../levels';
import { isLevelUnlocked, levelSolvedCount, type LevelSolvedMap } from '../hooks/useProgress';

interface LevelMapProps {
  solvedByLevel: LevelSolvedMap;
  playerElo: number;
  onSelectLevel: (levelId: string) => void;
  onResetProgress: () => void;
}

export default function LevelMap({
  solvedByLevel,
  playerElo,
  onSelectLevel,
  onResetProgress,
}: LevelMapProps) {
  return (
    <div className="level-map-container">
      <div className="level-map-intro">
        <h2 className="level-map-title">Choose Your Challenge</h2>
        <p className="level-map-subtitle">
          Complete 80% of a level to unlock the next one!
        </p>
      </div>

      <div className="level-grid">
        {LEVELS.map((level, index) => {
          const solved = levelSolvedCount(solvedByLevel, level.id);
          const isAdaptive = level.id === ADAPTIVE_LEVEL.id;
          const unlocked = isLevelUnlocked(index, solvedByLevel);
          const isFinite = level.puzzleCount !== Infinity;
          const total = isFinite ? level.puzzleCount : null;
          const pct = isFinite && total ? Math.min(100, Math.round((solved / total) * 100)) : null;
          const threshold = isFinite && total ? Math.ceil(total * 0.8) : null;

          return (
            <button
              key={level.id}
              className={`level-card${unlocked ? '' : ' locked'}${isAdaptive ? ' adaptive' : ''}`}
              style={{
                '--level-color': level.color,
              } as React.CSSProperties}
              onClick={() => unlocked && onSelectLevel(level.id)}
              disabled={!unlocked}
              aria-label={`${level.label}${unlocked ? '' : ' (locked)'}`}
            >
              {/* Lock overlay */}
              {!unlocked && (
                <div className="lock-overlay">
                  <span className="lock-icon">🔒</span>
                  <span className="lock-text">
                    Reach {threshold}/{total} in{' '}
                    {LEVELS[index - 1]?.label ?? 'previous level'}
                  </span>
                </div>
              )}

              {/* Badge (top right) */}
              <div className="level-badge" style={{ background: level.color }}>
                {isAdaptive ? '⚡' : index === 0 ? '🌱' : index === 1 ? '🌿' : index === 2 ? '🌳' : index === 3 ? '🔥' : '👑'}
              </div>

              {/* Content */}
              <div className="level-card-content">
                <div className="level-label" style={{ color: level.color }}>
                  {level.label}
                </div>
                <div className="level-description">{level.description}</div>

                {isAdaptive ? (
                  <div className="adaptive-elo">
                    <span className="elo-label">Your Rating</span>
                    <span className="elo-value" style={{ color: level.color }}>
                      {playerElo}
                    </span>
                    <span className="elo-label">Dynamic puzzles matched to your level</span>
                  </div>
                ) : (
                  <>
                    <div className="level-progress-text">
                      <span>{solved} / {total} puzzles</span>
                      <span style={{ color: level.color, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div className="level-progress-track">
                      <div
                        className="level-progress-fill"
                        style={{
                          width: `${pct}%`,
                          background: level.color,
                        }}
                      />
                      {/* Unlock threshold marker */}
                      {threshold && total && (
                        <div
                          className="unlock-marker"
                          style={{ left: `${(threshold / total) * 100}%` }}
                          title={`Unlock next level at ${threshold} solved`}
                        />
                      )}
                    </div>
                    {pct! >= 80 && (
                      <div className="level-complete-badge">
                        ✓ Next level unlocked!
                      </div>
                    )}
                  </>
                )}
              </div>

              {unlocked && (
                <div className="level-play-btn" style={{ borderColor: level.color, color: level.color }}>
                  Play →
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        className="reset-btn"
        onClick={onResetProgress}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#ef4444';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-light)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
        }}
      >
        Reset All Progress
      </button>
    </div>
  );
}
