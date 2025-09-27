import React from 'react';
import { useGetPayouts } from '../../lib/api';

const PayoutQueue: React.FC = () => {
  const { data: payouts, isLoading, error } = useGetPayouts();

  return (
    <div className="p-8 bg-[#06060A] text-white rounded-2xl mt-8">
      <h1 className="text-3xl font-bold mb-8">Payout Queue</h1>
      <div className="bg-gray-900 p-4 rounded-lg">
        {isLoading && <p>Loading payout requests...</p>}
        {error && <p className="text-red-500">Failed to load payouts.</p>}
        {payouts && (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">User ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Address</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout: any) => (
                <tr key={payout.id} className="border-t border-gray-800">
                  <td className="p-2">{new Date(payout.created_at).toLocaleString()}</td>
                  <td className="p-2">{payout.user_id}</td>
                  <td className="p-2">{payout.amount} {payout.currency}</td>
                  <td className="p-2">{payout.to_address}</td>
                  <td className="p-2">{payout.status}</td>
                  <td className="p-2">
                    <button className="text-green-400">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PayoutQueue;
