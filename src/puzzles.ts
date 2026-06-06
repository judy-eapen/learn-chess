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
    fen: '6k1/4pppp/8/8/8/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8'],
    difficulty: 1,
    hint: 'The rook can travel all the way to the 8th rank in one move — find an open file!',
    explanation:
      'Rd8# — the rook slides up the d-file all the way to d8, and the Black king on g8 is completely trapped. The pawns on e7, f7, g7, and h7 block every escape square, and the rook controls the entire 8th rank. Checkmate!',
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
    title: 'Skewer the King',
    fen: '8/8/8/8/8/2k4q/8/R3K3 w Q - 0 1',
    solution: ['a1a3'],
    difficulty: 2,
    hint: 'Your rook can attack along the 3rd rank — the king is in front of a valuable piece!',
    explanation:
      'Ra3+! — the rook skewers the Black king on c3! A skewer forces the more valuable piece to move, then the less valuable piece behind it is captured. After the king steps aside, White captures the queen on h3, winning decisive material.',
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
    title: 'Bishop Wins the Rook',
    fen: '5k2/4r3/8/2B5/8/8/8/5K2 w - - 0 1',
    solution: ['c5e7'],
    difficulty: 2,
    hint: 'Your bishop can reach the rook along the diagonal — and give check at the same time!',
    explanation:
      'Bxe7+! — the bishop captures the rook on e7 with check! This is a "capturing with tempo" tactic: White wins the rook AND gives check, forcing Black to respond to the check rather than recapturing. Always look for moves that attack two things at once!',
  },

  // ── Difficulty 3: Longer Combinations ────────────────────────────────────

  {
    id: 'comb-1',
    title: 'Sacrifice for Mate',
    fen: '6k1/4Qppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7f7', 'g8h8', 'e1e8'],
    difficulty: 3,
    hint: 'Sacrifice your queen to force the king to the corner, then deliver a back-rank mate!',
    explanation:
      'Qxf7+! forces the king to h8, then Re8# — White sacrifices the queen by capturing on f7 with check. The Black king is forced to the corner on h8. Then the rook delivers checkmate on e8, supported by the g7 and h7 pawns trapping the king. Sacrifices that lead to forced checkmate are the most powerful moves in chess!',
  },
  {
    id: 'comb-2',
    title: 'Rook Sacrifice for Checkmate',
    fen: '2r3k1/5ppp/8/8/Q7/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'c8e8', 'a4e8'],
    difficulty: 3,
    hint: 'Sacrifice your rook to deflect the defender, then bring the queen in for checkmate!',
    explanation:
      'Re8+! forces Rxe8 (the rook must capture), then Qxe8# — White sacrifices the rook on e8 to lure Black\'s rook onto that square. Once the rook moves to e8, the queen swoops in from a4 along the diagonal to deliver checkmate. Deflection sacrifices are a key tactical weapon!',
  },
  {
    id: 'comb-3',
    title: 'Rook Sacrifice!',
    fen: '2r3k1/1p3ppp/p7/4p3/8/1P3N2/P4PPP/3R2K1 w - - 0 1',
    solution: ['d1d8', 'c8d8', 'f3e5'],
    difficulty: 3,
    hint: 'Sacrifice the rook to deflect the defender, then plant the knight in the center!',
    explanation:
      'Rxd8+! Rxd8 (forced), then Ne5 — White sacrifices the rook to deflect the defender, then the knight hops into a dominant central square, winning the pawn on e5 with a completely winning position. Material sacrifices that improve your position are often worth it!',
  },
  {
    id: 'comb-4',
    title: 'Pawn Promotion Race',
    fen: '8/P7/8/8/8/8/7p/3K1k2 w - - 0 1',
    solution: ['a7a8q', 'h2h1q', 'a8h1'],
    difficulty: 3,
    hint: 'Both sides want to promote! Can your queen capture theirs before they use it?',
    explanation:
      'a8=Q! h1=Q (Black promotes too), then Qxh1+! — White promotes first on a8. After Black promotes on h1, White\'s queen is perfectly placed to capture the new Black queen with check via the long diagonal. Pawn races require precise calculation — promote first and strike immediately!',
  },
  {
    id: 'comb-5',
    title: 'Arabian Mate',
    fen: '6k1/6pp/8/5N2/8/8/8/R5K1 w - - 0 1',
    solution: ['f5h6', 'g8h8', 'a1a8'],
    difficulty: 3,
    hint: 'The knight and rook make a powerful team — can they trap the king in the corner?',
    explanation:
      'Nh6+! forces the king to h8, then Ra8# — this is the famous "Arabian Mate"! The knight jumps to h6 giving check and covering the g8 escape square. The Black king is forced to the corner on h8. With g7 and h7 pawns blocking and the knight covering g8, the rook delivers checkmate on a8. The knight and rook work together beautifully to trap the king!',
  },
];

export default puzzles;
