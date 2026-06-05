import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import type { Puzzle } from '../puzzles';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  onSolved: (puzzleId: string, difficulty: 1 | 2 | 3) => void;
  onNextPuzzle: () => void;
}

type GameStatus = 'playing' | 'wrong' | 'solved';

/** Convert UCI string like "e2e4" or "e7e8q" to { from, to, promotion? } */
function uciToMove(uci: string): { from: string; to: string; promotion?: string } {
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length === 5 ? uci[4] : undefined,
  };
}

const DIFF_STARS: Record<1 | 2 | 3, string> = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
};

const DIFF_COLORS: Record<1 | 2 | 3, string> = {
  1: '#22c55e',
  2: '#f59e0b',
  3: '#a855f7',
};

export default function PuzzleBoard({ puzzle, onSolved, onNextPuzzle }: PuzzleBoardProps) {
  const [chess] = useState(() => new Chess(puzzle.fen));
  const [fen, setFen] = useState(puzzle.fen);
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [showHint, setShowHint] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrationAnim, setCelebrationAnim] = useState(false);
  const computerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine which color the player controls (whoever moves first in the FEN)
  const playerColor = puzzle.fen.includes(' b ') ? 'black' : 'white';

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (computerTimerRef.current) clearTimeout(computerTimerRef.current);
    };
  }, []);

  const playComputerMove = useCallback(
    (currentMoveIndex: number, currentChess: Chess) => {
      const computerUci = puzzle.solution[currentMoveIndex];
      if (!computerUci) return;

      const move = uciToMove(computerUci);
      try {
        currentChess.move({ from: move.from, to: move.to, promotion: move.promotion ?? 'q' });
        setFen(currentChess.fen());
        setMoveIndex(currentMoveIndex + 1);
      } catch {
        // position mismatch — puzzle might not need this move
      }
    },
    [puzzle.solution],
  );

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string, piece: string): boolean => {
      if (status !== 'playing') return false;

      const expectedUci = puzzle.solution[moveIndex];
      if (!expectedUci) return false;

      // Determine promotion piece from the piece string (e.g., "wQ" → "q")
      const promotionPiece = piece[1]?.toLowerCase();
      const playerUci =
        sourceSquare + targetSquare + (promotionPiece && promotionPiece !== 'p' &&
          // Only append promotion if the expected move has one, or pawn reaches back rank
          (expectedUci.length === 5 || (
            (piece === 'wP' && targetSquare[1] === '8') ||
            (piece === 'bP' && targetSquare[1] === '1')
          )) ? promotionPiece : '');

      const expectedMove = uciToMove(expectedUci);

      const isCorrect =
        sourceSquare === expectedMove.from &&
        targetSquare === expectedMove.to &&
        (expectedMove.promotion === undefined ||
          expectedMove.promotion === (playerUci[4] ?? 'q'));

      if (!isCorrect) {
        setStatus('wrong');
        setWrongCount((c) => c + 1);
        // Auto-reset "wrong" state after 1 s so they can try again
        setTimeout(() => setStatus('playing'), 1000);
        return false;
      }

      // ── Correct move ──────────────────────────────────────────────────
      try {
        chess.move({
          from: expectedMove.from,
          to: expectedMove.to,
          promotion: expectedMove.promotion ?? 'q',
        });
      } catch {
        // shouldn't happen if puzzle FEN/solution is valid
        return false;
      }
      setFen(chess.fen());

      const nextIndex = moveIndex + 1;

      if (nextIndex >= puzzle.solution.length) {
        // Puzzle complete!
        setStatus('solved');
        setCelebrationAnim(true);
        onSolved(puzzle.id, puzzle.difficulty);
        return true;
      }

      setMoveIndex(nextIndex);

      // If there's still a computer reply, play it after a short delay
      const isPlayerTurn = (idx: number) => idx % 2 === 0; // player always starts
      // Alternate: even indices = player moves, odd = computer replies
      // But multi-move puzzles can vary; we rely on whose turn it is in the resulting position
      const chessRef = chess;
      if (!isPlayerTurn(nextIndex)) {
        computerTimerRef.current = setTimeout(() => {
          playComputerMove(nextIndex, chessRef);
          const afterComputerIndex = nextIndex + 1;
          if (afterComputerIndex >= puzzle.solution.length) {
            setStatus('solved');
            setCelebrationAnim(true);
            onSolved(puzzle.id, puzzle.difficulty);
          } else {
            setMoveIndex(afterComputerIndex);
          }
        }, 500);
      }

      return true;
    },
    [chess, moveIndex, onSolved, playComputerMove, puzzle, status],
  );

  const diffColor = DIFF_COLORS[puzzle.difficulty];

  /* ── Styles ─────────────────────────────────────────────────────────────── */
  const cardStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    borderRadius: 'var(--border-radius)',
    boxShadow: status === 'solved' ? `0 8px 32px ${diffColor}44` : 'var(--shadow)',
    border: `2px solid ${status === 'solved' ? diffColor : status === 'wrong' ? '#ef4444' : 'var(--color-border)'}`,
    overflow: 'hidden',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const titleBarStyle: React.CSSProperties = {
    padding: '0.85rem 1.25rem',
    background: status === 'solved'
      ? `linear-gradient(135deg, ${diffColor}22 0%, #4ecdc422 100%)`
      : '#fafafa',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    flexWrap: 'wrap',
  };

  const boardWrapStyle: React.CSSProperties = {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  };

  const controlsStyle: React.CSSProperties = {
    padding: '0.75rem 1.25rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  };

  const btnBase: React.CSSProperties = {
    padding: '0.6rem 1.25rem',
    borderRadius: '999px',
    fontWeight: 800,
    fontSize: '1rem',
    transition: 'all 0.18s ease',
    border: 'none',
  };

  return (
    <div style={cardStyle}>
      {/* Title bar */}
      <div style={titleBarStyle}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>
            {puzzle.title}
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
            {playerColor === 'white' ? '⬜ White to move' : '⬛ Black to move'}
          </div>
        </div>
        <span
          style={{
            fontSize: '1.2rem',
            background: `${diffColor}22`,
            padding: '0.2rem 0.6rem',
            borderRadius: '8px',
            border: `1px solid ${diffColor}55`,
          }}
          title={`Difficulty: ${puzzle.difficulty}`}
        >
          {DIFF_STARS[puzzle.difficulty]}
        </span>
      </div>

      {/* Chessboard */}
      <div style={boardWrapStyle}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <Chessboard
            position={fen}
            onPieceDrop={handlePieceDrop}
            boardOrientation={playerColor}
            areArrowsAllowed
            customBoardStyle={{
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
            customDarkSquareStyle={{ backgroundColor: '#b58863' }}
            customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
          />
        </div>
      </div>

      {/* Controls & feedback */}
      <div style={controlsStyle}>
        {/* Status messages */}
        {status === 'wrong' && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              borderRadius: '12px',
              padding: '0.65rem 1rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              animation: 'shake 0.3s ease',
            }}
          >
            😅 Oops! That's not right. Try again!
          </div>
        )}

        {status === 'solved' && (
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
              border: `1px solid ${diffColor}88`,
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              animation: celebrationAnim ? 'bounceIn 0.5s ease' : 'none',
            }}
          >
            <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#16a34a', marginBottom: '0.4rem' }}>
              🎉 Excellent! You solved it!
            </p>
            <p style={{ fontSize: '0.9rem', color: '#166534', lineHeight: 1.4 }}>
              {puzzle.explanation}
            </p>
          </div>
        )}

        {/* Hint */}
        {status === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              style={{
                ...btnBase,
                background: showHint ? '#fffbeb' : '#f3f4f6',
                color: showHint ? '#92400e' : '#4b5563',
                border: showHint ? '1px solid #fbbf24' : '1px solid #e5e7eb',
                fontSize: '0.9rem',
              }}
              onClick={() => setShowHint((v) => !v)}
            >
              💡 {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            {wrongCount > 0 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                Attempts: {wrongCount}
              </span>
            )}
          </div>
        )}

        {showHint && status === 'playing' && (
          <div
            style={{
              background: '#fffbeb',
              border: '1px solid #fbbf24',
              borderRadius: '12px',
              padding: '0.65rem 1rem',
              fontSize: '0.9rem',
              color: '#78350f',
              fontWeight: 600,
            }}
          >
            💡 {puzzle.hint}
          </div>
        )}

        {/* Next puzzle button */}
        {status === 'solved' && (
          <button
            style={{
              ...btnBase,
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(255,107,53,0.4)',
              fontSize: '1rem',
              alignSelf: 'flex-start',
            }}
            onClick={onNextPuzzle}
          >
            Next Puzzle →
          </button>
        )}
      </div>

      {/* Inline keyframe animations via a style tag approach */}
      <style>{`
        @keyframes shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-6px); }
          40%  { transform: translateX(6px); }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        @keyframes bounceIn {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
