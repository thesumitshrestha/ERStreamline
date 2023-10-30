const express = require('express');

const {
  createAdmission,
  getAllAdmissions,
} = require('../controllers/admissionController');

const router = express.Router();

const Admission = require('../models/admissions');

// get all Admissions
router.get('/', getAllAdmissions);

// post a Admissions
router.post('/', createAdmission);

module.exports = router;
