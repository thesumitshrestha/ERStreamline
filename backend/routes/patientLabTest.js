const express = require('express');

const {
  createPatientLabTest,
  getPatientLabTest,
} = require('../controllers/patientLabTestController');

const router = express.Router();

const patientLabs = require('../models/patientLabTest');

//get all patientLabs
router.get('/', getPatientLabTest);
router.post('/', createPatientLabTest);

module.exports = router;
