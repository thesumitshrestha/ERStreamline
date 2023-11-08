import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Link to='/roomBed/add'> Add RoomBed </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Room Number</th>
            <th>Bed Number</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {allRoomBeds &&
            allRoomBeds.map((room, index) => {
              return (
                <tr key={room._id}>
                  <td> {index + 1}</td>
                  <td>{room.roomNumber.roomNumber}</td>
                  <td>{room.bedNumber.bedNumber}</td>
                  <td>
                    {JSON.stringify(room.isAvailable) === 'false'
                      ? 'No'
                      : 'Yes'}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllRoomBed;
