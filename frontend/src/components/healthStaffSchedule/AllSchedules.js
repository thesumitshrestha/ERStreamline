import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Link to='/schedule/add'> Add Schedule </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Health Staff Name</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule, index) => {
              return (
                <tr key={schedule._id}>
                  <td> {index + 1}</td>
                  <td>
                    {schedule.healthStaff?.firstName} &nbsp;
                    {schedule.healthStaff?.lastName}
                  </td>
                  <td>{schedule.day}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllSchedules;
