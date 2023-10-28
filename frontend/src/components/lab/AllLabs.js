import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllLabs = () => {
  const [allLabs, setAllLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      const res = await axios.get('http://localhost:5005/api/labs');
      setAllLabs(res.data);
      console.log(res.data);
    };
    fetchLabs();
  }, []);
  return (
    <>
      <Link to='/lab/add'> Add Lab </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allLabs &&
            allLabs.map((lab, index) => {
              return (
                <tr key={lab._id}>
                  <td> {index + 1}</td>
                  <td>{lab.name}</td>
                  <td>{lab.address}</td>
                  <td>{lab.phone}</td>
                  <td>{lab.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllLabs;
