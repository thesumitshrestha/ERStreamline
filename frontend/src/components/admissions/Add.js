import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [roomBedList, setRoomBedList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getRoomBedList = async () => {
      const res = await axios.get('http://localhost:5005/api/roomBeds');
      setRoomBedList(res.data);
    };

    getPatientList();
    getRoomBedList();
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
      const res = await axios.post('http://localhost:5005/api/admissions', {
        patient: patient,
        ehrVisit: ehrVisit,
        bedNumber: bedNumber,
        admissionDate: admissionDate,
        dischargeDate: dischargeDate,
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
          <h3> Add an Admission (Room)</h3>
          <div className='mb-3'>
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
              <option selected value=''>
                Select EHR Visit
              </option>
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
            <label htmlFor=''>Select Bed: </label>
            <select
              name=''
              id='room'
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            >
              <option selected value=''>
                Select Bed
              </option>
              {roomBedList
                .filter((room) => room.isAvailable === true)
                .map((room, idx) => {
                  return (
                    <option key={room._id} value={room._id}>
                      {room.roomNumber?.roomNumber} {room.bedNumber?.bedNumber}
                    </option>
                  );
                })}
            </select>
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Admission Date
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='date'
              onChange={(e) => setAdmissionDate(e.target.value)}
              value={admissionDate}
            />
          </div>

          {/* <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Discharge Date
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='date'
              onChange={(e) => setDischargeDate(e.target.value)}
              value={dischargeDate}
            />
          </div> */}

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Add Admissions
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
