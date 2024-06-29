'use client';

import styled from 'styled-components';

export default function EditOrderPage() {
  return (
    <MainWrapper>
      <form>
        <div className='product-form-section'>
          <label htmlFor='product-name'>
            <p>Product name</p>
            <input type='text' />
          </label>
          <label htmlFor='product-price'>
            <p>Product price</p>
            <input type='text' />
          </label>
          <label htmlFor='quantity'>
            <p>Quantity</p>
            <input type='text' />
          </label>
          <label htmlFor='product-category'>
            <p>Product category</p>
            <input type='text' />
          </label>
        </div>
        <label htmlFor='product-description'>
          <p>Product description</p>
          <textarea />
        </label>
        <label htmlFor='orderstatus'>
          <p>Order Status</p>
          <input type='text' />
        </label>
        <label htmlFor='orderstatus'>
          <p>Payment method</p>
          <input type='text' />
        </label>
      </form>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding: 120px 50px 50px 250px;
  width: 100%;
  background-color: #f9fafb;
  /* height: 100vh; */

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
  }

  .product-form-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
  }
`;
