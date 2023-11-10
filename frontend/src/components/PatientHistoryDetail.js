import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { convertDate } from '../commons/functions';
import { calculateAge } from '../commons/functions';
import Dashboard from './dashboard/Dashboard';
import avatar from '../images/avatar.png'

const PatientHistoryDetail = () => {
  const { id } = useParams();

  const [patientDetail, setPatientDetail] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);

  useEffect(() => {
    const getPatientDetail = async () => {
      await axios
        .get(`http://localhost:5005/api/patients/${id}`)
        .then((response) => {
          console.log('RESPONSE', response.data);
          setPatientDetail(response.data);
        });
    };

    const getEhrVisits = async () => {
      await axios
        .get(`http://localhost:5005/api/ehrVisits/patient/${id}`)
        .then((response) => {
          setEhrVisits(response.data);
          console.log(response.data);
        });
    };

    getPatientDetail();
    getEhrVisits();
  }, []);

  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-large'>
            <h3 className='mb-10 font-bold text-3xl'>
                Patient Details
            </h3>
            {/* patient details */}
            {/* <div key={id}>
              Name: {patientDetail?.firstName} {patientDetail?.lastName} <br />
              Gender: {patientDetail?.gender} <br />
              Phone: {patientDetail?.phone} <br />
              Address: {patientDetail?.address} <br />
              Date of Birth: {convertDate(patientDetail?.dateOfBirth)} <br />
              Email: {patientDetail?.email} <br />
              Blood Group: {patientDetail?.bloodGroup} <br />
              Emergency Contact Name: {patientDetail?.emergencyContactName} <br />
              Emergency Contact Number: {patientDetail?.emergencyContactNumber} <br />
            </div>
            <br />
            <br />
            Age: {calculateAge(patientDetail?.dateOfBirth)}
            <br />
            <br />
            <h2> All EHR Visits</h2>
            {ehrVisits.length > 0
              ? ehrVisits.map((ehrVisit, idx) => {
                  return (
                    <div key={idx}>
                      <Link to={`/ehr-visit/${ehrVisit?._id}`}>
                        {convertDate(ehrVisit?.visitDate)}
                      </Link>
                    </div>
                  );
                })
              : 'No EHR Visits'} */}
            <div className='p-small gradient rounded-3xl mt-10 basis-2/4' key={id}>
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
                        <b> {patientDetail?.firstName} {patientDetail?.lastName}</b>
                      </h4>
                      <p>{calculateAge(patientDetail?.dateOfBirth)} Years</p>
                    </div>
                    {/* <h4>
                      <b> General Info</b>
                    </h4> */}
                    <ul className='flex items-center justify-between p-0 mt-4 mb-0 '>
                      <li className='text-center w-1/3'>
                        <h6 className='text-primary'>Gender</h6>
                        <h3>
                          {patientDetail?.gender}
                        </h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/3'>
                        <h6 className='text-primary'>DOB</h6>
                        <h3>
                          {convertDate(patientDetail?.dateOfBirth)}
                        </h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/3'>
                        <h6 className='text-primary'>Blood Group</h6>
                        <h3 className='text-warning'>
                          {patientDetail?.bloodGroup}
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='p-small gradient rounded-3xl mt-10 basis-2/4'key={id}>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <h3 className='text-center mb-10'>
                      <b>Admissions</b>
                    </h3>
                    <ul className='flex flex-wrap items-center justify-between p-0 mt-4 mb-0 '>
                      <li className='text-center  w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Phone</h6>
                        <h3>
                          {patientDetail?.phone} 
                        </h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Email</h6>
                        <h3>
                          {patientDetail?.email}
                        </h3>
                      </li>
                      <li className='text-center w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Address</h6>
                        <h3 className='text-warning'>
                          {patientDetail?.address}
                        </h3>
                      </li>
                      <li className='text-center border-l border-secondary w-1/2 p-1 mb-2'>
                        <h6 className='text-primary'>Emergency Contact</h6>
                        <h4>
                          <b> {patientDetail?.emergencyContactName} </b>
                          <p> {patientDetail?.emergencyContactNumber} </p>
                        </h4>
                      </li>
                    </ul>
                    {/* contact info */}
                  </div>
                </div>
              </div>
            </div>
            {/* appointments */}
            <div className='p-small gradient rounded-3xl mt-10'>
              <div className='block '>
                <div className='card-body'>
                  <div className='user-details-block'>
                    <h3 className='text-center mb-10'>
                      <b>All EHR Visits</b>
                    </h3>
                    <ul className='p-0 mt-4 mb-0'>
                        {ehrVisits.length > 0
                        ? ehrVisits.map((ehrVisit, idx) => {
                            return (
                              <li className='flex mb-5' key={idx}>
                                <h6 className='text-primary mr-2'>Date:</h6>
                                <Link className='text-secondary' to={`/ehr-visit/${ehrVisit?._id}`}>
                                  {convertDate(ehrVisit?.visitDate)}
                                </Link>
                              </li>
                            );
                          })
                        : 'No EHR Visits'}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHistoryDetail;
