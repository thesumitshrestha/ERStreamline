import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [healthStaff, setHealthStaff] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [prescribedDate, setPrescribedDate] = useState('');
  const [medicineCost, setMedicineCost] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [healthStaffList, setHealthStaffList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const [ehrVisitListStaff, setEhrVisitListStaff] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getHealthStaff = async () => {
      const res = await axios.get('http://localhost:5005/api/healthStaffs');
      setHealthStaffList(res.data);
    };

    const getEHRVisitList = async () => {
      const res = await axios.get('http://localhost:5005/api/ehrVisits');
      setEhrVisitList(res.data);
    };

    getPatientList();
    getHealthStaff();
    // getEHRVisitList();
  }, []);

  const handlePatient = async (e) => {
    const patientId = e.target.value;
    setPatient(patientId);
    console.log(patientId);

    const res = await axios.get(
      `http://localhost:5005/api/ehrVisits/patient/${patientId}`
    );

    console.log(res.data);
    setEhrVisitList(res.data);
  };

  const handleEHRVisit = async (e) => {
    const ehrVisitId = e.target.value;
    setEhrVisit(ehrVisitId);
    console.log('EHR Visit ID', ehrVisitId);

    const res = await axios.get(
      `http://localhost:5005/api/ehrVisits/${ehrVisitId}`
    );

    console.log('EHR DATA', res.data);
    setEhrVisitListStaff(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/medication', {
        patient: patient,
        ehrVisit: ehrVisit,
        healthStaff: ehrVisitListStaff?.healthStaff?._id,
        medicationName: medicationName,
        dosage: dosage,
        prescribedDate: prescribedDate,
        medicineCost: medicineCost,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Admission ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex'>
        <Dashboard />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <form
              className='create p-large gradient rounded-3xl '
              onSubmit={handleSubmit}
            >
              <h3 className='mb-10 font-bold text-3xl'> Add a Medication</h3>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Select Patient:
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='patient'
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                >
                  <option>Select Patient</option>
                  {patientList.map((patient, idx) => {
                    return (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Select EHRVisit:{' '}
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='ehrVisit'
                  value={ehrVisit}
                  onChange={(e) => setEhrVisit(e.target.value)}
                >
                  <option selected value=''>
                    Select EHRVisit
                  </option>
                  {ehrVisitList.map((ehrVisit, idx) => {
                    return (
                      <option key={ehrVisit._id} value={ehrVisit._id}>
                        {ehrVisit.patient?.firstName}{' '}
                        {ehrVisit.patient?.lastName}
                        || {convertDate(ehrVisit.visitDate)}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Select Health Staff:{' '}
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='room'
                  value={healthStaff}
                  onChange={(e) => setHealthStaff(e.target.value)}
                >
                  <option selected value=''>
                    Select Health Staff
                  </option>
                  {healthStaffList.map((healthStaff, idx) => {
                    return (
                      <option key={healthStaff._id} value={healthStaff._id}>
                        {ehrVisitListStaff.healthStaff?.firstName} &nbsp;{' '}
                        {ehrVisitListStaff?.healthStaff?.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Medication Name
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setMedicationName(e.target.value)}
                  value={medicationName}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Dosage
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setDosage(e.target.value)}
                  value={dosage}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Prescribed Date
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setPrescribedDate(e.target.value)}
                  value={prescribedDate}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Medicine Cost
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='number'
                  onChange={(e) => setMedicineCost(e.target.value)}
                  value={medicineCost}
                />
              </div>

              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                Add Medication
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
