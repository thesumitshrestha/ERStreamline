import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllReports = () => {
  const [allPatientReports, setAllPatientReports] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchAllPatientLabReports = async () => {
      const res = await axios.get('http://localhost:5005/api/patientLabTest');
      setAllPatientReports(res.data);
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
    fetchAllPatientLabReports();
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
              to='/patient-lab-report/add'
              className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              {' '}
              Add Patient Lab Report{' '}
            </Link>{' '}
            <br /> <br /> <br />
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Patient Name</th>
                    <th className='p-4'>EHR Visit</th>
                    <th className='p-4'>Lab</th>
                    <th className='p-4'>Lab Fee</th>
                    <th className='p-4'>Report</th>
                    <th className='p-4'>Report Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allPatientReports &&
                    allPatientReports.map((patientReport, index) => {
                      return (
                        <tr key={patientReport._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {patientReport.patient?.firstName}{' '}
                            {patientReport.patient?.lastName}
                          </td>
                          <td className='p-4'>
                            {convertDate(patientReport.ehrvisit?.visitDate)}{' '}
                          </td>
                          <td className='p-4'>{patientReport.lab?.name}</td>
                          <td className='p-4'>{patientReport.labFee}</td>
                          <td className='p-4'>
                            <button
                              onClick={(e) => {
                                window.open(
                                  `http://localhost:5005/reports/${patientReport?.report}`,
                                  '_blank',
                                  'noreferrer'
                                );
                              }}
                              style={{ color: 'red' }}
                            >
                              Show Lab Report
                            </button>
                          </td>
                          <td className='p-4'>
                            {convertDate(patientReport.date)}
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

export default AllReports;
