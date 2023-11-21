import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { convertDate } from '../../commons/functions';

const AllPatients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the items based on the search term
  const filteredItems = allPatients.filter((item) =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  axios.defaults.withCredentials = true;
  useEffect(() => {
    var cookies = document.cookie.split('=')[0];
    console.log('COOKIES IS', cookies);
    const fetchPatients = async () => {
      if (!cookies) {
        navigate('/login');
      }
      const res = await axios.get('http://localhost:5005/api/patients');
      setAllPatients(res.data);
      console.log(res.data);
    };
    fetchPatients();

    // setFilteredData(doctorSchedules);
    const getUserData = async () => {
      const res = await axios.get(
        `http://localhost:5005/api/${window.localStorage.getItem(
          'role'
        )}/detail/${window.localStorage.getItem('email')}`
      );

      setCurrentUser(res.data);
    };

    getUserData();
  }, []);
  return (
    <>
      <div className='flex'>
        <Dashboard
          name={currentUser?.firstName + ' ' + currentUser?.lastName}
          userId={currentUser?._id}
          role={window.localStorage.getItem('role')}
        />
        <div className='bg-background w-4/5 content'>
          <div className='container px-5 py-medium'>
            {window.localStorage.getItem('role') === 'adminStaffs' ? (
              <Link
                to='/patient/add'
                className='inline-block px-4 py-2 text-secondary border-2 border-secondary hover:text-white hover:bg-secondary font-semibold rounded-full text-base transition-colors'
              >
                {' '}
                Add Patient{' '}
              </Link>
            ) : (
              <h3
                style={{ fontSize: '24px', fontWeight: 'bold', color: 'teal' }}
              >
                {' '}
                All Patients{' '}
              </h3>
            )}
            <br /> <br />
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className='bg-white rounded-3xl shadow-lg p-5 text-sm'>
              <table>
                <thead>
                  <tr>
                    <th className='p-4'> S.N.</th>
                    <th className='p-4'>Name</th>
                    <th className='p-4'>Date of Birth</th>
                    <th className='p-4'>Address</th>
                    <th className='p-4'>Phone</th>
                    <th className='p-4'>Email</th>
                    <th className='p-4'>Gender</th>
                    <th className='p-4'>Blood Group</th>
                    <th className='p-4'>Emergency Contact Name</th>
                    <th className='p-4'>Emergency Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {allPatients &&
                    filteredItems.map((patient, index) => {
                      return (
                        <tr key={patient._id}>
                          <td className='p-4'> {index + 1}</td>
                          <td className='p-4'>
                            <Link
                              to={`/patient/${patient._id}`}
                              style={{
                                color: 'teal',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                              }}
                            >
                              {patient.firstName + ' ' + patient.lastName}{' '}
                            </Link>
                          </td>
                          <td className='p-4'>
                            {convertDate(patient.dateOfBirth)}
                          </td>
                          <td className='p-4'>{patient.address}</td>
                          <td className='p-4'>{patient.phone}</td>
                          <td className='p-4'>{patient.email}</td>
                          <td className='p-4'>{patient.gender}</td>
                          <td className='p-4'>{patient.bloodGroup}</td>
                          <td className='p-4'>
                            {patient.emergencyContactName}
                          </td>
                          <td className='p-4'>
                            {patient.emergencyContactNumber}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPatients;
