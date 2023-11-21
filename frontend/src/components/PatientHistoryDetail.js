import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { convertDate } from '../commons/functions';
import Dashboard from './dashboard/Dashboard';

const PatientHistoryDetail = () => {
  const { id } = useParams();

  const [patientDetail, setPatientDetail] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);
  const [userData, setUserData] = useState([]);
  const email = window.localStorage.getItem('email');
  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/patients/detail/${email}`
      );
      setUserData(res.data);
      console.log('USER DATA is', res.data);
    };

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
    getUserData();
  }, []);

  return (
    <>
      <div className='flex'>
        <Dashboard
          name={userData?.firstName + ' ' + userData?.lastName}
          userId={userData?._id}
        />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-large'>
            <h3 className='mb-10 font-bold text-3xl'>Patient Details</h3>

            {/* All EHR Visits */}
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
                                <Link
                                  className='text-secondary'
                                  to={`/ehr-visit/${ehrVisit?._id}`}
                                >
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
