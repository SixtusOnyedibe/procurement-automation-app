import { Router } from 'express';
import orderRouter from './orders.route.js';

const router = Router();

// routing to other routes
router.use('/orders', orderRouter);

export default router;
