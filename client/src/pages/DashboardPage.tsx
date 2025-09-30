import React, { useState, useEffect } from 'react';
import GameCanvas from '../components/GameCanvas';
import BetControls from '../components/game/BetControls';
import GameHistory from '../components/game/GameHistory';
import Chat, { Message } from '../components/Chat';

// Mock Data
const mockHistory = [2.34, 1.00, 5.67, 1.23, 10.45, 2.11, 3.44, 1.98];
const mockMessages: Message[] = [
  { id: '1', user: 'Player123', text: 'Here we go!', isVip: true },
  { id: '2', user: 'Winner', text: 'Cashed out at 5x!', isVip: false },
  { id: '3', user: 'Gambler', text: 'To the moon! 🚀', isVip: false },
];

const DashboardPage: React.FC = () => {
  // Game state simulation
  const [status, setStatus] = useState<'idle' | 'betting' | 'flying' | 'crashed'>('betting');
  const [multiplier, setMultiplier] = useState(1.00);
  const [planePosition, setPlanePosition] = useState(0);

  // Simple game loop simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'flying') {
      interval = setInterval(() => {
        setMultiplier(prev => prev + 0.01);
        setPlanePosition(prev => Math.min(prev + 0.001, 1));
      }, 50);
    } else if (status === 'betting') {
      setMultiplier(1.00);
      setPlanePosition(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Mock handlers
  const handlePlaceBet = () => {
    setStatus('flying');
  };

  const handleCashOut = () => {
    setStatus('crashed');
    setTimeout(() => setStatus('betting'), 2000);
  };

  const handleSendMessage = (message: string) => {
    console.log('Sent message:', message);
  };

  return (
    <div className="w-screen h-screen bg-background-dark text-light-text flex flex-col font-sans overflow-hidden">
      <header className="w-full flex justify-between items-center p-4 border-b border-subtle-border shrink-0">
        <h1 className="text-2xl font-bold text-light-text">Aviator</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold">$1,234.56</span>
          <div className="w-10 h-10 rounded-full bg-muted-surface" />
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden">
        <main className="flex-grow flex flex-col p-4 gap-4">
          <GameHistory history={mockHistory} />
          <div className="flex-grow rounded-lg overflow-hidden border border-subtle-border bg-card-dark">
            <GameCanvas
              multiplier={multiplier}
              planePosition={planePosition}
              status={status}
            />
          </div>
          <BetControls
            onBet={handlePlaceBet}
            onCashOut={handleCashOut}
            status={status}
            balance={1234.56}
          />
        </main>

        <aside className="w-full max-w-sm border-l border-subtle-border flex flex-col">
          <Chat
            tabs={['All', 'Bets']}
            messages={mockMessages}
            onSend={handleSendMessage}
          />
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;

