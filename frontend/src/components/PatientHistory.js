import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const PatientHistory = () => {
  const [allPatient, setAllPatient] = useState([]);

  useEffect(() => {
    const getAllPatient = async () => {
      await axios.get('http://localhost:5005/api/patients').then((response) => {
        setAllPatient(response.data);
      });
    };

    getAllPatient();  
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
              <h3 className='mb-10 font-bold text-3xl'>
                 Patient List 
              </h3>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <h4 className='p-4 mb-2 font-bold'>Patient Name</h4>
              {allPatient &&
                allPatient.map((patient, index) => {
                  return (
                    <p className='p-4' key={patient._id}>
                      <Link className='text-secondary' to={`/patient-history/${patient._id}`}>
                        {patient?.firstName + ' ' + patient?.lastName}{' '}
                      </Link>
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHistory;
