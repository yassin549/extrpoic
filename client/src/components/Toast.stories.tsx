import React from 'react';
import type { Meta } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import PrimaryButton from './PrimaryButton';
import { MotionProvider } from '../hooks/useMotion';

const ToastController = () => {
  const { addToast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <PrimaryButton label="Show Success Toast" onClick={() => addToast({ type: 'success', message: 'Operation was successful!' })} />
      <PrimaryButton label="Show Error Toast" tone="destructive" onClick={() => addToast({ type: 'error', message: 'Something went wrong.' })} />
      <PrimaryButton label="Show Info Toast" tone="secondary" onClick={() => addToast({ type: 'info', message: 'Here is some information.' })} />
    </div>
  );
};

const meta: Meta = {
  title: 'Components/Toast',
  component: ToastController,
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

export const Default = {};
