const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const insuranceSchema = new Schema(
  {
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    policyNumber: {
      type: String,
      require: true,
    },
    deductible: {
      type: Number,
      require: true,
    },
    coverageAmount: {
      type: Number,
      require: true,
    },
    insuranceProvider: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
