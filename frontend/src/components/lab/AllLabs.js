import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllLabs = () => {
  const [allLabs, setAllLabs] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      const res = await axios.get('http://localhost:5005/api/labs');
      setAllLabs(res.data);
      console.log(res.data);
    };

    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/adminStaffs/detail/${window.localStorage.getItem(
          'email'
        )}`
      );
      setCurrentUser(res.data);
    };
    getUserData();

    fetchLabs();
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
              to='/lab/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Lab
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Name</th>
                    <th className='p-4'>Address</th>
                    <th className='p-4'>Phone</th>
                    <th className='p-4'>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {allLabs &&
                    allLabs.map((lab, index) => {
                      return (
                        <tr key={lab._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{lab.name}</td>
                          <td className='p-4'>{lab.address}</td>
                          <td className='p-4'>{lab.phone}</td>
                          <td className='p-4'>{lab.email}</td>
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

export default AllLabs;
