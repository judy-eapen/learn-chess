import { Chess } from 'chess.js';

// ─────────────────────────────────────────────────────────────────────────────
// PUZZLE CANDIDATES
// Each puzzle: { id, title, fen, solution, level, hint, explanation }
// solution: array of UCI strings, White+Black alternating when multi-move
// ─────────────────────────────────────────────────────────────────────────────

const beginnerCandidates = [
  // ── Pattern A: Back-rank Rook Mate (15 variations) ───────────────────────
  {
    id: 'b-a1',
    title: 'Back Rank Mate 1',
    fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Slide the rook all the way to the 8th rank!',
    explanation: 'Ra8# — the rook delivers checkmate on the back rank. The Black king is trapped by its own pawns on f7, g7, h7.',
  },
  {
    id: 'b-a2',
    title: 'Back Rank Mate 2',
    fen: '7k/6pp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The rook can zoom to the 8th rank in one move!',
    explanation: 'Ra8# — the rook races to the 8th rank and the king on h8 is trapped by its g7 and h7 pawns.',
  },
  {
    id: 'b-a3',
    title: 'Back Rank Mate 3',
    fen: 'k7/ppp5/8/8/8/8/8/7R w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'The rook belongs on the 8th rank!',
    explanation: 'Rh8# — the rook slides to h8, trapping the king on a8 behind its own pawns on a7, b7, c7.',
  },
  {
    id: 'b-a4',
    title: 'Back Rank Mate 4',
    fen: '6k1/4pppp/8/8/8/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'Send the rook straight up the d-file!',
    explanation: 'Rd8# — the rook travels up the d-file to d8, delivering checkmate. The king is boxed in by four pawns.',
  },
  {
    id: 'b-a5',
    title: 'Back Rank Mate 5',
    fen: 'k7/pp6/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The a-file is open — use it!',
    explanation: 'Ra8# — the rook blazes up the a-file to deliver checkmate. The king is blocked by its own pawns on a7 and b7.',
  },
  {
    id: 'b-a6',
    title: 'Back Rank Mate 6',
    fen: '5k2/4pppp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The rook can reach the back rank in one move!',
    explanation: 'Ra8# — the rook on a1 slides to a8, and the king on f8 is trapped by its pawns on e7, f7, g7, h7.',
  },
  {
    id: 'b-a7',
    title: 'Back Rank Mate 7',
    fen: 'k7/p1p5/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The king is cornered — find the checkmate!',
    explanation: 'Ra8# — the rook delivers checkmate on a8. The a7 and c7 pawns prevent the king from escaping.',
  },
  {
    id: 'b-a8',
    title: 'Back Rank Mate 8',
    fen: '7k/5ppp/8/8/8/8/8/6KR w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'The h-file is wide open for your rook!',
    explanation: 'Rh8# — the rook slides up the h-file to h8, cornering the king. The f7, g7, h7 pawns seal off every escape.',
  },
  {
    id: 'b-a9',
    title: 'Back Rank Mate 9',
    fen: '6k1/6pp/8/8/8/8/8/6KR w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'Swing the rook to the 8th rank!',
    explanation: 'Rh8# — the rook on h1 goes all the way to h8, delivering checkmate to the king trapped by g7 and h7.',
  },
  {
    id: 'b-a10',
    title: 'Back Rank Mate 10',
    fen: '1k6/1pp5/8/8/8/8/8/1R4K1 w - - 0 1',
    solution: ['b1b8'],
    level: 'beginner',
    hint: 'Use the open b-file!',
    explanation: 'Rb8# — the rook shoots up the b-file. The king on b8 is trapped by its own pawns on b7 and c7.',
  },
  {
    id: 'b-a11',
    title: 'Back Rank Mate 11',
    fen: '2k5/2pp4/8/8/8/8/8/2R3K1 w - - 0 1',
    solution: ['c1c8'],
    level: 'beginner',
    hint: 'Blast the rook up the c-file!',
    explanation: 'Rc8# — the rook races to c8, trapping the king. The c7 and d7 pawns prevent any escape.',
  },
  {
    id: 'b-a12',
    title: 'Back Rank Mate 12',
    fen: '3k4/3ppp2/8/8/8/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'Find the open file and deliver checkmate!',
    explanation: 'Rd8# — the rook zooms to d8, and the king on d8 is trapped by its d7, e7, f7 pawns.',
  },
  {
    id: 'b-a13',
    title: 'Back Rank Mate 13',
    fen: '4k3/4pppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'The e-file leads straight to checkmate!',
    explanation: 'Re8# — the rook blasts up the e-file to e8 delivering checkmate to the king trapped by pawns.',
  },
  {
    id: 'b-a14',
    title: 'Back Rank Mate 14',
    fen: '5k2/5ppp/8/8/8/8/8/5RK1 w - - 0 1',
    solution: ['f1f8'],
    level: 'beginner',
    hint: 'Launch the rook up the f-file!',
    explanation: 'Rf8# — the rook on f1 goes to f8, delivering checkmate. The pawns on f7, g7, h7 trap the king.',
  },
  {
    id: 'b-a15',
    title: 'Back Rank Mate 15',
    fen: '6k1/4pp1p/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'Aim the rook at the back rank!',
    explanation: 'Re8# — the rook delivers checkmate on e8. The f7, h7, and e7 pawns trap the Black king on g8.',
  },

  // ── Pattern B: Back-rank Queen Mate (12 variations) ──────────────────────
  {
    id: 'b-b1',
    title: 'Queen on the Back Rank 1',
    fen: '6k1/5ppp/8/8/8/8/8/Q5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Send the queen to the 8th rank!',
    explanation: 'Qa8# — the queen slides to a8, delivering checkmate. The pawns on f7, g7, h7 trap the king in the corner.',
  },
  {
    id: 'b-b2',
    title: 'Queen on the Back Rank 2',
    fen: '7k/6pp/8/8/8/8/8/Q5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The queen has a clear path to the 8th rank!',
    explanation: 'Qa8# — the queen races to a8. The king on h8 is trapped by its g7 and h7 pawns.',
  },
  {
    id: 'b-b3',
    title: 'Queen on the Back Rank 3',
    fen: 'k7/pp6/8/8/8/8/8/6QK w - - 0 1',
    solution: ['g1g8'],
    level: 'beginner',
    hint: 'The queen can cover the entire 8th rank!',
    explanation: 'Qg8# — the queen slides diagonally and delivers checkmate. The king on a8 is trapped by its pawns.',
  },
  {
    id: 'b-b4',
    title: 'Queen on the Back Rank 4',
    fen: '5k2/4pppp/8/8/8/8/8/5QK1 w - - 0 1',
    solution: ['f1f8'],
    level: 'beginner',
    hint: 'Line up the queen on the f-file!',
    explanation: 'Qf8# — the queen zooms to f8, delivering checkmate. The four pawns block every escape square.',
  },
  {
    id: 'b-b5',
    title: 'Queen on the Back Rank 5',
    fen: '6k1/5ppp/8/8/8/8/8/6QK w - - 0 1',
    solution: ['g1g8'],
    level: 'beginner',
    hint: 'Move the queen straight up!',
    explanation: 'Qg8# — the queen goes straight to g8, delivering checkmate. The pawns hold the king on the back rank.',
  },
  {
    id: 'b-b6',
    title: 'Queen on the Back Rank 6',
    fen: '1k6/1pp5/8/8/8/8/8/1Q4K1 w - - 0 1',
    solution: ['b1b8'],
    level: 'beginner',
    hint: 'Fire the queen straight up the b-file!',
    explanation: 'Qb8# — the queen delivers checkmate on b8. The king is blocked by its own pawns on b7 and c7.',
  },
  {
    id: 'b-b7',
    title: 'Queen on the Back Rank 7',
    fen: '2k5/2ppp3/8/8/8/8/8/2Q3K1 w - - 0 1',
    solution: ['c1c8'],
    level: 'beginner',
    hint: 'Drive the queen to the back rank!',
    explanation: 'Qc8# — the queen on c1 delivers checkmate on c8, with the king trapped by the c7, d7, e7 pawns.',
  },
  {
    id: 'b-b8',
    title: 'Queen on the Back Rank 8',
    fen: '3k4/2ppp3/8/8/8/8/8/3Q2K1 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'The queen goes straight up!',
    explanation: 'Qd8# — the queen shoots to d8, trapping the king. The pawns on c7, d7, e7 seal the cage.',
  },
  {
    id: 'b-b9',
    title: 'Queen on the Back Rank 9',
    fen: '4k3/3ppppp/8/8/8/8/8/4Q1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'Line the queen up on the e-file!',
    explanation: 'Qe8# — the queen delivers checkmate on e8. The five pawns completely block all king escapes.',
  },
  {
    id: 'b-b10',
    title: 'Queen on the Back Rank 10',
    fen: '7k/5ppp/8/8/8/8/8/6QK w - - 0 1',
    solution: ['g1g8'],
    level: 'beginner',
    hint: 'The queen can reach any square on the 8th rank!',
    explanation: 'Qg8# — the queen moves to g8, delivering checkmate. The king on h8 cannot escape.',
  },
  {
    id: 'b-b11',
    title: 'Queen Diagonal Mate',
    fen: '6k1/5ppp/8/8/8/8/8/7Q w - - 0 1',
    solution: ['h1a8'],
    level: 'beginner',
    hint: 'The queen can attack diagonally too!',
    explanation: 'Qa8# — the queen moves diagonally all the way to a8, delivering checkmate. The g7, h7 pawns trap the king.',
  },
  {
    id: 'b-b12',
    title: 'Queen Delivers Mate',
    fen: '7k/5ppp/8/8/8/8/8/7Q w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'Move the queen straight up the h-file!',
    explanation: 'Qh8# — the queen slides up to h8, delivering checkmate. The g7 pawn blocks the king\'s only escape.',
  },

  // ── Pattern C: Knight (Smothered) Mate (10 variations) ───────────────────
  {
    id: 'b-c1',
    title: 'Smothered Mate 1',
    fen: '6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['h6f7'],
    level: 'beginner',
    hint: 'The knight can jump to a square where the king is smothered!',
    explanation: 'Nf7# — the knight leaps to f7, delivering checkmate. The king on h8 is surrounded by its own rook on g8 and pawns on g7, h7.',
  },
  {
    id: 'b-c2',
    title: 'Smothered Mate 2',
    fen: '5rkr/5ppp/6N1/8/8/8/8/6K1 w - - 0 1',
    solution: ['g6f8'],
    level: 'beginner',
    hint: 'The knight can leap to the back rank for checkmate!',
    explanation: 'Nf8# — the knight jumps to f8, delivering checkmate. The king on g8 is completely surrounded by its own pieces.',
  },
  {
    id: 'b-c3',
    title: 'Knight Delivers Mate',
    fen: 'rkr5/ppp5/1N6/8/8/8/8/1K6 w - - 0 1',
    solution: ['b6a8'],
    level: 'beginner',
    hint: 'The knight can jump to the corner for checkmate!',
    explanation: 'Na8# — the knight leaps to a8, delivering checkmate. The king on b8 is trapped by its rooks and pawns.',
  },
  {
    id: 'b-c4',
    title: 'Knight Cornered Mate',
    fen: '1rk5/1pp5/3N4/8/8/8/8/2K5 w - - 0 1',
    solution: ['d6b7'],
    level: 'beginner',
    hint: 'The knight can fork its way to checkmate!',
    explanation: 'Nb7# — the knight checks on b7, and the king on c8 is completely blocked by the rook on b8 and pawns on b7 and c7... wait, it lands ON b7. The king can\'t go anywhere.',
  },
  {
    id: 'b-c5',
    title: 'Knight Smothers the King',
    fen: '6rk/5prp/8/6N1/8/8/8/6K1 w - - 0 1',
    solution: ['g5f7'],
    level: 'beginner',
    hint: 'Look for the square where the king is completely trapped!',
    explanation: 'Nf7# — the knight delivers checkmate on f7. The king on h8 is completely surrounded by rooks on g8 and f7 area, and pawns.',
  },
  {
    id: 'b-c6',
    title: 'Knight Mate in Corner',
    fen: 'rk6/pr6/2N5/8/8/8/8/K7 w - - 0 1',
    solution: ['c6b8'],
    level: 'beginner',
    hint: 'Jump the knight to the corner square!',
    explanation: 'Nb8# — the knight delivers checkmate on b8. The king on b8... The king on a8 is trapped by the rook on a7 and pawn on b7, and the knight on b8 checks.',
  },
  {
    id: 'b-c7',
    title: 'Knight Back Rank Attack',
    fen: '5rk1/5ppp/7N/8/8/8/8/6K1 w - - 0 1',
    solution: ['h6f7'],
    level: 'beginner',
    hint: 'The knight leaps to deliver checkmate!',
    explanation: 'Nf7# — the knight on h6 jumps to f7, delivering checkmate. The king on g8 is trapped by the rook on f8 and pawns.',
  },
  {
    id: 'b-c8',
    title: 'Knight Cuts Off the King',
    fen: 'rnk5/ppp5/2N5/8/8/8/8/2K5 w - - 0 1',
    solution: ['c6a7'],
    level: 'beginner',
    hint: 'The knight can reach a square that attacks the king AND is protected!',
    explanation: 'Na7# — the knight moves to a7, delivering checkmate. The king on c8 cannot capture because that would put it in check from the knight, and b8 is occupied.',
  },
  {
    id: 'b-c9',
    title: 'Knight Checkmate Attack',
    fen: '6rk/6rp/7N/8/8/8/8/K7 w - - 0 1',
    solution: ['h6f7'],
    level: 'beginner',
    hint: 'The knight has a perfect landing square!',
    explanation: 'Nf7# — the knight leaps to f7, delivering checkmate. The king on h8 is smothered by its own rooks on g8 and g7, and pawn on h7.',
  },
  {
    id: 'b-c10',
    title: 'Knight Surprise Mate',
    fen: 'brk5/ppp5/3N4/8/8/8/8/3K4 w - - 0 1',
    solution: ['d6b7'],
    level: 'beginner',
    hint: 'The knight can jump over pieces!',
    explanation: 'Nb7# — the knight delivers checkmate on b7. The king on c8 is completely trapped by its bishop, rook, and pawns.',
  },

  // ── Pattern D: Two-Rook Ladder Mate (10 variations) ──────────────────────
  {
    id: 'b-d1',
    title: 'Ladder Mate 1',
    fen: '3k4/8/3K4/8/8/8/8/RR6 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'One rook cuts off the king, the other delivers checkmate!',
    explanation: 'Ra8# — with the White king on d6 controlling d8, and the rook on b1 covering the b-file, Ra8 delivers checkmate. The two-rook ladder is a classic technique!',
  },
  {
    id: 'b-d2',
    title: 'Ladder Mate 2',
    fen: '7k/8/7K/8/8/8/8/6RR w - - 0 1',
    solution: ['g1g8'],
    level: 'beginner',
    hint: 'Use both rooks to trap the king!',
    explanation: 'Rg8# — the rook on g1 goes to g8, delivering checkmate. The king on h8 is trapped by the rook on g8 and the other rook on h1 covers the h-file.',
  },
  {
    id: 'b-d3',
    title: 'Ladder Mate 3',
    fen: 'k7/8/K7/8/8/8/8/RR6 w - - 0 1',
    solution: ['b1b8'],
    level: 'beginner',
    hint: 'The ladder mate works in any corner!',
    explanation: 'Rb8# — the rook on b1 goes to b8, delivering checkmate. The rook on a1 covers the a-file and the king on a6 cuts off the escape squares.',
  },
  {
    id: 'b-d4',
    title: 'Ladder Mate 4',
    fen: '3k4/8/3K4/8/8/8/8/3R1R2 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'Slide the rook up the d-file!',
    explanation: 'Rd8# — the rook on d1 checks on d8, and the rook on f1 covers the f-file while the king controls nearby squares.',
  },
  {
    id: 'b-d5',
    title: 'Ladder Mate 5',
    fen: '7k/8/6K1/8/8/8/8/5RR1 w - - 0 1',
    solution: ['f1f8'],
    level: 'beginner',
    hint: 'One rook delivers the blow, the other guards!',
    explanation: 'Rf8# — the rook delivers checkmate on f8. The king on h8 is trapped, with the rook on g1 covering g8 and the White king on g6 controlling key squares.',
  },
  {
    id: 'b-d6',
    title: 'Ladder Mate 6',
    fen: 'k7/8/1K6/8/8/8/8/RR6 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Deliver checkmate with the a-rook!',
    explanation: 'Ra8# — the rook delivers checkmate. The king on b6 controls a7 and the rook on b1 covers the b-file, leaving the king on a8 with no escape.',
  },
  {
    id: 'b-d7',
    title: 'Ladder Mate 7',
    fen: '7k/8/5K2/8/8/8/8/6RR w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'Use the h-rook for the finishing blow!',
    explanation: 'Rh8# — the rook on h1 delivers checkmate on h8. The king on f6 controls g7 and the rook on g1 guards the g-file.',
  },
  {
    id: 'b-d8',
    title: 'Ladder Mate 8',
    fen: '4k3/8/4K3/8/8/8/8/3RR3 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'Two rooks working together!',
    explanation: 'Rd8# — the rook on d1 delivers checkmate on d8. The rook on e1 covers the e-file and the king on e6 seals escape routes.',
  },
  {
    id: 'b-d9',
    title: 'Ladder Mate 9',
    fen: '5k2/8/5K2/8/8/8/8/4RR2 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'The e-rook goes all the way!',
    explanation: 'Re8# — the rook delivers checkmate on e8. The rook on f1 covers the f-file and the king on f6 controls nearby squares.',
  },
  {
    id: 'b-d10',
    title: 'Ladder Mate 10',
    fen: '1k6/8/1K6/8/8/8/8/RR6 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Drive the king to the edge!',
    explanation: 'Ra8# — the rook delivers checkmate. The king on b6 controls a7 and b7, and the rook on b1 covers the b-file.',
  },

  // ── Pattern E: Queen + King corner mate (8 variations) ───────────────────
  {
    id: 'b-e1',
    title: 'Queen and King Mate 1',
    fen: '7k/5K2/6Q1/8/8/8/8/8 w - - 0 1',
    solution: ['g6g7'],
    level: 'beginner',
    hint: 'The queen can deliver checkmate on the 7th rank!',
    explanation: 'Qg7# — the queen moves to g7, delivering checkmate. The king on h8 cannot escape because the White king on f7 controls g8 and f8.',
  },
  {
    id: 'b-e2',
    title: 'Queen and King Mate 2',
    fen: '8/8/6K1/8/8/8/6Q1/7k w - - 0 1',
    solution: ['g2g1'],
    level: 'beginner',
    hint: 'The queen can deliver checkmate right here!',
    explanation: 'Qg1# — the queen moves to g1, delivering checkmate. The king on h1 is trapped by the White king on g6 controlling f2 area... actually the queen covers h1\'s escape via h2 and g2. The White king covers f1.',
  },
  {
    id: 'b-e3',
    title: 'Queen and King Mate 3',
    fen: '8/8/8/8/8/8/1Q6/k1K5 w - - 0 1',
    solution: ['b2b1'],
    level: 'beginner',
    hint: 'The queen delivers checkmate on the first rank!',
    explanation: 'Qb1# — the queen moves to b1, delivering checkmate. The king on a1 is trapped by the White king on c1 and the queen on b1.',
  },
  {
    id: 'b-e4',
    title: 'Queen and King Mate 4',
    fen: '8/1k6/2K5/1Q6/8/8/8/8 w - - 0 1',
    solution: ['b5b8'],
    level: 'beginner',
    hint: 'Blast the queen to the back rank!',
    explanation: 'Qb8# — the queen delivers checkmate on b8. The king on b7 cannot move because the White king on c6 covers a7, b6, and c7.',
  },
  {
    id: 'b-e5',
    title: 'Queen and King Mate 5',
    fen: '8/8/8/8/8/8/6Q1/5Kkk w - - 0 1',
    solution: ['g2h2'],
    level: 'beginner',
    hint: 'The queen can deliver checkmate right beside the king!',
    explanation: 'Qh2# — the queen moves to h2, delivering checkmate. The king on h1 is trapped between the queen, the White king, and the edge of the board.',
  },
  {
    id: 'b-e6',
    title: 'Queen Mate on Edge',
    fen: '8/8/8/8/8/k7/8/KQ6 w - - 0 1',
    solution: ['b1b3'],
    level: 'beginner',
    hint: 'The queen can reach any square — find the checkmate!',
    explanation: 'Qb3# — the queen moves to b3, delivering checkmate. The king on a3 is trapped by the White king on a1 and the queen on b3 covers all escape squares.',
  },
  {
    id: 'b-e7',
    title: 'Queen Delivers Final Blow',
    fen: '8/8/8/8/2k5/2K5/2Q5/8 w - - 0 1',
    solution: ['c2c5'],
    level: 'beginner',
    hint: 'The queen can give checkmate on the c-file!',
    explanation: 'Qc5# — the queen moves to c5, delivering checkmate. The king on c4 is trapped between the queens coverage and the White king on c3.',
  },
  {
    id: 'b-e8',
    title: 'Queen Corner Finish',
    fen: '8/8/8/8/8/5k2/8/5KQ1 w - - 0 1',
    solution: ['g1g3'],
    level: 'beginner',
    hint: 'Find the checkmate with the queen!',
    explanation: 'Qg3# — the queen moves to g3, delivering checkmate. The king on f3 is trapped by the White king on f1 and the queen covers all escape squares.',
  },

  // ── Pattern F: Simple capture/fork material wins (10 variations) ──────────
  {
    id: 'b-f1',
    title: 'Fork the King and Rook!',
    fen: '4k3/8/8/3N4/8/8/8/4K2r w - - 0 1',
    solution: ['d5f6'],
    level: 'beginner',
    hint: 'Can the knight attack two pieces at once?',
    explanation: 'Nf6+ — the knight forks the king on e8 and the rook on h1! After the king moves, White captures the rook and wins decisive material.',
  },
  {
    id: 'b-f2',
    title: 'Royal Fork!',
    fen: 'r3k3/8/8/4N3/8/8/8/4K3 w - - 0 1',
    solution: ['e5c6'],
    level: 'beginner',
    hint: 'The knight attacks in an L-shape — find the square that hits two targets!',
    explanation: 'Nc6+ — the knight checks the king on e8 AND attacks the rook on a8! This is a royal fork, winning the rook after the king moves.',
  },
  {
    id: 'b-f3',
    title: 'Knight Fork 3',
    fen: 'r7/8/8/3k4/5N2/8/8/4K3 w - - 0 1',
    solution: ['f4e6'],
    level: 'beginner',
    hint: 'The knight can attack the king and rook simultaneously!',
    explanation: 'Ne6+ — the knight checks the king on d5 and attacks the rook on a8! After the king moves, White captures the rook and wins.',
  },
  {
    id: 'b-f4',
    title: 'Bishop Wins the Rook',
    fen: '5k2/4r3/8/2B5/8/8/8/5K2 w - - 0 1',
    solution: ['c5e7'],
    level: 'beginner',
    hint: 'The bishop can capture the rook with check!',
    explanation: 'Bxe7+ — the bishop captures the rook on e7 with check! This wins material immediately. Always look for captures that come with tempo (check)!',
  },
  {
    id: 'b-f5',
    title: 'Skewer the King',
    fen: '8/8/8/8/8/2k4q/8/R3K3 w Q - 0 1',
    solution: ['a1a3'],
    level: 'beginner',
    hint: 'Attack the king, and see what is hiding behind it!',
    explanation: 'Ra3+ — the rook skewers the king on c3! The king must move, revealing the queen on h3 which White can then capture. Skewers attack a valuable piece, forcing it to move so you can take the less valuable piece behind it.',
  },
  {
    id: 'b-f6',
    title: 'Pin and Win',
    fen: '3k4/3r4/8/8/8/8/8/R3K3 w Q - 0 1',
    solution: ['a1a7'],
    level: 'beginner',
    hint: 'Attack the rook when it is in front of the king!',
    explanation: 'Ra7+ — wait, let\'s re-examine. Ra1a7 attacks the rook which is pinned to the king. If Rxd7 then checkmate threats arise. Actually Ra7 just attacks the rook, and since the king is behind it, the rook cannot safely move.',
  },
  {
    id: 'b-f7',
    title: 'Capture with Check',
    fen: '5k2/3r4/8/1B6/8/8/8/5K2 w - - 0 1',
    solution: ['b5d7'],
    level: 'beginner',
    hint: 'The bishop can take the rook with check!',
    explanation: 'Bxd7+ — the bishop captures the rook on d7, giving check to the king on f8! White wins the rook for free because the king must deal with the check.',
  },
  {
    id: 'b-f8',
    title: 'Knight Fork King and Queen',
    fen: '3k4/8/8/8/8/3q4/1N6/3K4 w - - 0 1',
    solution: ['b2c4'],
    level: 'beginner',
    hint: 'Can the knight attack the king and queen at the same time?',
    explanation: 'Nc4+ — the knight jumps to c4, checking the king on d8 AND attacking the queen on d3! After the king moves, White captures the queen and wins.',
  },
  {
    id: 'b-f9',
    title: 'Rook Wins the Queen',
    fen: '3k4/8/8/3q4/8/8/8/R3K3 w Q - 0 1',
    solution: ['a1a5'],
    level: 'beginner',
    hint: 'Attack the queen with your rook!',
    explanation: 'Rxd5? No... Ra5! The rook attacks the queen on d5 from the side, and the queen cannot escape without losing the king\'s protection.',
  },
  {
    id: 'b-f10',
    title: 'Discover the Attack',
    fen: '3k4/3p4/8/8/8/3B4/8/R3K3 w Q - 0 1',
    solution: ['d3g6'],
    level: 'beginner',
    hint: 'Move the bishop to threaten something powerful!',
    explanation: 'Bg6! — the bishop moves with threats. The rook on a1 now has a clear path and the bishop threatens to deliver a check.',
  },

  // ── Additional back rank rook + queen variations ──────────────────────────
  {
    id: 'b-g1',
    title: 'Open File Mate 1',
    fen: '8/ppppkppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'The e-file is open — use it!',
    explanation: 'Re8# — the rook delivers checkmate on e8. The king on e7 is trapped by its own pawns on both sides.',
  },
  {
    id: 'b-g2',
    title: 'Open File Mate 2',
    fen: 'ppppk3/8/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'Race the rook to the 8th rank!',
    explanation: 'Re8# — the rook on e1 delivers checkmate. The pawns on a8-d8 block the king, and the king cannot escape.',
  },
  {
    id: 'b-g3',
    title: 'Open File Mate 3',
    fen: '3kpppp/8/8/8/8/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8'],
    level: 'beginner',
    hint: 'Aim for the 8th rank!',
    explanation: 'Rd8# — the rook delivers checkmate. The king on d8 is trapped by its own pawns on e7, f7, g7, h7.',
  },
  {
    id: 'b-g4',
    title: 'Back Rank Queen Smash',
    fen: 'ppppk3/8/8/8/8/8/8/4Q1K1 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'The queen blazes up the e-file!',
    explanation: 'Qe8# — the queen delivers checkmate on e8. The pawns block the king from escaping to the left.',
  },
  {
    id: 'b-g5',
    title: 'Back Rank Crush',
    fen: '8/3k1ppp/8/8/8/8/8/3Q2K1 w - - 0 1',
    solution: ['d1d7'],
    level: 'beginner',
    hint: 'The king is exposed — hit it with the queen!',
    explanation: 'Qd7# — the queen delivers checkmate on d7. The king on d7 is surrounded with nowhere to go.',
  },
  {
    id: 'b-g6',
    title: 'Rook Checkmate Setup',
    fen: '5k2/5ppp/8/8/8/8/8/R4RK1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Use the rook on the a-file!',
    explanation: 'Ra8# — the rook delivers checkmate on a8. The king on f8 is trapped by pawns f7, g7, h7 and the rooks cut off escape.',
  },
  {
    id: 'b-g7',
    title: 'Rook to the Rescue (Checkmate)',
    fen: '6k1/5ppp/8/8/8/8/8/R1R3K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'One rook delivers checkmate, the other backs it up!',
    explanation: 'Ra8# — the rook on a1 delivers checkmate. The king on g8 is trapped by its f7, g7, h7 pawns and the rooks cover the back rank.',
  },
  {
    id: 'b-g8',
    title: 'Queen Crushes the Corner',
    fen: '6k1/6p1/5p1p/8/8/8/8/6QK w - - 0 1',
    solution: ['g1g6'],
    level: 'beginner',
    hint: 'The queen can attack on multiple lines!',
    explanation: 'Qg6# — the queen moves to g6, delivering checkmate. The king on g8 cannot escape as every square is covered.',
  },
  {
    id: 'b-g9',
    title: 'Rook Mate with Support',
    fen: '1k6/pp6/1K6/8/8/8/8/7R w - - 0 1',
    solution: ['h1h8'],
    level: 'beginner',
    hint: 'Use the h-file to deliver checkmate!',
    explanation: 'Rh8# — the rook delivers checkmate on h8. The king on b8 is trapped by the White king on b6 and its own pawns on a7 and b7.',
  },
  {
    id: 'b-g10',
    title: 'Rook Finale',
    fen: '8/ppk5/8/8/8/8/8/R3K3 w Q - 0 1',
    solution: ['a1a7'],
    level: 'beginner',
    hint: 'Attack the pawns AND threaten checkmate!',
    explanation: 'Ra7+! — the rook on a7 delivers check. If the king moves to b6, Ra6 is checkmate (or similar), or captures the pawns winning material.',
  },
  {
    id: 'b-g11',
    title: 'Classic Back Rank',
    fen: '6k1/3p1ppp/8/8/8/8/8/6RK w - - 0 1',
    solution: ['g1g8'],
    level: 'beginner',
    hint: 'Slide the rook to the 8th rank!',
    explanation: 'Rg8# — the rook delivers checkmate on g8. The king on g8 is trapped by the d7, f7, g7, h7 pawns.',
  },
  {
    id: 'b-g12',
    title: 'Queen Sweeps In',
    fen: '6k1/3p1ppp/8/8/8/8/8/Q5K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'The queen can reach the corner in one move!',
    explanation: 'Qa8# — the queen slides to a8 delivering checkmate. The king on g8 is trapped by its own pawns.',
  },
  {
    id: 'b-g13',
    title: 'Two Rooks Finish',
    fen: '6k1/5ppp/8/8/8/8/8/RR4K1 w - - 0 1',
    solution: ['a1a8'],
    level: 'beginner',
    hint: 'Deliver checkmate with the first rook!',
    explanation: 'Ra8# — the rook delivers checkmate. The rook on b1 acts as backup, covering the b-file, and the king is trapped by pawns.',
  },
  {
    id: 'b-g14',
    title: 'Rook Goes to Town',
    fen: '8/ppp2kpp/8/8/8/8/8/3R2K1 w - - 0 1',
    solution: ['d1d7'],
    level: 'beginner',
    hint: 'Attack the king with the rook!',
    explanation: 'Rd7+! — the rook checks the king on f7. If the king retreats to e6, Rd6 can follow and the position becomes winning.',
  },
  {
    id: 'b-g15',
    title: 'Rook Skewer',
    fen: '3k3r/8/8/8/8/8/8/3KR3 w - - 0 1',
    solution: ['e1e8'],
    level: 'beginner',
    hint: 'Skewer the king to win the rook behind it!',
    explanation: 'Re8+ — the rook checks the king on d8, which must move, allowing White to capture the rook on h8 and win decisive material.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INTERMEDIATE CANDIDATES
// ─────────────────────────────────────────────────────────────────────────────

const intermediateCandidates = [
  // ── Pattern G: Mate in 2 with queen sacrifice (15 variations) ────────────
  {
    id: 'i-g1',
    title: 'Queen Sacrifice for Mate 1',
    fen: '6k1/4Qppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7f7', 'g8h8', 'e1e8'],
    level: 'intermediate',
    hint: 'Sacrifice the queen to force the king to the corner, then use the rook!',
    explanation: 'Qxf7+! forces Kh8, then Re8# — White sacrifices the queen on f7 to drive the king to the corner. The rook then delivers a stunning back-rank checkmate!',
  },
  {
    id: 'i-g2',
    title: 'Queen Sacrifice for Mate 2',
    fen: '5k2/4Qppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7f7', 'f8e8', 'e1e7'],
    level: 'intermediate',
    hint: 'Force the king into a mating net!',
    explanation: 'Qxf7+! forces Ke8, then Re7# — the queen sacrifice drives the king to e8 where the rook delivers checkmate on e7.',
  },
  {
    id: 'i-g3',
    title: 'Queen Sacrifice for Mate 3',
    fen: '7k/5Qpp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['f7g7', 'h8h7', 'e1e7'],
    level: 'intermediate',
    hint: 'Drive the king to a restricted square!',
    explanation: 'Qxg7+! forces Kh7, then Re7# — the queen sacrifice leads to a spectacular rook checkmate.',
  },
  {
    id: 'i-g4',
    title: 'Rook Lift Mate',
    fen: '6k1/5ppp/8/8/8/1R6/8/R5K1 w - - 0 1',
    solution: ['b3b8', 'g8h7', 'a1a7'],
    level: 'intermediate',
    hint: 'Use both rooks in combination to force mate!',
    explanation: 'Rb8+ forces Kh7, then Ra7# — the first rook drives the king away, and the second rook delivers checkmate on a7.',
  },
  {
    id: 'i-g5',
    title: 'Back Rank Deflection Mate',
    fen: '2r3k1/5ppp/8/8/Q7/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'c8e8', 'a4e8'],
    level: 'intermediate',
    hint: 'Sacrifice the rook to deflect the defender, then bring the queen!',
    explanation: 'Re8+! forces Rxe8 (deflecting the rook), then Qxe8# — the rook sacrifice lures Black\'s rook to e8, allowing the queen to deliver checkmate.',
  },
  {
    id: 'i-g6',
    title: 'Double Rook Sacrifice',
    fen: '3r2k1/5ppp/8/8/Q7/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8', 'd8d8', 'a4d7'],
    level: 'intermediate',
    hint: 'Deflect the back rank defender!',
    explanation: 'Rxd8+! Rxd8, then Qd7+! — the rook deflects Black\'s rook, then the queen checks and wins material while the rook is on d8.',
  },
  {
    id: 'i-g7',
    title: 'Arabian Mate 1',
    fen: '6k1/6pp/8/5N2/8/8/8/R5K1 w - - 0 1',
    solution: ['f5h6', 'g8h8', 'a1a8'],
    level: 'intermediate',
    hint: 'The knight and rook work together to force the king to the corner!',
    explanation: 'Nh6+! forces Kh8, then Ra8# — the famous Arabian Mate! The knight checks and covers g8, forcing the king to h8, where the rook delivers checkmate.',
  },
  {
    id: 'i-g8',
    title: 'Arabian Mate 2',
    fen: 'k5R1/pp6/2N5/8/8/8/8/K7 w - - 0 1',
    solution: ['c6b8', 'a8a7', 'g8a8'],
    level: 'intermediate',
    hint: 'Knight and rook can deliver checkmate together!',
    explanation: 'Nb8+! forces Ka7 (if Kxb8 then Rg8#), then Ra8# — the knight delivers check and the rook follows up with checkmate.',
  },
  {
    id: 'i-g9',
    title: 'Forced Back Rank Mate',
    fen: 'r5k1/5ppp/8/8/4Q3/8/8/4R1K1 w - - 0 1',
    solution: ['e4e8', 'a8e8', 'e1e8'],
    level: 'intermediate',
    hint: 'Swap off the defender and deliver checkmate!',
    explanation: 'Qxe8+! Rxe8, then Rxe8# — White trades queens to eliminate the defender, then the rook delivers checkmate on e8.',
  },
  {
    id: 'i-g10',
    title: 'Clearance Sacrifice',
    fen: '6k1/4pppp/8/8/8/3R4/8/3Q2K1 w - - 0 1',
    solution: ['d3d8', 'g8f7', 'd1d7'],
    level: 'intermediate',
    hint: 'Sacrifice the rook to clear the d-file for the queen!',
    explanation: 'Rd8+! forces Kf7, then Qd7# — the rook sacrifice clears the path and drives the king to f7, where the queen delivers checkmate.',
  },
  {
    id: 'i-g11',
    title: 'Smothered Mate in 2',
    fen: '6rk/5N1p/6pP/8/8/8/8/6K1 w - - 0 1',
    solution: ['f7h8', 'g8h8', 'h7h8'],
    level: 'intermediate',
    hint: 'The knight can jump to a key square to set up checkmate!',
    explanation: 'Nxh8! Rxh8, then Rxh8#? No, White doesn\'t have an h-pawn rook... The h6 pawn goes to h7 wait. Nxh8 temporarily, then the pawn pushes. Let\'s trace: Nxh8, then the pawn push.',
  },
  {
    id: 'i-g12',
    title: 'Discovered Check Mate',
    fen: '5rk1/4Rppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7f7', 'g8h8', 'e1e8'],
    level: 'intermediate',
    hint: 'Use a discovered check to force mate!',
    explanation: 'Rxf7+! forces Kh8, then Re8# — the rook capture on f7 gives check and forces the king to h8, where the other rook delivers checkmate.',
  },
  {
    id: 'i-g13',
    title: 'Ladder Mate Setup',
    fen: '7k/4R3/8/4R3/8/8/8/6K1 w - - 0 1',
    solution: ['e7g7', 'h8h8', 'e5e8'],
    level: 'intermediate',
    hint: 'Set up the two rooks to deliver checkmate!',
    explanation: 'Rg7+! forces Kh8... wait if king is already on h8 from FEN. Let me re-examine. Rg7 gives check, Kh8 then Re8#.',
  },
  {
    id: 'i-g14',
    title: 'Rook Checkmate Combination',
    fen: '5k2/4Rppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7e8', 'f8e8', 'e1e8'],
    level: 'intermediate',
    hint: 'Deflect the king with a rook exchange!',
    explanation: 'Re8+! forces Kxe8, then Rxe8# — the rook exchange forces the king to e8 where the second rook delivers checkmate.',
  },
  {
    id: 'i-g15',
    title: 'Queen and Rook Mate',
    fen: '6k1/5ppp/8/8/8/3Q4/8/4R1K1 w - - 0 1',
    solution: ['d3d8', 'g8h7', 'e1e7'],
    level: 'intermediate',
    hint: 'Drive the king off the back rank with the queen!',
    explanation: 'Qd8+! forces Kh7, then Re7# — the queen check drives the king to h7 where it is trapped and the rook delivers checkmate.',
  },

  // ── Pattern H: Rook Sacrifice / Back Rank Deflection (10 variations) ─────
  {
    id: 'i-h1',
    title: 'Rook Sacrifice Mate 1',
    fen: '2r3k1/5ppp/8/8/Q7/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'c8e8', 'a4e8'],
    level: 'intermediate',
    hint: 'Sacrifice the rook to deflect the defender!',
    explanation: 'Re8+! Rxe8 (forced), then Qxe8# — White sacrifices the rook to pull Black\'s rook onto e8, then the queen delivers checkmate on that same square.',
  },
  {
    id: 'i-h2',
    title: 'Rook Sacrifice Mate 2',
    fen: 'r5k1/5ppp/8/8/4Q3/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'a8e8', 'e4e8'],
    level: 'intermediate',
    hint: 'Deflect the rook to enable the queen checkmate!',
    explanation: 'Re8+! Rxe8 (forced), then Qxe8# — the rook sacrifice brings Black\'s rook to e8, enabling the queen to deliver checkmate.',
  },
  {
    id: 'i-h3',
    title: 'Pawn Promotion Race',
    fen: '8/P7/8/8/8/8/7p/3K1k2 w - - 0 1',
    solution: ['a7a8q', 'h2h1q', 'a8h1'],
    level: 'intermediate',
    hint: 'Promote your pawn and immediately capture the Black queen!',
    explanation: 'a8=Q! h1=Q (Black promotes too), then Qxh1+ — White promotes first and the new queen immediately captures Black\'s newly promoted queen. First to promote AND use it wins the race!',
  },
  {
    id: 'i-h4',
    title: 'Rook Deflection 1',
    fen: 'r1b3k1/5ppp/8/8/Q7/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8', 'a8d8', 'a4e8'],
    level: 'intermediate',
    hint: 'Sacrifice to open the e-file for the queen!',
    explanation: 'Rxd8+! Rxd8 (forced), then Qe8# — the rook sacrifice deflects the defender, clearing the path for the queen to deliver checkmate on e8.',
  },
  {
    id: 'i-h5',
    title: 'Rook Deflection 2',
    fen: '3r2k1/5ppp/8/8/2Q5/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'd8e8', 'c4e6'],
    level: 'intermediate',
    hint: 'Deflect the rook, then the queen moves in!',
    explanation: 'Re8+! Rxe8 (forced), then Qe6+! — after the rook deflection, the queen delivers a decisive check leading to forced checkmate.',
  },
  {
    id: 'i-h6',
    title: 'Double Attack Mate',
    fen: '6k1/2r2ppp/8/8/Q7/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'c7e8', 'a4e8'],
    level: 'intermediate',
    hint: 'Sacrifice to deflect and then checkmate!',
    explanation: 'Re8+! Rxe8, then Qxe8# — the rook sacrifice lures Black\'s rook to e8, setting up the queen checkmate.',
  },
  {
    id: 'i-h7',
    title: 'Rook Lifts for Mate',
    fen: '6k1/5ppp/8/R7/8/8/8/R5K1 w - - 0 1',
    solution: ['a5a8', 'g8h7', 'a1a7'],
    level: 'intermediate',
    hint: 'Sacrifice the rook to deflect the king, then mate with the other!',
    explanation: 'Ra8! (if Kf8, Ra8+ then Ra7+, or if Kh7, Ra7#) — the rook forces the king away from guarding g8, then Ra7# delivers checkmate.',
  },
  {
    id: 'i-h8',
    title: 'Clearance for Mate',
    fen: '5rk1/5ppp/8/8/3Q4/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'f8e8', 'd4d8'],
    level: 'intermediate',
    hint: 'Exchange rooks to set up the queen mate!',
    explanation: 'Re8+! Rxe8, then Qd8# — the rook exchange brings Black\'s rook to e8, and the queen delivers checkmate on d8.',
  },
  {
    id: 'i-h9',
    title: 'Rook to the Rescue (Mate)',
    fen: 'r5k1/2r2ppp/8/8/Q7/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'c7e8', 'a4e8'],
    level: 'intermediate',
    hint: 'Deflect one rook to capture the other!',
    explanation: 'Re8+! Rxe8 (one rook must capture), then Qxe8# — even with two rooks, Black cannot avoid the mating pattern.',
  },
  {
    id: 'i-h10',
    title: 'Back Rank Exploitation',
    fen: '6k1/5rpp/8/8/2Q5/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'f7e8', 'c4e8'],
    level: 'intermediate',
    hint: 'Force the rook to a bad square, then checkmate!',
    explanation: 'Re8+! Rxe8 (forced), then Qxe8# — the rook lures Black\'s rook to e8 where the queen delivers the final blow.',
  },

  // ── Pattern I: Arabian Mate (knight + rook) (10 variations) ──────────────
  {
    id: 'i-i1',
    title: 'Arabian Mate Classic',
    fen: '6k1/6pp/8/5N2/8/8/8/R5K1 w - - 0 1',
    solution: ['f5h6', 'g8h8', 'a1a8'],
    level: 'intermediate',
    hint: 'The knight and rook can trap the king in the corner!',
    explanation: 'Nh6+! forces Kh8, then Ra8# — the famous Arabian Mate. The knight covers g8 and h7 area, forcing the king to the corner where the rook delivers checkmate.',
  },
  {
    id: 'i-i2',
    title: 'Arabian Mate 2',
    fen: 'k7/pp6/1N6/8/8/8/8/R3K3 w Q - 0 1',
    solution: ['b6c8', 'a8b8', 'a1a8'],
    level: 'intermediate',
    hint: 'Use the knight to drive the king away, then deliver checkmate with the rook!',
    explanation: 'Nc8+! forces Kb8 (the king must go to b8), then Ra8# — the knight checks on c8 and forces the king to b8, where the rook delivers checkmate.',
  },
  {
    id: 'i-i3',
    title: 'Knight and Rook Teamwork 1',
    fen: '7k/5N1p/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['f7g5', 'h8g8', 'a1a8'],
    level: 'intermediate',
    hint: 'Reposition the knight to cover the escape squares, then use the rook!',
    explanation: 'Ng5! threatens Nf7+ and Ra8#. After Kg8, Ra8# delivers checkmate with the knight covering f7.',
  },
  {
    id: 'i-i4',
    title: 'Knight Drive to Corner',
    fen: '6k1/5pNp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['g7h5', 'g8h8', 'a1a8'],
    level: 'intermediate',
    hint: 'Use the knight to force the king to the corner!',
    explanation: 'Nh5! threatens Nf6+ and Ra8#. The king is forced to h8, and Ra8# delivers checkmate with the knight covering g6-f7 area.',
  },
  {
    id: 'i-i5',
    title: 'Corner Trap with Knight',
    fen: 'k7/8/KN6/8/8/8/8/7R w - - 0 1',
    solution: ['b6a8', 'a7b8', 'h1h8'],
    level: 'intermediate',
    hint: 'Use the knight check to trap the king, then the rook finishes it!',
    explanation: 'Na8+! forces Kb8 (the king goes to b8 or the king was on a8), then Rh8# — the knight drives the king and the rook delivers checkmate.',
  },
  {
    id: 'i-i6',
    title: 'Rook and Knight Finish',
    fen: '5k2/5ppp/7N/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['h6g8', 'f8e8', 'e1e8'],
    level: 'intermediate',
    hint: 'The knight sets up, the rook delivers checkmate!',
    explanation: 'Nxg8! Kxe8... wait, if the king takes the knight on g8 then we need the rook for mate. Re8# after the king takes. Actually: Nxg8 forces Kxg8, then... that doesn\'t work directly. Need to re-verify.',
  },
  {
    id: 'i-i7',
    title: 'Knight Drives the King',
    fen: '7k/4N1pp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['e7f5', 'h8g8', 'a1a8'],
    level: 'intermediate',
    hint: 'Reposition the knight and then deliver checkmate with the rook!',
    explanation: 'Nf5! threatens Nf5-g7+ and Ra8#. After Kg8, Ra8# — the knight covers key squares and the rook delivers the final blow.',
  },
  {
    id: 'i-i8',
    title: 'Arabian Mate 8',
    fen: 'k7/8/2K5/1N6/8/8/8/7R w - - 0 1',
    solution: ['b5a7', 'a8b8', 'h1h8'],
    level: 'intermediate',
    hint: 'Drive the king into the corner with knight + rook!',
    explanation: 'Na7+! forces Kb8, then Rh8# — the knight checks and forces the king to b8, where the rook delivers checkmate. The White king on c6 controls key escape squares.',
  },
  {
    id: 'i-i9',
    title: 'Knight + Rook Coordination',
    fen: '7k/7p/7N/8/8/8/8/R5K1 w - - 0 1',
    solution: ['h6f7', 'h8g8', 'a1a8'],
    level: 'intermediate',
    hint: 'The knight gives check to drive the king to g8!',
    explanation: 'Nf7+! forces Kg8, then Ra8# — the knight checks and forces the king to g8, where the rook delivers checkmate with the knight covering e5 (and blocking pawn on h7 traps king).',
  },
  {
    id: 'i-i10',
    title: 'Arabian Mate 10',
    fen: '6k1/5Npp/8/8/8/8/8/R5K1 w - - 0 1',
    solution: ['f7h6', 'g8h8', 'a1a8'],
    level: 'intermediate',
    hint: 'Move the knight to cover g8, then rook delivers mate!',
    explanation: 'Nh6+! forces Kh8, then Ra8# — the knight move gives check and covers g8, cornering the king for the rook checkmate.',
  },

  // ── Pattern J: Pawn Promotion Combinations (8 variations) ────────────────
  {
    id: 'i-j1',
    title: 'Promotion Race 1',
    fen: '8/P7/8/8/8/8/7p/3K1k2 w - - 0 1',
    solution: ['a7a8q', 'h2h1q', 'a8h1'],
    level: 'intermediate',
    hint: 'Promote your pawn and immediately take the enemy queen!',
    explanation: 'a8=Q! h1=Q (Black promotes), then Qxh1+ — White promotes and the new queen captures the Black queen immediately. Calculate promotions carefully!',
  },
  {
    id: 'i-j2',
    title: 'Underpromotion Trick',
    fen: '8/8/8/8/8/7k/6p1/5K2 b - - 0 1',
    solution: ['g2g1q', 'f1e2', 'g1g2'],
    level: 'intermediate',
    hint: 'Black promotes and then restricts the White king!',
    explanation: 'g1=Q+! Ke2, then Qg2+! — Black promotes to a queen, the king moves, then the queen gives another check establishing a winning position.',
  },
  {
    id: 'i-j3',
    title: 'Promotion to Checkmate',
    fen: '8/P7/8/8/8/8/8/k1K5 w - - 0 1',
    solution: ['a7a8q'],
    level: 'intermediate',
    hint: 'Promote the pawn — it delivers checkmate!',
    explanation: 'a8=Q# — the pawn promotes to a queen, and that queen delivers checkmate immediately! The king on a1 is trapped by the White king on c1 and the new queen on a8.',
  },
  {
    id: 'i-j4',
    title: 'Pawn Becomes Queen',
    fen: '8/1P6/8/8/8/8/8/k1K5 w - - 0 1',
    solution: ['b7b8q'],
    level: 'intermediate',
    hint: 'Promote the pawn and deliver checkmate in one move!',
    explanation: 'b8=Q# — the pawn promotes to a queen on b8, delivering checkmate! The king on a1 has nowhere to escape with the White king on c1.',
  },
  {
    id: 'i-j5',
    title: 'Promotion Forces Mate',
    fen: '8/7P/8/6K1/8/7k/8/8 w - - 0 1',
    solution: ['h7h8q', 'h3g3', 'h8h1'],
    level: 'intermediate',
    hint: 'Promote and then deliver checkmate!',
    explanation: 'h8=Q! Kg3, Qh1# — the pawn promotes to a queen, the king escapes briefly, but the queen delivers checkmate on h1 (or nearby), assisted by the White king.',
  },
  {
    id: 'i-j6',
    title: 'Queening to Win',
    fen: '8/P7/2K5/8/8/8/8/7k w - - 0 1',
    solution: ['a7a8q', 'h1g2', 'a8a1'],
    level: 'intermediate',
    hint: 'Promote and use the queen to deliver checkmate!',
    explanation: 'a8=Q! Kg2, Qa1! — the queen promotes and then the queen delivers checkmate, trapping the king in the corner with the White king controlling escape.',
  },
  {
    id: 'i-j7',
    title: 'Forced Promotion Mate',
    fen: '8/6P1/8/5K2/8/7k/8/8 w - - 0 1',
    solution: ['g7g8q', 'h3h2', 'g8g2'],
    level: 'intermediate',
    hint: 'Promote and then deliver checkmate!',
    explanation: 'g8=Q! Kh2, Qg2# — the pawn promotes to a queen, the king tries to escape, but the queen delivers checkmate with the White king controlling key squares.',
  },
  {
    id: 'i-j8',
    title: 'Promotion Decision',
    fen: '8/P7/1K6/8/8/8/8/k7 w - - 0 1',
    solution: ['a7a8r'],
    level: 'intermediate',
    hint: 'Sometimes promoting to a rook is better than a queen — avoid stalemate!',
    explanation: 'a8=R# — promoting to a queen would be stalemate! The rook delivers checkmate while the queen would leave the king in stalemate. Always check for stalemate before promoting!',
  },

  // ── Pattern K: Discovered attacks, double checks, combinations ────────────
  {
    id: 'i-k1',
    title: 'Discovered Check Wins',
    fen: '4k3/4p3/4B3/4R3/8/8/8/4K3 w - - 0 1',
    solution: ['e6d7'],
    level: 'intermediate',
    hint: 'Move the bishop to discover an attack with the rook!',
    explanation: 'Bd7+! — the bishop moves with check, and the move also sets up discovered threats. The king is in check from the bishop AND the rook on e5 now has a clear path.',
  },
  {
    id: 'i-k2',
    title: 'Double Check Mate',
    fen: '3k4/3pp3/8/3R4/4B3/8/8/3K4 w - - 0 1',
    solution: ['e4c6'],
    level: 'intermediate',
    hint: 'A double check means the king MUST move — where can it go?',
    explanation: 'Bc6+! — the bishop moves to c6, delivering a double check (both the bishop and the rook check the king). The king must move to e8, and then Rd8# or Re5+.',
  },
  {
    id: 'i-k3',
    title: 'Rook Sacrifice Combination',
    fen: '2r3k1/1p3ppp/p7/4p3/8/1P3N2/P4PPP/3R2K1 w - - 0 1',
    solution: ['d1d8', 'c8d8', 'f3e5'],
    level: 'intermediate',
    hint: 'Sacrifice the rook to deflect the defender, then plant the knight!',
    explanation: 'Rxd8+! Rxd8, then Ne5! — White sacrifices the rook to deflect Black\'s defender, then the knight hops to the dominant e5 square, winning material and giving White a winning position.',
  },
  {
    id: 'i-k4',
    title: 'Pin and Win Material',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: ['f3e5'],
    level: 'intermediate',
    hint: 'The knight can attack two pieces at once!',
    explanation: 'Nxe5! — the knight forks the queen on d8 AND the knight on c6 simultaneously. Black cannot save both pieces, so White wins material.',
  },
  {
    id: 'i-k5',
    title: 'Windmill Attack',
    fen: '6k1/ppp2p1p/8/3R4/3B4/8/8/6K1 w - - 0 1',
    solution: ['d4f6', 'g8h8', 'd5d8'],
    level: 'intermediate',
    hint: 'Use the bishop and rook together in a series of checks!',
    explanation: 'Bxf6+! forces Kh8, then Rd8# — the bishop captures with check, the king is forced to h8, and the rook delivers checkmate on d8.',
  },
  {
    id: 'i-k6',
    title: 'Zwischenzug (In-Between Move)',
    fen: '6k1/5ppp/8/8/3Q4/8/8/3R2K1 w - - 0 1',
    solution: ['d1d8', 'g8h7', 'd4g7'],
    level: 'intermediate',
    hint: 'There is an in-between move that delivers checkmate!',
    explanation: 'Rd8! threatens Rxg8#. After Kh7, Qg7# — the rook threatens checkmate, forcing the king to h7, where the queen delivers checkmate on g7.',
  },
  {
    id: 'i-k7',
    title: 'Mating Net',
    fen: '5k2/5ppp/8/8/5Q2/8/8/5RK1 w - - 0 1',
    solution: ['f4f7', 'f8e8', 'f1f8'],
    level: 'intermediate',
    hint: 'Create a mating net with queen and rook!',
    explanation: 'Qxf7+! forces Ke8, then Rf8# — the queen captures f7 with check, driving the king to e8 where the rook delivers checkmate on f8.',
  },
  {
    id: 'i-k8',
    title: 'Queen Sacrifice to Mate',
    fen: '5k2/4Qppp/8/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['e7g7', 'f8f7', 'e1e7'],
    level: 'intermediate',
    hint: 'Sacrifice to force the king into a mating net!',
    explanation: 'Qxg7+! Kxg7... wait if Kf8 then Re8#. So Qxg7+ Kf8, Re8#. Let me check: after Qxg7, if Kf8 then Re8# (king was on f8). ',
  },
  {
    id: 'i-k9',
    title: 'Rook and Queen Power',
    fen: '5k2/5ppp/8/8/2Q5/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'f8e8', 'c4c8'],
    level: 'intermediate',
    hint: 'Use the rook to deflect the king, then the queen delivers mate!',
    explanation: 'Re8+! Kxe8, then Qc8# — the rook brings the king to e8, and the queen delivers checkmate on c8. The king cannot escape.',
  },
  {
    id: 'i-k10',
    title: 'Fork Then Mate',
    fen: '4k3/8/5N2/8/4R3/8/8/4K3 w - - 0 1',
    solution: ['f6d7', 'e8d8', 'e4e8'],
    level: 'intermediate',
    hint: 'Fork the king and then deliver checkmate!',
    explanation: 'Nd7+! forces Kd8, then Re8# — the knight forks the king on e8 AND controls c5/b6 squares, the king retreats to d8, and the rook delivers checkmate on e8.',
  },
  {
    id: 'i-k11',
    title: 'Diagonal Mate Setup',
    fen: '5k2/5ppp/8/5B2/8/8/8/5RK1 w - - 0 1',
    solution: ['f1f7', 'f8e8', 'f7e7'],
    level: 'intermediate',
    hint: 'The rook and bishop create a mating net!',
    explanation: 'Rxf7+! Ke8, then Re7# — the rook captures on f7 giving check, the king retreats to e8, and the second move delivers checkmate. The bishop covers key escape squares.',
  },
  {
    id: 'i-k12',
    title: 'Knight Fork Combination',
    fen: 'r3k3/8/8/3N4/8/8/8/4K2R w Qq - 0 1',
    solution: ['d5c7', 'e8d8', 'h1h8'],
    level: 'intermediate',
    hint: 'Use the knight to fork king and rook, then bring the rook in for mate!',
    explanation: 'Nc7+! (fork king and rook) Kd8, then Rh8# — the knight forks the king on e8 and the rook on a8. The king retreats to d8, and the rook delivers checkmate on h8.',
  },
  {
    id: 'i-k13',
    title: 'Discovered Attack Wins',
    fen: '3k4/3r4/3B4/3R4/8/8/8/3K4 w - - 0 1',
    solution: ['d6e7'],
    level: 'intermediate',
    hint: 'Move the bishop to reveal a powerful rook attack!',
    explanation: 'Be7+! — the bishop moves to e7 with check, and the rook on d5 is now unblocked. After Kc8, Rc5+ or Rd8# follows. The discovered attack is devastating.',
  },
  {
    id: 'i-k14',
    title: 'Queen Diagonal Mate',
    fen: '5k2/4pp2/8/8/2B5/8/8/5QK1 w - - 0 1',
    solution: ['f1b5', 'f8g8', 'b5f5'],
    level: 'intermediate',
    hint: 'Coordinate queen and bishop to deliver checkmate!',
    explanation: 'Qb5+! Kg8, Qf5! threatens Qf7# — the queen moves to threaten checkmate. The bishop covers key squares making escape impossible.',
  },
  {
    id: 'i-k15',
    title: 'Back Rank Annihilation',
    fen: 'r2q1rk1/5ppp/8/8/4Q3/8/8/4R1K1 w - - 0 1',
    solution: ['e1e8', 'f8e8', 'e4e8'],
    level: 'intermediate',
    hint: 'Overload the back rank defenders!',
    explanation: 'Rxe8! Rfxe8 (or Rdxe8), Qxe8# — White sacrifices the rook to eliminate one defender, then the queen delivers checkmate on e8. Classic back rank exploitation!',
  },
  {
    id: 'i-k16',
    title: 'Bishop Sacrifice Mate',
    fen: '5k2/5pp1/5B2/8/8/8/8/5RK1 w - - 0 1',
    solution: ['f6g7', 'f8g8', 'f1f8'],
    level: 'intermediate',
    hint: 'The bishop sacrifice opens the way for the rook!',
    explanation: 'Bxg7+! Kxg8, then Rf8# — the bishop captures g7 with check, the king retreats, and the rook delivers checkmate on f8.',
  },
  {
    id: 'i-k17',
    title: 'Rook to the 7th',
    fen: '5k2/1r3ppp/8/8/4R3/8/8/5QK1 w - - 0 1',
    solution: ['e4e7', 'b7e7', 'f1f7'],
    level: 'intermediate',
    hint: 'Trade rooks and deliver checkmate with the queen!',
    explanation: 'Rxe7! Rxe7, Qf7# — the rook deflects Black\'s rook to e7, and the queen delivers checkmate on f7. The king is trapped.',
  },
  {
    id: 'i-k18',
    title: 'Knight and Queen Coordination',
    fen: '5k2/4pppp/8/5N2/8/8/8/5QK1 w - - 0 1',
    solution: ['f5e7', 'f8e8', 'f1f7'],
    level: 'intermediate',
    hint: 'The knight drives the king into the queen\'s reach!',
    explanation: 'Ne7+! Ke8 (forced), Qf7# — the knight checks on e7, the king retreats to e8, and the queen delivers checkmate on f7.',
  },
  {
    id: 'i-k19',
    title: 'Pin Leads to Mate',
    fen: '5rk1/5ppp/8/8/5Q2/8/8/5RK1 w - - 0 1',
    solution: ['f1f8', 'f7f8', 'f4f8'],
    level: 'intermediate',
    hint: 'Exchange the back rank defender and deliver checkmate!',
    explanation: 'Rxf8+! Rxf8, Qxf8# — the rook exchange eliminates the key defender, and the queen delivers checkmate on f8. The king is completely trapped by its own pawns.',
  },
  {
    id: 'i-k20',
    title: 'Rook and Knight Finish',
    fen: '6k1/5ppp/5N2/8/8/8/8/4R1K1 w - - 0 1',
    solution: ['f6h5', 'g8h8', 'e1e8'],
    level: 'intermediate',
    hint: 'Reposition the knight, then the rook delivers mate!',
    explanation: 'Nh5! threatens Nf6+ and Re8#. After Kh8 (forced), Re8# — the knight repositions to cover key squares, and the rook delivers checkmate on e8.',
  },
  {
    id: 'i-k21',
    title: 'Staircase Mate',
    fen: '7k/6R1/5R2/8/8/8/8/6K1 w - - 0 1',
    solution: ['f6f8'],
    level: 'intermediate',
    hint: 'One rook delivers checkmate directly!',
    explanation: 'Rf8# — the rook on f6 moves to f8, delivering checkmate. The king on h8 is trapped by the rook on g7 covering g8 and h7, and the rook on f8 covers f8 and the entire rank.',
  },
  {
    id: 'i-k22',
    title: 'King and Queen Coordination',
    fen: '8/8/8/4k3/4K3/8/8/7Q w - - 0 1',
    solution: ['h1e4'],
    level: 'intermediate',
    hint: 'The queen can deliver checkmate by working with the king!',
    explanation: 'Qe4# — the queen moves to e4, delivering checkmate! The king on e5 is trapped between the White king on e4... wait, that would be capturing the queen. Let me reconsider.',
  },
  {
    id: 'i-k23',
    title: 'The Boden\'s Mate Pattern',
    fen: '2kr4/ppq5/2nrBp2/6p1/3P4/2N2Q2/PPP2PPP/2KR3R w - - 0 1',
    solution: ['f3a8'],
    level: 'intermediate',
    hint: 'The queen can sacrifice itself to deliver checkmate!',
    explanation: 'Qxa8# — the queen delivers checkmate! Two bishops on opposite colored diagonals create a mating net (Boden\'s Mate). The king on c8 is caught in the diagonal crossfire.',
  },
  {
    id: 'i-k24',
    title: 'Anastasia\'s Mate',
    fen: '5r1k/pp4Np/8/8/8/8/8/4R2K w - - 0 1',
    solution: ['e1e8'],
    level: 'intermediate',
    hint: 'The rook can deliver checkmate with the knight providing cover!',
    explanation: 'Re8! — the rook delivers checkmate on e8! The knight on g7 covers f5 and h5, while the pawns on a7 and h7 trap the king, and the rook on f8 is pinned.',
  },
  {
    id: 'i-k25',
    title: 'Hook Mate',
    fen: '6k1/5pNp/6P1/8/8/8/8/6RK w - - 0 1',
    solution: ['g1g8'],
    level: 'intermediate',
    hint: 'The rook delivers checkmate in the corner!',
    explanation: 'Rg8# — the rook delivers checkmate on g8! The knight on g7 covers f5 and h5, the pawns on f7 and h7 block escape, and the g6 pawn covers f7. Classic Hook Mate!',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validatePuzzle(puzzle) {
  const errors = [];
  let chess;

  // 1. Load the FEN
  try {
    chess = new Chess(puzzle.fen);
  } catch (e) {
    return { valid: false, errors: [`Invalid FEN: ${e.message}`] };
  }

  // 2. Play through solution moves
  for (let i = 0; i < puzzle.solution.length; i++) {
    const uci = puzzle.solution[i];
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    const promotion = uci.length === 5 ? uci[4] : undefined;

    let result;
    try {
      result = chess.move({ from, to, promotion: promotion ?? 'q' });
    } catch (e) {
      result = null;
    }

    if (!result) {
      errors.push(`Move ${i + 1} "${uci}" is illegal at position: ${chess.fen()}`);
      return { valid: false, errors };
    }
  }

  // 3. For single-move puzzles: check if position is checkmate
  if (puzzle.solution.length === 1) {
    if (!chess.isCheckmate()) {
      errors.push(`After solution, position is NOT checkmate (expected for single-move puzzles). FEN: ${chess.fen()}`);
      return { valid: false, errors };
    }
  }

  // 4. For multi-move puzzles ending on White's move: check checkmate
  if (puzzle.solution.length >= 3 && puzzle.solution.length % 2 === 1) {
    if (!chess.isCheckmate()) {
      errors.push(`After solution, position is NOT checkmate. FEN: ${chess.fen()}`);
      return { valid: false, errors };
    }
  }

  return { valid: true, errors: [] };
}

// ─────────────────────────────────────────────────────────────────────────────
// RUN VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

const allCandidates = [...beginnerCandidates, ...intermediateCandidates];

const passedBeginner = [];
const passedIntermediate = [];
const failedPuzzles = [];

for (const puzzle of allCandidates) {
  const result = validatePuzzle(puzzle);
  if (result.valid) {
    if (puzzle.level === 'beginner') passedBeginner.push(puzzle);
    else passedIntermediate.push(puzzle);
  } else {
    failedPuzzles.push({ id: puzzle.id, title: puzzle.title, errors: result.errors });
  }
}

// Print validation report to stderr
process.stderr.write('\n========== PUZZLE VALIDATION REPORT ==========\n');
process.stderr.write(`Total candidates: ${allCandidates.length}\n`);
process.stderr.write(`  Beginner candidates: ${beginnerCandidates.length}\n`);
process.stderr.write(`  Intermediate candidates: ${intermediateCandidates.length}\n\n`);
process.stderr.write(`Passed: ${passedBeginner.length + passedIntermediate.length}\n`);
process.stderr.write(`  Beginner passed: ${passedBeginner.length}\n`);
process.stderr.write(`  Intermediate passed: ${passedIntermediate.length}\n\n`);
process.stderr.write(`Failed: ${failedPuzzles.length}\n`);

if (failedPuzzles.length > 0) {
  process.stderr.write('\nFailed puzzles:\n');
  for (const f of failedPuzzles) {
    process.stderr.write(`  [${f.id}] ${f.title}\n`);
    for (const err of f.errors) {
      process.stderr.write(`    ERROR: ${err}\n`);
    }
  }
}
process.stderr.write('==============================================\n\n');

// Take first 100 of each that passed
const finalBeginner = passedBeginner.slice(0, 100);
const finalIntermediate = passedIntermediate.slice(0, 100);

process.stderr.write(`Final selection:\n`);
process.stderr.write(`  Beginner: ${finalBeginner.length}\n`);
process.stderr.write(`  Intermediate: ${finalIntermediate.length}\n\n`);

if (finalBeginner.length < 100 || finalIntermediate.length < 100) {
  process.stderr.write('WARNING: Not enough valid puzzles. Need 100 of each level.\n');
  process.stderr.write(`Missing: ${100 - finalBeginner.length} beginner, ${100 - finalIntermediate.length} intermediate\n`);
}

// Output JSON to stdout
const output = [...finalBeginner, ...finalIntermediate];
process.stdout.write(JSON.stringify(output, null, 2));
