const Patient = require('../models/patient');
const mongoose = require('mongoose');

// get all patients
const getPatients = async (req, res) => {
  const patients = await Patient.find({}).sort({ createdAt: -1 });
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
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
};
