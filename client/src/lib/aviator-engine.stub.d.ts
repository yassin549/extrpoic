// c:/Users/khoua/OneDrive/Desktop/extropic/client/src/lib/aviator-engine.stub.d.ts
declare module './aviator-engine.stub.js' {
  type AviatorEvent = 'tick' | 'betting_start' | 'round_start' | 'round_end' | 'bet_placed' | 'cashed_out';

  interface TickPayload {
    multiplier: number;
  }

  interface BettingStartPayload {
    duration: number;
  }

  interface RoundEndPayload {
    multiplier: number;
  }

  interface Bet {
    amount: number;
    autoCashout?: number;
  }

  class AviatorEngineStub {
    on(event: 'tick', callback: (payload: TickPayload) => void): void;
    on(event: 'betting_start', callback: (payload: BettingStartPayload) => void): void;
    on(event: 'round_start', callback: () => void): void;
    on(event: 'round_end', callback: (payload: RoundEndPayload) => void): void;
    on(event: 'bet_placed', callback: (payload: Bet & { status: 'success' }) => void): void;
    on(event: 'cashed_out', callback: (payload: { multiplier: number; status: 'success' }) => void): void;

    startRound(): void;
    placeBet(bet: Bet): boolean;
    cashOut(): boolean;
  }

  export const aviatorEngine: AviatorEngineStub;
}
