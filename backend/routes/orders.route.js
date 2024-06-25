import { Router } from 'express';

const orderRouter = Router();

orderRouter.route('/orders').get(getAllOrders).post(postOrder);

orderRouter
  .route('/orders/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

export default orderRouter;
