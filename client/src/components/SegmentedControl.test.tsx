import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SegmentedControl from './SegmentedControl';

const options = [
  { id: 'opt1', label: 'Option 1' },
  { id: 'opt2', label: 'Option 2' },
];

describe('SegmentedControl', () => {
  it('renders all options', () => {
    render(<SegmentedControl options={options} value="opt1" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
  });

  it('highlights the active option', () => {
    render(<SegmentedControl options={options} value="opt1" onChange={() => {}} />);
    const activeButton = screen.getByRole('button', { name: 'Option 1' });
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with the correct id when an option is clicked', () => {
    const handleChange = vi.fn();
    render(<SegmentedControl options={options} value="opt1" onChange={handleChange} />);
    const secondButton = screen.getByRole('button', { name: 'Option 2' });
    fireEvent.click(secondButton);
    expect(handleChange).toHaveBeenCalledWith('opt2');
  });
});
