import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllBed = () => {
  const [allBed, setAllBed] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/beds');
      setAllBed(res.data);
      console.log(res.data);
    };
    fetchPatients();
  }, []);
  return (
    <>
      <Link to='/bed/add'> Add Bed </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Bed Number</th>
          </tr>
        </thead>
        <tbody>
          {allBed &&
            allBed.map((bed, index) => {
              return (
                <tr key={bed._id}>
                  <td> {index + 1}</td>
                  <td>{bed.bedNumber}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllBed;
