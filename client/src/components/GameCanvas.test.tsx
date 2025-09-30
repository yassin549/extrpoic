import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GameCanvas from './GameCanvas';
import { MotionProvider } from '../hooks/useMotion';

describe('GameCanvas', () => {
  it('renders the canvas with the correct ARIA label', () => {
    render(
      <MotionProvider>
        <GameCanvas multiplier={1.5} planePosition={0.2} status="flying" />
      </MotionProvider>
    );
    expect(screen.getByRole('img', { name: /Aviator live flight showing multiplier 1.50x/i })).toBeInTheDocument();
  });

  it('includes a screen-reader-only live region for the multiplier', () => {
    render(
      <MotionProvider>
        <GameCanvas multiplier={2.75} planePosition={0.5} status="flying" />
      </MotionProvider>
    );
    const liveRegion = screen.getByText('2.75x');
    expect(liveRegion).toHaveClass('sr-only');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });
});
