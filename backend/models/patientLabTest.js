const mongoose = require('mongoose');
const lab = require('./lab');

const Schema = mongoose.Schema;

const patientLabSchema = new Schema(
  {
    patient_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    lab_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lab',
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
