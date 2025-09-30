import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// This is a JS file, so we need to import the class from the JS file.
// Vitest can handle this mixed environment.
const AviatorEngineStub = require('./aviator-engine.stub.js');

describe('AviatorEngineStub', () => {
  let engine;

  beforeEach(() => {
    engine = new AviatorEngineStub();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should transition from idle -> betting -> flying -> crashed', () => {
    const roundStartCallback = vi.fn();
    const bettingStartCallback = vi.fn();
    const crashCallback = vi.fn();

    engine.on('round_start', roundStartCallback);
    engine.on('betting_start', bettingStartCallback);
    engine.on('crash', crashCallback);

    // Mock Math.random to get a predictable crash point (e.g., 2.5x)
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.15; // 1 + 0.15 * 9 = 2.35
    global.Math = mockMath;

    engine.startRound();

    expect(engine.roundState).toBe('betting');
    expect(bettingStartCallback).toHaveBeenCalled();

    // Fast-forward past the betting window
    vi.advanceTimersByTime(6000);

    expect(engine.roundState).toBe('flying');
    expect(roundStartCallback).toHaveBeenCalled();

    // Fast-forward to the crash point
    vi.advanceTimersByTime(2000); // Should be enough time to crash

    expect(engine.roundState).toBe('crashed');
    expect(crashCallback).toHaveBeenCalledWith({ multiplier: expect.any(Number) });
    expect(crashCallback.mock.calls[0][0].multiplier).toBeCloseTo(2.35);
  });
});
