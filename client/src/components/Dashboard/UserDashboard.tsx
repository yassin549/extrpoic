import React from 'react';
import StatsCard from './StatsCard';
import { useGetDeposits } from '../../lib/api'; // Import the new hook

const UserDashboard: React.FC = () => {
  const { data: deposits, isLoading, error } = useGetDeposits();

  // Placeholder data - this would come from other API calls
  const stats = {
    totalBets: 124,
    netWins: 56.78,
    bestWin: 12.5,
  };

  return (
    <div className="p-8 bg-[#06060A] text-white rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* TODO: Add Demo/Live toggle switch here */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Bets" value={stats.totalBets} />
        <StatsCard title="Net Wins (USD)" value={`$${stats.netWins.toFixed(2)}`} />
        <StatsCard title="Best Win (Multiplier)" value={`${stats.bestWin.toFixed(2)}x`} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Deposit History</h2>
        <div className="bg-gray-900 p-4 rounded-lg">
          {isLoading && <p>Loading deposits...</p>}
          {error && <p className="text-red-500">Failed to load deposits.</p>}
          {deposits && (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Currency</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit: any) => (
                  <tr key={deposit.id} className="border-t border-gray-800">
                    <td className="p-2">{new Date(deposit.created_at).toLocaleDateString()}</td>
                    <td className="p-2">{deposit.amount}</td>
                    <td className="p-2">{deposit.currency}</td>
                    <td className="p-2">{deposit.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
