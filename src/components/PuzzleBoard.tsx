import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import type { Puzzle } from '../puzzles';
import type { Level } from '../levels';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  level: Level;
  playerElo?: number;        // shown only in adaptive mode
  isAdaptive?: boolean;
  solvedCount: number;       // puzzles solved so far in this session/level
  onSolved: (puzzleId: string) => void;
  onWrong: () => void;
  onNextPuzzle: () => void;
  onBackToMap: () => void;
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

export default function PuzzleBoard({
  puzzle,
  level,
  playerElo,
  isAdaptive = false,
  solvedCount,
  onSolved,
  onWrong,
  onNextPuzzle,
  onBackToMap,
}: PuzzleBoardProps) {
  const [chess] = useState(() => new Chess(puzzle.fen));
  const [fen, setFen] = useState(puzzle.fen);
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [showHint, setShowHint] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrationAnim, setCelebrationAnim] = useState(false);
  const computerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongReported = useRef(false);

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
        sourceSquare +
        targetSquare +
        (promotionPiece &&
        promotionPiece !== 'p' &&
        (expectedUci.length === 5 ||
          (piece === 'wP' && targetSquare[1] === '8') ||
          (piece === 'bP' && targetSquare[1] === '1'))
          ? promotionPiece
          : '');

      const expectedMove = uciToMove(expectedUci);

      const isCorrect =
        sourceSquare === expectedMove.from &&
        targetSquare === expectedMove.to &&
        (expectedMove.promotion === undefined ||
          expectedMove.promotion === (playerUci[4] ?? 'q'));

      if (!isCorrect) {
        setStatus('wrong');
        setWrongCount((c) => c + 1);
        // Report wrong only once per puzzle (for ELO adjustment)
        if (!wrongReported.current) {
          wrongReported.current = true;
          onWrong();
        }
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
        return false;
      }
      setFen(chess.fen());

      const nextIndex = moveIndex + 1;

      if (nextIndex >= puzzle.solution.length) {
        setStatus('solved');
        setCelebrationAnim(true);
        onSolved(puzzle.id);
        return true;
      }

      setMoveIndex(nextIndex);

      const isPlayerTurn = (idx: number) => idx % 2 === 0;
      const chessRef = chess;
      if (!isPlayerTurn(nextIndex)) {
        computerTimerRef.current = setTimeout(() => {
          playComputerMove(nextIndex, chessRef);
          const afterComputerIndex = nextIndex + 1;
          if (afterComputerIndex >= puzzle.solution.length) {
            setStatus('solved');
            setCelebrationAnim(true);
            onSolved(puzzle.id);
          } else {
            setMoveIndex(afterComputerIndex);
          }
        }, 500);
      }

      return true;
    },
    [chess, moveIndex, onSolved, onWrong, playComputerMove, puzzle, status],
  );

  const levelColor = level.color;

  /* ── Styles ─────────────────────────────────────────────────────────────── */
  const cardStyle: React.CSSProperties = {
    width: '100%',
    background: '#fff',
    borderRadius: 'var(--border-radius)',
    boxShadow: status === 'solved' ? `0 8px 32px ${levelColor}44` : 'var(--shadow)',
    border: `2px solid ${
      status === 'solved' ? levelColor : status === 'wrong' ? '#ef4444' : 'var(--color-border)'
    }`,
    overflow: 'hidden',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const titleBarStyle: React.CSSProperties = {
    padding: '0.85rem 1.25rem',
    background:
      status === 'solved'
        ? `linear-gradient(135deg, ${levelColor}22 0%, #4ecdc422 100%)`
        : '#fafafa',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    flexWrap: 'wrap',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={onBackToMap}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-light)',
                fontSize: '0.85rem',
                padding: '0.1rem 0.3rem',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              title="Back to level map"
            >
              ← Map
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>
              {puzzle.title}
            </h2>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', paddingLeft: '2.5rem' }}>
            {playerColor === 'white' ? '⬜ White to move' : '⬛ Black to move'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {/* Level badge */}
          <span
            style={{
              fontSize: '0.8rem',
              background: `${levelColor}22`,
              color: levelColor,
              padding: '0.2rem 0.6rem',
              borderRadius: '8px',
              border: `1px solid ${levelColor}55`,
              fontWeight: 700,
            }}
          >
            {level.label}
          </span>
          {/* Rating badge */}
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-light)',
            }}
          >
            Rating {puzzle.rating}
            {isAdaptive && playerElo !== undefined && (
              <span style={{ color: levelColor, fontWeight: 700 }}>
                {' '}(You: {playerElo})
              </span>
            )}
          </span>
        </div>
      </div>

      {/* In-level progress line */}
      <div
        style={{
          padding: '0.4rem 1.25rem',
          background: '#fafafa',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-light)',
        }}
      >
        <span>
          {solvedCount} solved in{' '}
          <span style={{ color: levelColor, fontWeight: 700 }}>{level.label}</span>
        </span>
        {isAdaptive && playerElo !== undefined && (
          <>
            <span style={{ margin: '0 0.25rem' }}>·</span>
            <span>
              ELO{' '}
              <span style={{ color: levelColor, fontWeight: 700 }}>{playerElo}</span>
            </span>
          </>
        )}
      </div>

      {/* Chessboard */}
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
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
      <div style={{ padding: '0.75rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
            Oops! That's not right. Try again!
          </div>
        )}

        {status === 'solved' && (
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
              border: `1px solid ${levelColor}88`,
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              animation: celebrationAnim ? 'bounceIn 0.5s ease' : 'none',
            }}
          >
            <p style={{ fontWeight: 900, fontSize: '1.1rem', color: '#16a34a', marginBottom: '0.4rem' }}>
              Excellent! You solved it!
            </p>
            <p style={{ fontSize: '0.9rem', color: '#166534', lineHeight: 1.4 }}>
              {puzzle.explanation}
            </p>
          </div>
        )}

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
              {showHint ? 'Hide hint' : 'Show hint'}
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
            {puzzle.hint}
          </div>
        )}

        {status === 'solved' && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              style={{
                ...btnBase,
                background: `linear-gradient(135deg, ${levelColor}, ${levelColor}cc)`,
                color: '#fff',
                boxShadow: `0 4px 14px ${levelColor}55`,
                fontSize: '1rem',
              }}
              onClick={onNextPuzzle}
            >
              Next Puzzle →
            </button>
            <button
              style={{
                ...btnBase,
                background: '#f3f4f6',
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                fontSize: '0.9rem',
              }}
              onClick={onBackToMap}
            >
              ← Level Map
            </button>
          </div>
        )}
      </div>

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
