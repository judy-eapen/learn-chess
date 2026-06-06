import { useCallback, useMemo, useState } from 'react';
import './App.css';
import puzzles from './puzzles';
import { LEVELS, getLevelById, ADAPTIVE_LEVEL } from './levels';
import { useProgress, isLevelUnlocked } from './hooks/useProgress';
import PuzzleBoard from './components/PuzzleBoard';
import LevelMap from './components/LevelMap';

type Screen = 'map' | 'puzzle';

export default function App() {
  const { progress, markSolved, markWrong, setActiveLevel, resetProgress } = useProgress();
  const [screen, setScreen] = useState<Screen>('map');
  const [puzzleKey, setPuzzleKey] = useState(0);

  // ── Level resolution ───────────────────────────────────────────────────────
  const activeLevel = useMemo(
    () => getLevelById(progress.activeLevelId) ?? LEVELS[0],
    [progress.activeLevelId],
  );

  const isAdaptive = activeLevel.id === ADAPTIVE_LEVEL.id;

  // ── Puzzle pool for the active level ──────────────────────────────────────
  const levelPuzzles = useMemo(() => {
    if (isAdaptive) {
      // All puzzles, sorted by how close they are to the player's ELO
      return [...puzzles].sort(
        (a, b) =>
          Math.abs(a.rating - progress.playerElo) -
          Math.abs(b.rating - progress.playerElo),
      );
    }
    // Standard level: filter by rating range
    return puzzles.filter(
      (p) => p.rating >= activeLevel.minRating && p.rating < activeLevel.maxRating,
    );
  }, [isAdaptive, activeLevel, progress.playerElo]);

  // ── Current puzzle selection ───────────────────────────────────────────────
  const currentPuzzle = useMemo(() => {
    const solvedInLevel = progress.solvedByLevel[activeLevel.id] ?? [];

    if (isAdaptive) {
      // Pick closest-to-ELO puzzle that hasn't been done recently
      // (Allow replays — in adaptive we care about rating match, not completion)
      return levelPuzzles[0] ?? puzzles[0];
    }

    // Standard: pick first unsolved in the level pool
    const unsolved = levelPuzzles.filter((p) => !solvedInLevel.includes(p.id));
    if (unsolved.length > 0) return unsolved[0];

    // All done — cycle from the beginning
    return levelPuzzles[0] ?? puzzles[0];
  }, [activeLevel.id, isAdaptive, levelPuzzles, progress.solvedByLevel, puzzleKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectLevel = useCallback(
    (levelId: string) => {
      const levelIndex = LEVELS.findIndex((l) => l.id === levelId);
      if (!isLevelUnlocked(levelIndex, progress.solvedByLevel)) return;
      setActiveLevel(levelId);
      setPuzzleKey((k) => k + 1);
      setScreen('puzzle');
    },
    [progress.solvedByLevel, setActiveLevel],
  );

  const handleSolved = useCallback(
    (puzzleId: string) => {
      markSolved(puzzleId);
    },
    [markSolved],
  );

  const handleNextPuzzle = useCallback(() => {
    setPuzzleKey((k) => k + 1);
  }, []);

  const handleBackToMap = useCallback(() => {
    setScreen('map');
  }, []);

  // ── Solved count in the current level ─────────────────────────────────────
  const solvedCountInLevel = (progress.solvedByLevel[activeLevel.id] ?? []).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-title">
          <span className="emoji">♟️</span>
          <h1>Chess Puzzles</h1>
        </div>

        {screen === 'puzzle' && (
          <button className="header-map-btn" onClick={handleBackToMap}>
            ← Level Map
          </button>
        )}

        <div className="header-stats">
          <span className="header-stat">
            🔥 {progress.streak}
          </span>
          {isAdaptive && (
            <span className="header-stat" style={{ color: ADAPTIVE_LEVEL.color }}>
              ELO {progress.playerElo}
            </span>
          )}
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="main-content">
        {screen === 'map' ? (
          <LevelMap
            solvedByLevel={progress.solvedByLevel}
            playerElo={progress.playerElo}
            onSelectLevel={handleSelectLevel}
            onResetProgress={resetProgress}
          />
        ) : (
          currentPuzzle && (
            <PuzzleBoard
              key={`${currentPuzzle.id}-${puzzleKey}`}
              puzzle={currentPuzzle}
              level={activeLevel}
              playerElo={progress.playerElo}
              isAdaptive={isAdaptive}
              solvedCount={solvedCountInLevel}
              onSolved={handleSolved}
              onWrong={markWrong}
              onNextPuzzle={handleNextPuzzle}
              onBackToMap={handleBackToMap}
            />
          )
        )}
      </main>

      <footer className="footer">
        Made with ♥ for chess explorers of all levels!
      </footer>
    </div>
  );
}
