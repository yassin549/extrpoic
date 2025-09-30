import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Leaderboard, { LeaderboardEntry } from './Leaderboard';

const meta: Meta<typeof Leaderboard> = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

const sampleEntries: LeaderboardEntry[] = [
  { userId: '1', displayName: 'HighRoller', amount: 12500 },
  { userId: '2', displayName: 'LuckyDuck', amount: 9800 },
  { userId: '3', displayName: 'Winner', amount: 7600 },
  { userId: '4', displayName: 'PlayerX', amount: 5400 },
  { userId: '5', displayName: 'Gamblor', amount: 3200 },
];

export const Default: Story = {
  args: {
    entries: sampleEntries,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};
