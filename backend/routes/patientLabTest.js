const express = require('express');

const {
  // createPatientLabTest,
  getPatientLabTest,
  getpatientLabTestByEHRVisit,
} = require('../controllers/patientLabTestController');

const router = express.Router();

const PatientLabTest = require('../models/patientLabTest');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'reports/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//get all patientLabs
router.get('/', getPatientLabTest);
router.get('/ehrVisit/:id', getpatientLabTestByEHRVisit);
// router.post('/', createPatientLabTest);

//API Endpoint for uploading file
router.post('/', upload.single('report'), async (req, res) => {
  const { patient, ehrvisit, lab, labFee, date } = req.body;
  const report = req.file.filename;

  // Add doc to db
  try {
    const patientLabTest = await PatientLabTest.create({
      patient,
      lab,
      ehrvisit,
      report: report,
      labFee,
      date,
    });
    res.status(200).json(patientLabTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
