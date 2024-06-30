'use client';
import styled from 'styled-components';
import Image from 'next/image';
import userStore, { menuStore } from '../../lib/store';
import placeHolder from '../../public/placeholder-user.jpg';
import UserLogin from '../user-login';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

export default function Header() {
  const { user } = userStore((state) => state);
  const { accountComponentOpen, setAccountComponentOpen, setBurgerOpen } =
    menuStore((state) => state);
  return (
    <HeaderStyle>
      {accountComponentOpen && <UserLogin />}
      <nav>
        <Link href='/dashboard'>
          <h3>Bpro</h3>
        </Link>
        <div className='right-nav'>
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
          <div onClick={() => setBurgerOpen(true)}>
            <GiHamburgerMenu className='buger-menu-icon' />
          </div>
        </div>
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

  a {
    text-decoration: none;
    color: white;
  }

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

  .buger-menu-icon {
    display: none;
  }

  @media (max-width: 480px) {
    /* Phone view */
    height: 6rem;
    padding: 2rem;

    .image-placeholder-containeer,
    .image-placeholder {
      width: 3rem;
      height: 3rem;
    }

    .right-nav {
      display: flex;
      align-items: center;
    }

    .buger-menu-icon {
      display: block;
      font-size: 3rem;
      margin-left: 2rem;
    }
  }
`;
