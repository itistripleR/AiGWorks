import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    free: {
      type: Number,
      default: 10
    },
    paid: {
      type: Number,
      default: 0
    }
  },
  lastFreeCredit: {
    type: Date,
    default: Date.now
  },
  unusedDays: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Method to add tokens
tokenSchema.methods.addTokens = async function(amount, type = 'paid') {
  this.balance[type] += amount;
  return this.save();
};

// Method to use tokens
tokenSchema.methods.useTokens = async function(amount) {
  if (this.balance.free + this.balance.paid < amount) {
    throw new Error('Insufficient tokens');
  }

  // Use free tokens first
  if (this.balance.free >= amount) {
    this.balance.free -= amount;
  } else {
    const remainingAmount = amount - this.balance.free;
    this.balance.free = 0;
    this.balance.paid -= remainingAmount;
  }

  return this.save();
};

export const Token = mongoose.model('Token', tokenSchema);