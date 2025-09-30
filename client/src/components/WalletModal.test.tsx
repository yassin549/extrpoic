import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WalletModal from './WalletModal';
import { ToastProvider } from './Toast';
import { MotionProvider } from '../hooks/useMotion';

describe('WalletModal', () => {
  const renderComponent = () => render(
    <MotionProvider>
      <ToastProvider>
        <WalletModal isOpen={true} onClose={() => {}} />
      </ToastProvider>
    </MotionProvider>
  );

  it('renders the Deposit tab by default', () => {
    renderComponent();
    expect(screen.getByText(/Send Bitcoin to the address below/i)).toBeInTheDocument();
  });

  it('switches to the Withdraw tab', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /Withdraw/i }));
    expect(screen.getByPlaceholderText('Destination Address')).toBeInTheDocument();
  });

  it('switches to the History tab', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /History/i }));
    expect(screen.getByText('Transaction history...')).toBeInTheDocument();
  });
});
