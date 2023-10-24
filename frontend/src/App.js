import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './components/patients/Add';
import AdddHealthStaff from './components/healthStaff/Add';
import Dashboard from './components/dashboard/Dashboard';
import New from './components/dashboard/New';
import AllPatients from './components/patients/AllPatients';
import AllHealthStaffs from './components/healthStaff/AllHealthStaffs';
import AddLabs from './components/lab/Add';
import AllLabs from './components/lab/AllLabs';
import AddPatientLabTest from './components/patientLabTest/Add';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/new' element={<New />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
