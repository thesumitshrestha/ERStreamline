import React, { useEffect, useState } from 'react';

import Dashboard from './Dashboard';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { calculateAge, convertDate } from '../../commons/functions';
import { doctorSchedules } from '../healthStaffSchedule/schedules';
import moment from 'moment';

import {
  ScheduleComponent,
  Day,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
} from '@syncfusion/ej2-react-schedule';

const HealthStaff = () => {
  const location = useLocation();
  let mySchedule = [];
  const [userData, setUserData] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);
  const [totalBills, setTotalBills] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [filter, setFilter] = useState([]);

  if (location?.state?.email) {
    window.localStorage.setItem('email', location?.state?.email);
  }
  const email = window.localStorage.getItem('email');
  useEffect(() => {
    // setFilteredData(doctorSchedules);
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/healthStaffs/detail/${email}`
      );

      setUserData(res.data);

      // doctorSchedules.map((doc, idx) => {
      //   let name = res.data.firstName + ' ' + res.data.lastName;
      //   if (doctorSchedules[idx].Subject === name) {
      //     doctorSchedules.filter((healthStaff) => {
      //       mySchedule.push({
      //         Id: idx,
      //         Subject: doctorSchedules[idx].Subject,
      //         StartTime: doctorSchedules[idx].StartTime,
      //         EndTime: doctorSchedules[idx].EndTime,
      //         isAllDay: false,
      //       });
      //     });
      //   }
      // });

      await axios
        .get(`http://localhost:5005/api/ehrVisits/patient/${res?.data?._id}`)
        .then((response) => {
          setEhrVisits(response.data);
          console.log('Total', response.data);
          console.log(
            'HERE in EHRVISIT GET BILLING, ID is',
            response?.data[0]?._id
          );

          axios
            .get(
              `http://localhost:5005/api/ehrVisits/healthStaff/${res?.data?._id}`
            )
            .then((ehrResponse) => {
              setPatientData(ehrResponse.data);
              console.log('HEALTH STAFF EHR DATA', ehrResponse.data);
            });

          if (response.length > 0) {
            console.log('LENGTH IS GREATER', response.length);
            axios
              .get(
                `http://localhost:5005/api/billings/ehrVisit/${response?.data[0]?._id}`
              )
              .then((response) => {
                console.log('Total Bills', response?.data);
                setTotalBills(response?.data);
              });
          }
        });
    };

    const getEHRVisitsOfPatients = async () => {};
    getEHRVisitsOfPatients();
    getUserData();
  }, []);

  let filteredData = doctorSchedules;
  const userName = userData?.firstName + ' ' + userData?.lastName;
  filteredData = doctorSchedules.filter(
    (item, idx) => item.Subject === userName
  );

  const eventSettings = { dataSource: filteredData };

  return (
    <>
      <Dashboard
        name={userData?.firstName + ' ' + userData?.lastName}
        userId={userData?._id}
        role={window.localStorage.getItem('role')}
      />
      <div className='w-3/4 content'>
        <div className='container mx-auto p-small'>
          <br />
          <br />

          {/* patient details */}

          {filter.map((test, idx) => {
            return (
              <>
                <p> HELLO</p>
              </>
            );
          })}

          <Link
            to='/ehr-visit/add'
            className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
          >
            {' '}
            Add EHRVisit{' '}
          </Link>
          <div className='p-medium gradient rounded-3xl mt-10'>
            Today's Date:{' '}
            <span className='text-secondary font-bold'>
              {moment(Date.now()).format('MMMM D, YYYY')} <br />
            </span>
            <br />
            <div className='text-center'></div>
            <b> TOTAL Patients </b>
            <span
              className='mt-5 block'
              style={{
                color: 'teal',
                fontSize: '44px',
                marginTop: '10px',
                fontWeight: 'bold',
              }}
            >
              {patientData?.length}
            </span>
          </div>
          <div className='p-medium bg-white rounded-3xl mt-10'>
            <div className='flex justify-between'>
              <div className='block pl-5 w-100 mx-auto w-1/2'>
                <div className='card-body'>
                  <div className='user-details-block mr-10'>
                    <h2
                      style={{
                        fontSize: '18px',
                        color: 'teal',
                        fontWeight: 'bold',
                        backgroundColor: 'white',
                        padding: '20px',
                        marginBottom: '20px',
                      }}
                    >
                      {' '}
                      Patient Information{' '}
                    </h2>
                    <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
                      <table>
                        <thead>
                          <tr>
                            <th className='p-4'> S.N.</th>
                            <th className='p-4'>Patient Name</th>
                            <th className='p-4'>Date Visited</th>
                          </tr>
                        </thead>
                        <tbody>
                          {patientData.map((patient, idx) => {
                            return (
                              <tr key={idx}>
                                <td className='p-4'>{idx + 1}</td>
                                <td className='p-4'>
                                  <Link
                                    to={`/patient/${patient?.patient?._id}`}
                                    style={{
                                      color: 'teal',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {patient?.patient?.firstName +
                                      '  ' +
                                      patient?.patient?.lastName}{' '}
                                  </Link>
                                </td>
                                <td className='p-4'>
                                  {convertDate(patient?.visitDate)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='calender'>
                <h2
                  style={{
                    fontSize: '18px',
                    color: 'teal',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    padding: '20px',
                    marginBottom: '20px',
                  }}
                >
                  {' '}
                  Today's Schedule
                </h2>
                <ScheduleComponent
                  width='100%'
                  height='550px'
                  selectedDate={new Date(2023, 10, 27)}
                  // selectedDate={new Date(2018, 1, 15)}
                  eventSettings={eventSettings}
                >
                  <ViewsDirective>
                    <ViewDirective
                      option='Day'
                      interval={1}
                      displayName='2 Weeks'
                      showWeekend={true}
                      isSelected={true}
                    />
                  </ViewsDirective>
                  <Inject services={[Day]} />
                </ScheduleComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthStaff;
