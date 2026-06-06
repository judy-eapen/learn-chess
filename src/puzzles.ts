export interface Puzzle {
  id: string;
  title: string;
  fen: string;
  solution: string[]; // UCI moves e.g. "e2e4"
  difficulty: 1 | 2 | 3;
  hint: string;
  explanation: string;
}

const puzzles: Puzzle[] = [
  // ── Difficulty 1: Checkmate in 1 ──────────────────────────────────────────

  {
    id: 'cm1-1',
    title: 'Back Rank Checkmate',
    fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    difficulty: 1,
    hint: 'The rook can deliver checkmate on the back rank!',
    explanation:
      'Ra8# — the rook slides to a8, and the Black king has nowhere to go. All escape squares are covered by the pawns on f7, g7, h7 and the rook itself. This is the classic "back-rank mate"!',
  },
  {
    id: 'cm1-2',
    title: 'Queen Delivers the Blow',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['h5f7'],
    difficulty: 1,
    hint: 'Look at the f7 square — it is only protected by the king!',
    explanation:
      'Qxf7# — this is the famous "Scholar\'s Mate"! The queen captures f7 supported by the bishop on c4, and the Black king cannot escape. Always protect f7 early in the game!',
  },
  {
    id: 'cm1-3',
    title: 'Rook Sweeps the Back Rank',
    fen: '6k1/4pppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    difficulty: 1,
    hint: 'The rook can travel all the way to the 8th rank in one move!',
    explanation:
      'Re8# — the rook slides all the way to e8, and the Black king on g8 is completely trapped. The pawns on e7, f7, g7, and h7 block every escape square on the 7th rank, and the rook controls the entire 8th rank. This is another back-rank mate!',
  },
  {
    id: 'cm1-4',
    title: 'Two Rooks Tango',
    fen: '3k4/8/3K4/8/8/8/8/RR6 w - - 0 1',
    solution: ['a1a8'],
    difficulty: 1,
    hint: 'One rook cuts off the king, the other delivers checkmate!',
    explanation:
      'Ra8# — with the king on d6 controlling the d8 escape square and the rook on b1 cutting the b-file, Ra8 is checkmate! This "ladder mate" with two rooks is one of the most important endgame techniques.',
  },
  {
    id: 'cm1-5',
    title: 'Smothered by Friends',
    fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['h6f7'],
    difficulty: 1,
    hint: 'The knight can jump to a square where the king cannot escape its own pieces!',
    explanation:
      'Nf7# — this is a "smothered mate" setup! The knight on f7 gives check, and the Black king on h8 is completely surrounded by its own rook on g8 and pawns on g7/h7. Sometimes your own pieces become your worst enemies!',
  },

  // ── Difficulty 2: Tactics (Fork / Pin / Skewer) ───────────────────────────

  {
    id: 'tac-1',
    title: 'Royal Fork!',
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: ['f3e5'],
    difficulty: 2,
    hint: 'Can your knight jump to a square that attacks two pieces at once?',
    explanation:
      'Nxe5! — the knight leaps to e5 forking the queen on d8 and the knight on c6! A fork attacks two pieces at the same time. After Nxe5, Black must lose material because they can\'t save both pieces.',
  },
  {
    id: 'tac-2',
    title: 'Pin the Bishop',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 2 6',
    solution: ['c4f7'],
    difficulty: 2,
    hint: 'Attack the king and win material!',
    explanation:
      'Bxf7+! — the bishop captures f7 with check! After Kxf7, White plays Ne5+ forking the king and winning the bishop on c5. This is a classic "removing the defender" tactic followed by a fork.',
  },
  {
    id: 'tac-3',
    title: 'Skewer the Queen',
    fen: '4k3/4q3/8/8/8/8/8/R3K3 w Q - 0 1',
    solution: ['a1a7'],
    difficulty: 2,
    hint: 'Your rook can attack along the 7th rank — what valuable piece is hiding behind?',
    explanation:
      'Ra7! — the rook skewers the queen on e7! A skewer is like a reverse pin: the more valuable piece (the queen) must move, exposing a less valuable piece behind it. But here, after Qxa7... wait — the queen is trapped! Qd8 is the only move, and Ra8+ follows.',
  },
  {
    id: 'tac-4',
    title: 'Knight Fork Attack',
    fen: 'r2qkb1r/ppp2ppp/2np1n2/4p3/2B1P1b1/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 2 7',
    solution: ['f3e5'],
    difficulty: 2,
    hint: 'Look for a knight move that attacks two undefended pieces!',
    explanation:
      'Nxe5! — the knight jumps to e5 forking the bishop on g4 and the knight on d6 (or threatening bigger ideas). Forks with knights are especially powerful because knights move in an L-shape that\'s hard to see coming!',
  },
  {
    id: 'tac-5',
    title: 'Discovered Attack',
    fen: '4k3/4r3/8/2B5/8/8/8/4K3 w - - 0 1',
    solution: ['c5f8'],
    difficulty: 2,
    hint: 'Move a piece to unleash an attack from a piece behind it!',
    explanation:
      'Bf8+! — the bishop moves to f8 with check, and now the rook on e7 is attacked "for free" because Black is forced to deal with the check first. This is a discovered attack: moving one piece reveals an attack from another piece behind it.',
  },

  // ── Difficulty 3: Longer Combinations ────────────────────────────────────

  {
    id: 'comb-1',
    title: 'Sacrifice for Mate',
    fen: 'r1bk3r/ppp2ppp/2np4/4P3/4n1b1/2NB1N2/PPP2PPP/R1BQK2R w KQ - 0 9',
    solution: ['f3e5', 'd3h7'],
    difficulty: 3,
    hint: 'First take a piece in the center, then look at the h7 pawn!',
    explanation:
      'Nxe5! and then Bxh7! — White first grabs the knight on e4, then sacrifices the bishop on h7 to expose the king. This two-move combination wins material and creates a dangerous attack. Always look one move further than you think!',
  },
  {
    id: 'comb-2',
    title: 'Windmill Attack',
    fen: 'r4rk1/ppp2ppp/8/4p3/4P3/3P4/PPP2PPP/2KR1R2 w - - 0 1',
    solution: ['d1d8', 'f1f8'],
    difficulty: 3,
    hint: 'Double rooks! What if both rooks could attack the back rank?',
    explanation:
      'Rd8+! Rxd8, then Rxd8+ — White uses both rooks in a "battery" to deliver consecutive checks! First the rook on d1 goes to d8, forcing the enemy rook to recapture, then the other rook captures on d8 with another check. Double rooks on an open file are devastating!',
  },
  {
    id: 'comb-3',
    title: 'Queen Sacrifice!',
    fen: '2r3k1/1p3ppp/p7/3Pp3/8/1P3N2/P4PPP/3R2K1 w - - 0 1',
    solution: ['d1d8', 'c8d8', 'f3e5'],
    difficulty: 3,
    hint: 'Sometimes giving away your queen wins the game! Trade pieces and then attack.',
    explanation:
      'Rxd8+! Rxd8 (forced), then Ne5 — White sacrifices the rook to deflect the defender, then the knight hops into a dominant central square, winning the pawn on e5 with a completely winning position. Material sacrifices that improve your position are often worth it!',
  },
  {
    id: 'comb-4',
    title: 'Pawn Promotion Race',
    fen: '8/P7/8/8/8/8/5p2/4K1k1 w - - 0 1',
    solution: ['a7a8q', 'f2f1q', 'a8f3'],
    difficulty: 3,
    hint: 'Both sides want to promote! Can your queen stop their pawn and win?',
    explanation:
      'a8=Q! f1=Q (Black promotes too), then Qf3+! — White promotes first, then after Black promotes, White gives check with Qf3+ forcing the Black king to move. After the king moves, White captures the Black queen. Pawn races require precise calculation!',
  },
  {
    id: 'comb-5',
    title: 'Arabian Mate',
    fen: '5rk1/5N1p/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['f7h6', 'a1a8'],
    difficulty: 3,
    hint: 'The knight and rook make a powerful team — can they trap the king in the corner?',
    explanation:
      'Nh6+ (check, forcing the king to h8), then Ra8# — this is the famous "Arabian Mate"! The knight covers the g8 and f7 escape squares, and the rook delivers checkmate on a8. The knight and rook work together beautifully to trap the king in the corner!',
  },
];

export default puzzles;
