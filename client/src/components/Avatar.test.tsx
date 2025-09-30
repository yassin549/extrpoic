import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="test.jpg" alt="User Name" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'User Name');
  });

  it('renders initials when src is not provided', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders a single initial for a single name', () => {
    render(<Avatar alt="Player" />);
    expect(screen.getByText('P')).toBeInTheDocument();
  });

  it('renders a status indicator', () => {
    const { container } = render(<Avatar alt="User" status="online" />);
    const statusIndicator = container.querySelector('.bg-emerald-win');
    expect(statusIndicator).toBeInTheDocument();
  });
});
