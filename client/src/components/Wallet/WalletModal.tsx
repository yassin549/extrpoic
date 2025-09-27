import React, { useState } from 'react';
import DepositModal from './DepositModal';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
        <div className="bg-[#06060A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Wallet</h2>
          
          {/* Placeholder for balances */}
          <div className="mb-6">
            <p className="text-gray-400">Total Balance (TND Equivalent): <span className="font-bold text-white">...</span></p>
            {/* Map over per-currency balances here */}
          </div>

          <div className="flex space-x-4">
            <button onClick={() => setIsDepositOpen(true)} className="flex-1 bg-[#4C6FFF] hover:bg-blue-600 p-3 rounded-lg font-bold">
              Deposit
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg">
              Withdraw
            </button>
          </div>

          <button type="button" onClick={onClose} className="w-full bg-gray-800 hover:bg-gray-700 p-3 rounded-lg mt-6">Close</button>
        </div>
      </div>
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
    </>
  );
};

export default WalletModal;
