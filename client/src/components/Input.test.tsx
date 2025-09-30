import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('displays an error message', () => {
    render(<Input label="Password" error="Invalid password" />);
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });

  it('has correct ARIA attributes when in an error state', () => {
    render(<Input label="Password" error="Invalid password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('-error'));
  });
});
