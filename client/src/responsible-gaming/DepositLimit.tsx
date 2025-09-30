import React from 'react';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';

interface DepositLimitProps {
  currentLimit: number | null;
  onSetLimit: (limit: number) => void;
}

const DepositLimit: React.FC<DepositLimitProps> = ({ currentLimit, onSetLimit }) => {
  const [limit, setLimit] = React.useState(currentLimit || '');

  const handleSetLimit = () => {
    const numLimit = Number(limit);
    if (!isNaN(numLimit) && numLimit > 0) {
      onSetLimit(numLimit);
    }
  };

  return (
    <div className="bg-card-dark border border-subtle-border rounded-md p-4 space-y-4">
      <h4 className="font-bold text-light-text">Deposit Limit</h4>
      <p className="text-sm text-mid-gray">Set a limit on how much you can deposit over a period of time. Any decrease is effective immediately, while increases have a 24-hour cooldown.</p>
      <Input 
        label="Monthly Deposit Limit ($)" 
        type="number" 
        value={limit.toString()} 
        onChange={(e) => setLimit(e.target.value)} 
        placeholder="e.g., 500"
      />
      <PrimaryButton label="Set Limit" onClick={handleSetLimit} />
    </div>
  );
};

export default DepositLimit;
