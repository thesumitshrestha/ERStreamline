import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div class='bg-primary py-small'>
        <h2 class='container mx-auto text-white text-5xl px-5'> ERStreamline</h2>
      </div>
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
