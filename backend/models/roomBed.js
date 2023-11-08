const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomBedSchema = new Schema(
  {
    roomNumber: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    bedNumber: {
      type: Schema.Types.ObjectId,
      ref: 'Bed',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RoomBed', roomBedSchema);
