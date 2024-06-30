'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import userStore from '../../lib/store';
import useOrder from '../../hooks/use-order';
import { Order } from '../../types/order.type';

export default function PurchaseDetails() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { user } = userStore((state) => state);

  const { fetchOrders } = useOrder();

  useEffect(() => {
    const fetchedOrders = async () => {
      if (user) {
        const data = await fetchOrders();
        if (data) setOrders(data);
      }
    };
    fetchedOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <MainWrapper>
      {user && orders ? (
        <div className='order-container'>
          <ul className='orders-row'>
            <p className='order-id'>Order ID</p>
            <p className='item-name'>Item name</p>
            <p className='order-quantity'>Quantity</p>
            <p className='total-amount'>Total amount</p>
            <p className='order-status'>status</p>
          </ul>
          {orders.map((order) => (
            <div className='order-wrapper' key={order.orderId}>
              <hr />
              <Link href={`/order/${order.orderId}`}>
                <ul className='orders-row orders'>
                  <p className='order-id'>{order.orderId}</p>
                  <p className='item-name'>{order.product.productname}</p>
                  <p className='order-quantity'>{order.product.quantity}</p>
                  <p className='total-amount'>{order.totalamount}</p>
                  <p className='order-status'>{order.orderStatus}</p>
                </ul>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className='not-logged-in'>
          <h1>Login to view your orders</h1>
          <p>For testings, user</p>
          <p>Email: testuser@gmail.com</p>
        </div>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding: 120px 50px 50px 250px;
  width: 100%;

  .order-container {
    min-height: 80vh;
    border: 2px solid black;
    padding: 2rem;
    width: 100%;
  }

  hr {
    width: 100%;
    border: 1px solid black;
  }
  .orders-row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr repeat(3, 1fr);
    padding: 0 2rem;
    padding-bottom: 1.5rem;
    color: black;
  }

  .orders {
    padding: 1.5rem 2rem;
  }

  .total-amount,
  .order-status,
  .order-quantity {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    /* Phone view */
    padding: 8rem 2rem;

    p {
      font-size: 1.4rem;
    }

    .orders-row {
      grid-template-columns: 1fr 1fr;

      .order-id,
      .order-quantity,
      .order-status {
        display: none;
      }
    }
  }
`;
