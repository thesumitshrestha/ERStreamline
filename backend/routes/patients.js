const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');

const {
  createPatient,
  getPatients,
  getPatientDetail,
  getPatientByEmail,
} = require('../controllers/patientController');

const router = express.Router();

const Patient = require('../models/patient');

router.get('/', getPatients);

// Post a patient
router.post('/', createPatient);

// get single patient
router.get('/:id', getPatientDetail);

// get patient by email
router.get('/detail/:email', getPatientByEmail);

module.exports = router;
