import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HealthStaffDashboardSideBar from './HealthStaffDashboardSideBar';
import AdminStaffDashboard from './AdminStaffDashboardSidebar';

const Dashboard = ({ name, userId, role }) => {
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
    <>
      <div className='bg-primary text-white w-1/5 fixed'>
        <h2 className='container mx-auto text-4xl py-8 px-6'>ERStreamline</h2>
        <h6 className='container mx-auto text-l py-8 px-6'>
          Welcome {name}
          <br />
          {role === 'healthStaffs'
            ? 'Role: Health Staff'
            : role === 'adminStaffs'
            ? 'Role: Admin Staff'
            : ''}
        </h6>

        {/* Patient Dashboard Side */}
        {window.localStorage.getItem('role') === 'patients' && (
          <div className='nav mt-15 h-screen overflow-y-scroll px-4 pt-15 pb-20'>
            <NavLink
              className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
              to='/patient/dashboard'
            >
              Dashboard
            </NavLink>
            <NavLink
              className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200'
              to={`/patient-history/${userId}`}
            >
              My History
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
        )}

        {/* Admin Staff Dashboard */}
        {window.localStorage.getItem('role') === 'adminStaffs' && (
          <AdminStaffDashboard />
        )}

        {/* Health Staff Dashboard */}
        {window.localStorage.getItem('role') === 'healthStaffs' && (
          <HealthStaffDashboardSideBar />
        )}
      </div>
    </>
  );
};

export default Dashboard;
