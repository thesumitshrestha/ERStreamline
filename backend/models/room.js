const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    bed_info: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bed',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);