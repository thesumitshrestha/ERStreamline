import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { convertDate } from '../commons/functions';
import { calculateAge } from '../commons/functions';

const PatientHistoryDetail = () => {
  const { id } = useParams();

  const [patientDetail, setPatientDetail] = useState([]);
  const [ehrVisits, setEhrVisits] = useState([]);

  useEffect(() => {
    const getPatientDetail = async () => {
      await axios
        .get(`http://localhost:5005/api/patients/${id}`)
        .then((response) => {
          console.log('RESPONSE', response.data);
          setPatientDetail(response.data);
        });
    };

    const getEhrVisits = async () => {
      await axios
        .get(`http://localhost:5005/api/ehrVisits/patient/${id}`)
        .then((response) => {
          setEhrVisits(response.data);
          console.log(response.data);
        });
    };

    getPatientDetail();
    getEhrVisits();
  }, []);

  return (
    <>
      <h2> Patient Detail</h2>
      <div key={id}>
        Name: {patientDetail?.firstName} {patientDetail?.lastName} <br />
        Gender: {patientDetail?.gender} <br />
        Phone: {patientDetail?.phone} <br />
        Address: {patientDetail?.address} <br />
        Date of Birth: {convertDate(patientDetail?.dateOfBirth)} <br />
        Email: {patientDetail?.email} <br />
        Blood Group: {patientDetail?.bloodGroup} <br />
        Emergency Contact Name: {patientDetail?.emergencyContactName} <br />
        Emergency Contact Number: {patientDetail?.emergencyContactNumber} <br />
      </div>
      <br />
      <br />
      Age: {calculateAge(patientDetail?.dateOfBirth)}
      <br />
      <br />
      <h2> All EHR Visits</h2>
      {ehrVisits.length > 0
        ? ehrVisits.map((ehrVisit, idx) => {
            return (
              <div key={idx}>
                <Link to={`/ehr-visit/${ehrVisit?._id}`}>
                  {convertDate(ehrVisit?.visitDate)}
                </Link>
              </div>
            );
          })
        : 'No EHR Visits'}
    </>
  );
};

export default PatientHistoryDetail;
