# Simulator to Production Migration Guide

This guide explains how to replace the `aviator-engine.stub.js` with a live WebSocket backend.

The UI is designed to work with an event-emitter interface. The `AviatorGame.tsx` page currently uses the stub like this:

```javascript
const engine = new AviatorEngineStub();

useEffect(() => {
  engine.on('event_name', (data) => {
    // update state
  });

  // ...
}, []);
```

To migrate, you need to create a new `AviatorEngine` class that connects to your WebSocket server and emits the same events with the same payload shapes.

## 1. Create `AviatorEngine.js`

Create a new file `src/lib/aviator-engine.js` that will handle the WebSocket connection.

```javascript
// src/lib/aviator-engine.js
import { io } from 'socket.io-client'; // or your preferred WebSocket client

class AviatorEngine {
  constructor() {
    this.socket = io('wss://your-backend-url.com');
    this.listeners = new Map();

    this.socket.on('connect', () => console.log('Connected to game server.'));

    // Map backend events to frontend events
    this.socket.on('round:start', (data) => this.emit('round_start', data));
    this.socket.on('round:tick', (data) => this.emit('tick', data));
    this.socket.on('round:end', (data) => this.emit('crash', data));
    this.socket.on('betting:start', (data) => this.emit('betting_start', data));
    this.socket.on('bet:success', (data) => this.emit('bet_success', data));
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

  // Methods to send events to the server
  placeBet(amount, autoCashout) {
    this.socket.emit('bet:place', { amount, autoCashout });
  }

  cashOut() {
    this.socket.emit('bet:cashout');
  }
}

export default AviatorEngine;
```

## 2. Update `AviatorGame.tsx`

In `src/pages/AviatorGame.tsx`, change the import from the stub to the new production engine.

```javascript
// From
// import engine from '../lib/aviator-engine.stub.js';

// To
import AviatorEngine from '../lib/aviator-engine.js';
const engine = new AviatorEngine();
```

## Expected WebSocket Events

The UI expects the backend to emit the following events:

-   **`betting:start`**: `{ duration: number }` - Signals the start of the betting window.
-   **`round:start`**: `{}` - Signals the betting window is closed and the plane is taking off.
-   **`tick`**: `{ multiplier: number }` - Frequent update of the current game multiplier.
-   **`crash`**: `{ multiplier: number }` - Signals the end of the round.
-   **`bet_success`**: `{}` - Acknowledges that the user's bet was successfully placed.
