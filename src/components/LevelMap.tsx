import { LEVELS } from '../levels';
import { isLevelUnlocked, levelSolvedCount, type LevelSolvedMap } from '../hooks/useProgress';

interface LevelMapProps {
  solvedByLevel: LevelSolvedMap;
  onSelectLevel: (levelId: string) => void;
  onResetProgress: () => void;
}

export default function LevelMap({ solvedByLevel, onSelectLevel, onResetProgress }: LevelMapProps) {
  return (
    <div className="level-map-container">
      <div className="level-map-intro">
        <h2 className="level-map-title">Choose Your Challenge</h2>
        <p className="level-map-subtitle">Complete 80% of a level to unlock the next one!</p>
      </div>

      <div className="level-grid">
        {LEVELS.map((level, index) => {
          const solved = levelSolvedCount(solvedByLevel, level.id);
          const unlocked = isLevelUnlocked(index, solvedByLevel);
          const total = level.puzzleCount;
          const pct = Math.min(100, Math.round((solved / total) * 100));
          const threshold = Math.ceil(total * 0.8);

          return (
            <button
              key={level.id}
              className={`level-card${unlocked ? '' : ' locked'}`}
              style={{ '--level-color': level.color } as React.CSSProperties}
              onClick={() => unlocked && onSelectLevel(level.id)}
              disabled={!unlocked}
              aria-label={`${level.label}${unlocked ? '' : ' (locked)'}`}
            >
              {!unlocked && (
                <div className="lock-overlay">
                  <span className="lock-icon">🔒</span>
                  <span className="lock-text">
                    Reach {threshold}/{total} in {LEVELS[index - 1]?.label ?? 'previous level'}
                  </span>
                </div>
              )}

              <div className="level-badge" style={{ background: level.color }}>
                {level.emoji}
              </div>

              <div className="level-card-content">
                <div className="level-label" style={{ color: level.color }}>{level.label}</div>
                <div className="level-description">{level.description}</div>

                <div className="level-progress-text">
                  <span>{solved} / {total} puzzles</span>
                  <span style={{ color: level.color, fontWeight: 700 }}>{pct}%</span>
                </div>
                <div className="level-progress-track">
                  <div
                    className="level-progress-fill"
                    style={{ width: `${pct}%`, background: level.color }}
                  />
                  <div
                    className="unlock-marker"
                    style={{ left: `${(threshold / total) * 100}%` }}
                    title={`Unlock next level at ${threshold} solved`}
                  />
                </div>
                {pct >= 80 && index < LEVELS.length - 1 && (
                  <div className="level-complete-badge">✓ Next level unlocked!</div>
                )}
                {pct >= 80 && index === LEVELS.length - 1 && (
                  <div className="level-complete-badge">🏆 Master of all levels!</div>
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

      <button className="reset-btn" onClick={onResetProgress}>Reset All Progress</button>
    </div>
  );
}
