import React from 'react';

import avatar from '../../images/avatar.png';
import Dashboard from '../dashboard/Dashboard';

const Patient = () => {
  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-large'>
            {/* patient details */}
            <div className='p-large gradient rounded-3xl '>
              <div class='block '>
                <div class='card-body'>
                  <div class='user-details-block'>
                    <div class='user-profile flex justify-center mt-[-140px]'>
                      <img
                        className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                        src={avatar}
                        alt='Avatar'
                      />
                    </div>
                    <div class='text-center mt-3'>
                      <h4>
                        <b>Bess Willis</b>
                      </h4>
                      <p>27 years, California</p>
                    </div>
                    <ul class='flex items-center justify-between p-0 mt-4 mb-0 '>
                      <li class='text-center w-1/3'>
                        <h6 class='text-primary'>Weight</h6>
                        <h3>
                          60<span>kg</span>
                        </h3>
                      </li>
                      <li class='text-center border-l border-black-100 w-1/3'>
                        <h6 class='text-primary'>Height</h6>
                        <h3>
                          170<span>cm</span>
                        </h3>
                      </li>
                      <li class='text-center border-l border-black-100 w-1/3'>
                        <h6 class='text-primary'>Goal</h6>
                        <h3 class='text-warning'>
                          55<span>kg</span>
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* appointments */}
            <div className='p-large gradient rounded-3xl mt-10'>
              <div class='block '>
                <div class='card-body'>
                  <div class='user-details-block'>
                    <div class='text-center mb-10'>
                      <h3>
                        <b>Upcoming Appointments</b>
                      </h3>
                    </div>
                    <ul class='p-0 mt-4 mb-0'>
                      <li class='flex mb-5'>
                        <h6 class='text-primary mr-2'>Date:</h6>
                        <h3>Jan 10, 2024</h3>
                      </li>
                      <li class='flex mb-5'>
                        <h6 class='text-primary mr-2'>By</h6>
                        <h3>Dr. John Doe</h3>
                      </li>
                      <li class='flex'>
                        <h6 class='text-primary mr-2'>Location</h6>
                        <h3 class='text-warning'>X-ray</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;
