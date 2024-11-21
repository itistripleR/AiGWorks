import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'usage', 'reward', 'conversion'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tokenType: {
    type: String,
    enum: ['free', 'paid'],
    required: true
  },
  cryptoDetails: {
    currency: String,
    amount: Number,
    txHash: String
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.model('Transaction', transactionSchema);