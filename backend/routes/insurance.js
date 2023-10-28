const express = require('express');

const {
  createInsurance,
  getInsurance,
} = require('../controllers/insuranceController');

const router = express.Router();

const Insurance = require('../models/insurance');

// get all Insurance
router.get('/', getInsurance);

// post a Insurance
router.post('/', createInsurance);

module.exports = router;
