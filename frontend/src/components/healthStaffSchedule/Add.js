import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [healthStaff, setHealthStaff] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [healthStaffList, setHealthStaffList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getHealthStaff = async () => {
      const res = await axios.get('http://localhost:5005/api/healthStaffs');
      setHealthStaffList(res.data);
    };

    getHealthStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/schedules', {
        healthStaff: healthStaff,
        day: day,
        startTime: startTime,
        endTime: endTime,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Schedule ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-background'>
      <div className='container mx-auto p-large'>
        <form
          className='create p-large gradient rounded-3xl '
          onSubmit={handleSubmit}
        >
          <h3> Add a Schedule of Health Staff</h3>

          <div className='mb-3'>
            <label htmlFor=''>Select Health Staff: </label>
            <select
              name=''
              id='healthStaff'
              value={healthStaff}
              onChange={(e) => setHealthStaff(e.target.value)}
            >
              {healthStaffList.map((healthStaff, idx) => {
                return (
                  <option key={healthStaff._id} value={healthStaff._id}>
                    {healthStaff.firstName} {healthStaff.lastName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Select Day: </label>
            <select
              name=''
              id='day'
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value='Monday'>Monday</option>
              <option value='Tuesday'>Tuesday</option>
              <option value='Wednesday'>Wednesday</option>
              <option value='Thursday'>Thursday</option>
              <option value='Friday'>Friday</option>
              <option value='Saturday'>Saturday</option>
              <option value='Sunday'>Sunday</option>
            </select>
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Start Time
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='time'
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              End Time
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='time'
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            />
          </div>

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
