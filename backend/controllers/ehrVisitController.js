const EHRVisit = require('../models/ehrVisit');
const mongoose = require('mongoose');

// get all EHRVisits Staffs
const getEHRVisits = async (req, res) => {
  const ehrVisits = await EHRVisit.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient',
      },
      {
        path: 'healthStaff',
      },
    ]);
  res.status(200).json(ehrVisits);
};

// get EHRVisits by Id
const getEHRVisitById = async (req, res) => {
  const id = req.params.id;
  const ehrVisits = await EHRVisit.findById(req.params.id).populate([
    {
      path: 'patient',
    },
    {
      path: 'healthStaff',
    },
  ]);
  res.status(200).json(ehrVisits);
};

// get EHRVisits of HealthStaff
const getEHRVisitByHealthStaffId = async (req, res) => {
  console.log('HEREERERERER');
  const id = req.params.id;
  console.log('HELATH STAFF ID is', id);
  const ehrVisits = await EHRVisit.find({ healthStaff: id })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient',
      },
      {
        path: 'healthStaff',
      },
    ]);
  res.status(200).json(ehrVisits);
};

// get all EHRVisits Staffs
const getEHRVisitsByPatientId = async (req, res) => {
  const id = req.params.id;
  const ehrVisits = await EHRVisit.find({
    patient: id,
  })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient',
      },
      {
        path: 'healthStaff',
      },
    ]);
  res.status(200).json(ehrVisits);
};

// Create new EHRVisits Staff
const createEHRVisits = async (req, res) => {
  const {
    patient,
    healthStaff,
    prescribedMedications,
    followUpInstructions,
    diagnosis,
    procedure,
    visitDate,
    height,
    weight,
    bloodPressure,
    medicalHistory,
  } = req.body;

  let emptyFields = [];

  if (!patient) {
    emptyFields.push('patient');
  }
  if (!healthStaff) {
    emptyFields.push('healthStaff');
  }
  if (!prescribedMedications) {
    emptyFields.push('prescribedMedications');
  }
  if (!followUpInstructions) {
    emptyFields.push('followUpInstructions');
  }
  if (!diagnosis) {
    emptyFields.push('diagnosis');
  }
  if (!procedure) {
    emptyFields.push('procedure');
  }
  if (!visitDate) {
    emptyFields.push('visitDate');
  }
  if (!height) {
    emptyFields.push('height');
  }
  if (!weight) {
    emptyFields.push('weight');
  }
  if (!bloodPressure) {
    emptyFields.push('bloodPressure');
  }
  if (!medicalHistory) {
    emptyFields.push('medicalHistory');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const ehrVisits = await EHRVisit.create({
      patient,
      healthStaff,
      prescribedMedications,
      followUpInstructions,
      diagnosis,
      procedure,
      visitDate,
      height,
      weight,
      bloodPressure,
      medicalHistory,
    });
    res.status(200).json(ehrVisits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEHRVisits,
  getEHRVisits,
  getEHRVisitsByPatientId,
  getEHRVisitById,
  getEHRVisitByHealthStaffId,
};
