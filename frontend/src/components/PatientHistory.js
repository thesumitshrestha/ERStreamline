import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PatientHistory = () => {
  const [allPatient, setAllPatient] = useState([]);

  useEffect(() => {
    const getAllPatient = async () => {
      await axios.get('http://localhost:5005/api/patients').then((response) => {
        setAllPatient(response.data);
      });
    };

    getAllPatient();
  }, []);
  return (
    <>
      <h1> Patient List </h1>
      {allPatient &&
        allPatient.map((patient, index) => {
          return (
            <h5 key={patient._id}>
              <Link to={`/patient-history/${patient._id}`}>
                {patient?.firstName + ' ' + patient?.lastName}{' '}
              </Link>
            </h5>
          );
        })}
    </>
  );
};

export default PatientHistory;
