import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import { MotionProvider } from '../hooks/useMotion';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [(Story) => <MotionProvider><Story /></MotionProvider>],
  argTypes: {
    title: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    closeOnEsc: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const InteractiveModal = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton label="Open Modal" onClick={() => setIsOpen(true)} />
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-light-text">This is the content of the modal. You can press the Escape key to close it.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  args: {
    title: 'Default Modal',
    size: 'md',
    closeOnEsc: true,
  },
  render: (args) => <InteractiveModal {...args} />,
};

export const Small: Story = {
  args: {
    ...Default.args,
    title: 'Small Modal',
    size: 'sm',
  },
  render: (args) => <InteractiveModal {...args} />,
};

export const Large: Story = {
  args: {
    ...Default.args,
    title: 'Large Modal',
    size: 'lg',
  },
  render: (args) => <InteractiveModal {...args} />,
};
