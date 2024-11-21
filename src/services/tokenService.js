import { Token } from '../models/Token.js';
import { Transaction } from '../models/Transaction.js';
import { NotificationService } from './notificationService.js';

export class TokenService {
  static async getBalance(userId) {
    const token = await Token.findOne({ userId });
    if (!token) {
      throw new Error('Token record not found');
    }
    return token.balance;
  }

  static async addTokens(userId, amount, type = 'paid') {
    const token = await Token.findOne({ userId });
    if (!token) {
      throw new Error('Token record not found');
    }

    await token.addTokens(amount, type);
    
    // Create transaction record
    await Transaction.create({
      userId,
      type: 'purchase',
      amount,
      tokenType: type,
      status: 'completed'
    });

    // Notify user
    await NotificationService.notify(userId, 'tokens_added', {
      amount,
      type,
      newBalance: token.balance[type]
    });

    return token.balance;
  }

  static async useTokens(userId, amount) {
    const token = await Token.findOne({ userId });
    if (!token) {
      throw new Error('Token record not found');
    }

    await token.useTokens(amount);

    // Create transaction record
    await Transaction.create({
      userId,
      type: 'usage',
      amount,
      tokenType: token.balance.free > 0 ? 'free' : 'paid',
      status: 'completed'
    });

    return token.balance;
  }

  static async distributeFreeTokens() {
    const tokens = await Token.find({
      'balance.free': 0,
      unusedDays: { $lt: 3 } // Only distribute if unused for less than 3 days
    });

    for (const token of tokens) {
      token.balance.free = 10;
      token.lastFreeCredit = new Date();
      await token.save();

      await NotificationService.notify(token.userId, 'free_tokens_added', {
        amount: 10
      });
    }
  }
}