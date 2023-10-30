const HealthStaffSchedule = require('../models/healthStaffSchedule');
const mongoose = require('mongoose');

// get all Health Staff Schedule
const getAllSchedule = async (req, res) => {
  const healthStaffSchedule = await HealthStaffSchedule.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'healthStaff',
      },
    ]);
  res.status(200).json(healthStaffSchedule);
};

// Create new Patient Lab Test
const createSchedule = async (req, res) => {
  const { healthStaff, day, startTime, endTime } = req.body;

  let emptyFields = [];

  if (!healthStaff) {
    emptyFields.push('healthStaff');
  }
  if (!day) {
    emptyFields.push('day');
  }
  if (!startTime) {
    emptyFields.push('startTime');
  }
  if (!endTime) {
    emptyFields.push('daendTimete');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const healthStaffSchedule = await HealthStaffSchedule.create({
      healthStaff,
      day,
      startTime,
      endTime,
    });
    res.status(200).json(healthStaffSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSchedule,
  getAllSchedule,
};
