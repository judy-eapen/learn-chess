export interface Level {
  id: string;
  label: string;
  minRating: number;
  maxRating: number;
  puzzleCount: number;
  color: string;
  description: string;
  emoji: string;
}

export const LEVELS: Level[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    minRating: 0,
    maxRating: 600,
    puzzleCount: 37,
    color: '#4caf50',
    description: 'Mate in 1, basic captures',
    emoji: '🌱',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    minRating: 600,
    maxRating: 900,
    puzzleCount: 14,
    color: '#2196f3',
    description: 'Mate in 2, simple forks',
    emoji: '🌿',
  },
  {
    id: 'intermediate2',
    label: 'Intermediate II',
    minRating: 900,
    maxRating: 1200,
    puzzleCount: 9,
    color: '#9c27b0',
    description: 'Mate in 2–3, pins & skewers',
    emoji: '🌳',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    minRating: 1200,
    maxRating: 1600,
    puzzleCount: 7,
    color: '#ff9800',
    description: 'Combinations, discovered attacks',
    emoji: '🔥',
  },
  {
    id: 'master',
    label: 'Master',
    minRating: 1600,
    maxRating: 2000,
    puzzleCount: 8,
    color: '#f44336',
    description: 'Complex multi-move combinations',
    emoji: '👑',
  },
  {
    id: 'adaptive',
    label: 'Adaptive',
    minRating: 2000,
    maxRating: 9999,
    puzzleCount: 8,
    color: '#607d8b',
    description: 'Grandmaster-level — the ultimate challenge',
    emoji: '⚡',
  },
];

/** 80% completion required to unlock the next level */
export const UNLOCK_THRESHOLD = 0.8;

export function getLevelById(levelId: string): Level | undefined {
  return LEVELS.find((l) => l.id === levelId);
}

export function getLevelIndex(levelId: string): number {
  return LEVELS.findIndex((l) => l.id === levelId);
}
