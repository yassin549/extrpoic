import React, { useState, useEffect } from 'react';
import tokens from '../tokens/design-tokens.json';
import GameCanvas from '../components/GameCanvas';
import BetBox from '../components/BetBox';
import Chat from '../components/Chat';
import { aviatorEngine } from '../lib/aviator-engine.stub.js';

const AviatorGame: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.00);
  const [gameStatus, setGameStatus] = useState<'idle' | 'betting' | 'flying' | 'crashed'>('idle');
  const [hasActiveBet, setHasActiveBet] = useState(false);

  useEffect(() => {
    aviatorEngine.on('tick', ({ multiplier }) => {
      setMultiplier(multiplier);
      setGameStatus('flying');
    });

    aviatorEngine.on('betting_start', () => {
      setGameStatus('betting');
      setHasActiveBet(false); // Reset for new round
    });

    aviatorEngine.on('round_end', () => {
      setGameStatus('crashed');
    });

    // Start the game loop
    const gameLoop = setInterval(() => {
      if (gameStatus === 'idle' || gameStatus === 'crashed') {
        aviatorEngine.startRound();
      }
    }, 8000); // Start new round 8s after crash

    return () => clearInterval(gameLoop);
  }, [gameStatus]);

  const handlePlaceBet = (amount: number, autoCashout?: number) => {
    const success = aviatorEngine.placeBet({ amount, autoCashout });
    if (success) {
      setHasActiveBet(true);
    }
  };

  const handleCashOut = () => {
    const success = aviatorEngine.cashOut();
    if (success) {
      setHasActiveBet(false);
    }
  };

  return (
    <div style={{ background: tokens.color['bg-dark'], minHeight: '100vh', padding: tokens.spacing['space-4'] }}>
      <div style={{ display: 'grid', gridTemplateColumns: '40% 35% 25%', gap: tokens.spacing['space-4'], maxWidth: '1320px', margin: '0 auto', height: 'calc(100vh - 32px)' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['space-4'] }}>
          <div style={{ flexGrow: 1, background: tokens.color['card-dark'], borderRadius: tokens.radius['radius-md'], border: `1px solid ${tokens.color['subtle-border']}` }}>
            <GameCanvas multiplier={multiplier} status={gameStatus} />
          </div>
          <BetBox gameStatus={gameStatus} hasActiveBet={hasActiveBet} onPlaceBet={handlePlaceBet} onCashOut={handleCashOut} />
        </div>

        {/* Middle Column */}
        <div style={{ background: tokens.color['card-dark'], borderRadius: tokens.radius['radius-md'], padding: tokens.spacing['space-3'], border: `1px solid ${tokens.color['subtle-border']}` }}>
          <h3 style={{ color: 'white' }}>Round History</h3>
          {/* History items would go here */}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['space-4'] }}>
          <div style={{ flexGrow: 1 }}>
            <Chat />
          </div>
          <div style={{ height: '150px', background: tokens.color['card-dark'], borderRadius: tokens.radius['radius-md'], padding: tokens.spacing['space-3'], border: `1px solid ${tokens.color['subtle-border']}` }}>
            <h3 style={{ color: 'white' }}>Wallet</h3>
            {/* Wallet mini component would go here */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AviatorGame;
