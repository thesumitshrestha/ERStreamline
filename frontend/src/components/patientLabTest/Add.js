import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [lab, setLab] = useState('');
  const [date, setDate] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [file, setFile] = useState('');

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getLabList = async () => {
      const res = await axios.get('http://localhost:5005/api/labs');
      setLabList(res.data);
    };

    getPatientList();
    getLabList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('report', file);
      console.log('FORM DATa', file);
      const res = await axios.post('http://localhost:5005/api/patientLabTest', {
        patient_id: patient,
        lab_id: lab,
        report: formData,
        date: date,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Lab ADDED');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3> Add a New Patient Lab Details</h3>
      <label htmlFor=''>Patient: </label>
      <select
        name=''
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
      <br />
      <label htmlFor=''>Lab: </label>
      <select
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
      <br />
      <label htmlFor=''>Report </label>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
        type='file'
        name='report'
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
