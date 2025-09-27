import React, { useState, useEffect } from 'react';
import './GameClient.css';

const GameClient = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isRunning, setIsRunning] = useState(false);
  const [latency, setLatency] = useState(0);
  const [cashOut, setCashOut] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const animation = requestAnimationFrame(() => {
        setMultiplier((prev) => prev + 0.01);
      });

      return () => cancelAnimationFrame(animation);
    }
  }, [isRunning, multiplier]);

  const handleCashOut = () => {
    if (latency < 100) { // Example latency threshold
      setCashOut(true);
      setIsRunning(false);
      // Logic to handle cashout
    } else {
      alert('High latency — cashouts may fail');
    }
  };

  const startGame = () => {
    setIsRunning(true);
    setMultiplier(1.0);
    setCashOut(false);
  };

  return (
    <div className="game-client">
      <h1>Aviator Game</h1>
      <div className="multiplier-display">
        x{multiplier.toFixed(2)}
      </div>
      <button 
        className={`cashout-button ${latency > 100 ? 'disabled' : ''}`} 
        onClick={handleCashOut}
        disabled={latency > 100 || cashOut}
      >
        CASH OUT
      </button>
      <button onClick={startGame} disabled={isRunning}>
        Start Game
      </button>
    </div>
  );
};

export default GameClient;
