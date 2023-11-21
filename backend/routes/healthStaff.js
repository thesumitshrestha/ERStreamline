const express = require('express');

const {
  createHealthStaff,
  getHealthStaffs,
  getHealthStaffDetail,
  getHealthStaffByEmail,
} = require('../controllers/healthStaffController');

const router = express.Router();

const HealthStaff = require('../models/healthStaff');

// get all Health Staff
router.get('/', getHealthStaffs);

// post a health staff
router.post('/', createHealthStaff);

// get single healthStaff
router.get('/:id', getHealthStaffDetail);

// get healthStaff by Email
router.get('/detail/:email', getHealthStaffByEmail);
module.exports = router;
