import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../dashboard/Dashboard';

const SignUp = () => {
  const [role, setRole] = useState(undefined);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [allDetail, setAllDetail] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email is', user.email);
    console.log('Password is', password);
    try {
      const res = await axios.post('http://127.0.0.1:5005/api/users/signup', {
        role: role,
        name: user?.firstName + ' ' + user?.lastName,
        email: user?.email,
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
    setRole(e.target.value);
    if (e.target.value === 'patients') {
      getAllData('patients');
    } else if (e.target.value === 'healthStaffs') {
      getAllData('healthStaffs');
    } else if (e.target.value === 'adminStaffs') {
      getAllData('adminStaffs');
    }
  };

  const handleUser = async (e, role) => {
    e.preventDefault();

    if (role === 'patients') {
      getUserData('patients', e.target.value);
    } else if (role === 'healthStaffs') {
      getUserData('healthStaffs', e.target.value);
    } else if (role === 'adminStaffs') {
      getUserData('adminStaffs', e.target.value);
    }
  };

  const getAllData = async (role) => {
    const res = await axios.get(`http://localhost:5005/api/${role}`);
    setAllDetail(res.data);
  };

  const getUserData = async (role, user) => {
    const res = await axios.get(`http://localhost:5005/api/${role}/${user}`);
    setUser(res.data);
  };

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/${window.localStorage.getItem(
          'role'
        )}/detail/${window.localStorage.getItem('email')}`
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
        {/* <div className='bg-primary py-medium'>
          <div className='container mx-auto text-white px-large  flex flex-row items-center justify-between'>
            <h2 className='text-5xl'>ERStreamline</h2>
          </div>
        </div> */}
        <div className='bg-background w-4/5 content'>
          <div className='container mx-auto p-large'>
            <form
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
                  <option value='patients'>Patient</option>
                  <option value='healthStaffs'>Health Staff</option>
                  <option value='adminStaffs'>Admin Staff</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Name
                </label>
                <select
                  name='name'
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  onChange={(e) => {
                    handleUser(e, role);
                  }}
                >
                  <option value=''>Select Name</option>
                  {allDetail.map((detail, idx) => {
                    return (
                      <option key={detail._id} value={detail._id}>
                        {detail.firstName} {detail.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

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
                  value={user?.email}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;