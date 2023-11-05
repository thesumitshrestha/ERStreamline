import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
  const [dischargeDate, setDischargeDate] = useState('');
  const [admissionList, setAdmissionList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('ID IN UPDATE is', id);

  useEffect(() => {
    const getAdmission = async () => {
      const res = await axios.get(`http://localhost:5005/api/admissions/${id}`);
      // .then((result) => {
      //   console.log(result);
      //   setPatient(
      //     result.data[0].patient.firstName +
      //       ' ' +
      //       result.data[0].patient.lastName
      //   );
      //   setEhrVisit(result.data[0].ehrVisit.visitDate);
      //   setBedNumber(
      //     result.data[0].bedNumber.roomNumber.roomNumber +
      //       result.data[0].bedNumber.bedNumber.bedNumber
      //   );
      //   setAdmissionDate(result.data[0].admissionDate);
      //   setDischargeDate(result.data[0].dischargeDate);
      // });
      setAdmissionList(res.data);
      console.log('RES DATA', res.data);
    };

    getAdmission();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5005/api/admissions/${id}`,
        {
          patient: admissionList[0]?.patient._id,
          ehrVisit: admissionList[0]?.ehrVisit._id,
          bedNumber: admissionList[0]?.bedNumber._id,
          admissionDate: admissionList[0]?.admissionDate,
          dischargeDate: dischargeDate,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
            <label htmlFor=''>Patient: </label>
            <select name='' id='patient' value={admissionList[0]?.patient._id}>
              <option selected value='' disabled>
                {admissionList[0]?.patient.firstName +
                  ' ' +
                  admissionList[0]?.patient.lastName}
              </option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor=''>EHRVisit Date: </label>

            <select
              name=''
              id='ehrVisit'
              value={admissionList[0]?.ehrVisit._id}
            >
              <option selected value='' disabled>
                {admissionList[0]?.ehrVisit.visitDate}
              </option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor=''>Bed: </label>
            <select name='' id='room' value={admissionList[0]?.bedNumber._id}>
              <option selected value='' disabled>
                {admissionList[0]?.bedNumber.roomNumber.roomNumber}
                {admissionList[0]?.bedNumber.bedNumber.bedNumber}
              </option>
            </select>
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Admission Date:
            </label>
            <select
              name=''
              id='admissionDate'
              value={admissionList[0]?.admissionDate}
            >
              <option selected value='' disabled>
                {admissionList[0]?.admissionDate}
              </option>
            </select>
          </div>

          <div class='mb-3'>
            <label class='mb-2 text-sm font-medium block' htmlFor=''>
              Discharge Date
            </label>
            <input
              class='p-2.5 text-textLight shadow rounded w-2/5 outline-none focus:border-solid focus:border focus:border-primary focus:shadow-none transition'
              type='date'
              onChange={(e) => setDischargeDate(e.target.value)}
              value={dischargeDate}
            />
          </div>

          <button class='px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full text-base mt-10 transition-colors'>
            Update Admissions
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
