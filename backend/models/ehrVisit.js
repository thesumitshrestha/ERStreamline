const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ehrVisitSchema = new Schema(
  {
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],

    healthStaff: [
      {
        type: Schema.Types.ObjectId,
        ref: 'HealthStaff',
      },
    ],

    prescribedMedications: {
      type: String,
    },

    followUpInstructions: {
      type: String,
      require: true,
    },

    diagnosis: {
      type: String,
    },

    procedure: {
      type: String,
    },
    visitDate: {
      type: Date,
      require: true,
    },
    height: {
      type: String,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    bloodPressure: {
      type: String,
      require: true,
    },
    medicalHistory: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EHRVisit', ehrVisitSchema);
