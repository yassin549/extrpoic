import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import { useToast } from './Toast';

type Tab = 'Deposit' | 'Withdraw' | 'History';

const DepositTab: React.FC = () => {
  const { addToast } = useToast();
  const depositAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress).then(() => {
      addToast({ type: 'success', message: 'Address copied to clipboard!' });
    });
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-mid-gray">Send Bitcoin to the address below:</p>
      <div className="bg-white p-4 rounded-md inline-block">
        <QRCode value={depositAddress} size={128} />
      </div>
      <div className="bg-muted-surface p-3 rounded-md flex items-center justify-between">
        <span className="text-light-text font-mono text-sm break-all">{depositAddress}</span>
        <button onClick={handleCopy} className="text-primary-blue hover:text-electric-purple ml-4">Copy</button>
      </div>
    </div>
  );
};

const WithdrawTab: React.FC = () => (
  <div className="space-y-4">
    <input type="text" placeholder="Destination Address" className="w-full bg-muted-surface p-3 rounded-md text-light-text" />
    <input type="number" placeholder="Amount" className="w-full bg-muted-surface p-3 rounded-md text-light-text" />
    <input type="text" placeholder="2FA Code" className="w-full bg-muted-surface p-3 rounded-md text-light-text" />
    <PrimaryButton label="Submit Withdrawal" onClick={() => {}} />
  </div>
);

const WalletModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Deposit');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet">
      <div className="flex border-b border-subtle-border mb-4">
        {['Deposit', 'Withdraw', 'History'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`py-2 px-4 font-semibold transition-colors ${activeTab === tab ? 'text-light-text border-b-2 border-primary-blue' : 'text-mid-gray hover:text-light-text'}`}>
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 'Deposit' && <DepositTab />}
      {activeTab === 'Withdraw' && <WithdrawTab />}
      {activeTab === 'History' && <p className="text-light-text">Transaction history...</p>}
    </Modal>
  );
};

export default WalletModal;

