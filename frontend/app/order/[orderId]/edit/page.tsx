'use client';
import { useEffect, useState } from 'react';
// import { validateInput } from '../../../../lib/validateInput';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'sonner';
import userStore from '../../../../lib/store';
import { useRouter } from 'next/navigation';

export interface NewOrder {
  customerid: number;
  customername: string;
  email: string;
  product: {
    productid: string;
    productname: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
  };
  paymentmethod: string;
  totalamount: number;
}

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

export default function EditOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  const router = useRouter();
  const { user } = userStore();

  const emptyProduct = {
    productid: '',
    productname: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  };

  const [order, setOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState<Product>(emptyProduct);

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
            setFormData(res.data.order.product);
          } else {
            toast(res.data.message);
          }
        })
        .catch((error) => {
          toast(error.response.data.message);
        });
    }
    if (user) fetchOrder();
  }, [user]);

  console.log(formData);

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios
      .put(`http://127.0.0.1:3001/api/orders/${orderId}`, {
        customerid: user?.customerid,
        product: formData,
        orderStatus: 'success',
      })
      .then((res) => {
        if (res.status === 200) {
          // setOrder(res.data.order);
          // router.push('/order');
          toast('Updated successfully');
        } else {
          toast(res.data.message);
        }
      })
      .catch((error) => toast(error.response.data.message));
  }

  return (
    <MainWrapper>
      <h1>Edit order</h1>
      <form onSubmit={handleSubmit}>
        <div className='product-form-section'>
          <label htmlFor='productname'>
            <p>Product name</p>
            <input
              type='text'
              id='productname'
              name='productname'
              value={formData.productname || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='price'>
            <p>Product price</p>
            <input
              type='text'
              id='price'
              name='price'
              value={formData.price || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='quantity'>
            <p>Quantity</p>
            <input
              type='text'
              id='quantity'
              name='quantity'
              value={formData.quantity || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='category'>
            <p>Product category</p>
            <input
              type='text'
              id='category'
              name='category'
              value={formData.category || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <label htmlFor='description'>
          <p>Product description</p>
          <textarea
            id='description'
            name='description'
            value={formData.description || ''}
            onChange={handleInputChange}
          />
        </label>

        {/* <label htmlFor='paymentmethod'>
          <p>Payment method</p>
          <input
            type='text'
            id='paymentmethod'
            name='paymentmethod'
            // value={formData.paymentmethod || ''}
            onChange={handleInputChange}
          />
        </label> */}
        <button type='submit'>Submit</button>
      </form>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding: 120px 50px 50px 250px;
  width: 100%;
  background-color: #f9fafb;

  h1 {
    margin: 5rem 0;
  }

  form {
    display: grid;
    gap: 2rem;
    width: 100%;
    border: 1px solid black;
    padding: 5rem;

    input {
      height: 5rem;
      width: 100%;
      padding: 0 1rem;
    }

    label {
      width: 100%;
    }

    textarea {
      height: 10rem;
      width: 100%;
      resize: none;
      padding: 1rem;
    }

    p {
      font-weight: 500;
    }

    button {
      width: 20rem;
      height: 5rem;
    }
  }

  .product-form-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
  }
`;
