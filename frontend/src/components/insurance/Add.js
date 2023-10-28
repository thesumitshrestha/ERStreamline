import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [deductible, setDeductible] = useState('');
  const [coverageAmount, setCoverageAmount] = useState([]);
  const [insuranceProvider, setInsuranceProvider] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    getPatientList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/insurance', {
        patient: patient,
        policyNumber: policyNumber,
        deductible: deductible,
        coverageAmount: coverageAmount,
        insuranceProvider: insuranceProvider,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Insurance ADDED');
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
          <h3> Add a Insurance of Patient</h3>
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

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Policy Number:
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setPolicyNumber(e.target.value)}
              value={policyNumber}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Deductible
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='number'
              onChange={(e) => setDeductible(e.target.value)}
              value={deductible}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Coverage Amount
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='number'
              onChange={(e) => setCoverageAmount(e.target.value)}
              value={coverageAmount}
            />
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Insurance Provider
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='text'
              onChange={(e) => setInsuranceProvider(e.target.value)}
              value={insuranceProvider}
            />
          </div>

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Patient Insurance
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
