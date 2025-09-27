import React, { useRef, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';

const AviatorCanvas: React.FC = () => {
  const { gameState, isConnected } = useGameState();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // This effect will handle the drawing on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Animation loop using requestAnimationFrame
    let animationFrameId: number;
    const render = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set styles for text
      context.fillStyle = '#FFFFFF'; // White text
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      if (!isConnected) {
        context.font = '30px Inter, sans-serif';
        context.fillText('Connecting...', canvas.width / 2, canvas.height / 2);
      } else {
        // Display the current multiplier
        context.font = 'bold 80px Inter, sans-serif';
        context.fillStyle = gameState.status === 'crashed' ? '#FF5555' : '#4C6FFF'; // Red on crash, blue otherwise
        context.fillText(`${gameState.currentMultiplier.toFixed(2)}x`, canvas.width / 2, canvas.height / 2);

        // Display game status text
        context.font = '20px Inter, sans-serif';
        context.fillStyle = '#AAAAAA';
        let statusText = '';
        if (gameState.status === 'open') statusText = 'Place your bets...';
        if (gameState.status === 'crashed') statusText = `Crashed @ ${gameState.crashMultiplier?.toFixed(2)}x`;
        context.fillText(statusText, canvas.width / 2, canvas.height / 2 + 60);
      }

      // TODO: Add the animated multiplier curve drawing logic here

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, isConnected]);

  return (
    <div className="w-full h-full bg-[#06060A] rounded-2xl">
      <canvas ref={canvasRef} width={800} height={600} className="w-full h-full" />
    </div>
  );
};

export default AviatorCanvas;
