const express = require('express');

const {
  createHealthStaff,
  getHealthStaffs,
} = require('../controllers/healthStaffController');

const router = express.Router();

const HealthStaff = require('../models/healthStaff');

// get all Health Staff
router.get('/', getHealthStaffs);

// post a health staff
router.post('/', createHealthStaff);

module.exports = router;
