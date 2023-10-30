import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    getEHRVisitList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/medication', {
        patient: patient,
        ehrVisit: ehrVisit,
        healthStaff: healthStaff,
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
    <div className='bg-background'>
      <div className='container mx-auto p-large'>
        <form
          className='create p-large gradient rounded-3xl '
          onSubmit={handleSubmit}
        >
          <h3> Add a Medicaiton</h3>
          <div className='mb-3'>
            <label htmlFor=''>Select Patient: </label>
            <select
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
            <label htmlFor=''>Select EHRVisit: </label>
            <select
              name=''
              id='ehrVisit'
              value={ehrVisit}
              onChange={(e) => setEhrVisit(e.target.value)}
            >
              {ehrVisitList.map((ehrVisit, idx) => {
                return (
                  <option key={ehrVisit._id} value={ehrVisit._id}>
                    {ehrVisit.patient?.firstName} {ehrVisit.patient?.lastName}
                    || {ehrVisit.visitDate}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Select Health Staff: </label>
            <select
              name=''
              id='room'
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

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Medication Name
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setMedicationName(e.target.value)}
              value={medicationName}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Dosage
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setDosage(e.target.value)}
              value={dosage}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Prescribed Date
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='date'
              onChange={(e) => setPrescribedDate(e.target.value)}
              value={prescribedDate}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Medicine Cost
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='number'
              onChange={(e) => setMedicineCost(e.target.value)}
              value={medicineCost}
            />
          </div>

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Medication
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
