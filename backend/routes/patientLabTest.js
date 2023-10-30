const express = require('express');

const {
  createPatientLabTest,
  getPatientLabTest,
} = require('../controllers/patientLabTestController');

const router = express.Router();

const patientLabs = require('../models/patientLabTest');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
//get all patientLabs
router.get('/', getPatientLabTest);
router.post('/', createPatientLabTest);
//API Endpoint for uploading file
router.post('/api/uploadFile', upload.single('myFile'), (req, res) => {
  // Stuff to be added later
  console.log('I am at route', req.file);
});

module.exports = router;
