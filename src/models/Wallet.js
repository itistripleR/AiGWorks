import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  network: {
    type: String,
    enum: ['ethereum', 'polygon'],
    default: 'ethereum'
  },
  balance: {
    type: String,
    default: '0'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

walletSchema.methods.updateBalance = async function(newBalance) {
  this.balance = newBalance;
  this.lastUpdated = new Date();
  return this.save();
};

export const Wallet = mongoose.model('Wallet', walletSchema);