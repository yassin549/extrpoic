import React from 'react';

export interface GameHistoryProps {
  history: number[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  const getMultiplierColor = (multiplier: number) => {
    if (multiplier < 2) return 'text-blue-400';
    if (multiplier < 10) return 'text-purple-400';
    return 'text-amber-400';
  };

  return (
    <div className="w-full bg-card-dark p-2 rounded-lg border border-subtle-border">
      <div className="flex items-center gap-2 overflow-x-auto">
        {history.map((multiplier, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded-full text-sm font-semibold bg-muted-surface ${getMultiplierColor(multiplier)}`}
          >
            {multiplier.toFixed(2)}x
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;
