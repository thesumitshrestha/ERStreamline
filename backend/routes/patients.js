const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');

const {
  createPatient,
  getPatients,
  getPatientDetail,
} = require('../controllers/patientController');

const router = express.Router();

const Patient = require('../models/patient');

router.get('/', getPatients);

// Post a patient
router.post('/', createPatient);

// get single patient
router.get('/:id', getPatientDetail);

module.exports = router;
