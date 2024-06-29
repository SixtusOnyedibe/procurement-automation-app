import request from 'supertest';
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} from '../controllers/order.controller.js';
import { readOrders, writeOrders } from '../services/db.service.js';

jest.mock('../services/db.service.js'); // Mock the db.service.js module

const app = express();
app.use(express.json());

app.get('/api/orders', getAllOrders);
app.get('/api/orders/:id', getOrderById);
app.post('/api/orders', createOrder);
app.put('/api/orders/:id', updateOrderById);
app.delete('/api/orders/:id', deleteOrderById);

describe('Order Routes', () => {
  beforeEach(() => {
    // Clear the mock calls and instances
    jest.clearAllMocks();
  });

  it('should get all orders', async () => {
    readOrders.mockReturnValue({
      users: [
        {
          customerId: '12345',
          name: 'John Doe',
          email: 'john@example.com',
          orders: [],
        },
      ],
    });

    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Orders found!');
    expect(res.body.orders).toBeDefined();
  });

  it('should get an order by ID', async () => {
    readOrders.mockReturnValue({
      users: [
        {
          customerId: '12345',
          name: 'John Doe',
          email: 'john@example.com',
          orders: [
            {
              orderId: '1',
              orderDate: '2024-06-27T14:53:00Z',
              orderStatus: 'pending',
              products: [],
              paymentMethod: 'credit card',
              totalAmount: 100,
            },
          ],
        },
      ],
    });

    const res = await request(app)
      .get('/api/orders/1')
      .send({ customerId: '12345' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Order found!');
    expect(res.body.order).toBeDefined();
    expect(res.body.order.orderId).toBe('1');
  });

  it('should create a new order', async () => {
    readOrders.mockReturnValue({ users: [] });
    writeOrders.mockReturnValue();

    const newOrder = {
      customerId: '12345',
      name: 'John Doe',
      email: 'john@example.com',
      products: [
        {
          productId: '1',
          name: 'Product A',
          price: 50,
          quantity: 2,
          category: 'Category A',
        },
      ],
      paymentMethod: 'credit card',
      totalAmount: 100,
    };

    const res = await request(app).post('/api/orders').send(newOrder);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Order created successfully');
    expect(res.body.order).toBeDefined();
  });

  it('should update an existing order by ID', async () => {
    readOrders.mockReturnValue({
      users: [
        {
          customerId: '12345',
          name: 'John Doe',
          email: 'john@example.com',
          orders: [
            {
              orderId: '1',
              orderDate: '2024-06-27T14:53:00Z',
              orderStatus: 'pending',
              products: [],
              paymentMethod: 'credit card',
              totalAmount: 100,
            },
          ],
        },
      ],
    });
    writeOrders.mockReturnValue();

    const updatedOrder = {
      customerId: '12345',
      orderStatus: 'shipped',
    };

    const res = await request(app).put('/api/orders/1').send(updatedOrder);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Order updated successfully!');
  });

  it('should delete an order by ID', async () => {
    readOrders.mockReturnValue({
      users: [
        {
          customerId: '12345',
          name: 'John Doe',
          email: 'john@example.com',
          orders: [
            {
              orderId: '1',
              orderDate: '2024-06-27T14:53:00Z',
              orderStatus: 'pending',
              products: [],
              paymentMethod: 'credit card',
              totalAmount: 100,
            },
          ],
        },
      ],
    });
    writeOrders.mockReturnValue();

    const res = await request(app)
      .delete('/api/orders/1')
      .send({ customerId: '12345' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Order deleted successfully');
  });
});
