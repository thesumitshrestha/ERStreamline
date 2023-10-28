const express = require('express');

const { createRoom, getRoom } = require('../controllers/roomController');

const router = express.Router();

const Room = require('../models/room');

// get all room
router.get('/', getRoom);

// post a room
router.post('/', createRoom);

module.exports = router;
