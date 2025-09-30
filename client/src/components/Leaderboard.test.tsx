import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Leaderboard from './Leaderboard';

const sampleEntries = [
  { userId: '1', displayName: 'HighRoller', amount: 12500 },
  { userId: '2', displayName: 'LuckyDuck', amount: 9800 },
];

describe('Leaderboard', () => {
  it('renders a list of entries', () => {
    render(<Leaderboard entries={sampleEntries} />);
    expect(screen.getByText('HighRoller')).toBeInTheDocument();
    expect(screen.getByText('$12,500')).toBeInTheDocument();
    expect(screen.getByText('LuckyDuck')).toBeInTheDocument();
    expect(screen.getByText('$9,800')).toBeInTheDocument();
  });

  it('renders nothing for empty entries', () => {
    const { container } = render(<Leaderboard entries={[]} />);
    expect(container.querySelector('.space-y-3')?.childElementCount).toBe(0);
  });
});
