const express = require('express');

const {
  createInsurance,
  getInsurance,
  getInsuranceByPatient,
} = require('../controllers/insuranceController');

const router = express.Router();

const Insurance = require('../models/insurance');

// get all Insurance
router.get('/', getInsurance);

// get insurance by patient
router.get('/patient/:id', getInsuranceByPatient);

// post a Insurance
router.post('/', createInsurance);

module.exports = router;
