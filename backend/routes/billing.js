const express = require('express');

const {
  createBilling,
  getAllBillings,
  getBillingsByEHRVisit,
} = require('../controllers/billingController');

const router = express.Router();

const Billing = require('../models/billing');

// get all Billings
router.get('/', getAllBillings);

// Billing by EHR
router.get('/ehrVisit/:id', getBillingsByEHRVisit);

// post a Billing
router.post('/', createBilling);

module.exports = router;
