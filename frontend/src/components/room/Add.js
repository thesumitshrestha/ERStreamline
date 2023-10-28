import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [bedList, setBedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBedList = async () => {
      const res = await axios.get('http://localhost:5005/api/beds');
      setBedList(res.data);
    };
    getBedList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/rooms', {
        bedNumber: bedNumber,
        roomNumber: roomNumber,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Room ADDED');
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
          <h3> Add Room </h3>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Room Number:
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setRoomNumber(e.target.value)}
              value={roomNumber}
            />
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
              {bedList.map((bed, idx) => {
                return (
                  <option key={bed._id} value={bed._id}>
                    {bed.bedNumber}{' '}
                  </option>
                );
              })}
            </select>
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
