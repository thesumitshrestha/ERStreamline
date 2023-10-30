import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div class='bg-primary py-small'>
        <h2 class='container mx-auto text-white text-5xl px-5'>ERStreamline</h2>
      </div>
      <Link to='/patients'>All Patients</Link> <br />
      <Link to='/patient/add'>Add Patient</Link> <br />
      <br />
      <Link to='/health-staffs'>Health Staffs</Link> <br />
      <Link to='/health-staff/add'>Add Health Staff</Link> <br />
      <br />
      <Link to='/labs'>Labs</Link>
      <br />
      <Link to='/lab/add'>Add Lab</Link>
      <br />
      <br />
      <Link to='/patient-lab-reports/'>All Patient Lab Reports</Link>
      <br />
      <Link to='/patient-lab-report/add'>Add Patient Lab Report</Link>
      <br />
      <br />
      <Link to='/admin-staffs'>Admin Staffs</Link>
      <br />
      <Link to='/admin-staff/add'>Add Admin Staffs</Link>
      <br />
      <br />
      <Link to='/insurances'>Insurances</Link>
      <br />
      <Link to='/insurance/add'>Add Insurance</Link>
      <br />
      <br />
      <Link to='/beds'>All Bed</Link>
      <br />
      <Link to='/bed/add'>Add Bed</Link>
      <br />
      <br />
      <Link to='/rooms'>All Rooms</Link>
      <br />
      <Link to='/room/add'>Add Room</Link>
      <br />
      <br />
      <Link to='/ehr-visits'>All EHRVisits</Link>
      <br />
      <Link to='/ehr-visit/add'>Add EHRVisit</Link>
      <br />
      <br />
      <Link to='/admissions'>All Admissions</Link>
      <br />
      <Link to='/admission/add'>Add Admission</Link>
      <br />
      <br />
      <Link to='/medications'>All Medications</Link>
      <br />
      <Link to='/medication/add'>Add Medication</Link>
      <br />
      <br />
      <Link to='/billings'>All Billings</Link>
      <br />
      <Link to='/billing/add'>Add Billing</Link>
      <br />
      <br />
      <Link to='/schedules'>All Schedules</Link>
      <br />
      <Link to='/schedule/add'>Add Schedule</Link>
    </div>
  );
};

export default Dashboard;
