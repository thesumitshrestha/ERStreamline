import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllMedications = () => {
  const [allMedications, setAllMedications] = useState([]);

  useEffect(() => {
    const fetchAllMedications = async () => {
      const res = await axios.get('http://localhost:5005/api/medication');
      setAllMedications(res.data);
      console.log(res.data);
    };
    fetchAllMedications();
  }, []);
  return (
    <>
      <Link to='/medication/add'> Add Medication </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>Health Staff</th>
            <th>EHR Visit Date</th>
            <th>Medication Name</th>
            <th>Prescribed Date</th>
            <th>Dosage</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {allMedications &&
            allMedications.map((medication, index) => {
              return (
                <tr key={medication._id}>
                  <td> {index + 1}</td>
                  <td>
                    {medication.patient?.firstName}{' '}
                    {medication.patient?.lastName}
                  </td>
                  <td>
                    {medication.healthStaff?.firstName}{' '}
                    {medication.healthStaff?.lastName}
                  </td>
                  <td>{medication.ehrVisit?.visitDate}</td>
                  <td>{medication.medicationName}</td>
                  <td>{medication.prescribedDate}</td>
                  <td>{medication.dosage}</td>
                  <td>{medication.medicineCost}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllMedications;
