import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import {
  Scheduler,
  WeekView,
  WorkWeekView,
} from '@progress/kendo-react-scheduler';

const AllSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchAllHealthStaffSchedules = async () => {
      const res = await axios.get('http://localhost:5005/api/schedules');
      setSchedules(res.data);
      console.log(res.data);
    };
    fetchAllHealthStaffSchedules();
  }, []);
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
              {' '}
              Add Schedule
            </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSchedules;
