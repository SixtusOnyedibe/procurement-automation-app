'use client';
import { useState } from 'react';
import { validateInput } from '../../../lib/validateInput';
import styled from 'styled-components';
import { toast } from 'sonner';
import userStore from '../../../lib/store';
import { NewOrder } from '../../../types/order.type';
import useOrder from '../../../hooks/use-order';

export default function CreateOrderPage() {
  const { createOrder } = useOrder();
  const [formData, setFormData] = useState<NewOrder>({
    customerid: 0,
    customername: '',
    email: '',
    product: {
      productid: '',
      productname: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
    },
    paymentmethod: '',
    totalamount: 0,
  });

  const { user } = userStore();

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    const validFields = [
      'productId',
      'productname',
      'description',
      'price',
      'quantity',
      'category',
    ];
    if (validFields.includes(name)) {
      const updatedProduct = { ...formData.product, [name]: value };
      setFormData({
        ...formData,
        product: updatedProduct,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user) {
      const { error, value } = validateInput({
        ...formData,
        customername: user?.username,
        customerid: user?.customerid,
        email: user?.email,
        product: {
          ...formData.product,
          productid: new Date().getTime().toString(),
        },
      });
      if (error) {
        toast.error(error.details[0].message);
      } else {
        createOrder(formData);
        // clearing input
        setFormData({
          customerid: 0,
          customername: '',
          email: '',
          product: {
            productid: '',
            productname: '',
            description: '',
            price: 0,
            quantity: 0,
            category: '',
          },
          paymentmethod: '',
          totalamount: 0,
        });
      }
    }
  }

  return (
    <MainWrapper>
      <h1>Create new order</h1>
      <form onSubmit={handleSubmit}>
        <div className='product-form-section'>
          <label htmlFor='productname'>
            <p>Product name</p>
            <input
              type='text'
              id='productname'
              name='productname'
              value={formData.product.productname || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='price'>
            <p>Product price</p>
            <input
              type='text'
              id='price'
              name='price'
              value={formData.product.price || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='quantity'>
            <p>Quantity</p>
            <input
              type='text'
              id='quantity'
              name='quantity'
              value={formData.product.quantity || ''}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor='category'>
            <p>Product category</p>
            <input
              type='text'
              id='category'
              name='category'
              value={formData.product.category || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <label htmlFor='description'>
          <p>Product description</p>
          <textarea
            id='description'
            name='description'
            value={formData.product.description || ''}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor='paymentmethod'>
          <p>Payment method</p>
          <input
            type='text'
            id='paymentmethod'
            name='paymentmethod'
            value={formData.paymentmethod || ''}
            onChange={handleInputChange}
          />
        </label>
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
