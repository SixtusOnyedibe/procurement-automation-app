'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { MdDashboard, MdOutlineAdd } from 'react-icons/md';
import userStore from '../../lib/store';

export default function SideBar() {
  const { user, setUser, setAccountComponentOpen } = userStore(
    (state) => state
  );
  return (
    <MainContainer>
      <ul>
        <Link href='/dashboard'>
          <li>
            <MdDashboard className='dashboard-icon' />
            <p>Dashboard</p>
          </li>
        </Link>
        <hr />
        {user && (
          <>
            <Link href='/order/create'>
              <li>
                <MdOutlineAdd className='new-order-icon' />
                <p>New order</p>
              </li>
            </Link>
            <hr />
          </>
        )}
        {user ? (
          <div className='log-out-btn-container'>
            <button className='log-out-btn' onClick={() => setUser(null)}>
              <h5>Logout</h5>
            </button>
          </div>
        ) : (
          <div className='log-out-btn-container'>
            <button
              className='log-out-btn log-in-btn'
              onClick={() => setAccountComponentOpen(true)}
            >
              <h5>Login</h5>
            </button>
          </div>
        )}
      </ul>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 20rem;
  background-color: #ffffff;
  color: black;
  padding-top: 120px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0 1rem;

    li {
      cursor: pointer;
      color: black;
      padding: 2rem 0 1rem 0;
      display: flex;
      align-items: center;
    }

    .dashboard-icon {
      margin-right: 1rem;
      font-size: 2rem;
    }

    .new-order-icon {
      margin-right: 1rem;
      font-size: 2rem;
    }

    hr {
      width: 100%;
      border: 0.5px solid black;
    }
  }

  .log-out-btn-container {
    position: fixed;
    bottom: 10rem;
    left: 0;
    padding: 0 1rem;

    .log-out-btn {
      width: 18rem;
      height: 5rem;
      background-color: #f2443f;
      color: white;
      border: none;
      outline: none;
      cursor: pointer;
      margin-right: 5rem;
    }

    .log-in-btn {
      background-color: #090413;
    }
  }
`;
