import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllHealthStaffs = () => {
  const [allHealthStaffs, setAllHealthStaffs] = useState([]);

  useEffect(() => {
    const fetchHealthStaffs = async () => {
      const res = await axios.get('http://localhost:5005/api/healthStaffs');
      setAllHealthStaffs(res.data);
      console.log(res.data);
    };
    fetchHealthStaffs();
  }, []);
  return (
    <>
      <Link to='/health-staff/add'> Add Health Staffs </Link> <br /> <br />{' '}
      <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Specialty</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allHealthStaffs &&
            allHealthStaffs.map((healthStaff, index) => {
              return (
                <tr key={healthStaff._id}>
                  <td> {index + 1}</td>
                  <td>{healthStaff.firstName}</td>
                  <td>{healthStaff.lastName}</td>
                  <td>{healthStaff.specialty}</td>
                  <td>{healthStaff.phone}</td>
                  <td>{healthStaff.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllHealthStaffs;
