import React, { useRef, useEffect, useState } from 'react';
import { useMotion } from '../hooks/useMotion';
import tokens from '../tokens/design-tokens.json';

export interface GameCanvasProps {
  width?: number;
  height?: number;
  multiplier: number;
  planePosition: number; // 0 to 1
  status: 'idle' | 'betting' | 'flying' | 'crashed';
  showGrid?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 450, 
  multiplier, 
  planePosition, 
  status, 
  showGrid = true 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const planeImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/src/assets/icons/plane.svg';
    img.onload = () => planeImage.current = img;
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p0 = { x: 50, y: height - 50 };
    const p1 = { x: 150, y: height - 150 };
    const p2 = { x: width - 250, y: 50 };
    const p3 = { x: width - 50, y: 100 };

    const getPointOnBezier = (t: number) => {
      const c = (p: number) => 1 - p;
      const c2 = (p: number) => c(p) * c(p);
      const c3 = (p: number) => c(p) * c(p) * c(p);
      const t2 = t * t;
      const t3 = t * t * t;

      const x = c3(t) * p0.x + 3 * c2(t) * t * p1.x + 3 * c(t) * t2 * p2.x + t3 * p3.x;
      const y = c3(t) * p0.y + 3 * c2(t) * t * p1.y + 3 * c(t) * t2 * p2.y + t3 * p3.y;
      return { x, y };
    };

        const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (showGrid) { /* ... draw grid ... */ }

      // Draw path
      ctx.strokeStyle = tokens.color['primary-blue'];
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.stroke();

      // Draw plane
      if (planeImage.current && status === 'flying' && !reducedMotion) {
        const { x, y } = getPointOnBezier(planePosition);
        ctx.save();
        ctx.translate(x, y);
        // Simple rotation could be added here
        ctx.drawImage(planeImage.current, -12, -12, 24, 24);
        ctx.restore();
      }

      // Draw multiplier or status text
      // ... (logic from previous version)

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = tokens.color['error-red'];
        ctx.fillRect(p.x, p.y, 5, 5);
      });
      ctx.globalAlpha = 1;
      setParticles(particles.filter(p => p.alpha > 0));
    };

    let animationFrameId: number;
    const renderLoop = () => {
      draw();
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [multiplier, planePosition, status, reducedMotion, width, height, particles]);

  useEffect(() => {
    if (status === 'crashed' && !reducedMotion) {
      const p0 = { x: 50, y: height - 50 };
      const p1 = { x: 150, y: height - 150 };
      const p2 = { x: width - 250, y: 50 };
      const p3 = { x: width - 50, y: 100 };
      const getPointOnBezier = (t: number) => {
        const c = (p: number) => 1 - p;
        const c2 = (p: number) => c(p) * c(p);
        const c3 = (p: number) => c(p) * c(p) * c(p);
        const t2 = t * t;
        const t3 = t * t * t;
        const x = c3(t) * p0.x + 3 * c2(t) * t * p1.x + 3 * c(t) * t2 * p2.x + t3 * p3.x;
        const y = c3(t) * p0.y + 3 * c2(t) * t * p1.y + 3 * c(t) * t2 * p2.y + t3 * p3.y;
        return { x, y };
      };
      const planeCoords = getPointOnBezier(planePosition);
      const newParticles = Array.from({ length: 30 }).map(() => ({
        x: planeCoords.x,
        y: planeCoords.y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        alpha: 1,
      }));
      setParticles(newParticles);
    }
  }, [status, reducedMotion, planePosition, width, height]);

  return (
    <div role="img" aria-label={`Aviator live flight showing multiplier ${multiplier.toFixed(2)}x`} className="relative w-full h-full">
      <canvas ref={canvasRef} width={width} height={height} className="w-full h-full" />
      <div aria-live="polite" className="sr-only">{multiplier.toFixed(2)}x</div>
    </div>
  );
};

export default GameCanvas;

