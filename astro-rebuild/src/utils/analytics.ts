import { track as vercelTrack } from '@vercel/analytics';

export const track = (eventName: string, properties?: Record<string, any>) => {
  // Only track in production, or let Vercel handle it. We'll just pass it through.
  vercelTrack(eventName, properties);
};
