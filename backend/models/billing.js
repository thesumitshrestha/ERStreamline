const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    ehrVisit: [
      {
        type: Schema.Types.ObjectId,
        ref: 'EHRVisit',
      },
    ],
    medication: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Medication',
      },
    ],
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    insurance: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Insurance',
      },
    ],
    administrativeStaff: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeStaff',
      },
    ],
    lab: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lab',
      },
    ],
    billingDate: {
      type: Date,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Billing', billingSchema);
