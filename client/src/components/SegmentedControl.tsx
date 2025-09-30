import React from 'react';
import { motion } from 'framer-motion';
import tokens from '../tokens/design-tokens.json';

export interface SegmentedControlOption {
  id: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (id: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
  return (
    <div className="relative flex w-full rounded-full bg-muted-surface p-1">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`relative flex-1 rounded-full py-1.5 text-sm font-semibold transition-colors focus:outline-none ${value === option.id ? 'text-light-text' : 'text-mid-gray hover:text-light-text'}`}
          aria-pressed={value === option.id}
        >
          {value === option.id && (
            <motion.div
              layoutId="segmented-control-active-bg"
              className="absolute inset-0 rounded-full bg-primary-blue"
              style={{ borderRadius: tokens.radius['radius-pill'] }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
