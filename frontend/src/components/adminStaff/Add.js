import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const roleList = [
    'Lab Technician',
    'Admissions Specialist',
    'Pharmaceutical Technician',
    'Supervisor',
    'Billing Specialist',
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/adminStaffs', {
        firstName: firstName,
        lastName: lastName,
        role: role,
        phone: phone,
        email: email,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res.data);
      console.log('NEW Admin Staff ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='bg-background'>
        <div className='container mx-auto p-large'>
          <form
            className='create p-large gradient rounded-3xl '
            onSubmit={handleSubmit}
          >
            <h3 className='mb-10 font-bold text-3xl'> Add a New Admin Staff</h3>
            <div className='mb-3'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                First Name:{' '}
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='text'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />{' '}
            </div>

            <div className='mb-3'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Last Name:{' '}
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='text'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />{' '}
            </div>

            <div className='mb-3'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Role
              </label>
              <select
                name=''
                id='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roleList.map((role, idx) => {
                  return (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='mb-3'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Phone:{' '}
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
              Add Admin Staff
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
