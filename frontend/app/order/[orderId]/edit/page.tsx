'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import userStore from '../../../../lib/store';
import useOrder from '../../../../hooks/use-order';
import { Product } from '../../../../types/order.type';

export default function EditOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  const { user } = userStore();

  const emptyProduct = {
    productid: '',
    productname: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  };

  const [formData, setFormData] = useState<Product>(emptyProduct);

  const { fetchOrder, updateOrder } = useOrder();

  useEffect(() => {
    const fetchedOrder = async () => {
      if (user) {
        const data = await fetchOrder(orderId);
        if (data) setFormData(data.product);
      }
    };
    fetchedOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    updateOrder(formData, orderId);
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
