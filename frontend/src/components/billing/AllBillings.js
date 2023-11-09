import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { Link } from 'react-router-dom';
import { convertDate } from '../../commons/functions';

const AllBillings = () => {
  const [allBillings, setAllBillings] = useState([]);

  useEffect(() => {
    const fetchAllBillings = async () => {
      const res = await axios.get('http://localhost:5005/api/billings');
      setAllBillings(res.data);
      console.log(res.data);
    };
    fetchAllBillings();
  }, []);
  return (
    <>
      <Link to='/billing/add'> Add Billing </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>Health Staff</th>
            <th>EHR Visit Date</th>
            <th>Medication Fee</th>
            <th>Lab Fee</th>
            <th>Insurance Coverage</th>
            <th>Deductible</th>
            <th>Billing Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {allBillings &&
            allBillings.map((billing, index) => {
              return (
                <tr key={billing._id}>
                  <td> {index + 1}</td>
                  <td>
                    {billing.patient?.firstName} &nbsp;{' '}
                    {billing.patient?.lastName}
                  </td>
                  <td>
                    {billing.ehrVisit?.healthStaff?.firstName} &nbsp;
                    {billing.ehrVisit?.healthStaff?.lastName}
                  </td>
                  <td>{convertDate(billing.ehrVisit?.visitDate)}</td>
                  <td>${billing?.medication}</td>
                  <td>${billing?.lab}</td>
                  <td>${billing.insurance.coverageAmount}</td>
                  <td>${billing.insurance.deductible}</td>
                  <td>{convertDate(billing.billingDate)}</td>
                  <td>{billing.totalAmount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllBillings;
