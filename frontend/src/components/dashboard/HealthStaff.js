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
  const [filteredData, setFilteredData] = useState([]);

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

      doctorSchedules.map((doc, idx) => {
        let name = res.data.firstName + ' ' + res.data.lastName;
        if (doctorSchedules[idx].Subject === name) {
          doctorSchedules.filter((healthStaff) => {
            mySchedule.push({
              Id: idx,
              Subject: doctorSchedules[idx].Subject,
              StartTime: doctorSchedules[idx].StartTime,
              EndTime: doctorSchedules[idx].EndTime,
              isAllDay: false,
            });
          });
        }
      });

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

  const eventSettings = { dataSource: mySchedule };

  return (
    <>
      <div className='flex'>
        <Dashboard
          name={userData?.firstName + ' ' + userData?.lastName}
          userId={userData?._id}
          role={window.localStorage.getItem('role')}
        />
        <div className='bg-background w-3/4 content'>
          <div className='container mx-auto p-small'>
            {/* patient details */}
            <div className='p-medium gradient rounded-3xl '>
              {mySchedule}
              {mySchedule.map((test, idx) => {
                return <>Name: {test[idx].Subject}</>;
              })}
              Length is :{mySchedule.length}
              {/* {doctorSchedules
                .filter((healthStaff) => {
                    filteredData = 
                healthStaff.Subject ===
                      (userData?.firstName + ' ' + userData?.lastName)
                      setFilteredData(healthStaff); }
                  );
                })
                .map((test) => {
                  return (
                    <>
                      {test.Subject} | {test.Id} |{' '}
                      {convertDate(test?.StartTime)}
                      {convertDate(test?.EndTime)}
                    </>
                  );
                })} */}
              <div className='flex'>
                <ScheduleComponent
                  width='60%'
                  height='550px'
                  selectedDate={new Date(2023, 11, 11)}
                  // selectedDate={new Date(2018, 1, 15)}
                  eventSettings={eventSettings}
                >
                  <ViewsDirective>
                    <ViewDirective
                      option='today'
                      interval={1}
                      displayName='2 Weeks'
                      showWeekend={true}
                      isSelected={true}
                    />
                  </ViewsDirective>
                  <Inject services={[Day, Week]} />
                </ScheduleComponent>

                <div className='block pl-5 w-100 mx-auto'>
                  <div className='card-body'>
                    <div className='user-details-block'>
                      <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
                        Today's Date:{' '}
                        {moment(Date.now()).format('MMMM D, YYYY')} <br />
                        <br />
                        TOTAL PATIENTS <br /> <br />
                        <span
                          className='mt-5'
                          style={{
                            color: 'teal',
                            fontSize: '44px',
                            marginTop: '10px',
                            fontWeight: 'bold',
                          }}
                        >
                          {patientData?.length}
                        </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthStaff;
