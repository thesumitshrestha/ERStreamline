const AdminStaff = require('../models/adminStaff');
const mongoose = require('mongoose');

// get all Admin Staffs
const getAdminStaffs = async (req, res) => {
  const adminStaffs = await AdminStaff.find({}).sort({ createdAt: -1 });
  res.status(200).json(adminStaffs);
};

// Create new Admin Staff
const createAdminStaff = async (req, res) => {
  const { firstName, lastName, role, phone, email } = req.body;

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!role) {
    emptyFields.push('role');
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
    const adminStaff = await AdminStaff.create({
      firstName,
      lastName,
      role,
      phone,
      email,
    });
    res.status(200).json(adminStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdminStaffDetail = async (req, res) => {
  const id = req.params.id;
  const adminStaff = await AdminStaff.findById(req.params.id);
  res.status(200).json(adminStaff);
};

const getAdminStaffByEmail = async (req, res) => {
  const email = req.params.email;
  const adminStaffs = await AdminStaff.findOne({ email: req.params.email });
  res.status(200).json(adminStaffs);
};

module.exports = {
  createAdminStaff,
  getAdminStaffs,
  getAdminStaffDetail,
  getAdminStaffByEmail,
};
