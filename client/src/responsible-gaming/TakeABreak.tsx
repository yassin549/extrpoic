import React from 'react';
import PrimaryButton from '../components/PrimaryButton';

interface TakeABreakProps {
  onConfirm: () => void;
}

const TakeABreak: React.FC<TakeABreakProps> = ({ onConfirm }) => {
  return (
    <div className="bg-card-dark border border-subtle-border rounded-md p-4 space-y-2">
      <h4 className="font-bold text-light-text">Take a Break</h4>
      <p className="text-sm text-mid-gray">Log out immediately and take a short break from playing.</p>
      <PrimaryButton label="Log Out" tone="destructive" onClick={onConfirm} />
    </div>
  );
};

export default TakeABreak;
