import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllAdminStaffs = () => {
  const [allAdminStaffs, setAllAdminStaffs] = useState([]);

  useEffect(() => {
    const fetchAdminStaffs = async () => {
      const res = await axios.get('http://localhost:5005/api/adminStaffs');
      setAllAdminStaffs(res.data);
      console.log(res.data);
    };
    fetchAdminStaffs();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link to='/admin-staff/add' className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'> Add Admin Staff</Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>First Name</th>
                    <th className='p-4'>Last Name</th>
                    <th className='p-4'>Role</th>
                    <th className='p-4'>Phone</th>
                    <th className='p-4'>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {allAdminStaffs &&
                    allAdminStaffs.map((adminStaff, index) => {
                      return (
                        <tr key={adminStaff._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{adminStaff.firstName}</td>
                          <td className='p-4'>{adminStaff.lastName}</td>
                          <td className='p-4'>{adminStaff.role}</td>
                          <td className='p-4'>{adminStaff.phone}</td>
                          <td className='p-4'>{adminStaff.email}</td>
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

export default AllAdminStaffs;
