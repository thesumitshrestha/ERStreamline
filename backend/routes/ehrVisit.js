const express = require('express');

const {
  createEHRVisits,
  getEHRVisits,
} = require('../controllers/ehrVisitController');

const router = express.Router();

const EHRVisit = require('../models/ehrVisit');

// get all Health Staff
router.get('/', getEHRVisits);

// post a health staff
router.post('/', createEHRVisits);

module.exports = router;
