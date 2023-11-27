import axios from 'axios';
// import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HealthStaffDashboardSideBar from './HealthStaffDashboardSideBar';
import AdminStaffDashboard from './AdminStaffDashboardSidebar';
import avatar from '../../images/avatar.png';
import React, { useState, useEffect } from 'react';

const Dashboard = ({ name, userId, role }) => {
  const navigate = useNavigate();
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('role');
    await axios.get(`http://localhost:5005/api/users/logout`);
    navigate(`/login`);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isLogoutVisible &&
        e.target.closest('.user-profile') === null &&
        e.target.closest('.logout') === null
      ) {
        setIsLogoutVisible(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [isLogoutVisible]);
  return (
    <>
      <div className='bg-primary text-white w-1/5 fixed'>
        <h2 className='container mx-auto text-4xl py-8 px-6'>ERStreamline</h2>
        <h6 className='container mx-auto text-l py-8 px-6'>
          Welcome <span className='ml-2 text-secondary font-bold'>{name}</span>
          <br />
          {/* {role === "healthStaffs"
            ? "Role: Health Staff"
            : role === "adminStaffs"
            ? "Role: Admin Staff"
            : ""} */}
          {role && (
            <div className='user-role'>
              Role:{' '}
              <span className='ml-2 text-secondary font-bold'>
                {role === 'healthStaffs'
                  ? 'Health Staff'
                  : role === 'adminStaffs'
                  ? 'Admin Staff'
                  : ''}
              </span>
            </div>
          )}
        </h6>

        {/* Patient Dashboard Side */}
        {window.localStorage.getItem('role') === 'patients' && (
          <div className='nav mt-15 h-screen overflow-y-scroll px-4 pt-15 pb-36'>
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

            {/* <NavLink
              className="block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200"
              to="/"
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              Logout
            </NavLink> */}
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
        {/* logout button on top right corner starts */}
        <div
          className='user-profile fixed top-8 right-10 cursor-pointer'
          onClick={() => setIsLogoutVisible(!isLogoutVisible)}
        >
          <div className='flex justify-center text-primary items-center bg-white shadow-lg p-4 rounded-full'>
            <img
              className='h-10 w-10 overflow-hidden rounded-full border-2 border-primary object-cover'
              src={avatar}
              alt='Avatar'
            />
            <div className='ml-2 text-sm font-semibold'>{name}</div>
          </div>
          <div
            className={`logout absolute p-4 rounded-xl top-full right-0 ${
              isLogoutVisible ? 'block' : 'hidden'
            } w-full bg-primary`}
          >
            <NavLink
              className='text-base text-white font-medium  transition duration-200 w-full block'
              to='/'
              onClick={(e) => {
                handleLogout(e);
              }}
            >
              Logout
            </NavLink>
          </div>
        </div>
        {/* logout button on top right corner ends*/}
      </div>
    </>
  );
};

export default Dashboard;
