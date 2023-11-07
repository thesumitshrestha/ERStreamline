import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [adminStaff, setAdminStaff] = useState('');
  const [medication, setMedication] = useState('');
  const [insurance, setInsurance] = useState('');
  const [lab, setLab] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [medicationList, setMedicationList] = useState([]);
  const [insuranceList, setInsuranceList] = useState([]);
  const [adminStaffList, setAdminStaffList] = useState([]);
  const [labList, setLabList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getAdminStaff = async () => {
      const res = await axios.get('http://localhost:5005/api/adminStaffs');
      setAdminStaffList(res.data);
    };

    const getEHRVisitList = async () => {
      const res = await axios.get('http://localhost:5005/api/ehrVisits');
      setEhrVisitList(res.data);
    };

    const getLabList = async () => {
      const res = await axios.get('http://localhost:5005/api/labs');
      setLabList(res.data);
    };

    const getInsuranceList = async () => {
      const res = await axios.get('http://localhost:5005/api/insurance');
      setInsuranceList(res.data);
    };

    const getMedicationList = async () => {
      const res = await axios.get('http://localhost:5005/api/medication');
      setMedicationList(res.data);
    };

    getPatientList();
    getAdminStaff();
    getEHRVisitList();
    getLabList();
    getInsuranceList();
    getMedicationList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/billing', {
        patient: patient,
        ehrVisit: ehrVisit,
        adminStaff: adminStaff,
        medication: medication,
        lab: lab,
        billingDate: billingDate,
        insurance: insurance,
        totalAmount: totalAmount,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      console.log('NEW Billing ADDED');
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
              <h3 className='mb-10 font-bold text-3xl'> Add a Billing</h3>
              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Patient: </label>
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
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select EHRVisit: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='ehrVisit'
                  value={ehrVisit}
                  onChange={(e) => setEhrVisit(e.target.value)}
                >
                  {ehrVisitList.map((ehrVisit, idx) => {
                    return (
                      <option key={ehrVisit._id} value={ehrVisit._id}>
                        {ehrVisit.patient?.firstName} {ehrVisit.patient?.lastName}{' '}
                        || {ehrVisit.visitDate}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Admin Staff: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='room'
                  value={adminStaff}
                  onChange={(e) => setAdminStaff(e.target.value)}
                >
                  {adminStaffList.map((adminStaff, idx) => {
                    return (
                      <option key={adminStaff._id} value={adminStaff._id}>
                        {adminStaff.firstName} {adminStaff.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Lab: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='room'
                  value={lab}
                  onChange={(e) => setLab(e.target.value)}
                >
                  {labList.map((lab, idx) => {
                    return (
                      <option key={lab._id} value={lab._id}>
                        {lab?.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Insurance: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='insurance'
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                >
                  {insuranceList.map((insurance, idx) => {
                    return (
                      <option key={insurance._id} value={insurance._id}>
                        {insurance?.policyNumber}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Medicaiton: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='medication'
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                >
                  {medicationList.map((medication, idx) => {
                    return (
                      <option key={medication._id} value={medication._id}>
                        {medication?.medicationName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Total Amount
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='number'
                  onChange={(e) => setTotalAmount(e.target.value)}
                  value={lab?.labFee + medication?.medicationCost}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Billing Date
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setBillingDate(e.target.value)}
                  value={billingDate}
                />
              </div>

              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                Add Bill
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
