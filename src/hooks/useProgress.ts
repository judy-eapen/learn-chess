import { useState, useEffect, useCallback } from 'react';
import { LEVELS, UNLOCK_THRESHOLD, ADAPTIVE_LEVEL } from '../levels';

/** Per-level solved puzzle IDs */
export type LevelSolvedMap = Record<string, string[]>;

export interface ProgressState {
  /** Which level the user is currently playing */
  activeLevelId: string;
  /** Puzzle IDs solved per level */
  solvedByLevel: LevelSolvedMap;
  /** Player rating for Adaptive mode (starts at 400) */
  playerElo: number;
  /** Overall streak */
  streak: number;
  /** Total puzzles solved across all levels */
  totalSolved: number;
}

const STORAGE_KEY = 'chess-learn-progress-v2';
const STARTING_ELO = 400;
const ELO_CORRECT = 20;
const ELO_WRONG = 10;

function defaultSolvedByLevel(): LevelSolvedMap {
  const map: LevelSolvedMap = {};
  LEVELS.forEach((l) => {
    map[l.id] = [];
  });
  return map;
}

const DEFAULT_STATE: ProgressState = {
  activeLevelId: 'beginner',
  solvedByLevel: defaultSolvedByLevel(),
  playerElo: STARTING_ELO,
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
      // Ensure all level keys exist even if new levels were added
      solvedByLevel: {
        ...defaultSolvedByLevel(),
        ...(parsed.solvedByLevel ?? {}),
      },
    };
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

/** How many puzzles in a level's pool the user has solved */
export function levelSolvedCount(solvedByLevel: LevelSolvedMap, levelId: string): number {
  return (solvedByLevel[levelId] ?? []).length;
}

/**
 * Returns true if the level at `index` is unlocked.
 * - Index 0 (Beginner) and the Adaptive level are always unlocked.
 * - Otherwise, the previous level must be >= 80% complete.
 */
export function isLevelUnlocked(
  levelIndex: number,
  solvedByLevel: LevelSolvedMap,
): boolean {
  if (levelIndex === 0) return true;
  const level = LEVELS[levelIndex];
  if (level?.id === ADAPTIVE_LEVEL.id) return true;

  const prevLevel = LEVELS[levelIndex - 1];
  if (!prevLevel || prevLevel.id === ADAPTIVE_LEVEL.id) return true;

  const prevSolved = levelSolvedCount(solvedByLevel, prevLevel.id);
  return prevSolved / prevLevel.puzzleCount >= UNLOCK_THRESHOLD;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadState);

  useEffect(() => {
    saveState(progress);
  }, [progress]);

  /** Called when user solves a puzzle in the current active level */
  const markSolved = useCallback((puzzleId: string) => {
    setProgress((prev) => {
      const levelId = prev.activeLevelId;
      const alreadySolved = (prev.solvedByLevel[levelId] ?? []).includes(puzzleId);
      if (alreadySolved) return prev;

      const newSolvedForLevel = [...(prev.solvedByLevel[levelId] ?? []), puzzleId];
      return {
        ...prev,
        solvedByLevel: {
          ...prev.solvedByLevel,
          [levelId]: newSolvedForLevel,
        },
        streak: prev.streak + 1,
        totalSolved: prev.totalSolved + 1,
        // ELO goes up on correct answer (only matters in adaptive, but track globally)
        playerElo: Math.max(200, prev.playerElo + ELO_CORRECT),
      };
    });
  }, []);

  /** Called when user gets a puzzle wrong in adaptive mode */
  const markWrong = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      streak: 0,
      playerElo: Math.max(200, prev.playerElo - ELO_WRONG),
    }));
  }, []);

  const setActiveLevel = useCallback((levelId: string) => {
    setProgress((prev) => ({
      ...prev,
      activeLevelId: levelId,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: ProgressState = {
      ...DEFAULT_STATE,
      solvedByLevel: defaultSolvedByLevel(),
    };
    setProgress(fresh);
    saveState(fresh);
  }, []);

  return { progress, markSolved, markWrong, setActiveLevel, resetProgress };
}
