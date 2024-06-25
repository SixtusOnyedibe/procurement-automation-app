import { Router } from 'express';
import orderRouter from './orders.route';

const router = Router();

// routing to other routes
router.use('/auth', orderRouter);

export default router;
