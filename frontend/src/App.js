import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/homePage/Header';
import Login from './components/homePage/Login';
import Announcements from './components/homePage/Announcements';
import Patient from './components/homePage/Patient';
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

function App() {
  return (
    <div className='App bg-background'>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path='/homepage/login' element={<Login />} />
          {/* <Route path='/homepage/announcements' element={<Announcements />} /> */}
          <Route path='/' element={<Announcements />} />
          <Route path='/homepage/patient' element={<Patient />} />
          <Route path='/patient/add' element={<Add />} />
          <Route path='/patients' element={<AllPatients />} />
          <Route path='/patient/:id' element={<PatientDetail />} />
          <Route path='/health-staff/add' element={<AdddHealthStaff />} />
          <Route path='/health-staffs' element={<AllHealthStaffs />} />
          <Route path='/lab/add' element={<AddLabs />} />
          <Route path='/labs' element={<AllLabs />} />
          <Route
            path='/patient-lab-report/add'
            element={<AddPatientLabTest />}
          />
          <Route path='/patient-lab-reports' element={<AllReports />} />
          <Route path='/admin-staff/add' element={<AddAdminStaff />} />
          <Route path='/admin-staffs' element={<AllAdminStaffs />} />
          <Route path='/insurances' element={<AllInsurances />} />
          <Route path='/insurance/add' element={<AddInsurance />} />
          <Route path='/beds' element={<AllBed />} />
          <Route path='/bed/add' element={<AddBed />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/room/add' element={<AddRoom />} />
          <Route path='/ehr-visits' element={<AllEhrVisit />} />
          <Route path='/ehr-visit/add' element={<AddEHRVisit />} />
          <Route path='/admission/add' element={<AddAdmissions />} />
          <Route path='/admission/update/:id' element={<UpdateAdmissions />} />
          <Route path='/admissions' element={<AllAdmissions />} />
          <Route path='/medication/add' element={<AddMedications />} />
          <Route path='/medications' element={<AllMedications />} />
          <Route path='/billing/add' element={<AddBillings />} />
          <Route path='/billings' element={<AllBillings />} />
          <Route path='/schedules' element={<AllSchedules />} />
          <Route path='/schedule/add' element={<AddSchedules />} />
          <Route path='/roomBed/add' element={<AddRoomBed />} />
          <Route path='/roomBeds' element={<AllRoomBed />} />
          <Route path='/patient-history' element={<PatientHistory />} />
          <Route
            path='/patient-history/:id'
            element={<PatientHistoryDetail />}
          />
          <Route path='/ehr-visit/:id' element={<PatientEHRVisit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
