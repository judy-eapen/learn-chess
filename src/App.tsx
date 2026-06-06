import { useCallback, useMemo, useState } from 'react';
import './App.css';
import puzzles from './puzzles';
import { LEVELS, getLevelById } from './levels';
import { useProgress, isLevelUnlocked } from './hooks/useProgress';
import PuzzleBoard from './components/PuzzleBoard';
import LevelMap from './components/LevelMap';

type Screen = 'map' | 'puzzle';

export default function App() {
  const { progress, markSolved, markWrong, setActiveLevel, resetProgress } = useProgress();
  const [screen, setScreen] = useState<Screen>('map');
  const [puzzleKey, setPuzzleKey] = useState(0);

  const activeLevel = useMemo(
    () => getLevelById(progress.activeLevelId) ?? LEVELS[0],
    [progress.activeLevelId],
  );

  const levelPuzzles = useMemo(
    () => puzzles.filter(
      (p) => p.rating >= activeLevel.minRating && p.rating < activeLevel.maxRating,
    ),
    [activeLevel],
  );

  const currentPuzzle = useMemo(() => {
    const solvedInLevel = progress.solvedByLevel[activeLevel.id] ?? [];
    const unsolved = levelPuzzles.filter((p) => !solvedInLevel.includes(p.id));
    return unsolved[0] ?? levelPuzzles[0] ?? puzzles[0];
  }, [activeLevel.id, levelPuzzles, progress.solvedByLevel, puzzleKey]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSolved = useCallback((puzzleId: string) => { markSolved(puzzleId); }, [markSolved]);
  const handleNextPuzzle = useCallback(() => { setPuzzleKey((k) => k + 1); }, []);
  const handleBackToMap = useCallback(() => { setScreen('map'); }, []);

  const solvedCountInLevel = (progress.solvedByLevel[activeLevel.id] ?? []).length;

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">
          <span className="emoji">♟️</span>
          <h1>Chess Puzzles</h1>
        </div>
        {screen === 'puzzle' && (
          <button className="header-map-btn" onClick={handleBackToMap}>← Level Map</button>
        )}
        <div className="header-stats">
          <span className="header-stat">🔥 {progress.streak}</span>
        </div>
      </header>

      <main className="main-content">
        {screen === 'map' ? (
          <LevelMap
            solvedByLevel={progress.solvedByLevel}
            onSelectLevel={handleSelectLevel}
            onResetProgress={resetProgress}
          />
        ) : (
          currentPuzzle && (
            <PuzzleBoard
              key={`${currentPuzzle.id}-${puzzleKey}`}
              puzzle={currentPuzzle}
              level={activeLevel}
              solvedCount={solvedCountInLevel}
              onSolved={handleSolved}
              onWrong={markWrong}
              onNextPuzzle={handleNextPuzzle}
              onBackToMap={handleBackToMap}
            />
          )
        )}
      </main>

      <footer className="footer">Made with ♥ for chess explorers of all levels!</footer>
    </div>
  );
}
