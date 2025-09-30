import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'number', 'password', 'email'] },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Password',
    type: 'password',
    value: '123',
    error: 'Password must be at least 6 characters.',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled Input',
    value: 'Cannot change',
    disabled: true,
  },
};
