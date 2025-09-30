// A simple analytics helper for batching events

interface AnalyticsEvent {
  name: string;
  payload: Record<string, any>;
}

let eventQueue: AnalyticsEvent[] = [];
let flushTimeout: number | null = null;

const flushEvents = () => {
  if (eventQueue.length === 0) return;

  // In a real implementation, this would be a fetch POST to /analytics/batch
  console.log('Flushing analytics events:', eventQueue);

  // fetch('/analytics/batch', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(eventQueue),
  // }).catch(err => {
  //   // If it fails, add events back to the queue or use localStorage
  //   console.error('Failed to flush analytics events:', err);
  // });

  eventQueue = [];
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
};

export const trackEvent = (name: string, payload: Record<string, any>) => {
  const event: AnalyticsEvent = {
    name,
    payload: {
      timestamp: new Date().toISOString(),
      // In a real app, these would be populated from a user store/session
      userId: 'user-123',
      sessionId: 'session-abc',
      anonId: 'anon-xyz',
      env: 'development',
      ...payload,
    },
  };

  eventQueue.push(event);

  if (!flushTimeout) {
    flushTimeout = window.setTimeout(flushEvents, 3000); // Flush every 3 seconds
  }

  if (eventQueue.length >= 10) {
    flushEvents(); // Or flush when the queue is full
  }
};
