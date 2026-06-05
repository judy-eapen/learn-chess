import { useState, useEffect, useCallback } from 'react';

export interface ProgressState {
  solvedIds: string[];
  currentDifficulty: 1 | 2 | 3;
  streak: number;
  consecutiveAtCurrentLevel: number;
  totalSolved: number;
}

const STORAGE_KEY = 'chess-learn-progress';

const DEFAULT_STATE: ProgressState = {
  solvedIds: [],
  currentDifficulty: 1,
  streak: 0,
  consecutiveAtCurrentLevel: 0,
  totalSolved: 0,
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage might be unavailable — fail silently
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadState);

  useEffect(() => {
    saveState(progress);
  }, [progress]);

  const markSolved = useCallback((puzzleId: string, puzzleDifficulty: 1 | 2 | 3) => {
    setProgress((prev) => {
      if (prev.solvedIds.includes(puzzleId)) return prev;

      const newSolvedIds = [...prev.solvedIds, puzzleId];
      const newStreak = prev.streak + 1;
      const newTotalSolved = prev.totalSolved + 1;

      let newConsecutive = prev.consecutiveAtCurrentLevel;
      let newDifficulty = prev.currentDifficulty;

      if (puzzleDifficulty === prev.currentDifficulty) {
        newConsecutive += 1;
        // Advance difficulty after 3 consecutive correct at current level
        if (newConsecutive >= 3 && prev.currentDifficulty < 3) {
          newDifficulty = (prev.currentDifficulty + 1) as 1 | 2 | 3;
          newConsecutive = 0;
        }
      } else {
        // Puzzle was from a different difficulty (manual selection)
        newConsecutive = prev.consecutiveAtCurrentLevel;
      }

      return {
        solvedIds: newSolvedIds,
        currentDifficulty: newDifficulty,
        streak: newStreak,
        consecutiveAtCurrentLevel: newConsecutive,
        totalSolved: newTotalSolved,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_STATE };
    setProgress(fresh);
    saveState(fresh);
  }, []);

  const setDifficulty = useCallback((level: 1 | 2 | 3) => {
    setProgress((prev) => ({
      ...prev,
      currentDifficulty: level,
      consecutiveAtCurrentLevel: 0,
    }));
  }, []);

  return { progress, markSolved, resetProgress, setDifficulty };
}
