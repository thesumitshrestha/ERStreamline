import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import moment from 'moment';

import {
  ScheduleComponent,
  Day,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
} from '@syncfusion/ej2-react-schedule';

const AllSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const timeScale = { enable: true, slotCount: 5 };
  const today = new Date();
  console.log('TODAY DATE', moment(today).format('YYYY,MM,DD'));

  const data = [
    {
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2023, 11, 10, 10, 0),
      EndTime: new Date(2023, 11, 10, 11, 30),
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High',
    },
  ];

  useEffect(() => {
    const fetchAllHealthStaffSchedules = async () => {
      const res = await axios.get('http://localhost:5005/api/schedules');
      setSchedules(res.data);
      console.log('SCHEDULE', res.data);
    };
    fetchAllHealthStaffSchedules();
  }, []);

  const eventSettings = { dataSource: data };

  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link
              to='/schedule/add'
              className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
            >
              Add Schedule
            </Link>
            {/* <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Health Staff Name</th>
                    <th className='p-4'>Day</th>
                    <th className='p-4'>Start Time</th>
                    <th className='p-4'>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules &&
                    schedules.map((schedule, index) => {
                      return (
                        <tr key={schedule._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            {schedule.healthStaff?.firstName} &nbsp;
                            {schedule.healthStaff?.lastName}
                          </td>
                          <td className='p-4'>{schedule.day}</td>
                          <td className='p-4'>{schedule.startTime}</td>
                          <td className='p-4'>{schedule.endTime}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div> */}
            <ScheduleComponent
              width='100%'
              height='550px'
              selectedDate={new Date(moment(today).format('YYYY, MM, DD'))}
              eventSettings={eventSettings}
            >
              <ViewsDirective>
                {/* <ViewDirective
                  option='Day'
                  interval={2}
                  displayName='2 Days'
                  startHour='06:30'
                  endHour='00:00'
                  timeScale={timeScale}
                /> */}
                <ViewDirective
                  option='Week'
                  interval={2}
                  displayName='2 Weeks'
                  showWeekend={true}
                  isSelected={true}
                />
              </ViewsDirective>
              <Inject services={[Day, Week]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSchedules;
