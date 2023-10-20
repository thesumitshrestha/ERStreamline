const express = require('express');

const {
  createPatient,
  getPatients,
} = require('../controllers/patientController');

const router = express.Router();

const Patient = require('../models/patient');

// get all patients
router.get('/', getPatients);

// Post a patient
router.post('/', createPatient);

// get single patient
router.get('/:id', (req, res) => {
  res.json({ msg: 'PATIENT DETAIL PAGE' });
});

module.exports = router;
