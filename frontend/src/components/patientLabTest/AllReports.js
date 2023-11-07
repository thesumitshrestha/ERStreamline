import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { convertDate } from '../../commons/functions';

const AllReports = () => {
  const [allPatientReports, setAllPatientReports] = useState([]);

  useEffect(() => {
    const fetchAllPatientLabReports = async () => {
      const res = await axios.get('http://localhost:5005/api/patientLabTest');
      setAllPatientReports(res.data);
      console.log(res.data);
    };
    fetchAllPatientLabReports();
  }, []);
  return (
    <>
      <Link to='/patient-lab-report/add'> Add Patient Lab Report </Link> <br />
      <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>EHR Visit</th>
            <th>Lab</th>
            <th>Lab Fee</th>
            <th>Report</th>
            <th>Report Date</th>
          </tr>
        </thead>
        <tbody>
          {allPatientReports &&
            allPatientReports.map((patientReport, index) => {
              return (
                <tr key={patientReport._id}>
                  <td> {index + 1}</td>
                  <td>
                    {patientReport.patient?.firstName}{' '}
                    {patientReport.patient?.lastName}
                  </td>
                  <td>{convertDate(patientReport.ehrVisit?.visitDate)} </td>
                  <td>{patientReport.lab?.name}</td>
                  <td>{patientReport.labFee}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        window.open(
                          `http://localhost:5005/reports/${patientReport?.report}`,
                          '_blank',
                          'noreferrer'
                        );
                      }}
                    >
                      Show Lab Report
                    </button>
                  </td>
                  <td>{convertDate(patientReport.date)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllReports;
