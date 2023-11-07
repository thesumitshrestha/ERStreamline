import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllInsurances = () => {
  const [allInsurances, setAllInsurance] = useState([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      const res = await axios.get('http://localhost:5005/api/insurance');
      setAllInsurance(res.data);
      console.log(res.data);
    };
    fetchInsurances();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link to='/insurance/add' className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'> Add Insurance </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>Policy Number</th>
                    <th className='p-4'>Deductible</th>
                    <th className='p-4'>Coverage Amount</th>
                    <th className='p-4'>Insurance Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {allInsurances &&
                    allInsurances.map((insurance, index) => {
                      return (
                        <tr key={insurance._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {insurance.patient.firstName} {insurance.patient.lastName}
                          </td>
                          <td className='p-4'>{insurance.policyNumber}</td>
                          <td className='p-4'>{insurance.deductible}</td>
                          <td className='p-4'>{insurance.coverageAmount}</td>
                          <td className='p-4'>{insurance.insuranceProvider}</td>
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

export default AllInsurances;
