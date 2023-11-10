import React from 'react';
import { Link }from 'react-router-dom';

const Login = () => {

  return (

    <>
      <div className='bg-primary py-medium'>
        <div className='container mx-auto text-white px-large  flex flex-row items-center justify-between'>
          <h2 className='text-5xl'>ERStreamline</h2>
        </div>
      </div>
      <div className='bg-background'>
        <div className='container mx-auto p-large'>
          <form className='login_form p-large gradient rounded-3xl '>

            <h3 className='mb-10 font-bold text-3xl'> Login</h3>
            
            <div className='mb-4'>
              <select
              className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              >
                <option value="">Role</option>
                <option value="Patient">Patient</option>
                <option value="HealthStaff">HealthStaff</option>
                <option value="Visitor">Visitor</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''></label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='text' placeholder='Username'
              />
            </div>

            <div className='mb-4'>
              <label className='mb-2 text-sm font-medium block' htmlFor=''></label>
              <input
                className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                type='password' placeholder='Password'
              />
            </div>
            
            {/* <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'> Login</button> */}
            <Link className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors' to='/homepage/patient'>Login</Link>
          </form>
        </div>
      </div>

    </>
  );
}

export default Login;
