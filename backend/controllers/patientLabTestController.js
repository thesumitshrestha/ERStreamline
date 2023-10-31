const PatientLabTest = require('../models/patientLabTest');
const mongoose = require('mongoose');

// get all Patient Lab Test
const getPatientLabTest = async (req, res) => {
  const patientLabTest = await PatientLabTest.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient',
      },
      {
        path: 'ehrvisit',
      },
      {
        path: 'lab',
      },
    ]);
  res.status(200).json(patientLabTest);
};

// Create new Patient Lab Test
// const createPatientLabTest =

module.exports = {
  // createPatientLabTest,
  getPatientLabTest,
};
