import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { convertDate } from '../../commons/functions';

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
            <th>Room Number</th>
            <th>Bed Number</th>
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
                  <td>{convertDate(admission.ehrVisit?.visitDate)}</td>
                  <td>{admission.bedNumber?.roomNumber?.roomNumber}</td>
                  <td>{admission.bedNumber?.bedNumber.bedNumber}</td>
                  <td>{convertDate(admission.admissionDate)}</td>
                  <td>
                    {admission.dischargeDate && admission.dischargeDate ? (
                      convertDate(admission.dischargeDate)
                    ) : (
                      <Link to={`/admission/update/${admission?._id}`}>
                        Not Discharged Yet --- Update
                      </Link>
                    )}
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
