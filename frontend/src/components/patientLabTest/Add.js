import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    <form className='create' onSubmit={handleSubmit}>
      <h3> Add a New Patient Lab Details</h3>
      <label htmlFor=''>Select Patient: </label>
      <select
        name=''
        id='patient'
        value={patient}
        onChange={(e) => handlePatient(e)}
      >
        <option selected value=''>
          Select Patient
        </option>
        {patientList.map((patient, idx) => {
          return (
            <option key={patient._id} value={patient._id}>
              {patient.firstName} {patient.lastName}{' '}
            </option>
          );
        })}
      </select>
      <br />
      <label htmlFor=''>Lab: </label>
      <select
        name=''
        id='lab'
        value={lab}
        onChange={(e) => setLab(e.target.value)}
      >
        <option selected value=''>
          Select Lab
        </option>
        {labList.map((lab, idx) => {
          return (
            <option key={lab._id} value={lab._id}>
              {lab.name}
            </option>
          );
        })}
      </select>

      <br />
      <label htmlFor=''>EHRVisit: </label>
      <select
        name=''
        id='ehrvisit'
        value={ehrVisit}
        onChange={(e) => setEhrVisit(e.target.value)}
      >
        {ehrVisitList.map((ehrvisit, idx) => {
          return (
            <option key={ehrvisit._id} value={ehrvisit._id}>
              {ehrvisit.patient?.firstName} {ehrvisit.patient?.lastName} ||{' '}
              {ehrvisit?.visitDate}
            </option>
          );
        })}
      </select>
      <br />
      <label htmlFor=''>Report </label>
      <input
        onChange={(e) => {
          setReport(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
        accept='application/pdf'
        type='file'
        name='report'
      />

      <br />
      <label htmlFor=''>Lab Fee: </label>
      <input
        type='number'
        onChange={(e) => setLabFee(e.target.value)}
        value={labFee}
      />
      <br />
      <label htmlFor=''>Date: </label>
      <input
        type='date'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <br />
      <button> Add Patient Lab Report</button>
    </form>
  );
};

export default Add;
