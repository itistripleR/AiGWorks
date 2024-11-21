import { setupWebSocket } from './websocket.js';

export class NotificationService {
  static async notify(userId, event, data) {
    try {
      const ws = setupWebSocket(global.io);
      ws.notifyUser(userId, event, data);
    } catch (error) {
      console.error('Notification error:', error);
    }
  }
}