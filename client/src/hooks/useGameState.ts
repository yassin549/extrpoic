import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import type { GameEvent } from '../lib/ws-protocol';

type GameStatus = 'idle' | 'connecting' | 'open' | 'freeze' | 'running' | 'crashed' | 'settling';

interface GameState {
  status: GameStatus;
  roundId?: number;
  serverSeedHash?: string;
  currentMultiplier: number;
  crashMultiplier?: number;
  serverSeed?: string;
}

export const useGameState = () => {
  const { lastMessage, isConnected } = useWebSocket<GameEvent>({ reconnect: true });
  const [gameState, setGameState] = useState<GameState>({ status: 'idle', currentMultiplier: 1.00 });

  useEffect(() => {
    if (!isConnected) {
      setGameState(prev => ({ ...prev, status: 'connecting' }));
    }
  }, [isConnected]);

  useEffect(() => {
    if (lastMessage) {
      switch (lastMessage.event) {
        case 'round.open':
          setGameState({
            status: 'open',
            roundId: lastMessage.data.roundId,
            serverSeedHash: lastMessage.data.serverSeedHash,
            currentMultiplier: 1.00,
          });
          break;
        case 'round.tick':
          setGameState(prev => ({ ...prev, status: 'running', currentMultiplier: lastMessage.data.multiplier }));
          break;
        case 'round.crash':
          setGameState(prev => ({
            ...prev,
            status: 'crashed',
            crashMultiplier: lastMessage.data.crashMultiplier,
            serverSeed: lastMessage.data.serverSeed,
          }));
          // Transition to settling/idle after a delay
          setTimeout(() => setGameState(prev => ({ ...prev, status: 'settling' })), 2000);
          break;
      }
    }
  }, [lastMessage]);

  return { gameState, isConnected };
};
