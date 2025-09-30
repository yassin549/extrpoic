import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SegmentedControl from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const options = [
  { id: 'fiat', label: 'Fiat' },
  { id: 'crypto', label: 'Crypto' },
];

const InteractiveSegmentedControl = () => {
  const [value, setValue] = useState('fiat');
  return <SegmentedControl options={options} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <InteractiveSegmentedControl />,
};
