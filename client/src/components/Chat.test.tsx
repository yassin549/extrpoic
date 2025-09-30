import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chat from './Chat';

const messages = [
  { id: '1', user: 'Player1', text: 'Hello' },
];

describe('Chat', () => {
  const defaultProps = {
    tabs: ['All', 'Bets'] as const,
    messages: messages,
    onSend: vi.fn(),
    muted: false,
  };

  it('renders messages', () => {
    render(<Chat {...defaultProps} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('calls onSend when a message is submitted', () => {
    render(<Chat {...defaultProps} />);
    const input = screen.getByPlaceholderText('Say something...');
    fireEvent.change(input, { target: { value: 'New message' } });
    fireEvent.submit(input);
    expect(defaultProps.onSend).toHaveBeenCalledWith('New message');
  });

  it('disables input when muted', () => {
    render(<Chat {...defaultProps} muted={true} />);
    expect(screen.getByPlaceholderText('Chat is muted')).toBeDisabled();
  });

  it('has an aria-live region for messages', () => {
    render(<Chat {...defaultProps} />);
    expect(screen.getByRole('log')).toHaveAttribute('aria-live', 'polite');
  });
});
