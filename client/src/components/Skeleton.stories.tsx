import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => (
    <div className="space-y-2 w-64">
      <Skeleton {...args} />
      <Skeleton {...args} width="80%" />
      <Skeleton {...args} width="90%" />
    </div>
  ),
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '50px',
  },
};

export const Rect: Story = {
  args: {
    variant: 'rect',
    width: '200px',
    height: '100px',
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 bg-card-dark rounded-md w-96">
      <Skeleton variant="circle" width="40px" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};
