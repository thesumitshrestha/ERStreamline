import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminStaffDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');
    await axios.get(`http://localhost:5005/api/users/logout`);
    navigate(`/login`);
  };
  return (
    <div className='nav mt-15 h-screen overflow-y-scroll px-4 pt-15 pb-20'>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/'
      >
        Dashboard
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/health-staffs'
      >
        Health Staffs
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/patients'
      >
        All Patients
      </NavLink>

      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/labs'
      >
        Labs
      </NavLink>

      {/* <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/patient-lab-reports/'
      >
        All Patient Lab Reports
      </NavLink> */}
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/insurances'
      >
        Insurances
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/beds'
      >
        All Bed
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/rooms'
      >
        All Rooms
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/admissions'
      >
        All Admissions
      </NavLink>
      {/* <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/medications'
      >
        All Medications
      </NavLink> */}
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/billings'
      >
        All Billings
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/schedules'
      >
        All Schedules
      </NavLink>
      {/* <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/ehr-visits'
      >
        All EHRVisits
      </NavLink> */}
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/patient-history'
      >
        Patient History
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/sign-up'
      >
        Add User
      </NavLink>
      <NavLink
        className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
        to='/'
        onClick={(e) => {
          handleLogout(e);
        }}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default AdminStaffDashboard;
