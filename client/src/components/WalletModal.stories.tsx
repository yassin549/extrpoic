import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WalletModal from './WalletModal';
import PrimaryButton from './PrimaryButton';
import { ToastProvider } from './Toast';
import { MotionProvider } from '../hooks/useMotion';

const meta: Meta<typeof WalletModal> = {
  title: 'Components/WalletModal',
  component: WalletModal,
  decorators: [
    (Story) => (
      <MotionProvider>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </MotionProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WalletModal>;

const InteractiveWalletModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton label="Open Wallet" onClick={() => setIsOpen(true)} />
      <WalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => <InteractiveWalletModal />,
};
