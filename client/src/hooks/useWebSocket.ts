import { useState, useEffect, useRef } from 'react';

interface WebSocketOptions {
  reconnect?: boolean;
  backoff?: (attempt: number) => number;
}

const defaultBackoff = (attempt: number) => Math.min(1000 * Math.pow(2, attempt), 30000);

export const useWebSocket = <T,>(url: string, options: WebSocketOptions = {}) => {
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempt = useRef(0);

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(url);

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
        ws.current?.close();
      };
    };

    connect();

    return () => {
      ws.current?.close();
    };
  }, [url, options.reconnect, options.backoff]);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { lastMessage, isConnected, sendMessage };
};
