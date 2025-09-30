// aviator-engine.stub.js
// A deterministic simulator for UI development.

class AviatorEngineStub {
  constructor() {
    this.listeners = new Map();
    this.multiplier = 1.00;
    this.roundState = 'idle'; // idle, betting, flying, crashed
    this.roundInterval = null;
    this.betWindowTimeout = null;
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  startRound() {
    if (this.roundState !== 'idle') return;

    console.log('[STUB] Starting new round...');
    this.roundState = 'betting';
    this.emit('betting_start', { duration: 6000 });

    this.betWindowTimeout = setTimeout(() => {
      this.roundState = 'flying';
      this.multiplier = 1.00;
      console.log('[STUB] Betting window closed. Flight started.');
      this.emit('round_start');

      const crashPoint = 1 + Math.random() * 9; // Crash between 1x and 10x

      this.roundInterval = setInterval(() => {
        if (this.multiplier >= crashPoint) {
          this.roundState = 'crashed';
          clearInterval(this.roundInterval);
          console.log(`[STUB] Crashed at ${this.multiplier.toFixed(2)}x`);
          this.emit('round_end', { multiplier: this.multiplier });
          setTimeout(() => {
            this.roundState = 'idle';
            console.log('[STUB] Round reset.');
          }, 3000);
        } else {
          this.multiplier += 0.05;
          this.emit('tick', { multiplier: parseFloat(this.multiplier.toFixed(2)) });
        }
      }, 100);
    }, 6000);
  }

  placeBet(bet) {
    if (this.roundState !== 'betting') {
      console.warn('[STUB] Bet rejected: betting window is closed.');
      return false;
    }
    console.log(`[STUB] Bet placed:`, bet);
    this.emit('bet_placed', { ...bet, status: 'success' });
    return true;
  }

  cashOut() {
    if (this.roundState !== 'flying') {
      console.warn('[STUB] Cash out failed: round not in progress.');
      return false;
    }
    console.log(`[STUB] Cashed out at ${this.multiplier.toFixed(2)}x`);
    this.emit('cashed_out', { multiplier: this.multiplier, status: 'success' });
    // In a real scenario, you'd stop this user's bet logic here.
    return true;
  }
}

// Export a singleton instance
export const aviatorEngine = new AviatorEngineStub();
