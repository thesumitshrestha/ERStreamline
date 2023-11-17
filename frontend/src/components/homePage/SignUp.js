import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allDetail, setAllDetail] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email is', email);
    console.log('Password is', password);
    try {
      const res = await axios.post('http://127.0.0.1:5005/api/users/signup', {
        name: 'Sumit Shrestha',
        email: email,
        password: password,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);

      console.log('NEW Sign Up ADDED');
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRole = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    if (e.target.value === 'patient') {
      getAllData('patients');
    } else if (e.target.value === 'healthStaff') {
      getAllData('healthStaffs');
    } else if (e.target.value === 'adminStaff') {
      getAllData('adminStaffs');
    }
  };

  const getAllData = async (role) => {
    console.log('Role is', role);
    const res = await axios.get(`http://localhost:5005/api/${role}`);
    setAllDetail(res.data);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className='bg-primary py-medium'>
        <div className='container mx-auto text-white px-large  flex flex-row items-center justify-between'>
          <h2 className='text-5xl'>ERStreamline</h2>
        </div>
      </div>
      <div className='bg-background'>
        <div className='container mx-auto p-large'>
          <form
            className='login_form p-large gradient rounded-3xl '
            onSubmit={handleSubmit}
          >
            <h3 className='mb-10 font-bold text-3xl'> Sign Up</h3>

            {/* <div className='mb-4'>
              <select className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'>
                <option value=''>Select Role</option>
                <option value='Patient'>Patient</option>
                <option value='HealthStaff'>HealthStaff</option>
                <option value='Visitor'>Visitor</option>
              </select>
            </div> */}
            <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Email
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='email'
                placeholder='Email'
                name='email'
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div className='email error'></div>
            </div>

            <div>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Password
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='password'
                placeholder='Password'
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className='password error'></div>
            </div>

            <button
              className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'
              to='/homepage/patient'
            >
              Sign Up
            </button>
          </form>
          {/* <form
            className='login_form p-large gradient rounded-3xl '
            onSubmit={handleSubmit}
          >
            <h3 className='mb-10 font-bold text-3xl'> Sign Up</h3>
            <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Role
              </label>
              <select
                onChange={(e) => {
                  handleRole(e);
                }}
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              >
                <option value=''>Select Role</option>
                <option value='patient'>Patient</option>
                <option value='healthStaff'>Health Staff</option>
                <option value='adminStaff'>Admin Staff</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Name
              </label>
              <select
                name='name'
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              >
                <option value=''>Select Name</option>
                {allDetail.map((detail, idx) => {
                  return (
                    <option key={detail._id} value={detail._id}>
                      {detail.firstName} {detail.lastName} || {detail.email}
                    </option>
                  );
                })}
              </select>
            </div> */}

          {/* <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Email
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='text'
                placeholder='Email'
                name='email'
                readOnly
                value={allDetail[0]?.email}
                required
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
              <div className='email error'></div>
            </div> */}

          {/* <div>
              <label className='mb-2 text-sm font-medium block' htmlFor=''>
                Password
              </label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='password'
                placeholder='Password'
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className='password error'></div>
            </div>

            <button
              className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'
              to='/homepage/patient'
            >
              Sign Up
            </button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default SignUp;
