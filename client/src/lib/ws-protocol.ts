// Defines the structure of messages sent over the WebSocket connection

export type GameEvent =
  | { event: 'round.open'; data: RoundOpenData }
  | { event: 'round.tick'; data: RoundTickData }
  | { event: 'round.crash'; data: RoundCrashData }
  | { event: 'bet.placed'; data: BetPlacedData }
  | { event: 'bet.settled'; data: BetSettledData }
  | { event: 'balance.update'; data: BalanceUpdateData };

export interface RoundOpenData {
  roundId: number;
  serverSeedHash: string;
  timeToFreeze: number;
}

export interface RoundTickData {
  multiplier: number;
}

export interface RoundCrashData {
  crashMultiplier: number;
  serverSeed: string;
}

export interface BetPlacedData {
  userId: string;
  amount: number;
}

export interface BetSettledData {
  betId: string;
  payout: number;
}

export interface BalanceUpdateData {
  currency: string;
  newBalance: number;
}
