import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { z } from 'zod';
import { Wallet } from '../models/Wallet.js';
import { CryptoService } from '../services/cryptoService.js';

const router = express.Router();

const createWalletSchema = z.object({
  network: z.enum(['ethereum', 'polygon']).default('ethereum')
});

router.use(authenticate);

router.post('/create', validateRequest(createWalletSchema), async (req, res) => {
  try {
    const cryptoService = new CryptoService();
    const wallet = await Wallet.create({
      userId: req.user.id,
      network: req.body.network,
      address: `0x${Math.random().toString(16).substr(2, 40)}` // Replace with actual wallet creation
    });
    
    res.json({ wallet });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const cryptoService = new CryptoService();
    const balance = await cryptoService.getBalance(wallet.address);
    
    await wallet.updateBalance(balance.toString());
    
    res.json({ balance: wallet.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;