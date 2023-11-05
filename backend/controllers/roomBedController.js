const RoomBed = require('../models/roomBed');
const mongoose = require('mongoose');

// get all RoomBed
const getRoomBed = async (req, res) => {
  const roomBed = await RoomBed.find({})
    .sort({ createdAt: -1 })
    .populate([
      {
        path: 'roomNumber',
      },
      {
        path: 'bedNumber',
      },
    ]);
  res.status(200).json(roomBed);
};

// Create new RoomBed
const createRoomBed = async (req, res) => {
  const { bedNumber, roomNumber, isAvailable } = req.body;

  let emptyFields = [];

  if (!bedNumber) {
    emptyFields.push('bedNumber');
  }
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
    const roomBed = await RoomBed.create({
      bedNumber,
      roomNumber,
      isAvailable,
    });
    res.status(200).json(roomBed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRoomBed,
  getRoomBed,
};
