const Medication = require('../models/medication');
const mongoose = require('mongoose');

// get all Medication
const getAllMedication = async (req, res) => {
  const medication = await Medication.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'healthStaff',
      },
      {
        path: 'patient',
      },
    ]);
  res.status(200).json(medication);
};

// Create new Medication
const createMedication = async (req, res) => {
  const {
    ehrVisit,
    healthStaff,
    patient,
    medicationName,
    dosage,
    prescribedDate,
    medicineCost,
  } = req.body;

  let emptyFields = [];

  if (!ehrVisit) {
    emptyFields.push('ehrVisit');
  }
  if (!healthStaff) {
    emptyFields.push('healthStaff');
  }
  if (!patient) {
    emptyFields.push('patient');
  }
  if (!medicationName) {
    emptyFields.push('medicationName');
  }
  if (!dosage) {
    emptyFields.push('dosage');
  }
  if (!prescribedDate) {
    emptyFields.push('prescribedDate');
  }
  if (!medicineCost) {
    emptyFields.push('medicineCost');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const medication = await Medication.create({
      ehrVisit,
      healthStaff,
      patient,
      medicationName,
      dosage,
      prescribedDate,
      medicineCost,
    });
    res.status(200).json(medication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMedication,
  getAllMedication,
};
