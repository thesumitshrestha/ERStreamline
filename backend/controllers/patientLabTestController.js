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

// Get Patient Lab Test by EHRVisits
const getpatientLabTestByEHRVisit = async (req, res) => {
  const id = req.params.id;
  console.log('ID of EHR at Patient Lab Test is', id);
  const patientLabTestByEHRVisits = await PatientLabTest.find({
    ehrvisit: id,
  })
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
  res.status(200).json(patientLabTestByEHRVisits);
};

// Create new Patient Lab Test
// const createPatientLabTest =

module.exports = {
  // createPatientLabTest,
  getPatientLabTest,
  getpatientLabTestByEHRVisit,
};
