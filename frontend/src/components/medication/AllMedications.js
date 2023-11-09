import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllMedications = () => {
  const [allMedications, setAllMedications] = useState([]);

  useEffect(() => {
    const fetchAllMedications = async () => {
      const res = await axios.get('http://localhost:5005/api/medication');
      setAllMedications(res.data);
      console.log(res.data);
    };
    fetchAllMedications();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'></div>
          <div className='container px-5 py-medium'>
            <Link
              to='/medication/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Medication
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>Health Staff</th>
                    <th className='p-4'>EHR Visit Date</th>
                    <th className='p-4'>Medication Name</th>
                    <th className='p-4'>Prescribed Date</th>
                    <th className='p-4'>Dosage</th>
                    <th className='p-4'>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {allMedications &&
                    allMedications.map((medication, index) => {
                      return (
                        <tr key={medication._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {medication.patient?.firstName}{' '}
                            {medication.patient?.lastName}
                          </td>
                          <td className='p-4'>
                            {medication.healthStaff?.firstName}{' '}
                            {medication.healthStaff?.lastName}
                          </td>
                          <td className='p-4'>
                            {medication.ehrVisit?.visitDate}
                          </td>
                          <td className='p-4'>{medication.medicationName}</td>
                          <td className='p-4'>
                            {convertDate(medication.prescribedDate)}
                          </td>
                          <td className='p-4'>{medication.dosage}</td>
                          <td className='p-4'>{medication.medicineCost}</td>
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

export default AllMedications;
