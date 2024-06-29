import { Router } from 'express';
import { userLogin } from '../controllers/orders.controller.js';

const authRouter = Router();

authRouter.route('/login').post(userLogin);

export default authRouter;
