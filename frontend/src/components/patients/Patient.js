import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Patient = () => {
  const { id } = useParams();
  const [patientDetail, setPatientDetail] = useState([]);

  useEffect(() => {
    const getPatientDetail = async () => {
      const res = await axios.get(`http://localhost:5005/api/patients/${id}`);
      setPatientDetail(res.data);
      console.log(res.data);
    };
    getPatientDetail();
  }, []);

  return (
    <>
      <div>I am Patient Detail Page</div>
      <h4>
        Name: {patientDetail?.firstName} {patientDetail?.lastName}
      </h4>
      <h4>DOB: {patientDetail?.dateOfBirth}</h4>
      <h4>Email: {patientDetail?.email}</h4>
      <h4>Gender: {patientDetail?.gender}</h4>
      <h4>Phone: {patientDetail?.phone}</h4>
      <h4>Emergency Contact Name: {patientDetail?.emergencyContactName}</h4>
      <h4>Emergency Contact Number: {patientDetail?.emergencyContactNumber}</h4>
    </>
  );
};

export default Patient;
