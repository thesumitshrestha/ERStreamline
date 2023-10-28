const mongoose = require('mongoose');
const lab = require('./lab');

const Schema = mongoose.Schema;

const patientLabSchema = new Schema(
  {
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    ehrvisit: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EHRVisit',
      },
    ],
    lab: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lab',
      },
    ],
    labFee: {
      type: Number,
      require: true,
      min: 0,
    },
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
