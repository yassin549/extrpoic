import React, { createContext, useContext, useState, useMemo } from 'react';

interface MotionContextProps {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const MotionContext = createContext<MotionContextProps | undefined>(undefined);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  const value = useMemo(() => ({ reducedMotion, toggleReducedMotion }), [reducedMotion]);

  return (
    <MotionContext.Provider value={value}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
};
