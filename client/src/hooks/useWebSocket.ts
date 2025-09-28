import { useState, useEffect, useRef } from 'react';

// --- Dynamic URL Generation ---
const getWebSocketURL = () => {
  if (import.meta.env.DEV) {
    // In development, use the explicitly set localhost URL for the backend.
    return import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
  }
  // In production, derive the WebSocket URL from the current page's location.
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const WS_URL = getWebSocketURL();

// --- WebSocket Hook ---

interface WebSocketOptions {
  reconnect?: boolean;
  backoff?: (attempt: number) => number;
}

const defaultBackoff = (attempt: number) => Math.min(1000 * Math.pow(2, attempt), 30000);

export const useWebSocket = <T,>(options: WebSocketOptions = {}) => {
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempt = useRef(0);

  useEffect(() => {
    const connect = () => {
      console.log(`Connecting to WebSocket at ${WS_URL}...`);
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempt.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as T;
          setLastMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        if (options.reconnect) {
          const delay = (options.backoff || defaultBackoff)(reconnectAttempt.current);
          console.log(`Attempting to reconnect in ${delay}ms...`);
          setTimeout(connect, delay);
          reconnectAttempt.current++;
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.current?.close(); // This will trigger onclose and the reconnect logic
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, [options.reconnect, options.backoff]);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { lastMessage, isConnected, sendMessage };
};
