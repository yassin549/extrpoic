import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BetBox from './BetBox';
import { MotionProvider } from '../hooks/useMotion';

describe('BetBox', () => {
  const defaultProps = {
    value: 10,
    currency: 'fiat',
    onChange: vi.fn(),
    onPlaceBet: vi.fn(),
    onCashOut: vi.fn(),
    autoCashout: null,
    onAutoCashoutChange: vi.fn(),
    gameStatus: 'betting' as const,
    hasActiveBet: false,
  };

  it('renders correctly in betting state', () => {
    render(<MotionProvider><BetBox {...defaultProps} /></MotionProvider>);
    expect(screen.getByRole('button', { name: /Place Bet/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(10);
  });

  it('disables place bet button when not in betting state', () => {
    render(<MotionProvider><BetBox {...defaultProps} gameStatus="flying" /></MotionProvider>);
    expect(screen.getByRole('button', { name: /Place Bet/i })).toBeDisabled();
  });

  it('shows cash out button when flying with an active bet', () => {
    render(<MotionProvider><BetBox {...defaultProps} gameStatus="flying" hasActiveBet={true} /></MotionProvider>);
    expect(screen.getByRole('button', { name: /Cash Out/i })).toBeInTheDocument();
  });

  it('calls onPlaceBet when place bet is clicked', () => {
    render(<MotionProvider><BetBox {...defaultProps} /></MotionProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Place Bet/i }));
    expect(defaultProps.onPlaceBet).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when input value changes', () => {
    render(<MotionProvider><BetBox {...defaultProps} /></MotionProvider>);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '20' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(20);
  });
});
