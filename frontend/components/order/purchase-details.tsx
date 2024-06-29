'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import userStore from '../../lib/store';

interface Product {
  productid: string;
  productname: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  product: Product;
  paymentmethod: string;
  totalamount: number;
}

export default function PurchaseDetails() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { user } = userStore((state) => state);

  useEffect(() => {
    async function fetchOrder() {
      const userEmail = user?.email;
      await axios
        .get('http://localhost:3001/api/orders', {
          params: {
            email: userEmail,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
          } else {
            toast(res.data.message);
          }
        })
        .catch((error) => toast(error.response.data.message));
    }
    if (user) fetchOrder();
  }, [user]);

  return (
    <MainWrapper>
      {orders ? (
        <div className='order-container'>
          <ul className='orders-row'>
            <p>Order ID</p>
            <p>Item name</p>
            <p className='order-quantity'>Quantity</p>
            <p className='total-amount'>Total amount</p>
            <p className='order-status'>status</p>
          </ul>
          {orders.map((order) => (
            <div className='order-wrapper' key={order.orderId}>
              <hr />
              <Link href={`/order/${order.orderId}`}>
                <ul className='orders-row orders'>
                  <p>{order.orderId}</p>
                  <p>{order.product.productname}</p>
                  <p className='order-quantity'>{order.product.quantity}</p>
                  <p className='total-amount'>{order.totalamount}</p>
                  <p className='order-status'>{order.orderStatus}</p>
                </ul>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
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
`;
