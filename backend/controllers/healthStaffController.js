const HealthStaff = require('../models/healthStaff');
const mongoose = require('mongoose');

// get all health Staffs
const getHealthStaffs = async (req, res) => {
  const healthStaffs = await HealthStaff.find({}).sort({ createdAt: -1 });
  res.status(200).json(healthStaffs);
};

// Create new Health Staff
const createHealthStaff = async (req, res) => {
  const { firstName, lastName, specialty, phone, email } = req.body;

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!specialty) {
    emptyFields.push('specialty');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const healthStaff = await HealthStaff.create({
      firstName,
      lastName,
      specialty,
      phone,
      email,
    });
    res.status(200).json(healthStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHealthStaffDetail = async (req, res) => {
  const id = req.params.id;
  const healthStaff = await HealthStaff.findById(req.params.id);
  res.status(200).json(healthStaff);
};

const getHealthStaffByEmail = async (req, res) => {
  console.log('HEREEE');
  const email = req.params.email;
  console.log('EMAIL IS', email);
  console.log('PARAM IS', req.params.email);
  const healthStaffs = await HealthStaff.findOne({ email: req.params.email });
  res.status(200).json(healthStaffs);
};

module.exports = {
  createHealthStaff,
  getHealthStaffs,
  getHealthStaffDetail,
  getHealthStaffByEmail,
};
