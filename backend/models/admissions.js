const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const admissionSchema = new Schema(
  {
    ehrVisit: {
      type: Schema.Types.ObjectId,
      ref: 'EHRVisit',
    },
    bedNumber: {
      type: Schema.Types.ObjectId,
      ref: 'RoomBed',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    admissionDate: {
      type: Date,
      require: true,
    },
    dischargeDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admissions', admissionSchema);
