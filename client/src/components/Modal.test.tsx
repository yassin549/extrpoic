import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';
import { MotionProvider } from '../hooks/useMotion';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <MotionProvider>
        <Modal isOpen={false} onClose={() => {}} title="Test">Content</Modal>
      </MotionProvider>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <MotionProvider>
        <Modal isOpen={true} onClose={() => {}} title="Test">Content</Modal>
      </MotionProvider>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <MotionProvider>
        <Modal isOpen={true} onClose={handleClose} title="Test">Content</Modal>
      </MotionProvider>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <MotionProvider>
        <Modal isOpen={true} onClose={handleClose} title="Test">Content</Modal>
      </MotionProvider>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape if closeOnEsc is false', () => {
    const handleClose = vi.fn();
    render(
      <MotionProvider>
        <Modal isOpen={true} onClose={handleClose} title="Test" closeOnEsc={false}>Content</Modal>
      </MotionProvider>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });
});
