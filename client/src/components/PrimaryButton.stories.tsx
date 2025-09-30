import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from './PrimaryButton';
import { MotionProvider } from '../hooks/useMotion';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  decorators: [(Story) => <MotionProvider><Story /></MotionProvider>],
  argTypes: {
    label: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'radio', options: ['primary', 'secondary', 'destructive'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    label: 'Primary Button',
    size: 'md',
    tone: 'primary',
    isLoading: false,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    label: 'Secondary Button',
    tone: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    label: 'Destructive Button',
    tone: 'destructive',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    label: 'Loading...',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled Button',
    disabled: true,
  },
};
