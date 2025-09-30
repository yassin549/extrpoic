import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IconButton from './IconButton';
import { MotionProvider } from '../hooks/useMotion';

const PlaceholderIcon = () => <svg data-testid="icon" />;

describe('IconButton', () => {
  it('renders the button with the correct accessible name', () => {
    render(
      <MotionProvider>
        <IconButton icon={<PlaceholderIcon />} label="Test Action" />
      </MotionProvider>
    );
    expect(screen.getByRole('button', { name: /Test Action/i })).toBeInTheDocument();
  });

  it('renders the icon inside the button', () => {
    render(
      <MotionProvider>
        <IconButton icon={<PlaceholderIcon />} label="Test Action" />
      </MotionProvider>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    render(
      <MotionProvider>
        <IconButton icon={<PlaceholderIcon />} label="Test Action" disabled />
      </MotionProvider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
