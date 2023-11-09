import React from 'react';
import { NavLink }from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div className='bg-primary text-white w-1/5 fixed'>
        <h2 className='container mx-auto text-4xl py-8 px-6'>ERStreamline</h2>
        <div className='nav mt-15 h-screen overflow-y-scroll px-4 pt-15 pb-20'>
          {/* <NavLink className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/homepage/login'>Login</NavLink> */}
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/'>Announcements</NavLink> */}

          <NavLink activeClassName="active"  className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/homepage/patient'>Patient</NavLink>

          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/patients'>All Patients</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/patient/add'>Add Patient</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/health-staffs'>Health Staffs</NavLink> 
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/health-staff/add'>Add Health Staff</NavLink> */}
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/health-staff/add'>Add Health Staff</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/labs'>Labs</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/lab/add'>Add Lab</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/patient-lab-reports/'>All Patient Lab Reports</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/patient-lab-report/add'>Add Patient Lab Report</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/admin-staffs'>Admin Staffs</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/admin-staff/add'>Add Admin Staffs</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/insurances'>Insurances</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/insurance/add'>Add Insurance</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/beds'>All Bed</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/bed/add'>Add Bed</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/rooms'>All Rooms</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/room/add'>Add Room</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/ehr-visits'>All EHRVisits</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/ehr-visit/add'>Add EHRVisit</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/admissions'>All Admissions</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/admission/add'>Add Admission</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/medications'>All Medications</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/medication/add'>Add Medication</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/billings'>All Billings</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/billing/add'>Add Billing</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/schedules'>All Schedules</NavLink>
          {/* <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/schedule/add'>Add Schedule</NavLink> */}
          <NavLink activeClassName="active" className='block p-4 mb-1 text-base rounded-xl font-medium  hover:text-primary hover:bg-white transition duration-200' to='/patient-history'>Patient History</NavLink>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
