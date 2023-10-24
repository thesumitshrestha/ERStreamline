const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bedSchema = new Schema(
  {
    bedNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bed', bedSchema);
