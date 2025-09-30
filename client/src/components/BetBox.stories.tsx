import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BetBox from './BetBox';
import { MotionProvider } from '../hooks/useMotion';

const meta: Meta<typeof BetBox> = {
  title: 'Components/BetBox',
  component: BetBox,
  decorators: [(Story) => <MotionProvider><div className="w-80"><Story /></div></MotionProvider>],
  argTypes: {
    gameStatus: { control: 'select', options: ['idle', 'betting', 'flying', 'crashed'] },
    hasActiveBet: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof BetBox>;

const InteractiveBetBox = (args: any) => {
  const [value, setValue] = useState(1.00);
  const [autoCashout, setAutoCashout] = useState<number | null>(2.0);

  return (
    <BetBox 
      {...args} 
      value={value} 
      onChange={setValue} 
      autoCashout={autoCashout} 
      onAutoCashoutChange={setAutoCashout} 
      onPlaceBet={() => alert('Bet Placed!')} 
      onCashOut={() => alert('Cashed Out!')} 
    />
  );
};

export const BettingWindow: Story = {
  args: {
    gameStatus: 'betting',
    hasActiveBet: false,
    currency: 'fiat',
  },
  render: (args) => <InteractiveBetBox {...args} />,
};

export const BetPlaced: Story = {
  args: {
    ...BettingWindow.args,
    hasActiveBet: true,
  },
  render: (args) => <InteractiveBetBox {...args} />,
};

export const FlyingWithBet: Story = {
  args: {
    ...BettingWindow.args,
    gameStatus: 'flying',
    hasActiveBet: true,
  },
  render: (args) => <InteractiveBetBox {...args} />,
};
