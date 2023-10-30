const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientHistorySchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },

    ehrVisit: {
      type: Schema.Types.ObjectId,
      ref: 'EHRVisit',
    },

    billing: {
      type: Schema.Types.ObjectId,
      ref: 'Billing',
    },

    lab: {
      type: Schema.Types.ObjectId,
      ref: 'Lab',
    },

    healthStaff: {
      type: Schema.Types.ObjectId,
      ref: 'HealthStaff',
    },

    medication: {
      type: Schema.Types.ObjectId,
      ref: 'Medication',
    },

    admissions: {
      type: Schema.Types.ObjectId,
      ref: 'Admissions',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PatientHistory', patientHistorySchema);
