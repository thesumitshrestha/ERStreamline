import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './components/patients/Add';
import AdddHealthStaff from './components/healthStaff/Add';
import Dashboard from './components/dashboard/Dashboard';
import AllPatients from './components/patients/AllPatients';
import AllHealthStaffs from './components/healthStaff/AllHealthStaffs';
import AddLabs from './components/lab/Add';
import AllLabs from './components/lab/AllLabs';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
