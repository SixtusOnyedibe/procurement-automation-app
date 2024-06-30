'use client';

import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'sonner';
import userStore, { menuStore } from '../lib/store';

export default function UserLogin() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = userStore((state) => state);
  const { setAccountComponentOpen } = menuStore((state) => state);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/api/auth/login',
        userInput
      );

      if (res.status === 201) {
        setUser({
          username: res.data.user.customername,
          email: res.data.user.email,
          customerid: res.data.user.customerid,
        });
        setAccountComponentOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };
  return (
    <MainWrapper>
      <div
        className='overlay-card'
        onClick={() => setAccountComponentOpen(false)}
      ></div>
      <div className='main-content-wrapper'>
        <div className='account-greeting'>
          <div className='welcome-back'>
            <h3>Welcome back</h3>
            <div onClick={() => setAccountComponentOpen(false)}>
              <IoCloseOutline className='close-icon' />
            </div>
          </div>
          <p>
            Create an account or log in to view your orders, return or adjust
            your personal information
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor='email'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              value={userInput.email || ''}
              onChange={handleUserInput}
            />
          </label>
          {/* <label htmlFor='password' className='password-label'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={userInput.password || ''}
              placeholder='Password'
              onChange={handleUserInput}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </label> */}

          <button type='submit'>Login</button>
        </form>

        <div className='new-here'>
          <p>New here?</p>
          <p className='create-account'>Create account</p>
        </div>
      </div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .overlay-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.2;
    z-index: 110;
  }

  .main-content-wrapper {
    width: 45rem;
    height: 100vh;
    background-color: #f9f8f7;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 111;
    padding: 2rem;
  }

  .welcome-back {
    display: flex;
    justify-content: space-between;
    color: #090413;
    margin-top: 2rem;
    align-items: center;

    h3 {
      font-weight: 500;
    }
  }

  .close-icon {
    color: #090413;
    cursor: pointer;
    font-size: 3rem;
  }

  p {
    color: black;
    margin-top: 3rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    margin-top: 2rem;
    gap: 2rem;

    input {
      border: 1px solid black;
      padding: 0 2rem;
      width: 100%;
      height: 5rem;
    }

    .password-label {
      position: relative;
      span {
        position: absolute;
        right: 2rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }

    button {
      width: 100%;
      height: 5rem;
      background-color: #090413;
      border: none;
      outline: none;
      color: white;
      font-size: 1.6rem;
      cursor: pointer;
    }
  }

  .new-here {
    /* margin-top: 2rem; */
    display: flex;

    .create-account {
      margin-left: 1rem;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    /* Tablet view */
  }

  @media (max-width: 480px) {
    /* Phone view */
    width: 100vw;

    .main-content-wrapper {
      width: 100vw;
    }
  }
`;
