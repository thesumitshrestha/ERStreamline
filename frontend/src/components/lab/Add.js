import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3> Add a New Lab</h3>
      <label htmlFor=''>Name: </label>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <label htmlFor=''>Address: </label>
      <input
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />{' '}
      <br />
      <label htmlFor=''>Phone </label>
      <input
        type='text'
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <br />
      <label htmlFor=''>Email: </label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <button> Add Lab</button>
    </form>
  );
};

export default Add;
