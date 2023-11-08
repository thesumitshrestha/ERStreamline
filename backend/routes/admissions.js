const express = require('express');

const {
  createAdmission,
  getAllAdmissions,
  updateAdmission,
  getAdmissionById,
  getAdmissionByEHRVisit,
} = require('../controllers/admissionController');

const router = express.Router();

const Admission = require('../models/admissions');

// get all Admissions
router.get('/', getAllAdmissions);

// post a Admissions
router.post('/', createAdmission);

// get admission by id
router.get('/:id', getAdmissionById);

// get admission by ehrVisit
router.get('/ehrVisit/:id', getAdmissionByEHRVisit);

// update an Admission || Discharge Date
router.put('/:id', updateAdmission);

module.exports = router;
