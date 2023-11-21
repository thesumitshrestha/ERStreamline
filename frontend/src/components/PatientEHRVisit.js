import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import { convertDate, calculateAge } from '../commons/functions';
import avatar from '../images/avatar.png';

const PatientEHRVisit = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState([]);
  const [ehrVisit, setEhrVisit] = useState();
  const [ehrVisitPatientLab, setEhrVisitPatientLab] = useState([]);
  const [ehrVisitMedicationList, setEhrVisitMedicationList] = useState([]);
  const [ehrVisitAdmission, setEhrVisitAdmission] = useState([]);
  const [userData, setUserData] = useState([]);
  const email = window.localStorage.getItem('email');
  const { id } = useParams();

  const getUserData = async () => {
    const res = await axios.get(
      `http://localhost:5005/api/patients/detail/${email}`
    );
    setUserData(res.data);
    console.log('USER DATA is', res.data);
  };

  const getEHRVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/ehrVisits/${id}`)
      .then((response) => {
        console.log('NEW RESPOSE', response.data);
        setEhrVisit(response.data);
      });
  };

  const getLabsByEHRVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/patientLabTest/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW PATIENT LAB RESPONSE', response.data);
        setEhrVisitPatientLab(response.data);
      });
  };

  const getMedicationByEhrVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/medication/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW MEDICAITION RESPONSE', response.data);
        setEhrVisitMedicationList(response.data);
      });
  };

  const getAdmissionByEhrVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/admissions/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW ADMISSIOn RESPONSE', response.data);
        setEhrVisitAdmission(response.data);
      });
  };

  const getCurrentUserData = async () => {
    const res = await axios.get(
      `http://localhost:5005/api/${window.localStorage.getItem(
        'role'
      )}/detail/${window.localStorage.getItem('email')}`
    );

    setCurrentUser(res.data);
  };

  useEffect(() => {
    getEHRVisit();
    getLabsByEHRVisit();
    getMedicationByEhrVisit();
    getAdmissionByEhrVisit();
    getUserData();
    getCurrentUserData();
  }, []);

  return (
    <>
      <div className='flex'>
        <Dashboard
          name={currentUser?.firstName + ' ' + currentUser?.lastName}
          userId={currentUser?._id}
          role={window.localStorage.getItem('role')}
        />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-large'>
            <h3 className='mb-10 font-bold text-3xl'>EhrVisit Details</h3>
            <div className='p-small gradient rounded-3xl mt-10 basis-2/4'>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <div className='user-profile flex justify-center mt-[-86px]'>
                      <img
                        className='h-32 w-32 overflow-hidden rounded-full border-2 border-primary object-cover '
                        src={avatar}
                        alt='Avatar'
                      />
                    </div>
                    <div className='text-center mt-3'>
                      <h4>
                        <b>
                          {' '}
                          {ehrVisit?.patient?.firstName}{' '}
                          {ehrVisit?.patient?.lastName}
                        </b>
                      </h4>
                      <p>
                        {calculateAge(ehrVisit?.patient?.dateOfBirth)} Years
                      </p>
                    </div>
                    {/* <h4>
                      <b> EhrVisit Details</b>
                    </h4> */}
                    <ul className='flex items-center justify-between p-0 mt-4 mb-0 '>
                      <li className='text-center w-1/3'>
                        <h6 className='text-primary'>Height</h6>
                        <h3>{ehrVisit?.height}</h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/3'>
                        <h6 className='text-primary'>Weight</h6>
                        <h3>{ehrVisit?.weight} lbs</h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/3'>
                        <h6 className='text-primary'>Blood Pressure</h6>
                        <h3 className='text-warning'>
                          {ehrVisit?.bloodPressure}
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-small gradient rounded-3xl mt-10 basis-2/4'>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <h3 className='text-center mb-10'>
                      <b> Medical Information</b>
                    </h3>
                    <ul className='flex flex-wrap items-center justify-between p-0 mt-4 mb-0 '>
                      <li className='text-center w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Health Staff</h6>
                        <h3>
                          {ehrVisit?.healthStaff?.firstName} &nbsp;
                          {ehrVisit?.healthStaff?.lastName}
                        </h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Visit Date</h6>
                        <h3>{convertDate(ehrVisit?.visitDate)}</h3>
                      </li>
                      <li className='text-center w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Diagnosis</h6>
                        <h3 className='text-warning'>{ehrVisit?.diagnosis}</h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Follow Up Instructions</h6>
                        <h3>{ehrVisit?.followUpInstructions}</h3>
                      </li>
                      <li className='text-center w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Procedure</h6>
                        <h3>{ehrVisit?.procedure}</h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Medical History</h6>
                        <h3>{ehrVisit?.medicalHistory}</h3>
                      </li>
                      <li className='text-center w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Prescribed Medication</h6>
                        <h3>{ehrVisit?.prescribedMedications}</h3>
                      </li>
                    </ul>
                    {/* contact info */}
                  </div>
                </div>
              </div>
            </div>
            {/* Lab report */}
            <div className='bg-white rounded-3xl shadow-lg p-5 mt-10'>
              <h3 className='text-center mb-10'>
                <b>Lab Results</b>
              </h3>
              <div className='text-sm mt-4'>
                {ehrVisitPatientLab.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th className='p-4'>Lab Name</th>
                        <th className='p-4'>Lab Report</th>
                        <th className='p-4'>Amount</th>
                        <th className='p-4'>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ehrVisitPatientLab.map((lab, idx) => (
                        <tr key={idx}>
                          <td className='p-4'>{lab?.lab?.name}</td>
                          <td className='p-4'>
                            <button
                              className='underline text-primary'
                              onClick={(e) => {
                                window.open(
                                  `http://localhost:5005/reports/${lab?.report}`,
                                  '_blank',
                                  'noreferrer'
                                );
                              }}
                            >
                              Show Lab Report
                            </button>
                          </td>
                          <td className='p-4 font-bold text-secondary'>
                            ${lab?.labFee}
                          </td>
                          <td className='p-4'>{convertDate(lab?.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  'No Lab Test Found'
                )}
              </div>
            </div>
            {/* Medication */}
            <div className='bg-white rounded-3xl shadow-lg p-5 mt-10'>
              <h3 className='text-center mb-10'>
                <b>Medication</b>
              </h3>
              <div className='text-sm mt-4'>
                {ehrVisitMedicationList.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th className='p-4'> S.N.</th>
                        <th className='p-4'>Medication Name</th>
                        <th className='p-4'>Dosage</th>
                        <th className='p-4'>Medication Cost</th>
                        <th className='p-4'>Prescribed Date</th>
                        <th className='p-4'>Health Staff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ehrVisitMedicationList.map((med, idx) => {
                        return (
                          <tr key={idx}>
                            <td className='p-4'>{idx + 1}</td>
                            <td className='p-4'>{med?.medicationName}</td>
                            <td className='p-4'>{med?.dosage}</td>
                            <td className='p-4 font-bold text-secondary'>
                              ${med?.medicineCost}{' '}
                            </td>
                            <td className='p-4'>
                              {convertDate(med?.prescribedDate)}{' '}
                            </td>
                            <td className='p-4'>
                              {med?.healthStaff.firstName} &nbsp;{' '}
                              {med?.healthStaff.lastName}{' '}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  'No Medication Found'
                )}
              </div>
            </div>
            {/* Admission */}
            <div className='bg-white rounded-3xl shadow-lg p-5 mt-10'>
              <h3 className='text-center mb-10'>
                <b>Admissions</b>
              </h3>
              <div className='text-sm mt-4'>
                {ehrVisitAdmission.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th className='p-4'> S.N.</th>
                        <th className='p-4'>Bed Number</th>
                        <th className='p-4'>Admission Date</th>
                        <th className='p-4'>Discharge Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ehrVisitAdmission.map((admission, idx) => {
                        return (
                          <tr key={idx}>
                            <td className='p-4'>{idx + 1}</td>
                            <td className='p-4'>
                              {admission?.bedNumber.roomNumber.roomNumber}
                              {admission?.bedNumber.bedNumber.bedNumber}
                            </td>
                            <td className='p-4'>
                              {convertDate(admission?.admissionDate)}{' '}
                            </td>
                            <td className='p-4'>
                              {convertDate(admission?.dischargeDate)}{' '}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  'No Admission Found'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientEHRVisit;
