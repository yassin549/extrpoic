import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import tokens from '../tokens/design-tokens.json';
import { useMotion } from '../hooks/useMotion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  closeOnEsc?: boolean;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md', closeOnEsc = true }) => {
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (!closeOnEsc) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, closeOnEsc]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = reducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } : {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap>
          <motion.div
            className="fixed inset-0 bg-bg-dark/80 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: parseFloat(tokens.motion['duration-short']) / 1000 }}
            onClick={onClose}
          >
            <motion.div
              className={`relative w-full bg-card-dark rounded-md border border-subtle-border shadow-2xl p-6 ${sizeStyles[size]}`}
              variants={modalVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <h2 id="modal-title" className="text-2xl font-bold text-light-text mb-4">{title}</h2>
              {children}
              <button 
                onClick={onClose} 
                aria-label="Close modal"
                className="absolute top-4 right-4 text-mid-gray hover:text-light-text transition-colors"
              >
                {/* Close Icon */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};

export default Modal;

