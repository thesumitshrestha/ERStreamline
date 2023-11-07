import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertDate, calculateAge } from '../commons/functions';

const PatientEHRVisit = () => {
  const [ehrVisit, setEhrVisit] = useState();
  const [ehrVisitPatientLab, setEhrVisitPatientLab] = useState([]);
  const [ehrVisitMedicationList, setEhrVisitMedicationList] = useState([]);
  const [ehrVisitAdmission, setEhrVisitAdmission] = useState([]);
  const { id } = useParams();

  const getEHRVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/ehrVisits/${id}`)
      .then((response) => {
        console.log('NEW RESPOSE', response.data);
        setEhrVisit(response.data);
      });
  };

  const getLabsByEHRVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/patientLabTest/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW PATIENT LAB RESPONSE', response.data);
        setEhrVisitPatientLab(response.data);
      });
  };

  const getMedicationByEhrVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/medication/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW MEDICAITION RESPONSE', response.data);
        setEhrVisitMedicationList(response.data);
      });
  };

  const getAdmissionByEhrVisit = async () => {
    await axios
      .get(`http://localhost:5005/api/admissions/ehrVisit/${id}`)
      .then((response) => {
        console.log('NEW ADMISSIOn RESPONSE', response.data);
        setEhrVisitAdmission(response.data);
      });
  };

  useEffect(() => {
    getEHRVisit();
    getLabsByEHRVisit();
    getMedicationByEhrVisit();
    getAdmissionByEhrVisit();
  }, []);

  return (
    <>
      <div>EhrVisit Details</div>
      <div>
        Patient Name: {ehrVisit?.patient?.firstName}{' '}
        {ehrVisit?.patient?.lastName}
      </div>
      <div>
        Health Staff: {ehrVisit?.healthStaff?.firstName} &nbsp;
        {ehrVisit?.healthStaff?.lastName}
      </div>
      <div>Visit Date: {convertDate(ehrVisit?.visitDate)}</div>
      <div>Blood Pressure: {ehrVisit?.bloodPressure}</div>
      <div>Height: {ehrVisit?.height}</div>
      <div>Weight: {ehrVisit?.weight} lbs</div>
      <div>Diagnosis: {ehrVisit?.diagnosis}</div>
      <div>Follow Up Instructions: {ehrVisit?.followUpInstructions}</div>
      <div> Procedure: {ehrVisit?.procedure}</div>
      <div>Medical History: {ehrVisit?.medicalHistory} lbs</div>
      <div>Prescribed Medications: {ehrVisit?.prescribedMedications} lbs</div>

      <p> Age: {calculateAge(ehrVisit?.patient?.dateOfBirth)}</p>

      <br />
      <br />
      <br />

      <h2> Lab Results</h2>
      {ehrVisitPatientLab.length > 0
        ? ehrVisitPatientLab.map((lab, idx) => {
            return (
              <div key={idx}>
                <p>
                  {lab?.lab?.name} -
                  <button
                    style={{ textDecoration: 'underline', color: 'blue' }}
                    onClick={(e) => {
                      window.open(
                        `http://localhost:5005/reports/${lab?.report}`,
                        '_blank',
                        'noreferrer'
                      );
                    }}
                  >
                    Show Lab Report
                  </button>
                  - {lab?.labFee} | {convertDate(lab?.date)}
                </p>
              </div>
            );
          })
        : 'No Lab Test Found'}

      <br />
      <br />
      <br />
      <br />
      <h2> Medication </h2>
      {ehrVisitMedicationList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th> S.N.</th>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Medication Cost</th>
              <th>Prescribed Date</th>
              <th>Health Staff</th>
            </tr>
          </thead>
          <tbody>
            {ehrVisitMedicationList.map((med, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{med?.medicationName}</td>
                  <td>{med?.dosage}</td>
                  <td>${med?.medicineCost} </td>
                  <td>{convertDate(med?.prescribedDate)} </td>
                  <td>
                    {med?.healthStaff.firstName} &nbsp;{' '}
                    {med?.healthStaff.lastName}{' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        'No Medication Found'
      )}

      <br />
      <br />
      <h2> Admission </h2>
      {ehrVisitAdmission.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th> S.N.</th>
              <th>Bed Number</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
            </tr>
          </thead>
          <tbody>
            {ehrVisitAdmission.map((admission, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {admission?.bedNumber.roomNumber.roomNumber}
                    {admission?.bedNumber.bedNumber.bedNumber}
                  </td>
                  <td>{convertDate(admission?.admissionDate)} </td>
                  <td>{convertDate(admission?.dischargeDate)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        'No Admission Found'
      )}
    </>
  );
};

export default PatientEHRVisit;
