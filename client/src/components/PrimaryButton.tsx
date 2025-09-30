import React from 'react';
import { motion } from 'framer-motion';
import tokens from '../tokens/design-tokens.json';
import { useMotion } from '../hooks/useMotion';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'secondary' | 'destructive';
  isLoading?: boolean;
}

const sizeStyles = {
  sm: { padding: '6px 12px', fontSize: '12px' },
  md: { padding: '10px 20px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' },
};

const toneStyles = {
  primary: `bg-gradient-to-r from-primary-blue to-electric-purple text-light-text`,
  secondary: `bg-transparent border border-mid-gray text-light-text`,
  destructive: `bg-error-red text-light-text`,
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  label, 
  icon, 
  size = 'md', 
  tone = 'primary', 
  isLoading = false, 
  disabled = false, 
  ...props 
}) => {
  const { reducedMotion } = useMotion();

  const motionProps = reducedMotion ? {} : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: parseFloat(tokens.motion['duration-short']) / 1000 }
  };

  return (
    <motion.button
      className={`flex items-center justify-center gap-2 font-semibold rounded-full transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-bg-dark ${sizeStyles[size]} ${toneStyles[tone]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...motionProps}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-light-text" />
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
};

export default PrimaryButton;

