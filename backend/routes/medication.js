const express = require('express');

const {
  createMedication,
  getAllMedication,
  getMedicationCostByEHRVisit,
} = require('../controllers/medicationController');

const router = express.Router();

const Medication = require('../models/medication');

// get all Medication
router.get('/', getAllMedication);

// post a Medication
router.post('/', createMedication);

// get medication cost by EHRVisit
router.get('/ehrVisit/:id', getMedicationCostByEHRVisit);

module.exports = router;
