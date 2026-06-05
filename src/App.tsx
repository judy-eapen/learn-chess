import { useCallback, useMemo, useState } from 'react';
import './App.css';
import puzzles from './puzzles';
import { useProgress } from './hooks/useProgress';
import PuzzleBoard from './components/PuzzleBoard';
import ProgressBar from './components/ProgressBar';

const DIFF_LABELS: Record<1 | 2 | 3, string> = {
  1: '⭐ Beginner',
  2: '⭐⭐ Explorer',
  3: '⭐⭐⭐ Champion',
};

export default function App() {
  const { progress, markSolved, resetProgress, setDifficulty } = useProgress();
  // puzzleKey forces re-mount of PuzzleBoard when the user clicks "Next Puzzle"
  const [puzzleKey, setPuzzleKey] = useState(0);

  // Pick the next unsolved puzzle at the current difficulty,
  // or fall back to any unsolved, or replay if all solved.
  const currentPuzzle = useMemo(() => {
    const diffPuzzles = puzzles.filter((p) => p.difficulty === progress.currentDifficulty);
    const unsolved = diffPuzzles.filter((p) => !progress.solvedIds.includes(p.id));
    if (unsolved.length > 0) return unsolved[0];
    const allUnsolved = puzzles.filter((p) => !progress.solvedIds.includes(p.id));
    if (allUnsolved.length > 0) return allUnsolved[0];
    // Everything solved — replay from beginning of current difficulty
    return diffPuzzles[0] ?? puzzles[0];
  }, [progress.currentDifficulty, progress.solvedIds, puzzleKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSolved = useCallback(
    (puzzleId: string, difficulty: 1 | 2 | 3) => {
      markSolved(puzzleId, difficulty);
    },
    [markSolved],
  );

  const handleNextPuzzle = useCallback(() => {
    setPuzzleKey((k) => k + 1);
  }, []);

  return (
    <div className="app">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-title">
          <span className="emoji">♟️</span>
          <h1>Chess Puzzles!</h1>
        </div>

        <div className="difficulty-selector">
          <span>Level:</span>
          {([1, 2, 3] as const).map((level) => (
            <button
              key={level}
              className={`diff-btn${progress.currentDifficulty === level ? ' active' : ''}`}
              onClick={() => setDifficulty(level)}
              aria-pressed={progress.currentDifficulty === level}
            >
              {DIFF_LABELS[level]}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="main-content">
        <ProgressBar
          solved={progress.totalSolved}
          total={puzzles.length}
          streak={progress.streak}
          consecutiveAtLevel={progress.consecutiveAtCurrentLevel}
          currentDifficulty={progress.currentDifficulty}
        />

        {currentPuzzle && (
          <PuzzleBoard
            key={`${currentPuzzle.id}-${puzzleKey}`}
            puzzle={currentPuzzle}
            onSolved={handleSolved}
            onNextPuzzle={handleNextPuzzle}
          />
        )}

        <button
          onClick={resetProgress}
          style={{
            marginTop: '0.5rem',
            background: 'transparent',
            color: 'var(--color-text-light)',
            fontSize: '0.8rem',
            padding: '0.3rem 0.7rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#ef4444';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-light)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
          }}
        >
          🔄 Reset Progress
        </button>
      </main>

      <footer className="footer">
        Made with ♥ for young chess explorers!
      </footer>
    </div>
  );
}
