import React, { useState } from 'react';
import { useNowPayments } from '../../hooks/useNowPayments';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('100'); // Default amount
  const { invoice, isLoading, error, handleCreateInvoice } = useNowPayments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateInvoice(parseFloat(amount), 'USD'); // Assuming USD for now
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#06060A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Deposit</h2>
        
        {invoice ? (
          <div>
            <h3 className="text-lg text-center">Scan to Pay</h3>
            <p className="text-center text-gray-400">Send funds to the address shown by NOWPayments.</p>
            {/* In a real app, you would embed the NOWPayments widget or a QR code here */}
            <div className="my-4 p-4 bg-gray-900 rounded-lg text-center">
              <p>Invoice URL:</p>
              <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 break-all">{invoice.invoice_url}</a>
            </div>
            <button onClick={onClose} className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg mt-4">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="amount" className="block mb-2">Amount (USD)</label>
              <input 
                type="number" 
                id="amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{(error as Error).message}</p>}
            <button type="submit" disabled={isLoading} className="w-full bg-[#4C6FFF] hover:bg-blue-600 p-3 rounded-lg font-bold disabled:bg-gray-500">
              {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
            </button>
            <button type="button" onClick={onClose} className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg mt-4">Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DepositModal;
