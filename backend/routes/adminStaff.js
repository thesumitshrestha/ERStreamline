const express = require('express');

const {
  createAdminStaff,
  getAdminStaffs,
} = require('../controllers/adminStaffController');

const router = express.Router();

const AdminStaff = require('../models/adminStaff');

// get all Admin Staff
router.get('/', getAdminStaffs);

// post a Admin staff
router.post('/', createAdminStaff);

module.exports = router;
