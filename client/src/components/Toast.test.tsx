import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToastProvider, useToast } from './Toast';
import { MotionProvider } from '../hooks/useMotion';
import React from 'react';

vi.useFakeTimers();

const TestComponent = () => {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast({ type: 'info', message: 'Test message' })}>
      Add Toast
    </button>
  );
};

describe('Toast', () => {
  beforeEach(() => {
    render(
      <MotionProvider>
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      </MotionProvider>
    );
  });

  it('does not show a toast initially', () => {
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a toast when addToast is called', () => {
    fireEvent.click(screen.getByRole('button', { name: /Add Toast/i }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('removes the toast after the duration', () => {
    fireEvent.click(screen.getByRole('button', { name: /Add Toast/i }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('removes the toast when the dismiss button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /Add Toast/i }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
