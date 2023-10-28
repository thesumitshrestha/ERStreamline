import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './components/patients/Add';
import AdddHealthStaff from './components/healthStaff/Add';
import Dashboard from './components/dashboard/Dashboard';
import AllPatients from './components/patients/AllPatients';
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
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/patient/add' element={<Add />} />
          <Route path='/patients' element={<AllPatients />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
