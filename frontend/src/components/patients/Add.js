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
  <>
    <div class='bg-background'>
      <div class='container mx-auto p-large'>
        <form className='create p-large gradient rounded-3xl ' onSubmit={handleSubmit}>
          <h3 class='mb-10 font-bold text-3xl'> Add a New Patient</h3>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>First Name: </label>
            <input 
              class='p-2.5 text-textLight shadow rounded w-2/5  outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
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
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Date of Birth: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='date'
              onChange={(e) => setDateofBirth(e.target.value)}
              value={dateOfBirth}
            />{' '}
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Address: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Phone: </label>
            <input 
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />  
          </div>
                  
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Email: </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          
          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Gender: </label>
            <select
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              name=''
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium  block' htmlFor=''>Blood Group: </label>
            <select
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
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
          </div>
          
          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'> Add Patient</button>
        </form>
      </div>

    </div>
  </>
  );
};

export default Add;
