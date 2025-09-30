import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SegmentedControl from './SegmentedControl';

export interface BetBoxProps {
  value: number;
  currency: string;
  onChange: (value: number) => void;
  presets?: number[];
  onPlaceBet: () => void;
  onCashOut: () => void;
  autoCashout: number | null;
  onAutoCashoutChange: (value: number | null) => void;
  gameStatus: 'idle' | 'betting' | 'flying' | 'crashed';
  hasActiveBet: boolean;
}

const BetBox: React.FC<BetBoxProps> = ({ 
  value, 
  currency, 
  onChange, 
  presets = [0.1, 0.25, 0.5, 1], 
  onPlaceBet, 
  onCashOut, 
  autoCashout, 
  onAutoCashoutChange,
  gameStatus,
  hasActiveBet
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (num > 1000) setError('Max bet is 1000');
    else setError(null);
    onChange(num);
  };

  const renderActionButton = () => {
    if (gameStatus === 'flying' && hasActiveBet) {
      return <PrimaryButton label="Cash Out" tone="primary" onClick={onCashOut} size="lg" />;
    }
    return (
      <PrimaryButton 
        label={hasActiveBet ? 'Bet Placed' : 'Place Bet'}
        onClick={onPlaceBet} 
        disabled={gameStatus !== 'betting' || hasActiveBet}
        size="lg"
      />
    );
  };

  return (
    <div className="bg-card-dark border border-subtle-border rounded-md p-4 space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <SegmentedControl options={[{id: 'fiat', label: '$'}, {id: 'crypto', label: 'Ƀ'}]} value={currency} onChange={() => {}} />
        {/* Auto/Manual tabs could go here */}
      </div>
      
      {/* Bet Amount Input */}
      <div className="relative">
        <input type="number" value={value} onChange={handleValueChange} className="w-full bg-muted-surface border border-subtle-border rounded-md p-3 text-light-text text-lg" />
        {error && <p aria-live="assertive" className="text-error-red text-xs mt-1">{error}</p>}
      </div>

      {/* Presets */}
      <div className="flex justify-between">
        {presets.map(p => <button key={p} onClick={() => onChange(p)} className="text-mid-gray hover:text-light-text">{p}</button>)}
      </div>

      {/* Action Button */}
      {renderActionButton()}
    </div>
  );
};

export default BetBox;

