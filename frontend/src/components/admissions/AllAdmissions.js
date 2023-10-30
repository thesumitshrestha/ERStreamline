import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllAdmissions = () => {
  const [allAdmissions, setAllAdmissions] = useState([]);

  useEffect(() => {
    const fetchAllAdmissions = async () => {
      const res = await axios.get('http://localhost:5005/api/admissions');
      setAllAdmissions(res.data);
      console.log(res.data);
    };
    fetchAllAdmissions();
  }, []);
  return (
    <>
      <Link to='/admission/add'> Add Admission </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>EHR Visit Date</th>
            <th>Admitted Date</th>
            <th>Discharged Date</th>
          </tr>
        </thead>
        <tbody>
          {allAdmissions &&
            allAdmissions.map((admission, index) => {
              return (
                <tr key={admission._id}>
                  <td> {index + 1}</td>
                  <td>
                    {admission.patient?.firstName} {admission.patient?.lastName}
                  </td>
                  <td>{admission.ehrVisit?.visitDate}</td>
                  <td>{admission.admissionDate}</td>
                  <td>
                    {admission.dischargeDate && admission.dischargeDate
                      ? admission.dischargeDate
                      : 'Not Discharged Yet'}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllAdmissions;
