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
    <form className='create' onSubmit={handleSubmit}>
      <h3> Add a New Health Staff</h3>
      <label htmlFor=''>First Name: </label>
      <input
        type='text'
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />{' '}
      <br />
      <label htmlFor=''>Last Name: </label>
      <input
        type='text'
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />{' '}
      <br />
      <label htmlFor=''>Specialty </label>
      <input
        type='text'
        onChange={(e) => setSpecialty(e.target.value)}
        value={specialty}
      />
      <br />
      <label htmlFor=''>Phone: </label>
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
      <button> Add Health Staff</button>
    </form>
  );
};

export default Add;
