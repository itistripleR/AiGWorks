import { TokenService } from '../services/tokenService.js';
import { CryptoService } from '../services/cryptoService.js';

export const tokenController = {
  async getBalance(req, res) {
    try {
      const balance = await TokenService.getBalance(req.user.id);
      res.json({ balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async purchaseTokens(req, res) {
    try {
      const { amount, currency } = req.body;
      const cryptoService = new CryptoService();
      
      // Process crypto payment
      const payment = await cryptoService.processPayment(req.user.id, amount, currency);
      
      // Add tokens to user's balance
      const balance = await TokenService.addTokens(req.user.id, amount, 'paid');
      
      res.json({ balance, transaction: payment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async useTokens(req, res) {
    try {
      const { amount } = req.body;
      const balance = await TokenService.useTokens(req.user.id, amount);
      res.json({ balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getTransactionHistory(req, res) {
    try {
      const transactions = await Transaction.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .limit(20);
      res.json({ transactions });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};