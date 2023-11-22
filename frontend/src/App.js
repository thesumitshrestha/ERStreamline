import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
// import Header from './components/homePage/Header';
import Login from './components/homePage/Login';
import Announcements from './components/homePage/Announcements';
import Patient from './components/dashboard/Patient';
import Add from './components/patients/Add';
import AdddHealthStaff from './components/healthStaff/Add';
import Dashboard from './components/dashboard/Dashboard';
import AllPatients from './components/patients/AllPatients';
import PatientDetail from './components/patients/Patient';
import AllHealthStaffs from './components/healthStaff/AllHealthStaffs';
import AddLabs from './components/lab/Add';
import AllLabs from './components/lab/AllLabs';
import AddPatientLabTest from './components/patientLabTest/Add';
import AllReports from './components/patientLabTest/AllReports';
import AddAdminStaff from './components/adminStaff/Add';
import AllAdminStaffs from './components/adminStaff/AllAdminStaffs';
import AllInsurances from './components/insurance/AllInsurances';
import AddInsurance from './components/insurance/Add';
import AllBed from './components/bed/AllBed';
import AddBed from './components/bed/Add';
import AddRoom from './components/room/Add';
import AllRooms from './components/room/AllRooms';
import AddEHRVisit from './components/ehrVisit/Add';
import AllEhrVisit from './components/ehrVisit/AllEhrVisit';
import AddAdmissions from './components/admissions/Add';
import UpdateAdmissions from './components/admissions/Update';
import AllAdmissions from './components/admissions/AllAdmissions';
import AddMedications from './components/medication/Add';
import AllMedications from './components/medication/AllMedications';
import AddBillings from './components/billing/Add';
import AllBillings from './components/billing/AllBillings';
import AllSchedules from './components/healthStaffSchedule/AllSchedules';
import AddSchedules from './components/healthStaffSchedule/Add';
import AddRoomBed from './components/roomBed/Add';
import AllRoomBed from './components/roomBed/AllRoomBed';
import PatientHistory from './components/PatientHistory';
import PatientHistoryDetail from './components/PatientHistoryDetail';
import PatientEHRVisit from './components/PatientEHRVisit';
import SignUp from './components/homePage/SignUp';
import AdminStaff from './components/dashboard/AdminStaff';
import HealthStaff from './components/dashboard/HealthStaff';
import { Navigate } from 'react-router-dom';

function App() {
  const login = window.localStorage.getItem('isLoggedIn');
  const role = window.localStorage.getItem('role');
  console.log('LOGGGGIN IS', login);
  console.log('ROLEEEE IS', role);

  return (
    <div className='App bg-background'>
      <Routes>
        {/* <Route path='/' element={<Dashboard />} /> */}
        <Route path='/login' element={login ? <Announcements /> : <Login />} />
        {/* <Route path='/homepage/announcements' element={<Announcements />} /> */}
        <Route
          path='/'
          element={
            role === 'patients' ? (
              <Patient />
            ) : role === 'adminStaffs' ? (
              <AdminStaff />
            ) : role === 'healthStaffs' ? (
              <HealthStaff />
            ) : (
              <Announcements />
            )
          }
        />
        <Route path='/patient/dashboard' element={<Patient />} />
        <Route path='/admin-staff/dashboard' element={<AdminStaff />} />
        <Route path='/health-staff/dashboard' element={<HealthStaff />} />
        <Route
          path='/patient/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <Add />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route path='/patients' element={<AllPatients />} />
        <Route path='/patient/:id' element={<PatientDetail />} />
        <Route
          path='/health-staff/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AdddHealthStaff />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/health-staffs'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllHealthStaffs />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/lab/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddLabs />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/labs'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllLabs />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route path='/patient-lab-report/add' element={<AddPatientLabTest />} />
        <Route path='/patient-lab-reports' element={<AllReports />} />
        <Route
          path='/admin-staff/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddAdminStaff />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/admin-staffs'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllAdminStaffs />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/insurances'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllInsurances />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/insurance/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddInsurance />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/beds'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllBed />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/bed/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddBed />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/rooms'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllRooms />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/room/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddRoom />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route path='/ehr-visits' element={<AllEhrVisit />} />
        <Route path='/ehr-visit/add' element={<AddEHRVisit />} />
        <Route path='/admission/add' element={<AddAdmissions />} />
        <Route path='/admission/update/:id' element={<UpdateAdmissions />} />
        <Route path='/admissions' element={<AllAdmissions />} />
        <Route path='/medication/add' element={<AddMedications />} />
        <Route path='/medications' element={<AllMedications />} />
        <Route
          path='/billing/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddBillings />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/billings'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllBillings />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/schedules'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllSchedules />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/schedule/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AddSchedules />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/roomBed/add'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllRoomBed />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/roomBeds'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <AllRoomBed />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
        <Route
          path='/patient-history'
          element={login ? <PatientHistory /> : <Login />}
        />
        <Route path='/patient-history/:id' element={<PatientHistoryDetail />} />
        <Route path='/ehr-visit/:id' element={<PatientEHRVisit />} />
        <Route
          path='/sign-up'
          element={
            !login ? (
              <Navigate to='/login' replace />
            ) : login && role === 'adminStaffs' ? (
              <SignUp />
            ) : role === 'healthStaffs' ? (
              <Navigate to='/health-staff/dashboard' replace />
            ) : (
              <Navigate to='/patient/dashboard' replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
