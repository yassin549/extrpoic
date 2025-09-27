import React from 'react';
import { useGetIpnLogs } from '../../lib/api';

const IPNLogs: React.FC = () => {
  const { data: logs, isLoading, error } = useGetIpnLogs();

  return (
    <div className="p-8 bg-[#06060A] text-white rounded-2xl">
      <h1 className="text-3xl font-bold mb-8">IPN Logs</h1>
      <div className="bg-gray-900 p-4 rounded-lg">
        {isLoading && <p>Loading IPN logs...</p>}
        {error && <p className="text-red-500">Failed to load logs.</p>}
        {logs && (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Invoice ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log.id} className="border-t border-gray-800">
                  <td className="p-2">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="p-2">{log.invoice_id}</td>
                  <td className="p-2">{log.raw_ipn?.payment_status || 'N/A'}</td>
                  <td className="p-2">
                    <button className="text-blue-400">View Details</button>
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

export default IPNLogs;
