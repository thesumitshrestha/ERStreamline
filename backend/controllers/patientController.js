const Patient = require('../models/patient');
const mongoose = require('mongoose');

// get all patients
const getPatients = async (req, res) => {
  const patients = await Patient.find({}).sort({ createdAt: -1 });
  res.status(200).json(patients);
};

// Patient Detail Page
const getPatientDetail = async (req, res) => {
  const id = req.params.id;
  const patients = await Patient.findById(req.params.id);
  res.status(200).json(patients);
};

const getPatientByEmail = async (req, res) => {
  console.log('HEREEE');
  const email = req.params.email;
  console.log('EMAIL IS', email);
  console.log('PARAM IS', req.params.email);
  const patients = await Patient.findOne({ email: req.params.email });
  res.status(200).json(patients);
};

// create new patient
const createPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    address,
    phone,
    email,
    gender,
    bloodGroup,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!dateOfBirth) {
    emptyFields.push('dateOfBirth');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!gender) {
    emptyFields.push('gender');
  }
  if (!bloodGroup) {
    emptyFields.push('bloodGroup');
  }
  if (!emergencyContactName) {
    emptyFields.push('emergencyContactName');
  }
  if (!emergencyContactNumber) {
    emptyFields.push('emergencyContactNumber');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const patient = await Patient.create({
      firstName,
      lastName,
      dateOfBirth,
      address,
      phone,
      email,
      gender,
      bloodGroup,
      emergencyContactName,
      emergencyContactNumber,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientDetail,
  getPatientByEmail,
};
