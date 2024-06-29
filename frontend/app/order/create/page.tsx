'use client';
import { useState } from 'react';
import { validateInput } from '../../../lib/validateInput';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'sonner';

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

export default function CreateOrderPage() {
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

    console.log(formData);

    async function createOrder(form: NewOrder) {
      axios.defaults.withCredentials = true;
      await axios
        .post(`http://localhost:3001/api/orders/`, {
          ...form,
          name: 'Sixtus',
          customerid: 838874849,
        })
        .then((res) => console.log(res));
    }

    const { error, value } = validateInput({
      ...formData,
      customername: 'Sixtus',
      customerid: 838874849,
      email: 'testing@test.com',
      product: { ...formData.product, productid: '84875849' },
    });
    if (error) {
      toast(error.details[0].message);
      console.error('Validation Error:', error.details[0].message);

      // Handle error (e.g., show validation messages)
    } else {
      //   console.log('Input validated successfully:', value);
      createOrder(formData);
      // Proceed with form submission or data processing
    }
  }

  return (
    <MainWrapper>
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
        {/* <label htmlFor='orderstatus'>
          <p>Order Status</p>
          <input type='text' />
        </label> */}
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