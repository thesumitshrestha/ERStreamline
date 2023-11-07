import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const Add = () => {
  const [patient, setPatient] = useState('');
  const [ehrVisit, setEhrVisit] = useState('');
  const [room, setRoom] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [ehrVisitList, setEhrVisitList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatientList = async () => {
      const res = await axios.get('http://localhost:5005/api/patients');
      setPatientList(res.data);
    };

    const getRoomList = async () => {
      const res = await axios.get('http://localhost:5005/api/rooms');
      setRoomList(res.data);
    };

    const getEHRVisitList = async () => {
      const res = await axios.get('http://localhost:5005/api/ehrVisits');
      setEhrVisitList(res.data);
    };

    getPatientList();
    getRoomList();
    getEHRVisitList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5005/api/admissions', {
        patient: patient,
        ehrVisit: ehrVisit,
        room: room,
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
    <>
      <div className='flex'>
        <Dashboard/>
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            <form
              className='create p-large gradient rounded-3xl '
              onSubmit={handleSubmit}
            >
              <h3 className='mb-10 font-bold text-3xl'> Add an Admission (Room)</h3>
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
                <label className='mb-2 text-sm font-medium block' htmlFor=''>Select Room: </label>
                <select
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  name=''
                  id='room'
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                >
                  {roomList.map((room, idx) => {
                    return (
                      <option key={room._id} value={room._id}>
                        {room.roomNumber} {room.bedNumber?.bedNumber}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Admission Date
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setAdmissionDate(e.target.value)}
                  value={admissionDate}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 text-sm font-medium block' htmlFor=''>
                  Discharge Date
                </label>
                <input
                  className='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
                  type='date'
                  onChange={(e) => setDischargeDate(e.target.value)}
                  value={dischargeDate}
                />
              </div>

              <button className='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
                Add Admissions
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
