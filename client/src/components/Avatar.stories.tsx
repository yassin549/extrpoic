import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    status: { control: 'radio', options: ['online', 'offline', 'vip', undefined] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    alt: 'User Name',
    size: 'lg',
  },
};

export const WithInitials: Story = {
  args: {
    alt: 'John Doe',
    size: 'lg',
  },
};

export const WithStatus: Story = {
  args: {
    ...WithImage.args,
    status: 'online',
  },
};

export const VIPStatus: Story = {
  args: {
    ...WithImage.args,
    status: 'vip',
  },
};
