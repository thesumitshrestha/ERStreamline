const mongoose = require('mongoose');
const lab = require('./lab');

const Schema = mongoose.Schema;

const patientLabSchema = new Schema(
  {
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: patient,
      },
    ],
    lab: [
      {
        type: Schema.Types.ObjectId,
        ref: lab,
      },
    ],
    report: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PatientLabTest', patientLabSchema);
