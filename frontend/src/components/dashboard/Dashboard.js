import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2> ERStreamline Homepage</h2>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Link to='/patients'>All Patients</Link> <br />
      <Link to='/patient/add'>Add Patient</Link> <br />
      <Link to='/health-staffs'>Health Staffs</Link> <br />
      <Link to='/health-staff/add'>Add Health Staff</Link> <br />
      <Link to='/labs'>Labs</Link>
      <br />
      <Link to='/lab/add'>Add Lab</Link>
      <br />
      <br />
    </div>
  );
};

export default Dashboard;
