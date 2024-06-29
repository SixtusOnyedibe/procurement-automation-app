'use client';

import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function UserRegister() {
  const [userInput, setUserInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleCreateUserAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({ ...userInput, [name]: value });
  };
  return (
    <div>
      <div className='w-full py-10 relative z-[1000]'>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-medium'>
            Create Your Aloe Wrld Account
          </h3>
          <div
            className='ml-5 text-aloe_button text-3xl cursor-pointer'
            // onClick={setUserProfile}
          >
            <IoCloseOutline />
          </div>
        </div>
        <p className='font-normal mt-5 text-sm'>
          Creating an account makes it easy to manage orders and access free
          online courses.
        </p>
      </div>
      <form onSubmit={handleCreateUserAccount}>
        <label htmlFor='firstname'>
          <input
            type='text'
            id='firstname'
            name='firstname'
            className='w-full h-[50px] border px-5 font-medium'
            placeholder='First Name'
            value={userInput.firstname || ''}
            onChange={handleUserInput}
          />
        </label>
        <label htmlFor='lastname'>
          <input
            type='text'
            id='lastname'
            name='lastname'
            className='w-full h-[50px] border px-5 mt-5 font-medium'
            placeholder='Last Name'
            value={userInput.lastname || ''}
            onChange={handleUserInput}
          />
        </label>
        <label htmlFor='email'>
          <input
            type='text'
            id='email'
            name='email'
            className='w-full h-[50px] border px-5 mt-5 font-medium'
            placeholder='Email'
            value={userInput.email || ''}
            onChange={handleUserInput}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            name='password'
            id='password'
            className='border mt-5 h-[50px] w-full px-5 font-medium'
            placeholder='Password'
            value={userInput.password || ''}
            onChange={handleUserInput}
          />
        </label>
      </form>

      <div className='flex mt-10 items-center'>
        <p className='mr-5'>Already have an account?</p>
        <p className='underline cursor-pointer'>Log in</p>
      </div>
    </div>
  );
}
