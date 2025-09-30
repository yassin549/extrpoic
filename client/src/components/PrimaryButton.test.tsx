import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrimaryButton from './PrimaryButton';
import { MotionProvider } from '../hooks/useMotion';

describe('PrimaryButton', () => {
  it('renders the button with the correct label', () => {
    render(
      <MotionProvider>
        <PrimaryButton label="Test Button" />
      </MotionProvider>
    );
    expect(screen.getByRole('button', { name: /Test Button/i })).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    render(
      <MotionProvider>
        <PrimaryButton label="Test Button" disabled />
      </MotionProvider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows a loading spinner when isLoading is true', () => {
    render(
      <MotionProvider>
        <PrimaryButton label="Test Button" isLoading />
      </MotionProvider>
    );
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('has the correct aria-busy attribute when loading', () => {
    render(
      <MotionProvider>
        <PrimaryButton label="Test Button" isLoading />
      </MotionProvider>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
