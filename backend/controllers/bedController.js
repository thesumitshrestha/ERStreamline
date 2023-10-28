const Bed = require('../models/bed');
const mongoose = require('mongoose');

// get all Bed
const getBed = async (req, res) => {
  const bed = await Bed.find({}).sort({ createdAt: -1 });
  res.status(200).json(bed);
};

// Create new Bed
const createBed = async (req, res) => {
  const { bedNumber } = req.body;

  let emptyFields = [];

  if (!bedNumber) {
    emptyFields.push('firstName');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const bed = await Bed.create({
      bedNumber,
    });
    res.status(200).json(bed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBed,
  getBed,
};
