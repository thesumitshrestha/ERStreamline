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
const createPatientLabTest = async (req, res) => {
  const { patient, ehrvisit, lab, labFee, report, date } = req.body;

  let emptyFields = [];

  if (!patient) {
    emptyFields.push('patient');
  }
  if (!ehrvisit) {
    emptyFields.push('ehrvisit');
  }
  if (!lab) {
    emptyFields.push('lab');
  }
  if (!labFee) {
    emptyFields.push('labFee');
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
      patient,
      lab,
      ehrvisit,
      report,
      labFee,
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
