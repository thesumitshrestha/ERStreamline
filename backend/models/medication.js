const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicationSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    medicationName: {
      type: String,
      require: true,
    },
    dosage: {
      type: String,
      require: true,
    },
    prescribedDate: {
      type: Date,
      require: true,
    },
    ehrVisit: {
      type: Schema.Types.ObjectId,
      ref: 'EHRVisit',
    },

    healthStaff: {
      type: Schema.Types.ObjectId,
      ref: 'HealthStaff',
    },

    medicineCost: {
      type: Number,
      min: 0,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medication', medicationSchema);
