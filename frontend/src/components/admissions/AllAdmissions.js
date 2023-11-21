import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllAdmissions = () => {
  const [allAdmissions, setAllAdmissions] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchAllAdmissions = async () => {
      const res = await axios.get('http://localhost:5005/api/admissions');
      setAllAdmissions(res.data);
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
    fetchAllAdmissions();
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
              to='/admission/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Admission{' '}
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>EHR Visit Date</th>
                    <th className='p-4'>Room Number</th>
                    <th className='p-4'>Admitted Date</th>
                    <th className='p-4'>Discharged Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allAdmissions &&
                    allAdmissions.map((admission, index) => {
                      return (
                        <tr key={admission._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {admission.patient?.firstName}{' '}
                            {admission.patient?.lastName}
                          </td>
                          <td className='p-4'>
                            {convertDate(admission.ehrVisit?.visitDate)}
                          </td>
                          <td className='p-4'>
                            {admission.bedNumber?.roomNumber?.roomNumber}
                            {admission.bedNumber?.bedNumber?.bedNumber}
                          </td>
                          <td className='p-4'>
                            {convertDate(admission.admissionDate)}{' '}
                          </td>
                          <td className='p-4'>
                            {admission.dischargeDate &&
                            admission.dischargeDate ? (
                              convertDate(admission.dischargeDate)
                            ) : (
                              <Link to={`/admission/update/${admission?._id}`}>
                                Not Discharged Yet --- Update
                              </Link>
                            )}
                          </td>
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

export default AllAdmissions;
