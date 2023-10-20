const express = require('express');

const { createLabs, getLabs } = require('../controllers/labController');

const router = express.Router();

const labs = require('../models/lab');

// get all Labs
router.get('/', getLabs);

// post a Lab
router.post('/', createLabs);

module.exports = router;
