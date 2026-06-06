import { useState, useEffect, useCallback } from 'react';
import { LEVELS, UNLOCK_THRESHOLD } from '../levels';

export type LevelSolvedMap = Record<string, string[]>;

export interface ProgressState {
  activeLevelId: string;
  solvedByLevel: LevelSolvedMap;
  streak: number;
  totalSolved: number;
}

const STORAGE_KEY = 'chess-learn-progress-v3';

function defaultSolvedByLevel(): LevelSolvedMap {
  const map: LevelSolvedMap = {};
  LEVELS.forEach((l) => { map[l.id] = []; });
  return map;
}

const DEFAULT_STATE: ProgressState = {
  activeLevelId: 'beginner',
  solvedByLevel: defaultSolvedByLevel(),
  streak: 0,
  totalSolved: 0,
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      solvedByLevel: { ...defaultSolvedByLevel(), ...(parsed.solvedByLevel ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: ProgressState): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export function levelSolvedCount(solvedByLevel: LevelSolvedMap, levelId: string): number {
  return (solvedByLevel[levelId] ?? []).length;
}

export function isLevelUnlocked(levelIndex: number, solvedByLevel: LevelSolvedMap): boolean {
  if (levelIndex === 0) return true;
  const prevLevel = LEVELS[levelIndex - 1];
  if (!prevLevel) return true;
  const prevSolved = levelSolvedCount(solvedByLevel, prevLevel.id);
  return prevSolved / prevLevel.puzzleCount >= UNLOCK_THRESHOLD;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadState);

  useEffect(() => { saveState(progress); }, [progress]);

  const markSolved = useCallback((puzzleId: string) => {
    setProgress((prev) => {
      const levelId = prev.activeLevelId;
      if ((prev.solvedByLevel[levelId] ?? []).includes(puzzleId)) return prev;
      return {
        ...prev,
        solvedByLevel: {
          ...prev.solvedByLevel,
          [levelId]: [...(prev.solvedByLevel[levelId] ?? []), puzzleId],
        },
        streak: prev.streak + 1,
        totalSolved: prev.totalSolved + 1,
      };
    });
  }, []);

  const markWrong = useCallback(() => {
    setProgress((prev) => ({ ...prev, streak: 0 }));
  }, []);

  const setActiveLevel = useCallback((levelId: string) => {
    setProgress((prev) => ({ ...prev, activeLevelId: levelId }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_STATE, solvedByLevel: defaultSolvedByLevel() };
    setProgress(fresh);
    saveState(fresh);
  }, []);

  return { progress, markSolved, markWrong, setActiveLevel, resetProgress };
}
