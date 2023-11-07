import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllEhrVisit = () => {
  const [allEhrVisits, setAllEhrVisits] = useState([]);

  useEffect(() => {
    const fetchEHRVisits = async () => {
      const res = await axios.get('http://localhost:5005/api/ehrVisits');
      setAllEhrVisits(res.data);
      console.log(res.data);
    };
    fetchEHRVisits();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link to='/ehr-visit/add' className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'> Add EHR Visit </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>Health Staff</th>
                    <th className='p-4'>Prescribed Medications</th>
                    <th className='p-4'>Followup Instructions</th>
                    <th className='p-4'>Diagnosis</th>
                    <th className='p-4'>Procedure</th>
                    <th className='p-4'>Visit Date</th>
                    <th className='p-4'>Height </th>
                    <th className='p-4'>Weight </th>
                    <th className='p-4'>Blood Pressure </th>
                    <th className='p-4'>Medical History </th>
                  </tr>
                </thead>
                <tbody>
                  {allEhrVisits &&
                    allEhrVisits.map((ehrvisit, index) => {
                      return (
                        <tr key={ehrvisit._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {ehrvisit.patient.firstName} {ehrvisit.patient.lastName}
                          </td>
                          <td className='p-4'>
                            {ehrvisit.healthStaff.firstName}{' '}
                            {ehrvisit.healthStaff.lastName}
                          </td>
                          <td className='p-4'>{ehrvisit.prescribedMedications}</td>
                          <td className='p-4'>{ehrvisit.followUpInstructions}</td>
                          <td className='p-4'>{ehrvisit.diagnosis}</td>
                          <td className='p-4'>{ehrvisit.procedure}</td>
                          <td className='p-4'>{ehrvisit.visitDate}</td>
                          <td className='p-4'>{ehrvisit.height}</td>
                          <td className='p-4'>{ehrvisit.weight}</td>
                          <td className='p-4'>{ehrvisit.bloodPressure}</td>
                          <td className='p-4'>{ehrvisit.medicalHistory}</td>
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

export default AllEhrVisit;
