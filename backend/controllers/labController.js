const Lab = require('../models/lab');
const mongoose = require('mongoose');

// get all labs
const getLabs = async (req, res) => {
  const labs = await Lab.find({}).sort({ createdAt: -1 });
  res.status(200).json(labs);
};

// create new patient
const createLabs = async (req, res) => {
  const { name, address, email, phone } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const lab = await Lab.create({
      name,
      address,
      email,
      phone,
    });
    res.status(200).json(lab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLabs,
  getLabs,
};
