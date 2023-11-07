import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const Add = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const specialtyList = [
    'Orthopedic Surgeon',
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Dermatologist',
    'Psychiatrist',
    'ENT Specialist',
    'General Surgeon',
    'Gynecologist',
    'Internal Medicine Specialist',
    'Receptionist',
    'Administrative Assistant',
    'Medical Secretary',
    'Health Information Technician',
    'Medical Billing Specialist',
    'Medical Records Clerk',
    'Medical Transcriptionist',
    'Office Manager',
    'Human Resources Coordinator',
    'IT Support Specialist',
    'Orthopedic Surgeon',
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Dermatologist',
    'Psychiatrist',
    'ENT Specialist',
    'General Surgeon',
    'Gynecologist',
    'Internal Medicine Specialist',
  ];
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
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <form
              className='create p-large gradient rounded-3xl '
              onSubmit={handleSubmit}
            >
              <h3 className='mb-10 font-bold text-3xl'>
                {' '}
                Add a New Health Staff
              </h3>
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
                  Specialty
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='specialty'
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialtyList.map((specialty, idx) => {
                    return (
                      <option key={idx} value={specialty}>
                        {specialty}
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
                Add Health Staff
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
