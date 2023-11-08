const Room = require('../models/room');
const mongoose = require('mongoose');

// get all Rooms
const getRoom = async (req, res) => {
  const room = await Room.find({}).sort({ createdAt: -1 });
  res.status(200).json(room);
};

// Create new Room
const createRoom = async (req, res) => {
  const { roomNumber } = req.body;

  let emptyFields = [];

  if (!roomNumber) {
    emptyFields.push('roomNumber');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add doc to db
  try {
    const room = await Room.create({
      roomNumber,
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getRoom,
};
