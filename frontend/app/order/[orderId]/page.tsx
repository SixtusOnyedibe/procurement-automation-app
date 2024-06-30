'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import userStore from '../../../lib/store';
import useOrder from '../../../hooks/use-order';
import { Order } from '../../../types/order.type';
import { formatter } from '../../..//lib/currency-formatter';

export default function OrderPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { user } = userStore((state) => state);
  const [order, setOrder] = useState<Order | null>(null);

  const { fetchOrder, deleteOrder } = useOrder();

  useEffect(() => {
    const fetchedOrder = async () => {
      if (user) {
        const data = await fetchOrder(orderId);
        if (data) setOrder(data);
      }
    };
    fetchedOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDeleteOrder = async () => {
    deleteOrder(orderId);
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
            <h5>
              Product name -{' '}
              <span className='product-detail-span'>
                {order.product.productname}
              </span>
            </h5>
            <h5>
              Product description -{' '}
              <span className='product-detail-span'>
                {order.product.description}
              </span>
            </h5>
            <h5>
              Product price -{' '}
              <span className='product-detail-span'>
                {formatter.format(order.product.price)}
              </span>
            </h5>
            <h5>
              Product quantity -{' '}
              <span className='product-detail-span'>
                {order.product.quantity}
              </span>
            </h5>

            <h5>
              Product category -{' '}
              <span className='product-detail-span'>
                {order.product.category}
              </span>
            </h5>
            <h5>
              Total amount -{' '}
              <span className='product-detail-span'>
                {formatter.format(order.totalamount)}
              </span>
            </h5>
            <h5>
              Payment method -{' '}
              <span className='product-detail-span'>{order.paymentmethod}</span>
            </h5>
            <h5>
              Order status -
              <span className='product-detail-span'>{order.orderStatus}</span>
            </h5>

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
  min-height: 100vh;

  .order-id {
    height: 70px;
    width: 100%;
    background-color: #ffffff;
    padding: 2rem;
  }

  .order-details {
    padding: 2rem 2rem;
    height: 100%;
    margin-top: 2rem;

    background-color: white;

    h2 {
      margin-bottom: 2rem;
    }

    .product-detail-span {
      font-weight: 400;
    }
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

  @media (max-width: 480px) {
    /* Phone view */
    padding: 7rem 0;

    h1 {
      font-size: 2.5rem;
    }

    .order-details {
      margin-top: 0.5rem;
    }

    .edit-order {
      margin-top: 5rem;
    }

    .delete-order-btn {
      margin-top: 2rem;
    }
  }
`;
