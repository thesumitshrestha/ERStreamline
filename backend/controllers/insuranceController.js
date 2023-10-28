const Insurance = require('../models/insurance');
const mongoose = require('mongoose');

// get all Insurance
const getInsurance = async (req, res) => {
  const insurance = await Insurance.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'patient',
      },
    ]);
  res.status(200).json(insurance);
};

// Create new Insurance
const createInsurance = async (req, res) => {
  const {
    patient,
    policyNumber,
    deductible,
    coverageAmount,
    insuranceProvider,
  } = req.body;

  let emptyFields = [];

  if (!patient) {
    emptyFields.push('patient');
  }
  if (!policyNumber) {
    emptyFields.push('policyNumber');
  }
  if (!deductible) {
    emptyFields.push('deductible');
  }
  if (!coverageAmount) {
    emptyFields.push('coverageAmount');
  }
  if (!insuranceProvider) {
    emptyFields.push('insuranceProvider');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const insurance = await Insurance.create({
      patient,
      policyNumber,
      deductible,
      coverageAmount,
      insuranceProvider,
    });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createInsurance,
  getInsurance,
};
