import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/labs', {
        name: name,
        address: address,
        email: email,
        phone: phone,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Lab ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/adminStaffs/detail/${window.localStorage.getItem(
          'email'
        )}`
      );
      setCurrentUser(res.data);
    };
    getUserData();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard
          name={currentUser?.firstName + ' ' + currentUser?.lastName}
          userId={currentUser?._id}
          role={window.localStorage.getItem('role')}
        />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <form
              className='create p-large gradient rounded-3xl '
              onSubmit={handleSubmit}
            >
              <h3 className='mb-10 font-bold text-3xl'> Add a New Lab</h3>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Name:{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Address:{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />{' '}
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Phone{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Email:{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                {' '}
                Add Lab
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
