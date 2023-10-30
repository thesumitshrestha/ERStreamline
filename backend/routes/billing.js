const express = require('express');

const {
  createBilling,
  getAllBillings,
} = require('../controllers/billingController');

const router = express.Router();

const Billing = require('../models/billing');

// get all Billings
router.get('/', getAllBillings);

// post a Billing
router.post('/', createBilling);

module.exports = router;
