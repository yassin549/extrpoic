import React, { useState } from 'react';
import { useNowPayments } from '../../hooks/useNowPayments';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('100'); // Default amount
  const { invoice, isPending, error, handleCreateInvoice } = useNowPayments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateInvoice(parseFloat(amount), 'USD'); // Assuming USD for now
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#06060A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Deposit</h2>

        {invoice ? (
          <div>
            <h3 className="text-lg text-center">Scan to Pay</h3>
            {/* You would typically render a QR code here using invoice.invoice_url */}
            <div className="p-4 bg-white rounded-lg my-4">
              <p className="text-black text-center">QR Code for {invoice.invoice_url}</p>
            </div>
            <p className="text-center text-gray-400 text-sm">Waiting for payment...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">Amount (USD)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <button type="submit" disabled={isPending} className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-3 font-semibold transition-colors disabled:bg-gray-500">
              {isPending ? 'Creating...' : 'Create Invoice'}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">Error: {(error as Error).message}</p>}
      </div>
    </div>
  );
};

export default DepositModal;
