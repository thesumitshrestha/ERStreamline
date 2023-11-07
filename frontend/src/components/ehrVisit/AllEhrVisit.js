import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { convertDate } from '../../commons/functions';

const AllEhrVisit = () => {
  const [allEhrVisits, setAllEhrVisits] = useState([]);

  useEffect(() => {
    const fetchEHRVisits = async () => {
      const res = await axios.get('http://localhost:5005/api/ehrVisits');
      setAllEhrVisits(res.data);
      console.log(res.data);
    };
    fetchEHRVisits();
  }, []);
  return (
    <>
      <Link to='/ehr-visit/add'> Add EHR Visit </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>Health Staff</th>
            <th>Prescribed Medications</th>
            <th>Followup Instructions</th>
            <th>Diagnosis</th>
            <th>Procedure</th>
            <th>Visit Date</th>
            <th>Height </th>
            <th>Weight </th>
            <th>Blood Pressure </th>
            <th>Medical History </th>
          </tr>
        </thead>
        <tbody>
          {allEhrVisits &&
            allEhrVisits.map((ehrvisit, index) => {
              return (
                <tr key={ehrvisit._id}>
                  <td> {index + 1}</td>
                  <td>
                    <Link to={`/patient/${ehrvisit.patient._id}`}>
                      {ehrvisit.patient.firstName} {ehrvisit.patient.lastName}
                      {ehrvisit.patient._id}
                    </Link>
                  </td>
                  <td>
                    {ehrvisit.healthStaff.firstName}
                    {ehrvisit.healthStaff.lastName}
                  </td>
                  <td>{ehrvisit.prescribedMedications}</td>
                  <td>{ehrvisit.followUpInstructions}</td>
                  <td>{ehrvisit.diagnosis}</td>
                  <td>{ehrvisit.procedure}</td>
                  <td>{convertDate(ehrvisit.visitDate)}</td>
                  <td>{ehrvisit.height}</td>
                  <td>{ehrvisit.weight}</td>
                  <td>{ehrvisit.bloodPressure}</td>
                  <td>{ehrvisit.medicalHistory}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllEhrVisit;
