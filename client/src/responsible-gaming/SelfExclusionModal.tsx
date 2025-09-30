import React from 'react';
import Modal from '../components/Modal';
import PrimaryButton from '../components/PrimaryButton';

interface SelfExclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: string) => void;
}

const SelfExclusionModal: React.FC<SelfExclusionModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const durations = ['24 hours', '7 days', '30 days', 'Permanent'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Self-Exclusion">
      <div className="space-y-4">
        <p className="text-mid-gray">If you feel you are playing too much, you can lock your account for a period of time. This action is irreversible for the chosen duration.</p>
        <div className="grid grid-cols-2 gap-4">
          {durations.map(d => (
            <PrimaryButton key={d} label={d} tone="secondary" onClick={() => onConfirm(d)} />
          ))}
        </div>
        <p className="text-xs text-mid-gray">For permanent exclusion, please contact support.</p>
      </div>
    </Modal>
  );
};

export default SelfExclusionModal;
