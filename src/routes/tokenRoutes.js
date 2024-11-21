import express from 'express';
import { tokenController } from '../controllers/tokenController.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { z } from 'zod';

const router = express.Router();

const purchaseSchema = z.object({
  amount: z.number().positive(),
  currency: z.enum(['ETH', 'BTC', 'USDC'])
});

const useTokensSchema = z.object({
  amount: z.number().positive()
});

router.use(authenticate);

router.get('/balance', tokenController.getBalance);
router.post('/purchase', validateRequest(purchaseSchema), tokenController.purchaseTokens);
router.post('/use', validateRequest(useTokensSchema), tokenController.useTokens);
router.get('/history', tokenController.getTransactionHistory);

export default router;