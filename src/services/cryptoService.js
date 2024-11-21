import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { Transaction } from '../models/Transaction.js';

export class CryptoService {
  constructor() {
    this.publicClient = createPublicClient({
      chain: mainnet,
      transport: http(process.env.ETH_NODE_URL)
    });
  }

  async getBalance(address) {
    try {
      const balance = await this.publicClient.getBalance({ address });
      return balance;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error('Failed to get wallet balance');
    }
  }

  async processPayment(userId, amount, currency) {
    try {
      // Create transaction record
      const transaction = await Transaction.create({
        userId,
        type: 'purchase',
        amount,
        tokenType: 'paid',
        cryptoDetails: {
          currency,
          amount
        },
        status: 'pending'
      });

      // Process payment through Coinbase Commerce
      const paymentResult = await this.processPaymentWithCoinbase(amount, currency);

      // Update transaction status
      transaction.status = 'completed';
      transaction.cryptoDetails.txHash = paymentResult.txHash;
      await transaction.save();

      return transaction;
    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('Payment processing failed');
    }
  }

  async processPaymentWithCoinbase(amount, currency) {
    // Placeholder for Coinbase Commerce integration
    // In production, implement actual Coinbase Commerce API calls
    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`
    };
  }
}