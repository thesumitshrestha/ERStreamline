const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
