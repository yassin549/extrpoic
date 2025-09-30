import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../hooks/useMotion';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // For accessibility
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  label,
  size = 'md', 
  disabled = false, 
  ...props 
}) => {
  const { reducedMotion } = useMotion();

  const motionProps = reducedMotion ? {} : {
    whileHover: { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    whileTap: { scale: 0.95 },
  };

  return (
    <motion.button
      aria-label={label}
      className={`flex items-center justify-center rounded-full text-light-text transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      <div className={iconSizeStyles[size]}>
        {icon}
      </div>
    </motion.button>
  );
};

export default IconButton;
