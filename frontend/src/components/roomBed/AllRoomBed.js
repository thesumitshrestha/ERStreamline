import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const AllRoomBed = () => {
  const [allRoomBeds, setAllRoomBeds] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/roomBeds');
      setAllRoomBeds(res.data);
      console.log(res.data);
    };
    fetchPatients();
  }, []);
  return (
    <>
      <Dashboard />
      <div className='bg-background w-4/5 content'>
        <div className='container px-5 py-medium'>
          <Link
            to='/roomBed/add'
            className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
          >
            {' '}
            Link Room Bed{' '}
          </Link>
          <br /> <br /> <br />
          <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
            <table>
              <thead>
                <tr>
                  <th className='p-4'> S.N.</th>
                  <th className='p-4'>Room Number</th>
                  <th className='p-4'>Bed Number</th>
                  <th className='p-4'>Available</th>
                </tr>
              </thead>
              <tbody>
                {allRoomBeds &&
                  allRoomBeds.map((room, index) => {
                    return (
                      <tr key={room._id}>
                        <td className='p-4'> {index + 1}</td>
                        <td className='p-4'>{room.roomNumber.roomNumber}</td>
                        <td className='p-4'>{room.bedNumber.bedNumber}</td>
                        <td className='p-4'>
                          {JSON.stringify(room.isAvailable) === 'false'
                            ? 'No'
                            : 'Yes'}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRoomBed;
