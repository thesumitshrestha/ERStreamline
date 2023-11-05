const express = require('express');

const {
  createRoomBed,
  getRoomBed,
} = require('../controllers/roomBedController');

const router = express.Router();

const Room = require('../models/roomBed');

// get all roomBed
router.get('/', getRoomBed);

// post a roomBed
router.post('/', createRoomBed);

module.exports = router;
