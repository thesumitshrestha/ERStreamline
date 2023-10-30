const express = require('express');

const {
  createSchedule,
  getAllSchedule,
} = require('../controllers/healthStaffScheduleController');

const router = express.Router();

const HealthStaff = require('../models/healthStaffSchedule');

// get all Health Staff Schedule
router.get('/', getAllSchedule);

// post a health staff Schedule
router.post('/', createSchedule);

module.exports = router;
