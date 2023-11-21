import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllBed = () => {
  const [allBed, setAllBed] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/beds');
      setAllBed(res.data);
      console.log(res.data);
    };

    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/${window.localStorage.getItem(
          'role'
        )}/detail/${window.localStorage.getItem('email')}`
      );
      setCurrentUser(res.data);
    };
    getUserData();
    fetchPatients();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard
          name={currentUser?.firstName + ' ' + currentUser?.lastName}
          userId={currentUser?._id}
          role={window.localStorage.getItem('role')}
        />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link
              to='/bed/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Bed{' '}
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Bed Number</th>
                  </tr>
                </thead>
                <tbody>
                  {allBed &&
                    allBed.map((bed, index) => {
                      return (
                        <tr key={bed._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{bed.bedNumber}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBed;
