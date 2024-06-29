import { Router } from 'express';
import {
  getOrderById,
  getAllOrders,
  createOrder,
  updateOrderById,
  deleteOrderById,
} from '../controllers/orders.controller.js';

const orderRouter = Router();

orderRouter.route('/').get(getAllOrders).post(createOrder);

orderRouter
  .route('/:id')
  .get(getOrderById)
  .put(updateOrderById)
  .delete(deleteOrderById);

export default orderRouter;
