import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/healthStaffs', {
        firstName: firstName,
        lastName: lastName,
        specialty: specialty,
        phone: phone,
        email: email,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Health Staff ADDED');
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
    <div class='bg-background'>
      <div class='container mx-auto p-large'>
        <form className='create p-large gradient rounded-3xl ' onSubmit={handleSubmit}>
          <h3 class='mb-10 font-bold text-3xl'> Add a New Health Staff</h3>
          <div class='mb-3'>
          <label class='mb-2 text-sm font-medium block' htmlFor=''>First Name: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />{' '}
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>Last Name: </label>
            <input 
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />{' '}
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>Specialty </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setSpecialty(e.target.value)}
              value={specialty}
            />
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>Phone: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>Email: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'> Add Health Staff</button>
        </form>
      </div>
    </div>
  </>
  );
};

export default Add;
