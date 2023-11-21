const express = require('express');

const {
  createAdminStaff,
  getAdminStaffs,
  getAdminStaffDetail,
  getAdminStaffByEmail,
} = require('../controllers/adminStaffController');

const router = express.Router();

const AdminStaff = require('../models/adminStaff');

// get all Admin Staff
router.get('/', getAdminStaffs);

// post a Admin staff
router.post('/', createAdminStaff);

// get single adminStaff
router.get('/:id', getAdminStaffDetail);

// get adminStaff by Email
router.get('/detail/:email', getAdminStaffByEmail);

module.exports = router;
