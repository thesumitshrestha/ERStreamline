import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllInsurances = () => {
  const [allInsurances, setAllInsurance] = useState([]);

  useEffect(() => {
    const fetchInsurances = async () => {
      const res = await axios.get('http://localhost:5005/api/insurance');
      setAllInsurance(res.data);
      console.log(res.data);
    };
    fetchInsurances();
  }, []);
  return (
    <>
      <Link to='/insurance/add'> Add Insurance </Link> <br /> <br /> <br />
      <table>
        <thead>
          <tr>
            <th> S.N.</th>
            <th>Patient Name</th>
            <th>Policy Number</th>
            <th>Deductible</th>
            <th>Coverage Amount</th>
            <th>Insurance Provider</th>
          </tr>
        </thead>
        <tbody>
          {allInsurances &&
            allInsurances.map((insurance, index) => {
              return (
                <tr key={insurance._id}>
                  <td> {index + 1}</td>
                  <td>
                    {insurance.patient.firstName} {insurance.patient.lastName}
                  </td>
                  <td>{insurance.policyNumber}</td>
                  <td>{insurance.deductible}</td>
                  <td>{insurance.coverageAmount}</td>
                  <td>{insurance.insuranceProvider}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllInsurances;
