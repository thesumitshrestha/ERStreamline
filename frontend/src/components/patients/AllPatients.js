import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPatients = () => {
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setAllPatients(res.data);
      console.log(res.data);
    };
    fetchPatients();
  }, []);
  return (
    <>
      <Link to='/patient/add'> Add Patient </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {allPatients &&
            allPatients.map((patient, index) => {
              return (
                <tr key={patient._id}>
                  <td> {index + 1}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.address}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.bloodGroup}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllPatients;
