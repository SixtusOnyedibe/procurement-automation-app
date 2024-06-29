'use client';
import styled from 'styled-components';
import Image from 'next/image';
import userStore from '../../lib/store';
import placeHolder from '../../public/placeholder-user.jpg';
import { useState } from 'react';
import UserLogin from '../user-login';

export default function Header() {
  const { user } = userStore((state) => state);
  const [accountComponentOpen, setAccountComponentOpen] = useState(false);
  return (
    <HeaderStyle>
      {accountComponentOpen && (
        <UserLogin
          accountComponentOpen={accountComponentOpen}
          setAccountComponentOpen={setAccountComponentOpen}
        />
      )}
      <nav>
        <div>
          <h3>Barrel</h3>
        </div>
        {user ? (
          <div>
            <p>{user.username}</p>
          </div>
        ) : (
          <div
            className='image-placeholder-containeer'
            onClick={() => setAccountComponentOpen(true)}
          >
            <Image
              src={placeHolder}
              alt='image place holder'
              className='image-placeholder'
            ></Image>
          </div>
        )}
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: #090413;
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  padding: 50px;
  z-index: 100;

  nav {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .image-placeholder-containeer,
  .image-placeholder {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
  }
`;
