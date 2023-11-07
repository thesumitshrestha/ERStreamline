import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [healthStaff, setHealthStaff] = useState('');
  const [prescribedMedications, setPrescribedMedications] = useState('');
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [procedure, setProcedure] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [healthStaffList, setHealthStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getHealthStaffList = async () => {
      const res = await axios.get('http://localhost:5005/api/healthStaffs');
      setHealthStaffList(res.data);
    };

    getPatientList();
    getHealthStaffList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/ehrVisits', {
        patient: patient,
        healthStaff: healthStaff,
        prescribedMedications: prescribedMedications,
        followUpInstructions: followUpInstructions,
        diagnosis: diagnosis,
        procedure: procedure,
        visitDate: visitDate,
        height: height,
        weight: weight,
        bloodPressure: bloodPressure,
        medicalHistory: medicalHistory,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW EHR ADDED');
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <form
              className='create p-large gradient rounded-3xl '
              onSubmit={handleSubmit}
            >
              <h3  className='mb-10 font-bold text-3xl'> Add a EHRVisit</h3>
              <div className='mb-3'>
                <label  className='mb-2 text-sm font-medium block' htmlFor=''>Select Patient: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='patient'
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                >
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
                <label  className='mb-2 text-sm font-medium block' htmlFor=''>Select Heath Staff: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='healthStaff'
                  value={healthStaff}
                  onChange={(e) => setHealthStaff(e.target.value)}
                >
                  {healthStaffList.map((healthStaff, idx) => {
                    return (
                      <option key={healthStaff._id} value={healthStaff._id}>
                        {healthStaff.firstName} {healthStaff.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Prescribed Medications:
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setPrescribedMedications(e.target.value)}
                  value={prescribedMedications}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Follow Up Instructions
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setFollowUpInstructions(e.target.value)}
                  value={followUpInstructions}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Diagnosis
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setDiagnosis(e.target.value)}
                  value={diagnosis}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Procedure
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setProcedure(e.target.value)}
                  value={procedure}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Visit Date
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setVisitDate(e.target.value)}
                  value={visitDate}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Height
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setHeight(e.target.value)}
                  value={height}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Weight (in lbs)
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Blood Pressure
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setBloodPressure(e.target.value)}
                  value={bloodPressure}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Medical History
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='text'
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  value={medicalHistory}
                />
              </div>

              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                Add EHR Visit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
