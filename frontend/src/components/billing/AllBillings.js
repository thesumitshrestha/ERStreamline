import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllBillings = () => {
  const [allBillings, setAllBillings] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchAllBillings = async () => {
      const res = await axios.get('http://localhost:5005/api/billings');
      setAllBillings(res.data);
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
    fetchAllBillings();
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
              to='/billing/add'
              className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Billing{' '}
            </Link>{' '}
            <br /> <br /> <br />
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>Health Staff</th>
                    <th className='p-4'>EHR Visit Date</th>
                    <th className='p-4'>Medication Fee</th>
                    <th className='p-4'>Lab Fee</th>
                    <th className='p-4'>Insurance Coverage</th>
                    <th className='p-4'>Deductible</th>
                    <th className='p-4'>Billing Date</th>
                    <th className='p-4'>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allBillings &&
                    allBillings.map((billing, index) => {
                      return (
                        <tr key={billing._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {billing.patient?.firstName} &nbsp;{' '}
                            {billing.patient?.lastName}
                          </td>
                          <td className='p-4'>
                            {billing.ehrVisit?.healthStaff?.firstName} &nbsp;
                            {billing.ehrVisit?.healthStaff?.lastName}
                          </td>
                          <td className='p-4'>
                            {convertDate(billing.ehrVisit?.visitDate)}
                          </td>
                          <td className='p-4'>${billing?.medication}</td>
                          <td className='p-4'>${billing?.lab}</td>
                          <td className='p-4'>
                            ${billing.insurance.coverageAmount}
                          </td>
                          <td className='p-4'>
                            ${billing.insurance.deductible}
                          </td>
                          <td className='p-4'>
                            {convertDate(billing.billingDate)}
                          </td>
                          <td className='p-4'>${billing.totalAmount}</td>
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

export default AllBillings;
