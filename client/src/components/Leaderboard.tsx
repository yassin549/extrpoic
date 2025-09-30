import React from 'react';

export interface LeaderboardEntry {
  userId: string;
  avatarUrl?: string;
  displayName: string;
  amount: number;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="bg-card-dark border border-subtle-border rounded-md p-4">
      <h3 className="text-lg font-bold text-light-text mb-4">Top Winners</h3>
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={entry.userId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-mid-gray font-semibold w-6">{index + 1}</span>
              <div className="w-8 h-8 rounded-full bg-muted-surface" />
              <span className="text-light-text font-semibold">{entry.displayName}</span>
            </div>
            <span className="text-emerald-win font-bold">${entry.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
