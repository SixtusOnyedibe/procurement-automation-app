import { Router } from 'express';
import orderRouter from './orders.route.js';
import authRouter from './auth.route.js';

const router = Router();

// routing to other routes
router.use('/orders', orderRouter);
router.use('/auth', authRouter);

export default router;
