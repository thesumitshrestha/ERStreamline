import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [lab, setLab] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [date, setDate] = useState('');
  const [labFee, setLabFee] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const [report, setReport] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getLabList = async () => {
      const res = await axios.get('http://localhost:5005/api/labs');
      setLabList(res.data);
    };

    // const getEhrVisits = async () => {
    //   const res = await axios.get('http://localhost:5005/api/ehrVisits');
    //   setEhrVisitList(res.data);
    // };

    getPatientList();
    getLabList();
    // getEhrVisits();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('report', report);
      formData.append('labFee', labFee);
      formData.append('patient', patient);
      formData.append('lab', lab);
      formData.append('ehrvisit', ehrVisit);
      formData.append('date', date);
      const res = await axios.post(
        'http://localhost:5005/api/patientLabTest',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('RES', res);
      console.log('NEW Lab Test ADDED');
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
              <h3 className='mb-10 font-bold text-3xl'>
                Add a New Patient Lab Details
              </h3>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Patient:{' '}
                </label>
                <select
                  name=''
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  id='patient'
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                >
                  {patientList.map((patient, idx) => {
                    return (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}{' '}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Lab:{' '}
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='lab'
                  value={lab}
                  onChange={(e) => setLab(e.target.value)}
                >
                  {labList.map((lab, idx) => {
                    return (
                      <option key={lab._id} value={lab._id}>
                        {lab.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  EHRVisit:{' '}
                </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='ehrvisit'
                  value={ehrVisit}
                  onChange={(e) => setEhrVisit(e.target.value)}
                >
                  {ehrVisitList.map((ehrvisit, idx) => {
                    return (
                      <option key={ehrvisit._id} value={ehrvisit._id}>
                        {ehrvisit.patient?.firstName}{' '}
                        {ehrvisit.patient?.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Report{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  onChange={(e) => {
                    setReport(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                  type='file'
                  name='report'
                />
              </div>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Lab Fee:{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='number'
                  onChange={(e) => setLabFee(e.target.value)}
                  value={labFee}
                />
              </div>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Date:{' '}
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                {' '}
                Add Patient Lab Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
