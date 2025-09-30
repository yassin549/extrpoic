import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Chat, { Message } from './Chat';

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  decorators: [(Story) => <div className="h-96"><Story /></div>],
  argTypes: {
    muted: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Chat>;

const initialMessages: Message[] = [
  { id: '1', user: 'Player123', text: 'Here we go!', isVip: true },
  { id: '2', user: 'HighRoller', text: 'Lets see a 100x!' },
  { id: '3', user: 'Newbie', text: 'How do I play?' },
];

const InteractiveChat = (args: any) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'You',
      text,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return <Chat {...args} messages={messages} onSend={handleSend} />;
};

export const Default: Story = {
  args: {
    tabs: ['All', 'Bets', 'System'],
    muted: false,
  },
  render: (args) => <InteractiveChat {...args} />,
};

export const Muted: Story = {
  args: {
    ...Default.args,
    muted: true,
  },
  render: (args) => <InteractiveChat {...args} />,
};
