import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllPatients = () => {
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setAllPatients(res.data);
      console.log(res.data);
    };
    fetchPatients();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link to='/patient/add' className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'> Add Patient </Link> <br /> <br /> <br />
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>First Name</th>
                    <th className='p-4'>Last Name</th>
                    <th className='p-4'>Date of Birth</th>
                    <th className='p-4'>Address</th>
                    <th className='p-4'>Phone</th>
                    <th className='p-4'>Email</th>
                    <th className='p-4'>Gender</th>
                    <th className='p-4'>Blood Group</th>
                    <th className='p-4'>Emergency Contact Name</th>
                    <th className='p-4'>Emergency Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {allPatients &&
                    allPatients.map((patient, index) => {
                      return (
                        <tr key={patient._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{patient.firstName}</td>
                          <td className='p-4'>{patient.lastName}</td>
                          <td className='p-4'>{patient.dateOfBirth}</td>
                          <td className='p-4'>{patient.address}</td>
                          <td className='p-4'>{patient.phone}</td>
                          <td className='p-4'>{patient.email}</td>
                          <td className='p-4'>{patient.gender}</td>
                          <td className='p-4'>{patient.bloodGroup}</td>
                          <td className='p-4'>{patient.emergencyContactName}</td>
                          <td className='p-4'>{patient.emergencyContactNumber}</td>
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

export default AllPatients;
