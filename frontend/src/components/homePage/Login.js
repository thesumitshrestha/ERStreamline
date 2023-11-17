import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email is', email);
    console.log('Password is', password);
    try {
      const res = await axios.post('http://localhost:5005/api/users/login', {
        email: email,
        password: password,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        withCredentials: true,
      });
      console.log(res.data);

      console.log('NEW Login');
      e.target.reset();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

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
            <h3 className='mb-10 font-bold text-3xl'> Login</h3>

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
                type='text'
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
