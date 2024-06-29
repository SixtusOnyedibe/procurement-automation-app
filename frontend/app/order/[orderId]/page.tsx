'use client';

import Link from 'next/link';
import styled from 'styled-components';

export default function OrderPage() {
  const data = {
    customerId: '75456',
    email: 'newOrder@gmail.com',
    name: 'Create new order',
    orders: [
      {
        orderId: '1719525139662',
        orderDate: '2024-06-27T21:52:19.662Z',
        orderStatus: 'pending',
        product: {
          productId: '987654',
          name: 'Widget A',
          description: 'A useful widget',
          price: 19.99,
          quantity: 2,
          category: 'Widgets',
        },
        paymentMethod: 'Paypal',
        totalAmount: 39.98,
      },
      {
        orderId: '1719525142890',
        orderDate: '2024-06-27T21:52:22.890Z',
        orderStatus: 'pending',
        product: {
          productId: '987654',
          name: 'Widget A',
          description: 'A useful widget',
          price: 19.99,
          quantity: 2,
          category: 'Widgets',
        },
        paymentMethod: 'Paypal',
        totalAmount: 39.98,
      },
      {
        orderId: '1719525143823',
        orderDate: '2024-06-27T21:52:23.823Z',
        orderStatus: 'pending',
        product: {
          productId: '987654',
          name: 'Widget A',
          description: 'A useful widget',
          price: 19.99,
          quantity: 2,
          category: 'Widgets',
        },
        paymentMethod: 'Paypal',
        totalAmount: 39.98,
      },
    ],
  };
  return (
    <MainWrapper>
      <div className='order-id'>
        <h1>Order - {data.orders[0].orderId}</h1>
      </div>
      <div className='order-details'>
        <h2>Order details</h2>
        <h5>Product name - {data.orders[0].product.name}</h5>
        <h5>Product description - {data.orders[0].product.description}</h5>
        <h5>Product price - {data.orders[0].product.price}</h5>
        <h5>Product quantity - {data.orders[0].product.quantity}</h5>
        <h5>Product category - {data.orders[0].product.category}</h5>
        <h5>Total amount - {data.orders[0].totalAmount}</h5>
        <h5>Payment method - {data.orders[0].paymentMethod}</h5>
        <h5>Order status - {data.orders[0].orderStatus}</h5>

        <div className='edit-order'>
          <Link href={`/order/${data.orders[0].orderId}/edit`}>
            <button>
              <h5>Edit order</h5>
            </button>
          </Link>
          <button className='delete-order-btn'>
            <h5>Delete order</h5>
          </button>
        </div>
      </div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding: 120px 50px 50px 250px;
  width: 100%;
  background-color: #f9fafb;
  height: 100vh;

  .order-id {
    height: 70px;
    width: 100%;
    background-color: #ffffff;
    padding: 2rem;
  }

  .order-details {
    padding: 0 2rem;
    height: 100%;
    margin-top: 2rem;
  }

  .edit-order {
    margin-top: 10rem;

    button {
      width: 20rem;
      height: 5rem;
      background-color: #090413;
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      margin-right: 5rem;
    }
    .delete-order-btn {
      width: 20rem;
      height: 5rem;
      background-color: #f2443f;
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      margin-right: 5rem;
    }
  }
`;
