import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [isAvailable, setIsAvailable] = useState('');
  const [bedList, setBedList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBedList = async () => {
      const res = await axios.get('http://localhost:5005/api/beds');
      setBedList(res.data);
    };

    const getRoomList = async () => {
      const res = await axios.get('http://localhost:5005/api/rooms');
      setRoomList(res.data);
    };
    getBedList();
    getRoomList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/roomBeds', {
        bedNumber: bedNumber,
        roomNumber: roomNumber,
        isAvailable: isAvailable,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Room Bed ADDED');
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
          <h3> Link Room Bed</h3>

          <div className='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Select Room Number
            </label>

            <select
              name=''
              id='roomNumber'
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            >
              <option selected value=''>
                Select Room Number
              </option>
              {roomList.map((room, idx) => {
                return (
                  <option key={room._id} value={room._id}>
                    {room.roomNumber}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Bed Number
            </label>

            <select
              name=''
              id='bedNumber'
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            >
              <option selected value=''>
                Select Bed Number
              </option>
              {bedList.map((bed, idx) => {
                return (
                  <option key={bed._id} value={bed._id}>
                    {bed.bedNumber}{' '}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Available:
            </label>
            <input
              type='radio'
              name='isAvailable'
              className='p-2.5 text-textLight shadow rounded outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              value='true'
              checked={isAvailable === 'true'}
              onChange={(e) => setIsAvailable(e.target.value)}
            />
              <label for='yes'>Yes</label>
            &nbsp;&nbsp;
            <input
              type='radio'
              name='isAvailable'
              className='p-2.5 text-textLight shadow rounded outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              value='false'
              checked={isAvailable === 'false'}
              onChange={(e) => setIsAvailable(e.target.value)}
            />
              <label for='no'>No</label>
          </div>

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
