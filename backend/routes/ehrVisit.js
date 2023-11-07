const express = require('express');

const {
  createEHRVisits,
  getEHRVisits,
  getEHRVisitsByPatientId,
  getEHRVisitById,
} = require('../controllers/ehrVisitController');

const router = express.Router();

const EHRVisit = require('../models/ehrVisit');

// get all EHRVisits
router.get('/', getEHRVisits);

// post a EHRVisits staff
router.post('/', createEHRVisits);

router.get('/patient/:id', getEHRVisitsByPatientId);

// Get single EHRVisits
router.get('/:id', getEHRVisitById);

module.exports = router;
