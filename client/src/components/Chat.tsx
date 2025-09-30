import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '../hooks/useMotion';

export interface Message {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  isVip?: boolean;
}

export interface ChatProps {
  tabs: ('All' | 'Bets' | 'System')[];
  messages: Message[];
  onSend: (message: string) => void;
  muted?: boolean;
}

const Chat: React.FC<ChatProps> = ({ tabs, messages, onSend, muted = false }) => {
  const { reducedMotion } = useMotion();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-card-dark border border-subtle-border rounded-md flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-subtle-border">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold transition-colors ${activeTab === tab ? 'text-light-text border-b-2 border-primary-blue' : 'text-mid-gray hover:text-light-text'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div role="log" className="flex-grow p-4 overflow-y-auto" aria-live="polite">
        <AnimatePresence initial={false}>
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex items-start gap-2 mb-4"
          >
            {/* Avatar placeholder */}
            <div className="w-8 h-8 rounded-full bg-muted-surface flex-shrink-0" />
            <div>
              <span className={`font-semibold ${msg.isVip ? 'text-neon-amber' : 'text-primary-blue'}`}>{msg.user}</span>
              <p className="text-light-text text-sm">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-subtle-border">
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={muted ? 'Chat is muted' : 'Say something...'}
          disabled={muted}
          className="w-full bg-muted-surface border border-subtle-border rounded-md p-2 text-light-text"
        />
      </form>
    </div>
  );
};

export default Chat;

