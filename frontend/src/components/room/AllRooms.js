import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Link to='/room/add'> Add Room </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Room Number</th>
            <th>Bed Number</th>
          </tr>
        </thead>
        <tbody>
          {allRoom &&
            allRoom.map((room, index) => {
              return (
                <tr key={room._id}>
                  <td> {index + 1}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.bedNumber[0]?.bedNumber}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllRooms;
