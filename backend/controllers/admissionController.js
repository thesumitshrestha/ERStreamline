const Admission = require('../models/admissions');
const mongoose = require('mongoose');

// get all Admission
const getAllAdmissions = async (req, res) => {
  const admission = await Admission.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'room',
      },
      {
        path: 'patient',
      },
    ]);
  res.status(200).json(admission);
};

// Create new Admission
const createAdmission = async (req, res) => {
  const { ehrVisit, room, patient, admissionDate, dischargeDate } = req.body;

  let emptyFields = [];

  if (!ehrVisit) {
    emptyFields.push('ehrVisit');
  }
  if (!room) {
    emptyFields.push('room');
  }
  if (!patient) {
    emptyFields.push('patient');
  }
  if (!admissionDate) {
    emptyFields.push('admissionDate');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const admission = await Admission.create({
      ehrVisit,
      room,
      patient,
      admissionDate,
      dischargeDate,
    });
    res.status(200).json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAdmission,
  getAllAdmissions,
};
