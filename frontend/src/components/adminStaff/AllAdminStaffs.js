import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllAdminStaffs = () => {
  const [allAdminStaffs, setAllAdminStaffs] = useState([]);

  useEffect(() => {
    const fetchAdminStaffs = async () => {
      const res = await axios.get('http://localhost:5005/api/adminStaffs');
      setAllAdminStaffs(res.data);
      console.log(res.data);
    };
    fetchAdminStaffs();
  }, []);
  return (
    <>
      <Link to='/admin-staff/add'> Add Admin Staff </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allAdminStaffs &&
            allAdminStaffs.map((adminStaff, index) => {
              return (
                <tr key={adminStaff._id}>
                  <td> {index + 1}</td>
                  <td>{adminStaff.firstName}</td>
                  <td>{adminStaff.lastName}</td>
                  <td>{adminStaff.role}</td>
                  <td>{adminStaff.phone}</td>
                  <td>{adminStaff.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllAdminStaffs;
