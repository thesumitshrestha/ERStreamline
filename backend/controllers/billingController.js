const Billing = require('../models/billing');
const mongoose = require('mongoose');

// get all Billings
const getAllBillings = async (req, res) => {
  const billing = await Billing.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'medication',
      },
      {
        path: 'patient',
      },
      {
        path: 'insurance',
      },
      {
        path: 'administrativeStaff',
      },
      {
        path: 'lab',
      },
    ]);
  res.status(200).json(billing);
};

const getBillingsByEHRVisit = async (req, res) => {
  const id = req.params.id;
  console.log('ID is', id);
  const billingByEHR = await Billing.find({
    ehrVisit: id,
  })
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'ehrVisit',
      },
      {
        path: 'medication',
      },
      {
        path: 'patient',
      },
      {
        path: 'insurance',
      },
      {
        path: 'administrativeStaff',
      },
      {
        path: 'lab',
      },
    ]);
};

// Create new Billing
const createBilling = async (req, res) => {
  const {
    ehrVisit,
    medication,
    patient,
    insurance,
    administrativeStaff,
    lab,
    billingDate,
    totalAmount,
  } = req.body;

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
    const billing = await Billing.create({
      ehrVisit,
      medication,
      patient,
      insurance,
      administrativeStaff,
      lab,
      billingDate,
      totalAmount,
    });
    res.status(200).json(billing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBilling,
  getAllBillings,
  getBillingsByEHRVisit,
};
