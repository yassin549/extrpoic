import React from 'react';
import Modal from '../components/Modal';
import PrimaryButton from '../components/PrimaryButton';

interface SessionReminderProps {
  isOpen: boolean;
  onClose: () => void;
  sessionDuration: string; // e.g., "60 minutes"
}

const SessionReminder: React.FC<SessionReminderProps> = ({ isOpen, onClose, sessionDuration }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Session Reminder">
      <div className="space-y-4 text-center">
        <p className="text-light-text">You have been playing for {sessionDuration}.</p>
        <p className="text-mid-gray">Remember to play responsibly and take breaks.</p>
        <PrimaryButton label="Continue Playing" onClick={onClose} />
      </div>
    </Modal>
  );
};

export default SessionReminder;
