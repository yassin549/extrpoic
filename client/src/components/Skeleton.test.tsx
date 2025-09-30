import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders a text skeleton by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse bg-muted-surface h-4 rounded w-full');
  });

  it('renders a circle skeleton', () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('renders a rect skeleton', () => {
    const { container } = render(<Skeleton variant="rect" />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('applies custom width and height', () => {
    render(<Skeleton data-testid="skeleton" width="100px" height="50px" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '100px', height: '50px' });
  });
});
