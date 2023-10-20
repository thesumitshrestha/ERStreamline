import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateofBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/patients', {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        address: address,
        phone: phone,
        email: email,
        gender: gender,
        bloodGroup: bloodGroup,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW PATIENT ADDED');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3> Add a New Patient</h3>
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
      <label htmlFor=''>Date of Birth: </label>
      <input
        type='date'
        onChange={(e) => setDateofBirth(e.target.value)}
        value={dateOfBirth}
      />{' '}
      <br />
      <label htmlFor=''>Address: </label>
      <input
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
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
      <label htmlFor=''>Gender: </label>
      <select
        name=''
        id='gender'
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Other'>Other</option>
      </select>
      <br />
      <label htmlFor=''>Blood Group: </label>
      <select
        name=''
        id='gender'
        value={gender}
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option value='A+ve'>B+ve</option>
        <option value='B+ve'>A+ve</option>
        <option value='A-ve'>A-ve</option>
        <option value='B-ve'>B-ve</option>
        <option value='AB+ve'>AB+ve</option>
        <option value='AB-ve'>AB-ve</option>
        <option value='O+ve'>O+ve</option>
        <option value='O-ve'>O-ve</option>
      </select>
      <br />
      <button> Add Patient</button>
    </form>
  );
};

export default Add;
