import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GameCanvas from './GameCanvas';
import { MotionProvider } from '../hooks/useMotion';

const meta: Meta<typeof GameCanvas> = {
  title: 'Components/GameCanvas',
  component: GameCanvas,
  decorators: [(Story) => <MotionProvider><div style={{ width: '800px', height: '450px' }}><Story /></div></MotionProvider>],
  argTypes: {
    multiplier: { control: { type: 'range', min: 1, max: 20, step: 0.01 } },
    planePosition: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    status: { control: 'select', options: ['idle', 'betting', 'flying', 'crashed'] },
  },
};

export default meta;
type Story = StoryObj<typeof GameCanvas>;

export const Flying: Story = {
  args: {
    multiplier: 2.56,
    planePosition: 0.5,
    status: 'flying',
  },
};

export const Betting: Story = {
  args: {
    multiplier: 1.00,
    planePosition: 0,
    status: 'betting',
  },
};

export const Crashed: Story = {
  args: {
    multiplier: 4.32,
    planePosition: 0.8,
    status: 'crashed',
  },
};
