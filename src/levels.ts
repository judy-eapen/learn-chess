export interface Level {
  id: string;
  label: string;
  minRating: number;
  maxRating: number;
  puzzleCount: number;
  color: string;
  description: string;
}

export const LEVELS: Level[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    minRating: 0,
    maxRating: 600,
    puzzleCount: 100,
    color: '#4caf50',
    description: 'Mate in 1, basic captures',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    minRating: 600,
    maxRating: 900,
    puzzleCount: 100,
    color: '#2196f3',
    description: 'Mate in 2, simple forks',
  },
  {
    id: 'intermediate2',
    label: 'Intermediate II',
    minRating: 900,
    maxRating: 1200,
    puzzleCount: 100,
    color: '#9c27b0',
    description: 'Mate in 2-3, pins, skewers',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    minRating: 1200,
    maxRating: 1600,
    puzzleCount: 100,
    color: '#ff9800',
    description: 'Combinations, discovered attacks',
  },
  {
    id: 'master',
    label: 'Master',
    minRating: 1600,
    maxRating: 9999,
    puzzleCount: 100,
    color: '#f44336',
    description: 'Complex multi-move combinations',
  },
  {
    id: 'adaptive',
    label: 'Adaptive',
    minRating: 0,
    maxRating: 9999,
    puzzleCount: Infinity,
    color: '#607d8b',
    description: 'Puzzles matched to your rating',
  },
];

export const ADAPTIVE_LEVEL = LEVELS[LEVELS.length - 1];
export const STANDARD_LEVELS = LEVELS.slice(0, -1);

/** Index of a level by id */
export function getLevelIndex(levelId: string): number {
  return LEVELS.findIndex((l) => l.id === levelId);
}

export function getLevelById(levelId: string): Level | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

/** 80% completion required to unlock the next level */
export const UNLOCK_THRESHOLD = 0.8;
