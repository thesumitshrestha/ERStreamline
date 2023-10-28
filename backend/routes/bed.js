const express = require('express');

const { createBed, getBed } = require('../controllers/bedController');

const router = express.Router();

const Bed = require('../models/bed');

// get all bed
router.get('/', getBed);

// post a bed
router.post('/', createBed);

module.exports = router;
