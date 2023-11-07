import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllRooms = () => {
  const [allRoom, setAllRoom] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/rooms');
      setAllRoom(res.data);
      console.log(res.data);
    };
    fetchPatients();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <Link to='/room/add' className='inline-block px-4 py-2 mb-10 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'> Add Room </Link>
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Room Number</th>
                    <th className='p-4'>Bed Number</th>
                  </tr>
                </thead>
                <tbody>
                  {allRoom &&
                    allRoom.map((room, index) => {
                      return (
                        <tr key={room._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>{room.roomNumber}</td>
                          <td className='p-4'>{room.bedNumber?.bedNumber}</td>
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

export default AllRooms;
