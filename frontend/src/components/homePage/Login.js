import React from 'react';

const Login = () => {

  return (

    <>
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
            
            <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'> Add Lab</button>
          </form>
        </div>
      </div>

    </>
  );
}

export default Login;
