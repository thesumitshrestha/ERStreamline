const express = require('express');

const router = express.Router();

// get all patients
router.get('/', (req, res) => {
  res.json({ msg: 'GET ALL PATIENTS' });
});

// get single patient

router.get('/:id', (req, res) => {
  res.json({ msg: 'PATIENT DETAIL PAGE' });
});

module.exports = router;
