'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';
import userStore from '../../../lib/store';
import { useRouter } from 'next/navigation';

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

export default function OrderPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { user } = userStore((state) => state);
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    const customerid = user?.customerid;

    async function fetchOrder() {
      await axios
        .get(`http://127.0.0.1:3001/api/orders/${orderId}`, {
          params: {
            customerid: customerid,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setOrder(res.data.order);
          } else {
            toast(res.data.message);
          }
        })
        .catch((error) => toast(error.response.data.message));
    }
    if (user) fetchOrder();
  }, [user, orderId]);

  const handleDeleteOrder = async () => {
    await axios
      .delete(`http://127.0.0.1:3001/api/orders/${orderId}`, {
        params: {
          customerid: user?.customerid,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // setOrder(res.data.order);
          router.push('/dashboard');
        } else {
          toast(res.data.message);
        }
      })
      .catch((error) => toast(error.response.data.message));
  };

  return (
    <MainWrapper>
      {order && (
        <>
          <div className='order-id'>
            <h1>Order - {order.orderId}</h1>
          </div>
          <div className='order-details'>
            <h2>Order details</h2>
            <h5>Product name - {order.product.productname}</h5>
            <h5>Product description - {order.product.description}</h5>
            <h5>Product price - {order.product.price}</h5>
            <h5>Product quantity - {order.product.quantity}</h5>
            <h5>Product category - {order.product.category}</h5>
            <h5>Total amount - {order.totalamount}</h5>
            <h5>Payment method - {order.paymentmethod}</h5>
            <h5>Order status - {order.orderStatus}</h5>

            <div className='edit-order'>
              <Link href={`/order/${order.orderId}/edit`}>
                <button>
                  <h5>Edit order</h5>
                </button>
              </Link>
              <button className='delete-order-btn' onClick={handleDeleteOrder}>
                <h5>Delete order</h5>
              </button>
            </div>
          </div>
        </>
      )}
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
