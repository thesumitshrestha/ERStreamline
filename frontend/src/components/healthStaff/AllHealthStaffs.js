import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllHealthStaffs = () => {
  const [allHealthStaffs, setAllHealthStaffs] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchHealthStaffs = async () => {
      const res = await axios.get('http://localhost:5005/api/healthStaffs');
      setAllHealthStaffs(res.data);
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
    fetchHealthStaffs();
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
              to='/health-staff/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Health Staffs
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>First Name</th>
                    <th className='p-4'>Last Name</th>
                    <th className='p-4'>Specialty</th>
                    <th className='p-4'>Phone</th>
                    <th className='p-4'>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {allHealthStaffs &&
                    allHealthStaffs.map((healthStaff, index) => {
                      return (
                        <tr key={healthStaff._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{healthStaff.firstName}</td>
                          <td className='p-4'>{healthStaff.lastName}</td>
                          <td className='p-4'>{healthStaff.specialty}</td>
                          <td className='p-4'>{healthStaff.phone}</td>
                          <td className='p-4'>{healthStaff.email}</td>
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

export default AllHealthStaffs;
