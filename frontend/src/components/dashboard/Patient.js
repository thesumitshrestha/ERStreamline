import React, { useEffect, useState } from 'react';

import avatar from '../../images/avatar.png';
import Dashboard from './Dashboard';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { calculateAge, convertDate } from '../../commons/functions';

const Patient = () => {
  const location = useLocation();

  const [userData, setUserData] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);
  const [totalBills, setTotalBills] = useState([]);

  if (location?.state?.email) {
    window.localStorage.setItem('email', location?.state?.email);
  }
  const email = window.localStorage.getItem('email');
  console.log('EMAIL IS NEW', email);
  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/patients/detail/${email}`
      );

      setUserData(res.data);
      console.log('USER DATA is', res.data);

      await axios
        .get(`http://localhost:5005/api/ehrVisits/patient/${res?.data?._id}`)
        .then((response) => {
          setEhrVisits(response.data);
          console.log('Total', response.data);
          console.log(
            'HERE in EHRVISIT GET BILLING, ID is',
            response?.data[0]?._id
          );

          if (response.length > 0) {
            console.log('LENGTH IS GREATER', response.length);
            axios
              .get(
                `http://localhost:5005/api/billings/ehrVisit/${response?.data[0]?._id}`
              )
              .then((response) => {
                console.log('Total Bills', response?.data);
                setTotalBills(response?.data);
              });
          }
        });
      // .then((ehrVisit) => {
      //   console.log('HERE in GET BILLING, ID is', ehrVisit.data._id);
      // });
    };
    getUserData();
  }, []);

  return (
    <>
      <div className='flex'>
        <Dashboard
          name={userData?.firstName + ' ' + userData?.lastName}
          userId={userData?._id}
        />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-large'>
            {/* patient details */}
            <div className='p-medium gradient rounded-3xl '>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <div className='user-profile flex justify-center mt-[-140px]'>
                      <img
                        className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                        src={avatar}
                        alt='Avatar'
                      />
                    </div>
                    <div className='text-center mt-3'>
                      <h4>
                        <b>
                          {userData?.firstName} {userData?.lastName}
                        </b>
                      </h4>
                      <p>
                        {' '}
                        {calculateAge(userData?.dateOfBirth)} years,{' '}
                        {userData?.gender}{' '}
                      </p>
                    </div>
                    <ul className='flex items-center justify-between p-0 mt-4 mb-3 '>
                      <li className='text-center w-1/3'>
                        <h6 className='text-primary'>Gender</h6>
                        <h3>{userData?.phone}</h3>
                      </li>
                      <li className='text-center border-l border-black-100 w-1/3'>
                        <h6 className='text-primary'>Date of Birth</h6>
                        <h3>{convertDate(userData?.dateOfBirth)}</h3>
                      </li>
                      <li className='text-center border-l border-black-100 w-1/3'>
                        <h6 className='text-primary'>Blood Group</h6>
                        <h3 className='text-warning'>{userData?.bloodGroup}</h3>
                      </li>
                    </ul>
                    <ul className='flex items-center justify-between p-0 mt-4 mb-0 '>
                      <li className='text-center  w-1/3'>
                        <h6 className='text-primary'>Phone</h6>
                        <h3>{userData?.phone}</h3>
                      </li>
                      <li className='text-center border-l border-black-100 w-1/3'>
                        <h6 className='text-primary'>Email</h6>
                        <h3>{userData?.email}</h3>
                      </li>
                      <li className='text-center border-l w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Address</h6>
                        <h3 className='text-warning'>{userData?.address}</h3>
                      </li>
                      <li className='text-center border-l w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Emergency Contact</h6>
                        <h4>
                          <b> {userData?.emergencyContactName} </b>
                          <p> {userData?.emergencyContactNumber} </p>
                        </h4>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments */}
            <div className='p-medium gradient rounded-3xl mt-10'>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <div className='text-center mb-10'>
                      <h3>
                        <b>Last EHR Visit </b>
                      </h3>
                    </div>

                    {ehrVisits.length > 0 ? (
                      <ul className='p-0 mt-4 mb-0'>
                        <li className='flex mb-5'>
                          <h6 className='text-primary mr-2'>Date:</h6>
                          <Link to={`/ehr-visit/${ehrVisits[0]?._id}`}>
                            <h3>{convertDate(ehrVisits[0]?.visitDate)}</h3>
                          </Link>
                        </li>
                        <li className='flex mb-5'>
                          <h6 className='text-primary mr-2'>By</h6>
                          <h3>
                            {ehrVisits[0]?.healthStaff?.firstName +
                              ' ' +
                              ehrVisits[0]?.healthStaff?.lastName}
                          </h3>
                        </li>

                        {totalBills.length > 0 ? (
                          <li className='flex mb-5'>
                            <h6 className='text-primary mr-2'> Total Fee: </h6>
                            <h3>${totalBills[0]?.totalAmount}</h3>
                          </li>
                        ) : (
                          ''
                        )}
                      </ul>
                    ) : (
                      'No EHR Visits'
                    )}
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
