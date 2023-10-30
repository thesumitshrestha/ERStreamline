const express = require('express');

const {
  createMedication,
  getAllMedication,
} = require('../controllers/medicationController');

const router = express.Router();

const Medication = require('../models/medication');

// get all Medication
router.get('/', getAllMedication);

// post a Medication
router.post('/', createMedication);

module.exports = router;
