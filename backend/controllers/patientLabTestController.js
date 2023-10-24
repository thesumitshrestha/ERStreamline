const PatientLabTest = require('../models/patientLabTest');
const mongoose = require('mongoose');

// get all Patient Lab Test
const getPatientLabTest = async (req, res) => {
  const patientLabTest = await PatientLabTest.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient_id',
      },
      {
        path: 'lab_id',
      },
    ]);
  res.status(200).json(patientLabTest);
};

// Create new Patient Lab Test
const createPatientLabTest = async (req, res) => {
  const { patient_id, lab_id, report, date } = req.body;

  let emptyFields = [];

  if (!patient_id) {
    emptyFields.push('patient_id');
  }
  if (!lab_id) {
    emptyFields.push('lab');
  }
  if (!report) {
    emptyFields.push('report');
  }
  if (!date) {
    emptyFields.push('date');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const patientLabTest = await PatientLabTest.create({
      patient_id,
      lab_id,
      report,
      date,
    });
    res.status(200).json(patientLabTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

patientLabTest: async (req, res) => {};

module.exports = {
  createPatientLabTest,
  getPatientLabTest,
};
